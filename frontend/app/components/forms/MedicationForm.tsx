"use client";

import Link from 'next/link';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';

interface MedicationFormProps {
  name: string;
  dosage: string;
  frequency: string;
  onNameChange: (value: string) => void;
  onDosageChange: (value: string) => void;
  onFrequencyChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  title: string;
  submitButtonText: string;
}

export default function MedicationForm({
  name,
  dosage,
  frequency,
  onNameChange,
  onDosageChange,
  onFrequencyChange,
  onSubmit,
  isLoading,
  error,
  title,
  submitButtonText,
}: MedicationFormProps) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            id="name"
            label="Medication Name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., Paracetamol 1000mg"
            required
          />

          <Input
            id="dosage"
            label="Dosage"
            type="text"
            value={dosage}
            onChange={(e) => onDosageChange(e.target.value)}
            placeholder="e.g., 1 tablet"
            required
          />

          <Input
            id="frequency"
            label="Frequency"
            type="text"
            value={frequency}
            onChange={(e) => onFrequencyChange(e.target.value)}
            placeholder="e.g., Every 8 hours as needed"
            required
          />
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">&larr; Back to Dashboard</Link>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}