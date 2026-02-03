import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 border rounded-lg" />
                <input type="email" placeholder="Email" required className="w-full px-4 py-3 border rounded-lg" />
                <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border rounded-lg" />
                <textarea placeholder="Message" rows={5} required className="w-full px-4 py-3 border rounded-lg" />
                <button type="submit" className="w-full bg-[#0A7DCF] text-white px-6 py-3 rounded-lg font-semibold">Send</button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Phone className="w-6 h-6 text-[#0A7DCF] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <Mail className="w-6 h-6 text-[#0A7DCF] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@mocmed.com</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <MapPin className="w-6 h-6 text-[#0A7DCF] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600">123 Medical Center, Mumbai - 400001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
