import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-[#B0BABF] focus:ring-[#CF2D2D] focus:border-[#CF2D2D]';
  
  return (
    <div className={`${widthClass}`}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-[#1E2022] mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            ${icon ? 'pl-10' : 'pl-4'} 
            pr-4 py-2 bg-white border ${errorClass} rounded-md shadow-sm 
            placeholder-gray-400 
            focus:outline-none focus:ring-2
            text-[#1E2022] text-sm
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${widthClass} ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;