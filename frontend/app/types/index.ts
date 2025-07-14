export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Assignment {
  id: number;
  startDate: string;
  numberOfDays: number;
  remainingDays: number;
  medication: Medication;
  patient: Patient;
}

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  assignments: Assignment[];
}
