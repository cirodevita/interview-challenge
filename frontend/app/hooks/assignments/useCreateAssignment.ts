"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPatients } from '@/app/lib/api/patients';
import { getMedications } from '@/app/lib/api/medications';
import { createAssignment } from '@/app/lib/api/assignments';
import { Patient, Medication } from '@/app/types';

export function useCreateAssignment() {
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [allMedications, setAllMedications] = useState<Medication[]>([]);
  const [availableMedications, setAvailableMedications] = useState<Medication[]>([]);
  
  const [patientId, setPatientId] = useState('');
  const [medicationId, setMedicationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [patientsData, medicationsData] = await Promise.all([
          getPatients(),
          getMedications(),
        ]);
        setAllPatients(patientsData);
        setAllMedications(medicationsData);
        setAvailableMedications(medicationsData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!patientId) {
      setAvailableMedications(allMedications);
      return;
    }
    const selectedPatient = allPatients.find(p => p.id === parseInt(patientId));
    if (!selectedPatient) return;

    const activeMedicationIds = selectedPatient.assignments
      .filter(a => a.remainingDays > 0)
      .map(a => a.medication.id);

    const filteredMedications = allMedications.filter(m => !activeMedicationIds.includes(m.id));
    setAvailableMedications(filteredMedications);
    setMedicationId('');
  }, [patientId, allPatients, allMedications]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !medicationId || !startDate || !numberOfDays) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await createAssignment({ 
        patientId: parseInt(patientId), 
        medicationId: parseInt(medicationId), 
        startDate, 
        numberOfDays: parseInt(numberOfDays) 
      });
      router.push('/');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    allPatients,
    availableMedications,
    patientId,
    medicationId,
    startDate,
    numberOfDays,
    loading,
    error,
    setPatientId,
    setMedicationId,
    setStartDate,
    setNumberOfDays,
    handleSubmit,
  };
}
