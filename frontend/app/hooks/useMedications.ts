"use client";

import { useState, useEffect, useCallback } from 'react';
import { Medication } from '@/app/types';
import { getMedications, deleteMedication } from '../lib/api';

export function useMedications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMedications();
      setMedications(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedications();
  }, [fetchMedications]);

  const handleDeleteMedication = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this medication? This cannot be undone.')) {
      return;
    }
    try {
      await deleteMedication(id);
      await fetchMedications();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return { medications, loading, error, handleDeleteMedication };
}
