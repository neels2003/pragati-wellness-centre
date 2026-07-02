import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    logo: '',
    hero_image: '',
    phone: '',
    email: '',
    address: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    whatsapp_number: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin');
    });
  }, [navigate]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('settings').select('*').limit(1).maybeSingle();
      if (data) {
        setId(data.id);
        setForm({
          logo: data.logo || '',
          hero_image: data.hero_image || '',
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          facebook_url: data.facebook_url || '',
          instagram_url: data.instagram_url || '',
          twitter_url: data.twitter_url || '',
          whatsapp_number: data.whatsapp_number || '',
        });
      }
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (id) {
      await supabase.from('settings').update(form).eq('id', id);
    } else {
      await supabase.from('settings').insert(form);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-white/50">Update site configuration.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-glass p-6 max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon size={18} className="text-mint" />
          <h2 className="text-base font-semibold text-white">General Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Logo URL</label>
            <input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Hero Image URL</label>
            <input value={form.hero_image} onChange={(e) => setForm({ ...form, hero_image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Phone Number</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="+91 98765 43210" />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="contact@pragatiwellness.com" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-white/50 mb-1 block">Address</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint resize-none placeholder-white/30" placeholder="Full address" />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Facebook URL</label>
            <input value={form.facebook_url} onChange={(e) => setForm({ ...form, facebook_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Instagram URL</label>
            <input value={form.instagram_url} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">Twitter URL</label>
            <input value={form.twitter_url} onChange={(e) => setForm({ ...form, twitter_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="https://twitter.com/..." />
          </div>
          <div>
            <label className="text-xs font-medium text-white/50 mb-1 block">WhatsApp Number</label>
            <input value={form.whatsapp_number} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint placeholder-white/30" placeholder="919876543210" />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors disabled:opacity-50">
            <Save size={14} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && <span className="text-sm text-mint">Saved successfully!</span>}
        </div>
      </form>
    </AdminLayout>
  );
}
