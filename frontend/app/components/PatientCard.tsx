"use client";

import { Patient } from '@/app/types';
import { formatDate } from '@/app/lib/utils';
import Card from '@/app/components/ui/Card';
import TreatmentList from '@/app/components/TreatmentList';

interface PatientCardProps {
  patient: Patient;
  onDeleteTreatment: (assignmentId: number) => void;
}

export default function PatientCard({ patient, onDeleteTreatment }: PatientCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{patient.name}</h2>
          <p className="text-sm text-gray-600">
            Date of Birth: {formatDate(patient.dateOfBirth)}
          </p>
        </div>
      </div>
      
      <TreatmentList
        assignments={patient.assignments} 
        onDelete={onDeleteTreatment} 
      />
    </Card>
  );
}