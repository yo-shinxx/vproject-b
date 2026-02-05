import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-12 fade-in-up">
      <h1 className="text-6xl font-black text-amber-900 mb-4">
        Dearest Angela
      </h1>
      <Sparkles className="text-amber-600 w-5 h-5 sparkle-animation" />
      <p className="text-2xl text-amber-800 italic">
        Drag flowers to create your bouquet
      </p>
       <Sparkles className="text-amber-600 w-5 h-5 sparkle-animation" style={{animationDelay: '0.5s'}} />
    </div>
  );
};

export default Header;