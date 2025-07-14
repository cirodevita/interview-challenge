"use client";

import { useEditMedication } from '@/app/hooks/useEditMedication';
import MedicationForm from '@/app/components/forms/MedicationForm';

export default function EditMedicationPage() {
  const { name, dosage, frequency, loading, error, setName, setDosage, setFrequency, handleSubmit } = useEditMedication();

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
      title="Edit Medication"
      submitButtonText="Save Changes"
    />
  );
}
