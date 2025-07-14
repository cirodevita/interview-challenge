"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAssignmentById, updateAssignment } from '@/app/lib/api';

export function useEditAssignment() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [patientName, setPatientName] = useState('Loading...');
  const [medicationName, setMedicationName] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const assignmentData = await getAssignmentById(id);
        setPatientName(assignmentData.patient.name);
        setMedicationName(assignmentData.medication.name);
        setStartDate(new Date(assignmentData.startDate).toISOString().split('T')[0]);
        setNumberOfDays(String(assignmentData.numberOfDays));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateAssignment(id, {
        startDate,
        numberOfDays: parseInt(numberOfDays),
      });
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    startDate,
    numberOfDays,
    patientName,
    medicationName,
    loading,
    error,
    setStartDate,
    setNumberOfDays,
    handleSubmit,
  };
}
