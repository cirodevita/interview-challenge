"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { API_URL } from './lib/constants';

interface Assignment {
  id: number;
  startDate: string;
  numberOfDays: number;
  remainingDays: number;
  medication: Medication;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  assignments: Assignment[];
}

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/patients`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Patient[] = await response.json();
        setPatients(data);
        setError(null);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch patients.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getRemainingDaysColor = (days: number) => {
    if (days === 0) return 'text-gray-500 bg-gray-100';
    if (days <= 7) return 'text-red-800 bg-red-100';
    return 'text-green-800 bg-green-100';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Dashboard</title>
      </Head>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Dashboard
          </h1>
          <div className="flex space-x-2">
            <Link href="/patients/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
              + Add Patient
            </Link>
            <Link href="/medications/new" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors">
              + Add Medication
            </Link>
            <Link href="/assignments/new" className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition-colors">
              + Assign Treatment
            </Link>
          </div>
        </div>

        {loading && <p className="text-center text-gray-500">Loading patients...</p>}
        {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        
        {!loading && !error && (
          <div className="space-y-8">
            {patients.length > 0 ? (
              patients.map((patient) => {
                const activeTreatments = patient.assignments.filter(a => a.remainingDays > 0);
                const completedTreatments = patient.assignments.filter(a => a.remainingDays === 0);

                return (
                  <div key={patient.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">{patient.name}</h2>
                          <p className="text-sm text-gray-600">
                            Date of Birth: {formatDate(patient.dateOfBirth)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          Active Treatments
                        </h3>
                        {activeTreatments.length > 0 ? (
                          <ul className="space-y-3">
                            {activeTreatments.map((assignment) => (
                              <li key={assignment.id} className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                  <p className="font-bold text-gray-800">{assignment.medication.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {assignment.medication.dosage} - {assignment.medication.frequency}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Started on: {formatDate(assignment.startDate)} &bull; Duration: {assignment.numberOfDays} days
                                  </p>
                                </div>
                                <div className={`mt-3 sm:mt-0 px-3 py-1 rounded-full text-sm font-semibold ${getRemainingDaysColor(assignment.remainingDays)}`}>
                                  {assignment.remainingDays} days left
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 italic">No active treatments.</p>
                        )}
                      </div>

                      {completedTreatments.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium text-gray-700 mb-2">
                            Completed Treatments
                          </h3>
                          <ul className="space-y-3">
                            {completedTreatments.map((assignment) => (
                              <li key={assignment.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center opacity-70">
                                <div>
                                  <p className="font-semibold text-gray-600">{assignment.medication.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Started on: {formatDate(assignment.startDate)} &bull; Duration: {assignment.numberOfDays} days
                                  </p>
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                  Finished
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-medium text-gray-700">No Patients Found</h2>
                <p className="text-gray-500 mt-2">Start by adding a new patient.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
