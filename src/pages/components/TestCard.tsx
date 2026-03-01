// import React from 'react';
// import { Clock, Droplet, AlertCircle, Info } from 'lucide-react';

// interface Test {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   originalPrice?: number; // ← Added optional original price
//   duration: string;
//   sampleType: string;
//   fasting: boolean;
// }

// interface Props {
//   test: Test;
//   isSelected: boolean;
//   onToggle: () => void;
//   onInfoClick: () => void;
// }

// const TestCard: React.FC<Props> = ({ test, isSelected, onToggle, onInfoClick }) => {
//   // Calculate discount percentage if originalPrice exists
//   const discountPercent = test.originalPrice && test.originalPrice > test.price
//     ? Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100)
//     : 0;

//   return (
//     <div
//       className={`border-2 rounded-xl p-5 transition-all duration-300 ${
//         isSelected
//           ? 'border-blue-500 bg-blue-50/30 shadow-md'
//           : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
//       }`}
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-1">{test.name}</h3>
//           <p className="text-sm text-gray-600 line-clamp-2">{test.description}</p>
//         </div>
//         <button
//           onClick={onInfoClick}
//           className="ml-2 p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
//           aria-label="More info"
//         >
//           <Info size={18} />
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-2 mb-4">
//         <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
//           <Clock size={14} />
//           <span>{test.duration}</span>
//         </span>
//         <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-md text-xs text-gray-700">
//           <Droplet size={14} />
//           <span>{test.sampleType}</span>
//         </span>
//         {test.fasting && (
//           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-medium">
//             <AlertCircle size={14} />
//             <span>Fasting Required</span>
//           </span>
//         )}
//       </div>

//       {/* Updated Price Section – matches your screenshot style */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex flex-col items-start">
//           <div className="flex items-baseline gap-2">
//             <span className="text-xl md:text-2xl font-bold text-[#0A7DCF]">
//               ₹{test.price.toLocaleString()}
//             </span>
//             {test.originalPrice && test.originalPrice > test.price && (
//               <span className="text-sm md:text-base text-gray-500 line-through">
//                 ₹{test.originalPrice.toLocaleString()}
//               </span>
//             )}
//           </div>
//           {discountPercent > 0 && (
//             <span className="text-sm md:text-base font-medium text-green-600">
//               {discountPercent}% OFF
//             </span>
//           )}
//         </div>

//         <button
//           onClick={onToggle}
//           className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
//             isSelected
//               ? 'bg-blue-600 text-white hover:bg-blue-700'
//               : 'border border-blue-500 text-blue-600 hover:bg-blue-50'
//           }`}
//         >
//           {isSelected ? 'Added' : 'Add Test'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TestCard;

// src/pages/components/TestCard.tsx
import React from 'react';
import { Clock, Droplet, AlertCircle } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  sampleType: string;
  fasting: boolean;
}

interface Props {
  test: Test;
  isSelected: boolean;
  onToggle: () => void;
  onInfoClick: () => void;
  renderPrice?: (current: number, original?: number) => React.ReactNode;
}

const TestCard: React.FC<Props> = ({ 
  test, 
  isSelected, 
  onToggle, 
  onInfoClick,
  renderPrice 
}) => {
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
          {renderPrice ? renderPrice(test.price, test.originalPrice) : (
            <span className="text-xl md:text-2xl font-bold text-[#0A7DCF]">
              ₹{test.price.toLocaleString()}
            </span>
          )}
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