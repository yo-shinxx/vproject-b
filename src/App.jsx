import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import './App.css';
import Header from './components/Header';
import FlowerPalette from './components/FlowerPalette';
import BouquetVase from './components/BouquetVase';
import ComplimentsDisplay from './components/ComplimentsDisplay';
import ValentineInvitation from './components/ValentineInvitation';
import { flowers } from './components/data/flowers';

const App = () => {
  const [bouquetFlowers, setBouquetFlowers] = useState([]);
  const [showInvitation, setShowInvitation] = useState(false);
  const [draggedFlower, setDraggedFlower] = useState(null);

  const handleDragStart = (flower) => {
    setDraggedFlower(flower);
  };

  const handleDragEnd = () => {
    setDraggedFlower(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedFlower && bouquetFlowers.length < 8) {
      const newFlower = {
        ...draggedFlower,
        uniqueId: Date.now() + Math.random(),
        position: {
          x: Math.random() * 25 - 15,
          y: Math.random() * 50 - 30,
        },
        rotation: Math.random() * 40 - 20,
      };
      setBouquetFlowers([...bouquetFlowers, newFlower]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFlower = (uniqueId) => {
    setBouquetFlowers(bouquetFlowers.filter(f => f.uniqueId !== uniqueId));
  };

  const revealInvitation = () => {
    if (bouquetFlowers.length >= 3) {
      setShowInvitation(true);
    }
  };

  const resetBouquet = () => {
    setBouquetFlowers([]);
    setShowInvitation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-stone-100 to-orange-50 p-8 font-serif">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid lg:grid-cols-2 gap-8">
          <FlowerPalette
            flowers={flowers}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />

          <BouquetVase
            bouquetFlowers={bouquetFlowers}
            draggedFlower={draggedFlower}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            removeFlower={removeFlower}
            resetBouquet={resetBouquet}
            revealInvitation={revealInvitation}
          />
        </div>

        {bouquetFlowers.length > 0 && (
          <ComplimentsDisplay bouquetFlowers={bouquetFlowers} />
        )}

        {showInvitation && (
          <ValentineInvitation
            onClose={() => setShowInvitation(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;