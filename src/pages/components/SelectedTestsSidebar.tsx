// src/pages/components/SelectedTestsSidebar.tsx
import React from 'react';
import { X, ShoppingCart } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  price: number;
}

interface Props {
  selectedTests: Test[];
  onRemoveTest: (id: string) => void;
  onClearAll: () => void;
  onProceed: () => void;
}

const SelectedTestsSidebar: React.FC<Props> = ({
  selectedTests,
  onRemoveTest,
  onClearAll,
  onProceed,
}) => {
  const totalPrice = selectedTests.reduce((sum, test) => sum + test.price, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Selected Tests</h2>
        {selectedTests.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-red-600 hover:text-red-800 hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {selectedTests.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No tests selected yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Add tests to build your custom package
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
            {selectedTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="font-medium text-gray-900 line-clamp-1">{test.name}</p>
                  <p className="text-sm text-gray-600">₹{test.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => onRemoveTest(test.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Tests:</span>
              <span className="font-semibold">{selectedTests.length}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-xl text-blue-600">
              <span>Total Amount:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={onProceed}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Proceed Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectedTestsSidebar;