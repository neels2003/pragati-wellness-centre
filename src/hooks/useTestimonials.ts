import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

export function useTestimonials(limit?: number) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    let query = supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (!error) setTestimonials(data || []);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { testimonials, loading, refetch: fetch };
}
