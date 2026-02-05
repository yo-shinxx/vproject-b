import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

const BouquetVase = ({ 
  bouquetFlowers, 
  draggedFlower, 
  onDrop, 
  onDragOver, 
  removeFlower, 
  resetBouquet, 
  revealInvitation 
}) => {
  return (
    <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
      <div className="glass-effect rounded-3xl p-8 shadow-2xl min-h-[500px] relative">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3">
          Your Bouquet
          {bouquetFlowers.length > 0 && (
            <span className="ml-auto text-xl bg-gradient-to-r from-amber-600 to-orange-700 text-white px-4 py-1 rounded-full">
              {bouquetFlowers.length}
            </span>
          )}
        </h2>

        {/* Drop Zone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          className={`
            relative min-h-[350px] rounded-2xl 
            border-4 border-dashed transition-all duration-300
            ${draggedFlower 
              ? 'border-amber-600 bg-amber-50 scale-105' 
              : 'border-stone-400 bg-gradient-to-b from-transparent to-amber-50/30'
            }
          `}
        >
          {bouquetFlowers.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4 opacity-30">🏺</div>
              </div>
            </div>
          ) : (
            <>
              {/* Vase at bottom */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-32 z-0">
                <div className="w-full h-full bg-gradient-to-b from-amber-700 to-orange-900 rounded-b-full opacity-80 
                  shadow-inner border-t-4 border-amber-900"></div>
              </div>

              {/* Flowers */}
              <div className="relative h-full pt-8">
                {bouquetFlowers.map((flower, index) => (
                  <div
                    key={flower.uniqueId}
                    onClick={() => removeFlower(flower.uniqueId)}
                    className="absolute cursor-pointer group transition-all duration-300 hover:scale-125 hover:z-20"
                    style={{
                      left: `${50 + flower.position.x}%`,
                      top: `${400 + flower.position.y}%`,
                      transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="relative">
                      <div className="text-6xl float-animation petal-shadow">
                        {flower.emoji}
                      </div>
                      
                      {/* Remove hint */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                        opacity-0 group-hover:opacity-100 transition-opacity
                        bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        Click to remove
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {bouquetFlowers.length > 0 && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={resetBouquet}
              className="flex-1 px-6 py-3 rounded-xl bg-stone-300 hover:bg-stone-400 
                text-stone-800 font-semibold transition-all duration-300
                transform hover:scale-105 active:scale-95 border-2 border-stone-400"
            >
              Start Over
            </button>
            {bouquetFlowers.length >= 3 && (
              <button
                onClick={revealInvitation}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-700 to-orange-800 
                  text-white font-bold transition-all duration-300
                  transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl
                  flex items-center justify-center gap-2 border-2 border-amber-900"
              >
                <Heart className="w-5 h-5 fill-current" />
                You received a message!
                <Sparkles className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BouquetVase;