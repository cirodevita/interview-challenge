"use client";

import { useCreateMedication } from '../../../hooks/useCreateMedication';
import MedicationForm from '../../../components/forms/MedicationForm';

export default function NewMedicationPage() {
  const {
    name,
    dosage,
    frequency,
    loading,
    error,
    setName,
    setDosage,
    setFrequency,
    handleSubmit,
  } = useCreateMedication();

  return (
    <MedicationForm
      name={name}
      dosage={dosage}
      frequency={frequency}
      onNameChange={setName}
      onDosageChange={setDosage}
      onFrequencyChange={setFrequency}
      onSubmit={handleSubmit}
      isLoading={loading}
      error={error}
      title='Add a New Medication'
      submitButtonText='Save Medication'
    />
  );
}
