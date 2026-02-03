const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600">By using Mocmed Diagnostics, you agree to our terms.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Disclaimer</h2>
            <p className="text-gray-600">Information provided is for informational purposes only. Always consult with a healthcare professional.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
