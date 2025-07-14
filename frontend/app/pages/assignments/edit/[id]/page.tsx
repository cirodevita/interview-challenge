"use client";

import { useEditAssignment } from '@/app/hooks/assignments/useEditAssignment';
import AssignmentForm from '@/app/components/forms/AssignmentForm';

export default function EditAssignmentPage() {
  const {
    startDate,
    numberOfDays,
    patientName,
    medicationName,
    loading,
    error,
    setStartDate,
    setNumberOfDays,
    handleSubmit,
  } = useEditAssignment();

  return (
    <AssignmentForm
      mode="edit"
      title="Edit Treatment"
      submitButtonText="Save Changes"
      patientName={patientName}
      medicationName={medicationName}
      startDate={startDate}
      numberOfDays={numberOfDays}
      onStartDateChange={setStartDate}
      onNumberOfDaysChange={setNumberOfDays}
      onSubmit={handleSubmit}
      isLoading={loading}
      error={error}
      patientId=""
      medicationId=""
    />
  );
}
