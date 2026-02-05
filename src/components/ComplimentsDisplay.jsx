import React from 'react';
import { Heart } from 'lucide-react';

const ComplimentsDisplay = ({ bouquetFlowers }) => {
  return (
    <div className="mt-8 fade-in-up">
      <div className="glass-effect rounded-3xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center flex items-center justify-center gap-3">
          Rearrange the messages to complete the poem
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {bouquetFlowers.map((flower, index) => (
            <div
              key={flower.uniqueId}
              className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50
                border-2 border-amber-300 shadow-md fade-in-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="text-4xl flex-shrink-0">{flower.emoji}</div>
              <div className="flex-1">
                <p className="text-lg text-amber-900 italic">
                  "{flower.compliment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplimentsDisplay;