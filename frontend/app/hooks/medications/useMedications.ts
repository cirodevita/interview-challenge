"use client";

import { useState, useEffect, useCallback } from 'react';
import { Medication } from '@/app/types';
import { getMedications, deleteMedication } from '@/app/lib/api/medications';

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
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
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
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
    }
  };

  return {
    medications,
    loading,
    error,
    handleDeleteMedication
  };
}