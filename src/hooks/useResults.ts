import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Result = Database['public']['Tables']['results']['Row'];

export function useResults(limit?: number) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    let query = supabase.from('results').select('*').order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (!error) setResults(data || []);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { results, loading, refetch: fetch };
}
