import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/programs', label: 'Programs' },
  { path: '/courses', label: 'Courses' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
<nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? 'bg-dark-800/90 backdrop-blur-xl shadow-xl shadow-black/30'
      : 'bg-transparent'
  }`}
>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo + Sign In/Profile */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-dark-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-wide leading-none">
                  PRAGATI <span className="text-mint font-normal">Wellness</span>
                </span>
                <span className="text-[10px] text-white/40 leading-tight mt-0.5 hidden sm:block">
                  A premium yoga, wellness, and fitness centre
                </span>
              </div>
            </Link>

            {/* Sign In / Profile */}
            {/* {!user ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="ml-2 px-4 py-1.5 rounded-full text-sm font-medium border border-mint/40 text-white hover:bg-mint/10 transition-all duration-300"
              >
                Sign In
              </button>
            ) : (
              <div className="relative ml-2">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border border-mint/40 text-white hover:bg-mint/10 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center">
                    <User size={14} className="text-dark-900" />
                  </div>
                  <span className="hidden sm:block text-xs truncate max-w-[100px]">{user.email?.split('@')[0]}</span>
                </button>
                {profileOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-dark-800 rounded-xl border border-white/10 shadow-xl shadow-black/40 py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs text-white/40">Signed in as</p>
                      <p className="text-sm text-white truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-mint hover:bg-white/5 transition-colors"
                    >
                      <ArrowRight size={14} /> Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div> */}
            {/* )} */}
          </div>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-pill ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
  {!user ? (
    <button
      onClick={() => setAuthOpen(true)}
      className="inline-flex items-center justify-center whitespace-nowrap min-w-[78px] px-3 py-2 rounded-full text-sm font-medium border border-mint/40 text-white hover:bg-mint/10 transition-all duration-300">
      Sign In
    </button>
  ) : (
    <div className="relative">
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border border-mint/40 text-white hover:bg-mint/10 transition-all duration-300"
      >
        <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center">
          <User size={14} className="text-dark-900" />
        </div>

        <span className="hidden sm:block text-xs truncate max-w-[100px]">
          {user.email?.split("@")[0]}
        </span>
      </button>

      {profileOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-dark-800 rounded-xl border border-white/10 shadow-xl shadow-black/40 py-2 z-50">
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-xs text-white/40">Signed in as</p>
            <p className="text-sm text-white truncate">{user.email}</p>
          </div>

          <Link
            to="/admin/dashboard"
            onClick={() => setProfileOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-mint hover:bg-white/5"
          >
            <ArrowRight size={14} />
            Admin Dashboard
          </Link>

          <button
            onClick={() => {
              signOut();
              setProfileOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )}
</div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/80"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-dark-800 border-t border-white/10">
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-mint text-dark-900'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-mint/40 text-white hover:bg-mint/10 transition-all"
              >
                Enquire/Join Now <ArrowRight size={14} className="text-mint" />
              </Link>
              {/* {!user && (
                <button
                  onClick={() => { setMobileOpen(false); setAuthOpen(true); }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-mint/40 text-white hover:bg-mint/10 transition-all"
                >
                  Sign In
                </button> */}
              {/* )} */}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Profile dropdown click outside handler */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </>
  );
}
