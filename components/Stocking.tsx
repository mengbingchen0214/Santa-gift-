import React from 'react';

interface StockingProps {
  isShaking: boolean;
}

const Stocking: React.FC<StockingProps> = ({ isShaking }) => {
  return (
    <div className={`relative w-48 h-64 md:w-64 md:h-80 transition-transform duration-300 ${isShaking ? 'animate-bounce' : ''}`}>
      <svg
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl filter"
      >
        {/* Cuff */}
        <path
          d="M20 20 H120 V70 H20 Z"
          fill="#F8F8F8"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        <rect x="20" y="20" width="100" height="50" rx="5" fill="white" />
        
        {/* Main Sock Body */}
        <path
          d="M30 70 V180 C30 230, 80 260, 130 260 H160 C180 260, 190 240, 180 220 C170 200, 150 180, 120 180 H110 V70 H30 Z"
          fill="#DC2626" 
          stroke="#991B1B"
          strokeWidth="2"
        />
        
        {/* Heel */}
        <path
          d="M30 180 Q10 180 10 200 Q10 220 30 220 L50 220 L50 180 H30 Z"
          fill="#166534"
        />
        
        {/* Toe */}
        <path
          d="M160 260 C190 260 200 230 180 210 L150 180 L120 180 L120 200 C120 240 130 260 160 260 Z"
          fill="#166534"
        />

        {/* Decorative Patterns */}
        <circle cx="50" cy="100" r="5" fill="#FCA5A5" />
        <circle cx="90" cy="120" r="5" fill="#FCA5A5" />
        <circle cx="50" cy="140" r="5" fill="#FCA5A5" />
        <circle cx="90" cy="160" r="5" fill="#FCA5A5" />
        
        {/* Loop */}
        <path d="M20 20 L10 10" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default Stocking;
