import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const Reports = () => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPlaceholder(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Download Your Reports</h1>
        <div className="bg-white rounded-xl shadow-md p-8">
          {!showPlaceholder ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="tel" placeholder="Mobile Number" required className="w-full px-4 py-3 border rounded-lg" />
              <input type="text" placeholder="Report Code" required className="w-full px-4 py-3 border rounded-lg" />
              <input type="email" placeholder="Email" required className="w-full px-4 py-3 border rounded-lg" />
              <button type="submit" className="w-full bg-[#0A7DCF] text-white px-6 py-3 rounded-lg font-semibold">View Report</button>
            </form>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Backend Integration Coming Soon</h2>
              <p className="text-gray-600 mt-2">This is a demo screen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
