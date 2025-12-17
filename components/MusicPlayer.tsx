import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Handle browser autoplay policies by catching errors
      audioRef.current.play().catch(e => {
        console.log("Audio play failed due to browser policy:", e);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMusic}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full 
          bg-white/10 backdrop-blur-md border border-white/20 text-white 
          hover:bg-white/20 transition-all duration-300 hover:scale-110
          ${isPlaying ? 'animate-pulse-slow border-yellow-400/50 text-yellow-300' : 'opacity-70'}
        `}
        title={isPlaying ? "Pause Music" : "Play Christmas Music"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      
      {/* 
        Using Jingle Bells by Kevin MacLeod (incompetech.com)
        Licensed under Creative Commons: By Attribution 3.0 License
        Source: Wikimedia Commons
      */}
      <audio 
        ref={audioRef}
        loop
        src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Jingle_Bells_by_Kevin_MacLeod.ogg" 
      />
      
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(250, 204, 21, 0); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
