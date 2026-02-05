import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import yeyAudio from '../assets/happy happy happy.mp3';

const ValentineInvitation = ({ onClose }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  const handleNoHover = () => {
    const maxX = 300;
    const maxY = 150;
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    setNoButtonPosition({ x: randomX, y: randomY });
    
    // Start hovering
    setIsHoveringNo(true);
  };

  const handleNoLeave = () => {
    setIsHoveringNo(false);
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    const audio = new Audio(yeyAudio);
    audio.play().catch(err => console.log('Audio play failed:', err));
  };

  const handleClose = () => {
    onClose();
    setShowCelebration(false);
    setNoButtonPosition({ x: 0, y: 0 });
    setNoButtonScale(1);
    setIsHoveringNo(false);
  };

  // Continuous shrink
  useEffect(() => {
    if (!isHoveringNo) return;

    const shrinkInterval = setInterval(() => {
      setNoButtonScale(prevScale => {
        const newScale = prevScale - 0.05;
        // Stop shrinking when it gets too small
        if (newScale <= 0.1) {
          setIsHoveringNo(false);
          return 0.1;
        }
        return newScale;
      });
    }, 50); 
    return () => clearInterval(shrinkInterval);
  }, [isHoveringNo]);

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-12 max-w-2xl w-full shadow-2xl transform fade-in-up
          relative overflow-hidden border-4 border-amber-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800"></div>
        <div className="absolute -top-10 -right-10 text-9xl opacity-10">💐</div>
        <div className="absolute -bottom-10 -left-10 text-9xl opacity-10">🌹</div>

        <div className="relative z-10">

          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 mb-8 border-4 border-amber-700 shadow-lg">
            <p className="text-3xl font-bold text-center text-amber-900 mb-6">
              Will you be my valentine?
            </p>
            <div className="flex items-center justify-center gap-4 text-6xl">
              <span className="float-animation">🌹</span>
              <span className="float-animation" style={{animationDelay: '0.2s'}}>💕</span>
              <span className="float-animation" style={{animationDelay: '0.4s'}}>🌸</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            {!showCelebration ? (
              <>
                
                <div className="flex gap-6 mt-8 justify-center items-center relative h-32">
                  <button
                    onClick={handleYesClick}
                    className="px-12 py-4 rounded-xl bg-gradient-to-r from-amber-700 to-orange-800
                      text-white font-bold text-2xl transition-all duration-300
                      transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-2xl
                      flex items-center justify-center gap-3 border-2 border-amber-900 z-10"
                  >
                    Yes!
                  </button>
                  
                  <button
                    onMouseEnter={handleNoHover}
                    onMouseLeave={handleNoLeave}
                    onTouchStart={handleNoHover}
                    className="px-12 py-4 rounded-xl bg-gradient-to-r from-stone-300 to-stone-400
                      text-stone-700 font-bold text-2xl
                      shadow-lg
                      flex items-center justify-center gap-3 border-2 border-stone-500"
                    style={{
                      transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonScale})`,
                      transition: 'transform 0.2s ease-out'
                    }}
                  >
                    No :(
                  </button>
                </div>
              </>
            ) : (
              <div className="py-8">
                {/* Confetti effect */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="confetti-piece absolute w-3 h-3 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-20px',
                      backgroundColor: ['#f59e0b', '#fb923c', '#f97316', '#dc2626', '#be123c'][Math.floor(Math.random() * 5)],
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
                
                <div className="text-center space-y-6">
                  <div className="text-9xl heart-beat">💖</div>
                  <h3 className="text-4xl font-bold text-amber-900">
                    Yayy!
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-5xl mt-8">
                    <span className="float-animation">🌹</span>
                    <span className="float-animation" style={{animationDelay: '0.2s'}}>💕</span>
                    <span className="float-animation" style={{animationDelay: '0.4s'}}>🌸</span>
                    <span className="float-animation" style={{animationDelay: '0.6s'}}>💝</span>
                    <span className="float-animation" style={{animationDelay: '0.8s'}}>🌻</span>
                  </div>
                  
                  <button
                    onClick={handleClose}
                    className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-orange-800
                      text-white font-bold text-lg transition-all duration-300
                      transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl
                      border-2 border-amber-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentineInvitation;