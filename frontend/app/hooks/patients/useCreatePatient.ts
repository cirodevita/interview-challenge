"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPatient } from '@/app/lib/api/patients';

export function useCreatePatient() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || !dateOfBirth) {
        setError('Name and date of birth are required.');
        setLoading(false);
        return;
    }

    try {
      await createPatient({ name, dateOfBirth });
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    dateOfBirth,
    loading,
    error,
    setName,
    setDateOfBirth,
    handleSubmit,
  };
}