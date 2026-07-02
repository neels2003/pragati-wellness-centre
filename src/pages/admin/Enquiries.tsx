import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminLayout from './AdminLayout';
import { Mail, CheckCircle, Circle, Trash2 } from 'lucide-react';
import type { Database } from '../../types/database';

type Enquiry = Database['public']['Tables']['contact_enquiries']['Row'];

export default function AdminEnquiries() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/admin');
    });
  }, [navigate]);

  const fetch = async () => {
    const { data } = await supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false });
    setEnquiries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from('contact_enquiries').update({ read_status: !current }).eq('id', id);
    fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return;
    await supabase.from('contact_enquiries').delete().eq('id', id);
    fetch();
  };

  const unreadCount = enquiries.filter((e) => !e.read_status).length;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Contact Enquiries</h1>
        <p className="text-sm text-white/50">
          {unreadCount > 0 ? `${unreadCount} unread enquiry${unreadCount > 1 ? 'ies' : ''}` : 'All enquiries reviewed'}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-glass h-24 animate-pulse" />
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="card-glass p-12 text-center">
          <Mail size={32} className="text-white/30 mx-auto mb-3" />
          <p className="text-sm text-white/40">No enquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e) => (
            <div key={e.id} className={`card-glass p-5 hover:shadow-md transition-all ${!e.read_status ? 'border-l-4 border-l-mint' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">{e.name}</p>
                    {!e.read_status && (
                      <span className="text-xs bg-dark-700 text-mint px-2 py-0.5 rounded font-medium">New</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-2">
                    {e.phone && <span>{e.phone}</span>}
                    {e.email && <span>{e.email}</span>}
                    <span>{new Date(e.created_at || '').toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">{e.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleRead(e.id, e.read_status)}
                    className={`p-2 rounded-lg transition-colors ${e.read_status ? 'bg-dark-700 hover:bg-dark-600 text-white/40' : 'bg-dark-700 hover:bg-dark-600 text-mint'}`}
                    title={e.read_status ? 'Mark as unread' : 'Mark as read'}
                  >
                    {e.read_status ? <CheckCircle size={14} /> : <Circle size={14} />}
                  </button>
                  <button onClick={() => handleDelete(e.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
