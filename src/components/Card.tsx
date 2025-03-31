import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700', className)}>
      {children}
    </div>
  );
}