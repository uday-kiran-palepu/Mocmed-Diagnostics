import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz7wBQiEwrmUmfDfbOpcqPFmlbXTJWB_a9cE02t3uelAqwJVTd6lnaiNQurAI3cvrgeOA/exec';

const PatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive data passed from CustomPackage (or Packages page)
  const { selectedTests = [], selectedLab = null, totalAmount = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    phone: '',
    altPhone: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      customer: formData,
      selectedTests,
      lab: selectedLab,
      totalAmount,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      alert('Details submitted successfully and saved to Google Sheets!');
      navigate('/'); // Redirect to home page after success
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      alert('Details submitted, but there was an issue saving to Google Sheets. Check console.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Patient Details</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="age"
              placeholder="Age *"
              required
              value={formData.age}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="altPhone"
              placeholder="Alternative Number"
              value={formData.altPhone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="address"
              placeholder="Complete Address *"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button 
              type="submit" 
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Submit & Save to Google Sheets
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;