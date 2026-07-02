import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import type { Database } from '../../types/database';

type Course = Database['public']['Tables']['courses']['Row'];

export default function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({ title: '', description: '', thumbnail: '', instructor_name: '' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin');
    });
  }, [navigate]);

  const fetch = async () => {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    setCourses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', description: '', thumbnail: '', instructor_name: '' });
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditing(course);
    setForm({
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail || '',
      instructor_name: course.instructor_name || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await supabase.from('courses').update(form).eq('id', editing.id);
    } else {
      await supabase.from('courses').insert(form);
    }
    setModalOpen(false);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this course?')) return;
    await supabase.from('courses').delete().eq('id', id);
    fetch();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Courses</h1>
          <p className="text-sm text-white/50">Manage wellness courses.</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-700 text-white text-sm font-medium hover:bg-brand-800 transition-colors"
        >
          <Plus size={16} /> Add Course
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-glass h-48 animate-pulse" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="card-glass p-12 text-center">
          <BookOpen size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-white/40">No courses yet. Add your first course.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="card-glass overflow-hidden hover:shadow-md transition-all">
              <div className="h-36 bg-dark-700 relative">
                {c.thumbnail ? (
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={24} className="text-white/30" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-sm font-semibold text-white mb-1">{c.title}</h3>
                <p className="text-xs text-white/50 line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-white/60 transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
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
          <div className="bg-dark-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">{editing ? 'Edit Course' : 'Add Course'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint resize-none placeholder-white/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Thumbnail URL</label>
                <input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Instructor Name</label>
                <input value={form.instructor_name} onChange={(e) => setForm({ ...form, instructor_name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-dark-700 text-sm font-medium text-white/70 hover:bg-dark-600 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
