"use client";

import Link from 'next/link';
import { Assignment } from '@/app/types';
import { formatDate, getRemainingDaysColor } from '@/app/lib/utils';
import Button from '@/app/components/ui/Button';

interface TreatmentListProps {
  assignments: Assignment[];
  onDelete: (assignmentId: number) => void;
}

export default function TreatmentList({ assignments, onDelete }: TreatmentListProps) {
  const activeTreatments = assignments.filter(a => a.remainingDays > 0);
  const completedTreatments = assignments.filter(a => a.remainingDays === 0);

  return (
    <>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Active Treatments
        </h3>
        {activeTreatments.length > 0 ? (
          <ul className="space-y-3">
            {activeTreatments.map((assignment) => (
              <li key={assignment.id} className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start">
                <div className="flex-grow">
                  <p className="font-bold text-gray-800">{assignment.medication.name}</p>
                  <p className="text-sm text-gray-500">
                    {assignment.medication.dosage} - {assignment.medication.frequency}
                  </p>
                  <p className="text-sm text-gray-500">
                    Started on: {formatDate(assignment.startDate)} &bull; Duration: {assignment.numberOfDays} days
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRemainingDaysColor(assignment.remainingDays)}`}>
                    {assignment.remainingDays} days left
                  </div>
                  <Link href={`/pages/assignments/edit/${assignment.id}`}>
                    <Button variant="secondary">
                      Edit
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => onDelete(assignment.id)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No active treatments.</p>
        )}
      </div>

      {completedTreatments.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Completed Treatments
          </h3>
          <ul className="space-y-3">
            {completedTreatments.map((assignment) => (
              <li key={assignment.id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center opacity-70">
                <div>
                  <p className="font-semibold text-gray-600">{assignment.medication.name}</p>
                  <p className="text-sm text-gray-500">
                    Started on: {formatDate(assignment.startDate)} &bull; Duration: {assignment.numberOfDays} days
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Finished
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
