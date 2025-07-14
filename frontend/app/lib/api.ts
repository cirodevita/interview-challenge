import { API_URL } from '@/app/lib/constants';
import { Patient, Medication, Assignment } from '@/app/types';

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

export async function getMedications(): Promise<Medication[]> {
    const response = await fetch(`${API_URL}/medications`);
    if (!response.ok) throw new Error('Failed to fetch medications.');
    return response.json();
}

export async function createMedication(medicationData: { name: string; dosage: string; frequency: string }): Promise<Medication> {
  const response = await fetch(`${API_URL}/medications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicationData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    const message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
    throw new Error(message || 'Failed to create medication.');
  }
  return response.json();
}

export async function getAssignmentById(id: string): Promise<Assignment> {
    const response = await fetch(`${API_URL}/assignments/${id}`);
    if (!response.ok) throw new Error('Failed to load assignment data.');
    return response.json();
}

export async function createAssignment(assignmentData: { patientId: number; medicationId: number; startDate: string; numberOfDays: number }): Promise<Assignment> {
    const response = await fetch(`${API_URL}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignmentData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        const message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
        throw new Error(message || 'Failed to create assignment.');
    }
    return response.json();
}

export async function updateAssignment(id: string, assignmentData: { startDate: string; numberOfDays: number }): Promise<Assignment> {
    const response = await fetch(`${API_URL}/assignments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assignmentData),
    });
    if (!response.ok) {
        const errorData = await response.json();
        const message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
        throw new Error(message || 'Failed to update assignment.');
    }
    return response.json();
}

export async function deleteAssignment(assignmentId: number): Promise<void> {
  const response = await fetch(`${API_URL}/assignments/${assignmentId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete the treatment.');
}
