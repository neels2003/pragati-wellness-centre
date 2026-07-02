import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { Plus, Pencil, Trash2, ListVideo, GripVertical } from 'lucide-react';
import type { Database } from '../../types/database';

type Course = Database['public']['Tables']['courses']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];

export default function AdminLessons() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Lesson | null>(null);
  const [form, setForm] = useState({ course_id: '', title: '', video_url: '', pdf_url: '', order_index: 0 });


  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin');
    });
  }, [navigate]);

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').order('title');
    setCourses(data || []);
  };

  const fetchLessons = async (courseId?: string) => {
    let q = supabase.from('lessons').select('*').order('order_index', { ascending: true });
    if (courseId) q = q.eq('course_id', courseId);
    const { data } = await q;
    setLessons(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    fetchLessons();
  }, []);

  useEffect(() => {
    fetchLessons(selectedCourse || undefined);
  }, [selectedCourse]);

  const openAdd = () => {
    setEditing(null);
    setForm({ course_id: selectedCourse || courses[0]?.id || '', title: '', video_url: '', pdf_url: '', order_index: 0 });
    setModalOpen(true);
  };

  const openEdit = (lesson: Lesson) => {
    setEditing(lesson);
    setForm({
      course_id: lesson.course_id,
      title: lesson.title,
      video_url: lesson.video_url || '',
      pdf_url: lesson.pdf_url || '',
      order_index: lesson.order_index,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      course_id: form.course_id,
      title: form.title,
      video_url: form.video_url || null,
      pdf_url: form.pdf_url || null,
      order_index: form.order_index,
    };
    if (editing) {
      await supabase.from('lessons').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('lessons').insert(payload);
    }
    setModalOpen(false);
    fetchLessons(selectedCourse || undefined);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lesson?')) return;
    await supabase.from('lessons').delete().eq('id', id);
    fetchLessons(selectedCourse || undefined);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Lessons</h1>
          <p className="text-sm text-white/50">Manage lessons for each course.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint"
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors"
          >
            <Plus size={16} /> Add Lesson
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-glass h-16 animate-pulse" />
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <div className="card-glass p-12 text-center">
          <ListVideo size={32} className="text-white/30 mx-auto mb-3" />
          <p className="text-sm text-white/40">No lessons yet. Add your first lesson.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lessons.map((l) => (
            <div key={l.id} className="card-glass p-4 flex items-center gap-4 hover:shadow-md transition-all">
              <div className="text-white/30">
                <GripVertical size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{l.title}</h3>
                <p className="text-xs text-white/40 mt-0.5">
                  {courses.find((c) => c.id === l.course_id)?.title || 'Unknown Course'} · Order {l.order_index}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(l)} className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 text-white/60 transition-colors">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(l.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-dark-800 rounded-2xl w-full max-w-md p-6 shadow-xl border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-4">{editing ? 'Edit Lesson' : 'Add Lesson'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Course</label>
                <select
                  required
                  value={form.course_id}
                  onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint"
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Title</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Video URL</label>
                <input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://youtube.com/... or video file URL" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">PDF Notes URL</label>
                <input value={form.pdf_url} onChange={(e) => setForm({ ...form, pdf_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://... (optional)" />
              </div>
              <div>
                <label className="text-xs font-medium text-white/50 mb-1 block">Order</label>
                <input type="number" value={form.order_index} onChange={(e) => setForm({ ...form, order_index: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" />
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
