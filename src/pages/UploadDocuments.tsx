import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const UploadDocuments = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents Uploaded Successfully!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Upload Documents</h1>
        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="tel" placeholder="Mobile Number" required className="w-full px-4 py-3 border rounded-lg" />
            <input type="email" placeholder="Email" required className="w-full px-4 py-3 border rounded-lg" />
            <input type="file" className="w-full px-4 py-3 border rounded-lg" />
            <textarea placeholder="Notes / Symptoms" rows={4} className="w-full px-4 py-3 border rounded-lg" />
            <button type="submit" className="w-full bg-[#0A7DCF] text-white px-6 py-3 rounded-lg font-semibold">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
