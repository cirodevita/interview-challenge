"use client";

import Head from 'next/head';
import Link from 'next/link';
import { usePatients } from '../hooks/usePatients';
import Button from './ui/Button';
import PatientCard from './PatientCard';

export default function Dashboard() {
  const { patients, loading, error, handleDeleteTreatment } = usePatients();

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
            <Link href="/pages/patients/new">
              <Button>+ Add Patient</Button>
            </Link>
            <Link href="/pages/medications/new">
              <Button>
                + Add Medication
              </Button>
            </Link>
            <Link href="/pages/assignments/new">
              <Button>
                + Assign Treatment
              </Button>
            </Link>
          </div>
        </div>

        {loading && <p className="text-center text-gray-500">Loading patients...</p>}
        {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
        
        {!loading && !error && (
          <div className="space-y-8">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <PatientCard
                  key={patient.id} 
                  patient={patient} 
                  onDeleteTreatment={handleDeleteTreatment}
                />
              ))
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
