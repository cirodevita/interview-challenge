"use client";

import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import Link from 'next/link';

interface PatientFormProps {
  name: string;
  dateOfBirth: string;
  onNameChange: (value: string) => void;
  onDateOfBirthChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  title: string;
  submitButtonText: string;
}

export default function PatientForm({
  name,
  dateOfBirth,
  onNameChange,
  onDateOfBirthChange,
  onSubmit,
  isLoading,
  error,
  title,
  submitButtonText,
}: PatientFormProps) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            id="name"
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g., John Doe"
            required
          />
          
          <Input
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => onDateOfBirthChange(e.target.value)}
            required
          />
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              &larr; Back to Dashboard
            </Link>
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
