"use client";

import { useCreatePatient } from '@/app/hooks/useCreatePatient';
import PatientForm from '@/app/components/forms/PatientForm';

export default function NewPatientPage() {
  const {
    name,
    dateOfBirth,
    loading,
    error,
    setName,
    setDateOfBirth,
    handleSubmit,
  } = useCreatePatient();

  return (
    <PatientForm
      name={name}
      dateOfBirth={dateOfBirth}
      onNameChange={setName}
      onDateOfBirthChange={setDateOfBirth}
      onSubmit={handleSubmit}
      isLoading={loading}
      error={error}
      title="Add a New Patient"
      submitButtonText="Save Patient"
    />
  );
}
