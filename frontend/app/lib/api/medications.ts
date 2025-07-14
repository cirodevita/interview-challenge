import { API_URL } from '@/app/lib/constants';
import { Medication } from '@/app/types';


export async function getMedications(): Promise<Medication[]> {
  const response = await fetch(`${API_URL}/medications`);
  if (!response.ok) throw new Error('Failed to fetch medications.');
  return response.json();
}

export async function getMedicationById(id: string): Promise<Medication> {
  const response = await fetch(`${API_URL}/medications/${id}`);
  if (!response.ok) throw new Error('Failed to fetch medication.');
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

export async function updateMedication(id: string, medicationData: { name: string; dosage: string; frequency: string }): Promise<Medication> {
  const response = await fetch(`${API_URL}/medications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(medicationData),
  });
  if (!response.ok) {
      const errorData = await response.json();
      const message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
      throw new Error(message || 'Failed to update medication.');
  }
  return response.json();
}

export async function deleteMedication(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/medications/${id}`, {
      method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete medication.');
}