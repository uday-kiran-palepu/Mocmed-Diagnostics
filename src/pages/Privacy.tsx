const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-xl shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600">Mocmed Diagnostics is committed to protecting your privacy.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Collection</h2>
            <p className="text-gray-600">We collect personal and medical information for diagnostic purposes.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
            <p className="text-gray-600">We use SSL encryption and security protocols to protect your data.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
