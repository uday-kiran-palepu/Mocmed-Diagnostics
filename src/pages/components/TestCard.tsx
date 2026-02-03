// src/pages/components/TestCard.tsx
import React from 'react';
import { Clock, Droplet, AlertCircle, Info } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  sampleType: string;
  fasting: boolean;
}

interface Props {
  test: Test;
  isSelected: boolean;
  onToggle: () => void;
  onInfoClick: () => void;
}

const TestCard: React.FC<Props> = ({ test, isSelected, onToggle, onInfoClick }) => {
  return (
    <div
      className={`border-2 rounded-xl p-5 transition-all duration-300 ${
        isSelected
          ? 'border-blue-500 bg-blue-50/30 shadow-md'
          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{test.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{test.description}</p>
        </div>
        <button
          onClick={onInfoClick}
          className="ml-2 p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="More info"
        >
          <Info size={18} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
          <Clock size={14} />
          <span>{test.duration}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
          <Droplet size={14} />
          <span>{test.sampleType}</span>
        </span>
        {test.fasting && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-medium">
            <AlertCircle size={14} />
            <span>Fasting Required</span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xl md:text-2xl font-bold text-blue-600">
            ₹{test.price.toLocaleString()}
          </span>
        </div>
        <button
          onClick={onToggle}
          className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
            isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'border border-blue-500 text-blue-600 hover:bg-blue-50'
          }`}
        >
          {isSelected ? 'Added' : 'Add Test'}
        </button>
      </div>
    </div>
  );
};

export default TestCard;