import React from 'react';

interface SantaProps {
  isPreparing: boolean;
}

const Santa: React.FC<SantaProps> = ({ isPreparing }) => {
  return (
    <div className={`relative w-64 h-64 md:w-80 md:h-80 transition-transform duration-300 ${isPreparing ? 'scale-110' : ''}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Body Group with Bobbing Animation */}
        <g className="animate-santa-bob">
            {/* Body */}
            <path d="M50 140 Q100 180 150 140 L160 200 H40 L50 140 Z" fill="#DC2626" />
            
            {/* Belt */}
            <rect x="42" y="160" width="116" height="15" fill="#1F2937" />
            <rect x="90" y="158" width="20" height="19" fill="#FCD34D" rx="2" />
            <rect x="94" y="162" width="12" height="11" fill="#1F2937" rx="1" />

            {/* Beard */}
            <path d="M40 80 C20 120, 50 170, 100 170 C150 170, 180 120, 160 80 L100 80 Z" fill="#F3F4F6" />
            
            {/* Face */}
            <circle cx="100" cy="80" r="35" fill="#FECACA" />
            
            {/* Cheeks */}
            <circle cx="80" cy="85" r="8" fill="#FCA5A5" opacity="0.6" />
            <circle cx="120" cy="85" r="8" fill="#FCA5A5" opacity="0.6" />

            {/* Eyes (Blinking Animation) */}
            <g className="animate-santa-blink origin-center">
                <circle cx="85" cy="75" r="3" fill="#1F2937" />
                <circle cx="115" cy="75" r="3" fill="#1F2937" />
            </g>

            {/* Nose */}
            <circle cx="100" cy="90" r="6" fill="#EF4444" />
            
            {/* Moustache */}
            <path d="M100 100 Q80 110 70 95 Q90 90 100 95 Q110 90 130 95 Q120 110 100 100 Z" fill="#F3F4F6" />

            {/* Hat */}
            <path d="M60 60 C60 20, 140 20, 140 60" fill="#DC2626" />
            <path d="M140 60 L180 100 L160 110 L130 70" fill="#DC2626" />
            <circle cx="180" cy="110" r="12" fill="#F3F4F6" className="animate-bounce" />
            <rect x="55" y="50" width="90" height="20" rx="10" fill="#F3F4F6" />

            {/* Arms */}
            <path d="M50 140 L20 160" stroke="#DC2626" strokeWidth="15" strokeLinecap="round" />
            
            {/* Waving Arm */}
            <g className="origin-[150px_140px] animate-santa-wave">
                <path d="M150 140 L180 110" stroke="#DC2626" strokeWidth="15" strokeLinecap="round" />
                <circle cx="180" cy="110" r="10" fill="#F3F4F6" /> {/* Hand/Mitten */}
            </g>
        </g>
      </svg>
      <style>{`
        @keyframes santaBob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        @keyframes santaWave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(15deg); }
        }
        @keyframes santaBlink {
            0%, 96%, 100% { transform: scaleY(1); }
            98% { transform: scaleY(0.1); }
        }
        .animate-santa-bob {
            animation: santaBob 3s ease-in-out infinite;
        }
        .animate-santa-wave {
            animation: santaWave 2s ease-in-out infinite;
        }
        .animate-santa-blink {
            animation: santaBlink 4s infinite;
        }
      `}</style>
    </div>
  );
};

export default Santa;
