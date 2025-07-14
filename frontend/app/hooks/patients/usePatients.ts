"use client";

import { useState, useEffect, useCallback } from 'react';
import { Patient } from '@/app/types';
import { getPatients } from '@/app/lib/api/patients';
import { deleteAssignment } from '@/app/lib/api/assignments';

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
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
    fetchPatients();
  }, [fetchPatients]);

  const handleDeleteTreatment = async (assignmentId: number) => {
    if (!window.confirm('Are you sure you want to delete this treatment?')) {
      return;
    }
    try {
      await deleteAssignment(assignmentId);
      await fetchPatients();
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
    }
  };

  return {
    patients,
    loading,
    error,
    handleDeleteTreatment
  };
}
