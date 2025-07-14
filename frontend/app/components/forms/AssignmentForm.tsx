"use client";

import Link from 'next/link';
import { Patient, Medication } from '@/app/types';
import Select from '@/app/components/ui/Select';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';

interface AssignmentFormProps {
  mode: 'new' | 'edit';
  title: string;
  submitButtonText: string;
  
  patients?: Patient[];
  availableMedications?: Medication[];

  patientId: string;
  medicationId: string;
  startDate: string;
  numberOfDays: string;

  patientName?: string;
  medicationName?: string;

  onPatientChange?: (value: string) => void;
  onMedicationChange?: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onNumberOfDaysChange: (value: string) => void;
  
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}

export default function AssignmentForm({
  mode,
  title,
  submitButtonText,
  patients,
  availableMedications,
  patientId,
  medicationId,
  startDate,
  numberOfDays,
  patientName,
  medicationName,
  onPatientChange,
  onMedicationChange,
  onStartDateChange,
  onNumberOfDaysChange,
  onSubmit,
  isLoading,
  error,
}: AssignmentFormProps) {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          {mode === 'new' ? (
            <Select
              id="patientId"
              label="Patient"
              value={patientId}
              onChange={(e) => onPatientChange!(e.target.value)}
              required
              disabled={isLoading}
            >
              <option value="" disabled>Select a patient</option>
              {patients?.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </Select>
          ) : (
            <Input
              id="patientName"
              label="Patient"
              type="text"
              value={patientName}
              disabled
            />
          )}

          {mode === 'new' ? (
            <Select
              id="medicationId"
              label="Medication"
              value={medicationId}
              onChange={(e) => onMedicationChange!(e.target.value)}
              required
              disabled={isLoading || !patientId}
            >
              <option value="" disabled>Select a medication</option>
              {availableMedications?.map(m => (<option key={m.id} value={m.id}>{m.name} - {m.dosage}</option>))}
            </Select>
          ) : (
            <Input
              id="medicationName"
              label="Medication"
              type="text"
              value={medicationName}
              disabled
            />
          )}

          <Input
            id="startDate"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            required
          />

          <Input
            id="numberOfDays"
            label="Duration (in days)"
            type="number"
            value={numberOfDays}
            onChange={(e) => onNumberOfDaysChange(e.target.value)}
            placeholder="e.g., 10"
            min="1"
            required
          />
          
          {error && (<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert"><p className="font-bold">Error</p><p>{error}</p></div>)}

          <div className="flex items-center justify-between pt-2">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">&larr; Back to Dashboard</Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
