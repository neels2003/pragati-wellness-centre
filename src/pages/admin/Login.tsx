import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-6">
      <div className="w-full max-w-sm bg-dark-800 rounded-2xl shadow-xl shadow-black/40 border border-white/10 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center mb-4">
            <Shield size={24} className="text-mint" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-white/40 mt-1">Pragati Wellness Centre</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint transition-colors placeholder-white/30"
              placeholder="admin@example.com"
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
              placeholder="Password"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-3 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
