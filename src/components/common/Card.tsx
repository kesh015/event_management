import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  const hoverStyles = hoverable 
    ? 'transition duration-300 transform hover:-translate-y-1 hover:shadow-md' 
    : '';
  
  const clickableStyles = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow overflow-hidden ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <div className={`px-6 py-4 border-t border-[#B0BABF] bg-gray-50 ${className}`}>
    {children}
  </div>
);

export const CardMedia: React.FC<{ 
  src: string; 
  alt?: string; 
  height?: string;
  className?: string;
}> = ({ 
  src, 
  alt = '',
  height = 'h-48',
  className = '' 
}) => (
  <div className={`w-full ${height} overflow-hidden ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
    />
  </div>
);

export default Card;