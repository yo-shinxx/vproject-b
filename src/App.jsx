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
  const [selectedFlower, setSelectedFlower] = useState(null);

  const handleDragStart = (flower) => {
    setDraggedFlower(flower);
  };

  const handleDragEnd = () => {
    setDraggedFlower(null);
  };

  const handleFlowerClick = (flower) => {
    setSelectedFlower(flower);
  };

  const handleVaseClick = () => {
    if (selectedFlower && bouquetFlowers.length < 8) {
      const newFlower = {
        ...selectedFlower,
        uniqueId: Date.now() + Math.random(),
        position: {
          x: Math.random() * 20 - 10,
          y: Math.random() * 30 - 25,
        },
        rotation: Math.random() * 30 - 15,
      };
      setBouquetFlowers([...bouquetFlowers, newFlower]);
      setSelectedFlower(null); 
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedFlower && bouquetFlowers.length < 8) {
      const newFlower = {
        ...draggedFlower,
        uniqueId: Date.now() + Math.random(),
        position: {
          x: Math.random() * 20 - 10,
          y: Math.random() * 30 - 25,
        },
        rotation: Math.random() * 30 - 15,
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
            onFlowerClick={handleFlowerClick}
            selectedFlower={selectedFlower}
          />

          <BouquetVase
            bouquetFlowers={bouquetFlowers}
            draggedFlower={draggedFlower}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onVaseClick={handleVaseClick}
            removeFlower={removeFlower}
            resetBouquet={resetBouquet}
            revealInvitation={revealInvitation}
            selectedFlower={selectedFlower}
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