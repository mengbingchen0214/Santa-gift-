import React, { useState, useEffect } from 'react';
import { GiftMessage } from '../types';

interface GiftBoxProps {
  gift: GiftMessage;
  index: number;
  isOpened: boolean;
  isDisabled: boolean;
  isMagnified?: boolean;
  tagLabel: string;
  onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ 
  gift, 
  index, 
  isOpened, 
  isDisabled, 
  isMagnified = false,
  tagLabel, 
  onOpen 
}) => {
  // State to control the staggered text reveal
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpened && isMagnified) {
      // Delay content reveal slightly to sync with the flip/scale animation
      const timer = setTimeout(() => setShowContent(true), 600);
      return () => clearTimeout(timer);
    } else if (!isOpened) {
      setShowContent(false);
    }
  }, [isOpened, isMagnified]);

  // Stagger animation delay for entry
  const entryDelay = `${index * 200}ms`;
  // Different float durations to make them look less robotic
  const floatDuration = `${3 + index * 0.5}s`;

  // Base classes
  const baseClasses = "relative perspective-1000 transition-all duration-700 ease-in-out transform";
  
  // Dimensions and Text sizes based on magnified state
  const sizeClasses = isMagnified 
    ? "w-full max-w-2xl min-h-[50vh] md:min-h-[60vh] z-50 animate-fade-in" 
    : "w-64 h-48 animate-fade-in-up";

  const hoverClasses = !isOpened && !isDisabled && !isMagnified ? 'cursor-pointer hover:scale-105 animate-float' : '';
  const disabledClasses = isDisabled ? 'opacity-0 scale-0 absolute' : ''; 

  return (
    <div 
      className={`
        ${baseClasses}
        ${sizeClasses}
        ${hoverClasses}
        ${disabledClasses}
      `}
      onClick={() => !isDisabled && !isOpened && onOpen()}
      style={{ 
        animationDelay: isMagnified ? '0ms' : entryDelay,
        '--float-duration': floatDuration
      } as React.CSSProperties}
    >
      <div className={`relative w-full h-full transition-all duration-700 transform style-preserve-3d ${isOpened ? 'rotate-y-180' : ''}`}>
        
        {/* Front of Box (Closed) */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-xl flex items-center justify-center border-2 border-green-400">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Ribbon Vertical */}
            <div className={`h-full bg-red-600 border-l border-r border-red-700/50 ${isMagnified ? 'w-16' : 'w-8'}`}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
             {/* Ribbon Horizontal */}
            <div className={`w-full bg-red-600 border-t border-b border-red-700/50 ${isMagnified ? 'h-16' : 'h-8'}`}></div>
          </div>
          <div className={`z-10 bg-yellow-400 text-yellow-900 font-bold rounded-full shadow-lg transform rotate-[-5deg] border border-yellow-200 ${isMagnified ? 'text-3xl px-8 py-3' : 'px-4 py-1 text-base'}`}>
            {tagLabel}
          </div>
        </div>

        {/* Back of Box (Revealed) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col items-center justify-center text-center border-4 border-yellow-400">
          
          {/* Magic Background Effect (Rotating Sunburst) */}
          {isMagnified && (
             <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,yellow_20deg,transparent_40deg,yellow_60deg,transparent_80deg,yellow_100deg,transparent_120deg,yellow_140deg,transparent_160deg,yellow_180deg,transparent_200deg,yellow_220deg,transparent_240deg,yellow_260deg,transparent_280deg,yellow_300deg,transparent_320deg,yellow_340deg,transparent_360deg)] animate-spin-slow"></div>
             </div>
          )}

          {/* Particles/Sparkles */}
          {isMagnified && showContent && (
             <>
               <div className="absolute top-10 left-10 text-yellow-400 text-2xl animate-ping">✨</div>
               <div className="absolute bottom-12 right-12 text-yellow-400 text-3xl animate-ping" style={{animationDelay: '0.3s'}}>✨</div>
               <div className="absolute top-1/4 right-8 text-yellow-400 text-xl animate-ping" style={{animationDelay: '0.7s'}}>✦</div>
               <div className="absolute bottom-1/4 left-8 text-yellow-400 text-xl animate-ping" style={{animationDelay: '0.5s'}}>✦</div>
             </>
          )}

          <div className={`relative z-10 p-6 flex flex-col items-center justify-center h-full w-full transition-all duration-1000 ${isMagnified && !showContent ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className={`${isMagnified ? 'text-8xl mb-6 scale-110' : 'text-4xl mb-2'} transition-transform duration-500`}>{gift.emoji}</div>
            
            <h3 className={`font-serif font-bold text-red-700 mb-4 transition-all duration-700 delay-100 ${isMagnified ? 'text-4xl md:text-5xl drop-shadow-sm' : 'text-xl'}`}>
                {gift.title}
            </h3>
            
            <p className={`text-gray-800 font-medium leading-relaxed font-serif transition-all duration-700 delay-200 ${isMagnified ? 'text-2xl md:text-3xl max-w-xl italic' : 'text-sm'}`}>
              "{gift.message}"
            </p>
            
            {isMagnified && (
              <div className="mt-8 text-yellow-600 text-sm font-sans uppercase tracking-widest opacity-80 flex items-center gap-2 transition-opacity duration-1000 delay-500">
                  <span className="w-8 h-[1px] bg-yellow-600"></span>
                  Santa's Wisdom
                  <span className="w-8 h-[1px] bg-yellow-600"></span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* CSS Helper for 3D flip and Float */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .style-preserve-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px) scale(0.5); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-float {
            animation: float var(--float-duration) ease-in-out infinite;
        }

        @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spinSlow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GiftBox;
