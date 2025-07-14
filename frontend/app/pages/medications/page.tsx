"use client";

import Head from 'next/head';
import Link from 'next/link';
import { useMedications } from '@/app/hooks/useMedications';
import Button from '@/app/components/ui/Button';

export default function MedicationsPage() {
  const { medications, loading, error, handleDeleteMedication } = useMedications();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title> Medications</title>
      </Head>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Medications
          </h1>
          <Link href="/pages/medications/new">
            <Button>
              + Add New Medication
            </Button>
          </Link>
        </div>

        {loading && <p className="text-center text-gray-500">Loading medications...</p>}
        {error && <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medications.map((med) => (
                  <tr key={med.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.dosage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.frequency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <Link href={`/pages/medications/edit/${med.id}`}>
                        <Button variant="secondary">
                          Edit
                        </Button>
                      </Link>
                      <Button variant="danger" onClick={() => handleDeleteMedication(med.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">&larr; Back to Dashboard</Link>
        </div>
      </main>
    </div>
  );
}