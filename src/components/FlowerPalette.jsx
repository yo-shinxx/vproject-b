import React from 'react';

const FlowerPalette = ({ flowers, onDragStart, onDragEnd, onFlowerClick, selectedFlower }) => {
  return (
    <div className="fade-in-up" style={{animationDelay: '0.1s'}}>
      <div className="glass-effect rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-3">
          <span className="text-4xl">🌿</span>
          Choose Your Flowers
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {flowers.map((flower, index) => (
            <div
              key={flower.id}
              draggable
              onDragStart={() => onDragStart(flower)}
              onDragEnd={onDragEnd}
              onClick={() => onFlowerClick(flower)}
              className="flower-cursor group relative touch-none select-none"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`
                relative p-6 rounded-2xl bg-gradient-to-br ${flower.color}
                transform transition-all duration-300 
                hover:scale-110 hover:rotate-3 hover:shadow-2xl
                active:scale-95
                petal-shadow
                ${selectedFlower?.id === flower.id ? 'ring-4 ring-amber-600 scale-105' : ''}
              `}>
                <div className="text-6xl text-center mb-2 float-animation" style={{animationDelay: `${index * 0.3}s`}}>
                  {flower.emoji}
                </div>
                <p className="text-white text-center font-semibold text-sm">
                  {flower.name}
                </p>
              </div>
              
              {/* Hover tooltip */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                pointer-events-none z-10">
                <div className="bg-gray-900 text-white text-xs p-3 rounded-xl shadow-xl text-center">
                  "{flower.compliment}"
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedFlower && (
          <p className="text-amber-800 text-center mt-4 text-sm animate-pulse">
            Tap the vase to add {selectedFlower.name} 👆
          </p>
        )}
      </div>
    </div>
  );
};

export default FlowerPalette;