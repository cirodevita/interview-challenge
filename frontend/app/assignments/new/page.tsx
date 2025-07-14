"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { API_URL } from '@/app/lib/constants';

interface Assignment {
  id: number;
  remainingDays: number;
  medication: { id: number };
}

interface Patient {
  id: number;
  name: string;
  assignments: Assignment[];
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
}

export default function NewAssignmentPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  
  const [patientId, setPatientId] = useState('');
  const [medicationId, setMedicationId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');

  const [availableMedications, setAvailableMedications] = useState<Medication[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [patientsRes, medicationsRes] = await Promise.all([
          fetch(`${API_URL}/patients`),
          fetch(`${API_URL}/medications`),
        ]);

        if (!patientsRes.ok || !medicationsRes.ok) {
          throw new Error('Failed to load required data.');
        }

        const patientsData = await patientsRes.json();
        const medicationsData = await medicationsRes.json();

        setPatients(patientsData);
        setMedications(medicationsData);
        setAvailableMedications(medicationsData);
        setError(null);
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
      setAvailableMedications(medications);
      return;
    }

    const selectedPatient = patients.find(p => p.id === parseInt(patientId));
    if (!selectedPatient) return;

    const activeMedicationIds = selectedPatient.assignments
      .filter(a => a.remainingDays > 0)
      .map(a => a.medication.id);

    const filteredMedications = medications.filter(
      m => !activeMedicationIds.includes(m.id)
    );

    setAvailableMedications(filteredMedications);
    setMedicationId('');
  }, [patientId, patients, medications]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!patientId || !medicationId || !startDate || !numberOfDays) {
        setError('All fields are required.');
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(`${API_URL}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patientId: parseInt(patientId), 
          medicationId: parseInt(medicationId), 
          startDate, 
          numberOfDays: parseInt(numberOfDays) 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
        throw new Error(message || 'Failed to create assignment.');
      }

      router.push('/');

    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <Head>
        <title>Assign New Treatment</title>
      </Head>

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Assign a New Treatment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
            <select id="patient" value={patientId} onChange={(e) => setPatientId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900" required disabled={loading}>
              <option value="" disabled>Select a patient</option>
              {patients.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
          </div>

          <div>
            <label htmlFor="medication" className="block text-sm font-medium text-gray-700">Medication</label>
            <select id="medication" value={medicationId} onChange={(e) => setMedicationId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900" required disabled={loading || !patientId}>
              <option value="" disabled>Select a medication</option>
              {availableMedications.map(m => (<option key={m.id} value={m.id}>{m.name} - {m.dosage}</option>))}
            </select>
          </div>
          
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900" required />
          </div>
          <div>
            <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700">Duration (in days)</label>
            <input type="number" id="numberOfDays" value={numberOfDays} onChange={(e) => setNumberOfDays(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900" placeholder="e.g., 10" min="1" required />
          </div>
          
          {error && (<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert"><p className="font-bold">Error</p><p>{error}</p></div>)}

          <div className="flex items-center justify-between pt-2">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">&larr; Back to Dashboard</Link>
            <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300">
              {loading ? 'Saving...' : 'Assign Treatment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
