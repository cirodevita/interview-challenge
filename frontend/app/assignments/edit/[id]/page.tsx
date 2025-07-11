"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { API_URL } from '@/app/lib/constants';

export default function EditAssignmentPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [startDate, setStartDate] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  
  const [patientName, setPatientName] = useState('Loading...');
  const [medicationName, setMedicationName] = useState('Loading...');
  
  const [patientId, setPatientId] = useState('');
  const [medicationId, setMedicationId] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/assignments/${id}`);

        if (!response.ok) {
          throw new Error('Failed to load assignment data.');
        }

        const assignmentData = await response.json();
        
        setPatientId(assignmentData.patient.id);
        setPatientName(assignmentData.patient.name);
        setMedicationId(assignmentData.medication.id);
        setMedicationName(assignmentData.medication.name);
        setStartDate(new Date(assignmentData.startDate).toISOString().split('T')[0]);
        setNumberOfDays(assignmentData.numberOfDays);
        
        setError(null);
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
      const response = await fetch(`${API_URL}/assignments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            startDate,
            numberOfDays: parseInt(numberOfDays)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
        throw new Error(message || 'Failed to update assignment.');
      }

      router.push('/');

    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !patientId) return <p className="text-center p-8">Loading form...</p>;
  if (error) return <p className="text-center text-red-500 p-8">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <Head>
        <title>Edit Treatment</title>
      </Head>

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Treatment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient</label>
            <input
              type="text"
              id="patientName"
              value={patientName}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 focus:outline-none"
              disabled
            />
          </div>
          <div>
            <label htmlFor="medicationName" className="block text-sm font-medium text-gray-700">Medication</label>
            <input
              type="text"
              id="medicationName"
              value={medicationName}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 focus:outline-none"
              disabled
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900" required />
          </div>
          <div>
            <label htmlFor="numberOfDays" className="block text-sm font-medium text-gray-700">Duration (in days)</label>
            <input type="number" name="numberOfDays" value={numberOfDays} onChange={(e) => setNumberOfDays(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900" min="1" required />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">&larr; Back to Dashboard</Link>
            <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
