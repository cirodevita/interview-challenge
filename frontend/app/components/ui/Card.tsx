"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg ${className}`}>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
