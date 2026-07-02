import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Settings = Database['public']['Tables']['settings']['Row'];

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!error) setSettings(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { settings, loading, refetch: fetch };
}
