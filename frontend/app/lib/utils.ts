"use client";

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getRemainingDaysColor = (days: number) => {
  if (days === 0) return 'text-gray-500 bg-gray-100';
  if (days <= 7) return 'text-red-800 bg-red-100';
  return 'text-green-800 bg-green-100';
};
