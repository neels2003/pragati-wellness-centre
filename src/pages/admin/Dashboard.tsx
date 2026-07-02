import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { BookOpen, Trophy, MessageSquare, Mail, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Counts {
  courses: number;
  lessons: number;
  results: number;
  testimonials: number;
  enquiries: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Counts>({ courses: 0, lessons: 0, results: 0, testimonials: 0, enquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin');
    });
  }, [navigate]);

  useEffect(() => {
    const fetchCounts = async () => {
      const [c, l, r, t, e] = await Promise.all([
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('lessons').select('*', { count: 'exact', head: true }),
        supabase.from('results').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('contact_enquiries').select('*', { count: 'exact', head: true }),
      ]);
      setCounts({
        courses: c.count || 0,
        lessons: l.count || 0,
        results: r.count || 0,
        testimonials: t.count || 0,
        enquiries: e.count || 0,
      });
      setLoading(false);
    };
    fetchCounts();
  }, []);

  const cards = [
    { label: 'Courses', count: counts.courses, icon: BookOpen, path: '/admin/courses', color: 'bg-dark-700 text-mint' },
    { label: 'Lessons', count: counts.lessons, icon: Trophy, path: '/admin/lessons', color: 'bg-dark-700 text-mint' },
    { label: 'Results', count: counts.results, icon: Trophy, path: '/admin/results', color: 'bg-dark-700 text-mint' },
    { label: 'Testimonials', count: counts.testimonials, icon: MessageSquare, path: '/admin/testimonials', color: 'bg-dark-700 text-mint' },
    { label: 'Enquiries', count: counts.enquiries, icon: Mail, path: '/admin/enquiries', color: 'bg-dark-700 text-mint' },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/50">Overview of your wellness centre.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card-glass h-28 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              to={card.path}
              className="card-glass p-5 hover:shadow-mint/10 transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <card.icon size={18} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{card.count}</p>
              <p className="text-xs text-white/50 flex items-center gap-1 group-hover:gap-2 transition-all">
                {card.label} <ArrowRight size={12} />
              </p>
            </Link>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
