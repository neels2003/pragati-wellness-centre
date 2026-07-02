import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Lesson = Database['public']['Tables']['lessons']['Row'];

export function useLessons(courseId?: string) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    let query = supabase.from('lessons').select('*').order('order_index', { ascending: true });
    if (courseId) query = query.eq('course_id', courseId);
    const { data, error } = await query;
    if (!error) setLessons(data || []);
    setLoading(false);
  }, [courseId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { lessons, loading, refetch: fetch };
}
