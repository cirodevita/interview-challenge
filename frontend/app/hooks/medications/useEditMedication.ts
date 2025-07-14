"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getMedicationById, updateMedication } from '@/app/lib/api/medications';

export function useEditMedication() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMedication = async () => {
      try {
        setLoading(true);
        const medicationData = await getMedicationById(id);

        setName(medicationData.name);
        setDosage(medicationData.dosage);
        setFrequency(medicationData.frequency);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await updateMedication(id, { name, dosage, frequency });
      router.push('/pages/medications');
    } catch (e: any) {
      setError(e.message);
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
    handleSubmit 
  };
}