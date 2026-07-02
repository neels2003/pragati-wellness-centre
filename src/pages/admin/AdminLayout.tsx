import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  LayoutDashboard,
  BookOpen,
  ListVideo,
  Trophy,
  MessageSquare,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/courses', label: 'Courses', icon: BookOpen },
  { path: '/admin/lessons', label: 'Lessons', icon: ListVideo },
  { path: '/admin/results', label: 'Results', icon: Trophy },
  { path: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { path: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate('/admin');
      } else {
        setUserEmail(data.session.user.email || '');
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate('/admin');
    });
    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex bg-dark-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-800 border-r border-white/10 transform transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 px-6 h-16 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-dark-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-white">Admin Panel</span>
        </div>
        <nav className="px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-dark-700 text-mint' : 'text-white/60 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-white/40 truncate max-w-[140px]">{userEmail}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 bg-dark-800/90 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6">
          <button className="md:hidden p-2 text-white/60" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-1 text-sm text-white/40">
            <span className="font-medium text-white">Admin</span>
            <ChevronRight size={14} />
            <span>{navItems.find((n) => n.path === location.pathname)?.label || 'Dashboard'}</span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
