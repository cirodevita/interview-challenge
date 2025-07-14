"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMedication } from '@/app/lib/api/medications';

export function useCreateMedication() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || !dosage || !frequency) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      await createMedication({ name, dosage, frequency });
      router.push('/medications');
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('An unknown error occurred.');
        }
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    dosage,
    frequency,
    loading,
    error,
    setName,
    setDosage,
    setFrequency,
    handleSubmit,
  };
}
