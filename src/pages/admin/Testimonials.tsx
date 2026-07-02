import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { Plus, Pencil, Trash2, Star, MessageSquare, Upload, Loader2 } from 'lucide-react';
import type { Database } from '../../types/database';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

export default function AdminTestimonials() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ customer_name: '', rating: 5, review_text: '', customer_photo: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin');
    });
  }, [navigate]);

  const fetch = async () => {
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ customer_name: '', rating: 5, review_text: '', customer_photo: '' });
    setPhotoFile(null);
    setPhotoPreview('');
    setModalOpen(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({
      customer_name: item.customer_name,
      rating: item.rating,
      review_text: item.review_text,
      customer_photo: item.customer_photo || '',
    });
    setPhotoFile(null);
    setPhotoPreview(item.customer_photo || '');
    setModalOpen(true);
  };

  const uploadToStorage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const filename = `photo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const { data, error } = await supabase.storage
      .from('Results')
      .upload(filename, file, { upsert: false });
    if (error) throw error;
    const { data: publicData } = supabase.storage
      .from('Results')
      .getPublicUrl(data.path);
    return publicData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    let customerPhoto = form.customer_photo;

    try {
      if (photoFile) {
        customerPhoto = await uploadToStorage(photoFile);
      }

      const payload = {
        customer_name: form.customer_name,
        rating: form.rating,
        review_text: form.review_text,
        customer_photo: customerPhoto || null,
      };
      if (editing) {
        await supabase.from('testimonials').update(payload).eq('id', editing.id);
      } else {
        await supabase.from('testimonials').insert(payload);
      }
      setModalOpen(false);
      fetch();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
    if (file) setPhotoPreview(URL.createObjectURL(file));
    else if (editing) setPhotoPreview(form.customer_photo);
    else setPhotoPreview('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    fetch();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-sm text-white/50">Manage customer reviews.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-glass h-24 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="card-glass p-12 text-center">
          <MessageSquare size={32} className="text-white/30 mx-auto mb-3" />
          <p className="text-sm text-white/40">No testimonials yet. Add your first review.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <div key={t.id} className="card-glass p-5 flex items-start gap-4 hover:shadow-md transition-all">
              {t.customer_photo ? (
                <img src={t.customer_photo} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-mint font-semibold text-sm shrink-0">
                  {t.customer_name[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{t.customer_name}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{t.review_text}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(t)} className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-white/60 transition-colors"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-dark-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Customer Name</label>
                <input required value={form.customer_name} onChange={(e) => setForm({ ...form, customer_name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Rating (1-5)</label>
                <input type="number" min={1} max={5} required value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Review Text</label>
                <textarea required rows={3} value={form.review_text} onChange={(e) => setForm({ ...form, review_text: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint resize-none placeholder-white/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Customer Photo</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFile}
                    className="hidden"
                    id="photo-input"
                  />
                  <label
                    htmlFor="photo-input"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white cursor-pointer hover:bg-dark-600 transition-colors"
                  >
                    <Upload size={16} />
                    {photoFile ? photoFile.name : 'Choose Photo'}
                  </label>
                </div>
                {photoPreview && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-white/10 h-32">
                    <img
                      src={photoPreview}
                      alt="Photo preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setModalOpen(false)} disabled={uploading} className="flex-1 px-4 py-2.5 rounded-xl bg-dark-700 text-sm font-medium text-white/70 hover:bg-dark-600 transition-colors">Cancel</button>
                <button type="submit" disabled={uploading} className="flex-1 px-4 py-2.5 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2">
                  {uploading && <Loader2 size={14} className="animate-spin" />}
                  {uploading ? 'Uploading...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
