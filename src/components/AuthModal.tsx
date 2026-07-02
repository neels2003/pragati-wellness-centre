import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Shield, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      onClose();
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      setSuccess('Account created! Please check your email to confirm.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-dark-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl shadow-black/50 border border-white/10 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center mb-4">
            <Shield size={24} className="text-mint" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {tab === 'login' ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-sm text-white/40 mt-1">Pragati Wellness Centre</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-dark-700 rounded-xl p-1">
          <button
            onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'login' ? 'bg-dark-600 text-white' : 'text-white/50 hover:text-white/70'
            }`}
          >
            <LogIn size={14} /> Sign In
          </button>
          <button
            onClick={() => { setTab('signup'); setError(''); setSuccess(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === 'signup' ? 'bg-dark-600 text-white' : 'text-white/50 hover:text-white/70'
            }`}
          >
            <UserPlus size={14} /> Sign Up
          </button>
        </div>

        {success ? (
          <div className="text-center py-4">
            <p className="text-sm text-mint">{success}</p>
          </div>
        ) : (
          <form onSubmit={tab === 'login' ? handleLogin : handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-white/50 mb-1 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint transition-colors placeholder-white/30"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50 mb-1 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint transition-colors placeholder-white/30"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors disabled:opacity-50"
            >
              {loading ? (tab === 'login' ? 'Signing in...' : 'Creating...') : (tab === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
