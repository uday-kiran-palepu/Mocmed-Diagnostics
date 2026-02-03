import { Phone, MessageCircle } from 'lucide-react';

const FloatingButtons = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-40">
      <button
        onClick={handleWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      <button
        onClick={handleCall}
        className="bg-[#0A7DCF] hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingButtons;
