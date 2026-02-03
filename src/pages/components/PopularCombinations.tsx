// src/pages/components/PopularCombinations.tsx
import React from 'react';
import { Users, Plus } from 'lucide-react';

interface Combination {
  id: number;
  name: string;
  description: string;
  tests: string[];
  price: number;
  savings: number;
  popularity: string;
}

interface Props {
  combinations: Combination[];
  onAddCombination: (combo: Combination) => void;
}

const PopularCombinations: React.FC<Props> = ({ combinations, onAddCombination }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <Users className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Popular Combinations</h3>
          <p className="text-sm text-gray-600">Frequently chosen packages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {combinations.map((combo) => (
          <div
            key={combo.id}
            className="border border-amber-200 rounded-xl p-5 bg-amber-50/30 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium mb-2">
                  <Users size={12} />
                  <span>{combo.popularity}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1.5">{combo.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{combo.description}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-600 mb-2">
                Includes {combo.tests.length} tests:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {combo.tests.map((testName, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700"
                  >
                    {testName}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <div>
                <span className="text-xl font-bold text-amber-700">
                  ₹{combo.price.toLocaleString()}
                </span>
                <span className="ml-2 text-sm text-green-600">Save ₹{combo.savings}</span>
              </div>
              <button
                onClick={() => onAddCombination(combo)}
                className="flex items-center gap-1.5 px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition text-sm"
              >
                <Plus size={16} />
                Add All
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCombinations;