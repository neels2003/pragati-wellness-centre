import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUser({
        id: data.session.user.id,
        email: data.session.user.email || '',
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSession();
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => listener.subscription.unsubscribe();
  }, [fetchSession]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, loading, signOut };
}
