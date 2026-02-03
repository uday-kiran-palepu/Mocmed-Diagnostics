// src/pages/components/RecommendationSection.tsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  reason?: string;
}

interface Props {
  recommendations: Test[];
  onAddTest: (test: Test) => void;
}

const RecommendationSection: React.FC<Props> = ({ recommendations, onAddTest }) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Recommended for You</h3>
          <p className="text-sm text-gray-600">Based on your selections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((test) => (
          <div
            key={test.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all bg-white"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                {test.reason && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium mb-2">
                    <TrendingUp size={12} />
                    <span>{test.reason}</span>
                  </div>
                )}
                <h4 className="text-base font-semibold text-gray-900 mb-1.5">{test.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{test.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-xl font-bold text-blue-600">
                ₹{test.price.toLocaleString()}
              </span>
              <button
                onClick={() => onAddTest(test)}
                className="px-5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-medium transition text-sm"
              >
                Add Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;