
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = "", size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5 text-white"
      >
        <path
          d="M4 6L20 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="rotate(-15 12 6)"
        />
        <path
          d="M4 12L20 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="rotate(-15 12 12)"
        />
        <path
          d="M4 18L20 18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="rotate(-15 12 18)"
        />
      </svg>
    </div>
  );
};

export default Logo;
