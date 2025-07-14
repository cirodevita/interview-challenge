import { API_URL } from '@/app/lib/constants';
import { Patient } from '@/app/types';

export async function getPatients(): Promise<Patient[]> {
  const response = await fetch(`${API_URL}/patients`);
  if (!response.ok) throw new Error('Failed to fetch patients.');
  return response.json();
}

export async function createPatient(patientData: { name: string; dateOfBirth: string }): Promise<Patient> {
  const response = await fetch(`${API_URL}/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
    throw new Error(message || 'Failed to create patient.');
  }
  return response.json();
}