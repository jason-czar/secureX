import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        {
          'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
          'bg-gray-700 text-gray-200 hover:bg-gray-600': variant === 'secondary',
          'border-2 border-blue-500 text-blue-400 hover:bg-gray-800': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}