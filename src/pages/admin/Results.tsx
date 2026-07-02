import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { Plus, Pencil, Trash2, Trophy, Upload, Loader2 } from 'lucide-react';
import type { Database } from '../../types/database';

type Result = Database['public']['Tables']['results']['Row'];

export default function AdminResults() {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Result | null>(null);
  const [form, setForm] = useState({
    before_image: '',
    after_image: '',
    client_name: '',
    weight_lost: '',
    duration: '',
    transformation_type: 'loss',
  });
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string>('');
  const [afterPreview, setAfterPreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin');
    });
  }, [navigate]);

  const fetch = async () => {
    const { data } = await supabase
      .from('results')
      .select('*')
      .order('created_at', { ascending: false });
    setResults(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      before_image: '',
      after_image: '',
      client_name: '',
      weight_lost: '',
      duration: '',
      transformation_type: 'loss',
    });
    setBeforeFile(null);
    setAfterFile(null);
    setBeforePreview('');
    setAfterPreview('');
    setModalOpen(true);
  };

  const openEdit = (item: Result) => {
    setEditing(item);
    setForm({
      before_image: item.before_image || '',
      after_image: item.after_image || '',
      client_name: item.client_name,
      weight_lost: item.weight_lost || '',
      duration: item.duration || '',
      transformation_type: (item as any).transformation_type || 'loss',
    });
    setBeforeFile(null);
    setAfterFile(null);
    setBeforePreview(item.before_image || '');
    setAfterPreview(item.after_image || '');
    setModalOpen(true);
  };

  const uploadToStorage = async (
    file: File,
    folder: 'before' | 'after'
  ): Promise<string> => {
    const ext = file.name.split('.').pop();
    const filename = `${folder}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const { data, error } = await supabase.storage
      .from('Results')
      .upload(filename, file, { upsert: false });
      console.log("UPLOAD DATA", data);
console.log("UPLOAD ERROR", error);
      if (error) {
        console.error(error);
        alert(error.message);
        throw error;
      }
    const { data: publicData } = supabase.storage
      .from('Results')
      .getPublicUrl(data.path);
    return publicData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {

    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    console.log("SESSION =", session);
    e.preventDefault();
    setUploading(true);
    let beforeImage = form.before_image;
    let afterImage = form.after_image;

    try {
      if (beforeFile) {
        beforeImage = await uploadToStorage(beforeFile, 'before');
      }
      if (afterFile) {
        afterImage = await uploadToStorage(afterFile, 'after');
      }

      const payload = {
        before_image: beforeImage || null,
        after_image: afterImage || null,
        client_name: form.client_name,
        weight_lost: form.weight_lost || null,
        duration: form.duration || null,
        transformation_type: form.transformation_type,
      };

      if (editing) {
        await supabase.from('results').update(payload).eq('id', editing.id);
      } else {
        await supabase.from('results').insert(payload);
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

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this result?')) return;
    await supabase.from('results').delete().eq('id', id);
    fetch();
  };

  const handleBeforeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBeforeFile(file);
    if (file) setBeforePreview(URL.createObjectURL(file));
    else if (editing) setBeforePreview(form.before_image);
    else setBeforePreview('');
  };

  const handleAfterFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAfterFile(file);
    if (file) setAfterPreview(URL.createObjectURL(file));
    else if (editing) setAfterPreview(form.after_image);
    else setAfterPreview('');
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Results</h1>
          <p className="text-sm text-white/50">
            Manage transformation results.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors"
        >
          <Plus size={16} /> Add Result
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-glass h-48 animate-pulse" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="card-glass p-12 text-center">
          <Trophy size={32} className="text-white/30 mx-auto mb-3" />
          <p className="text-sm text-white/40">
            No results yet. Add your first transformation.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {results.map((r) => (
            <div
              key={r.id}
              className="card-glass overflow-hidden hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-2 h-56 overflow-hidden flex-shrink-0">
                <div className="relative bg-dark-700">
                  {r.before_image ? (
                    <img
                      src={r.before_image}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                      Before
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-dark-900/90 px-2 py-0.5 rounded text-xs font-medium text-white/70">
                    Before
                  </span>
                </div>
                <div className="relative bg-dark-700">
                  {r.after_image ? (
                    <img
                      src={r.after_image}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-white/40">
                      After
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2 bg-mint/90 px-2 py-0.5 rounded text-xs font-medium text-dark-900">
                    After
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-white mb-1">
                  {r.client_name}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  {(r as any).transformation_type && (
                    <span className="text-xs bg-dark-700 text-mint px-2 py-0.5 rounded font-medium">
                      {(r as any).transformation_type === 'gain' ? 'Weight Gain' : 'Weight Loss'}
                    </span>
                  )}
                  {r.weight_lost && (
                    <span className="text-xs bg-dark-700 text-white/70 px-2 py-0.5 rounded font-medium">
                      {r.weight_lost}
                    </span>
                  )}
                  {r.duration && (
                    <span className="text-xs text-white/40">
                      {r.duration}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(r)}
                    className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-white/60 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-dark-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-white mb-4">
              {editing ? 'Edit Result' : 'Add Result'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">
                  Client Name
                </label>
                <input
                  required
                  value={form.client_name}
                  onChange={(e) =>
                    setForm({ ...form, client_name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30"
                />
              </div>

              {/* Before Image Upload */}
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">
                  Before Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBeforeFile}
                    className="hidden"
                    id="before-input"
                  />
                  <label
                    htmlFor="before-input"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white cursor-pointer hover:bg-dark-600 transition-colors"
                  >
                    <Upload size={16} />
                    {beforeFile ? beforeFile.name : 'Choose Before Image'}
                  </label>
                </div>
                {beforePreview && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-white/10 h-32">
                    <img
                      src={beforePreview}
                      alt="Before preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* After Image Upload */}
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">
                  After Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAfterFile}
                    className="hidden"
                    id="after-input"
                  />
                  <label
                    htmlFor="after-input"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white cursor-pointer hover:bg-dark-600 transition-colors"
                  >
                    <Upload size={16} />
                    {afterFile ? afterFile.name : 'Choose After Image'}
                  </label>
                </div>
                {afterPreview && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-white/10 h-32">
                    <img
                      src={afterPreview}
                      alt="After preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">
                  Transformation Type
                </label>
                <select
                  value={form.transformation_type}
                  onChange={(e) =>
                    setForm({ ...form, transformation_type: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint"
                >
                  <option value="loss">Weight Loss</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">
                  Weight Lost
                </label>
                <input
                  value={form.weight_lost}
                  onChange={(e) =>
                    setForm({ ...form, weight_lost: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30"
                  placeholder="e.g., 12 kg"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">
                  Duration
                </label>
                <input
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30"
                  placeholder="e.g., 3 months"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={uploading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-dark-700 text-sm font-medium text-white/70 hover:bg-dark-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {uploading && (
                    <Loader2 size={14} className="animate-spin" />
                  )}
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
