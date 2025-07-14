"use client";

import { useCreateAssignment } from '@/app/hooks/useCreateAssignment';
import AssignmentForm from '@/app/components/forms/AssignmentForm';

export default function NewAssignmentPage() {
  const {
    allPatients,
    availableMedications,
    patientId,
    medicationId,
    startDate,
    numberOfDays,
    loading,
    error,
    setPatientId,
    setMedicationId,
    setStartDate,
    setNumberOfDays,
    handleSubmit,
  } = useCreateAssignment();

  return (
    <AssignmentForm
      mode="new"
      title="Assign a New Treatment"
      submitButtonText="Assign Treatment"
      patients={allPatients}
      availableMedications={availableMedications}
      patientId={patientId}
      medicationId={medicationId}
      startDate={startDate}
      numberOfDays={numberOfDays}
      onPatientChange={setPatientId}
      onMedicationChange={setMedicationId}
      onStartDateChange={setStartDate}
      onNumberOfDaysChange={setNumberOfDays}
      onSubmit={handleSubmit}
      isLoading={loading}
      error={error}
    />
  );
}
