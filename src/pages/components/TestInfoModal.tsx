// src/pages/components/TestInfoModal.tsx
import React from 'react';
import { X, Clock, Droplet, AlertCircle, FileText, Activity, ClipboardList, BarChart3 } from 'lucide-react';

interface Test {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  clinicalSignificance: string;
  preparation: string[];
  normalRange?: string;
  price: number;
  originalPrice?: number;
  duration: string;
  sampleType: string;
  fasting: boolean;
}

interface Props {
  test: Test | null;
  isOpen: boolean;
  onClose: () => void;
}

const TestInfoModal: React.FC<Props> = ({ test, isOpen, onClose }) => {
  if (!isOpen || !test) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">{test.name}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <section>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <FileText className="text-blue-600" size={20} />
              Test Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{test.fullDescription}</p>
          </section>

          {/* Clinical Significance */}
          <section>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <Activity className="text-blue-600" size={20} />
              Clinical Significance
            </h3>
            <p className="text-gray-700 leading-relaxed">{test.clinicalSignificance}</p>
          </section>

          {/* Preparation */}
          <section>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <ClipboardList className="text-blue-600" size={20} />
              Preparation Requirements
            </h3>
            <ul className="space-y-2">
              {test.preparation.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Key Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-600" size={18} />
                <span className="font-medium text-gray-900">Report Time</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{test.duration}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="text-blue-600" size={18} />
                <span className="font-medium text-gray-900">Sample Type</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">{test.sampleType}</p>
            </div>
          </div>

          {/* Normal Range */}
          {test.normalRange && (
            <section>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <BarChart3 className="text-blue-600" size={20} />
                Normal Range
              </h3>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-gray-800 font-medium">{test.normalRange}</p>
              </div>
            </section>
          )}

          {/* Price & Close */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div>
              <span className="text-3xl font-bold text-blue-600">
                ₹{test.price.toLocaleString()}
              </span>
              {test.originalPrice && (
                <span className="ml-3 text-base text-gray-500 line-through">
                  ₹{test.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInfoModal;