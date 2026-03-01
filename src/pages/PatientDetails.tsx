// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';

// const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz7wBQiEwrmUmfDfbOpcqPFmlbXTJWB_a9cE02t3uelAqwJVTd6lnaiNQurAI3cvrgeOA/exec';

// const PatientDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Receive data passed from CustomPackage (or Packages page)
//   const { selectedTests = [], selectedLab = null, totalAmount = 0 } = location.state || {};

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     age: '',
//     gender: '',
//     phone: '',
//     altPhone: '',
//     address: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const bookingData = {
//       customer: formData,
//       selectedTests,
//       lab: selectedLab,
//       totalAmount,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       await fetch(GOOGLE_SHEET_WEB_APP_URL, {
//         method: 'POST',
//         mode: 'no-cors', // Required for Google Apps Script
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(bookingData),
//       });

//       alert('Details submitted successfully and saved to Google Sheets!');
//       navigate('/'); // Redirect to home page after success
//     } catch (error) {
//       console.error('Error submitting to Google Sheets:', error);
//       alert('Details submitted, but there was an issue saving to Google Sheets. Check console.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-md mx-auto px-4">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
//         >
//           <ArrowLeft size={20} /> Back
//         </button>

//         <div className="bg-white p-8 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6 text-center">Patient Details</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name *"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email *"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="number"
//               name="age"
//               placeholder="Age *"
//               required
//               value={formData.age}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <select
//               name="gender"
//               required
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Gender *</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number *"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="tel"
//               name="altPhone"
//               placeholder="Alternative Number"
//               value={formData.altPhone}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <textarea
//               name="address"
//               placeholder="Complete Address *"
//               required
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <button 
//               type="submit" 
//               className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
//             >
//               Confirm Your Order
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDetails;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import Confetti from 'react-confetti';

const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz7wBQiEwrmUmfDfbOpcqPFmlbXTJWB_a9cE02t3uelAqwJVTd6lnaiNQurAI3cvrgeOA/exec';

const PatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Counter states
  const [testsBooked, setTestsBooked] = useState(0);
  const [reportsGenerated, setReportsGenerated] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

  const baseTests = 1260;
  const baseReports = 5010;
  const baseSatisfaction = 99;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Counters: fast ramp → then +1/sec forever
  useEffect(() => {
    const rampDuration = 2200;
    const steps = 60;

    const ramp = (start, end, setter) => {
      const inc = (end - start) / steps;
      let current = start;
      const iv = setInterval(() => {
        current += inc;
        setter(Math.floor(current));
        if (current >= end) {
          setter(end);
          clearInterval(iv);
        }
      }, rampDuration / steps);
    };

    ramp(0, baseTests, setTestsBooked);
    ramp(0, baseReports, setReportsGenerated);
    ramp(0, baseSatisfaction, setSatisfaction);

    const slowInterval = setInterval(() => {
      setTestsBooked((p) => p + 1);
      setReportsGenerated((p) => p + 1);
      setSatisfaction((p) => Math.min(p + 0.1, 99.9));
    }, 1000);

    return () => clearInterval(slowInterval);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid';
    if (!formData.age.trim()) newErrors.age = 'Required';
    if (!formData.gender) newErrors.gender = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={250} gravity={0.12} />

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-yellow-200/10 via-pink-200/10 to-blue-200/10 animate-pulse" />

          <div className="relative z-10">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Thank You!
            </h2>

            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              We received your request and our team will get in touch with you shortly.
            </p>

            <p className="text-gray-600 mb-10">
              Expect to hear from us within 24 hours. You're all set!
            </p>

            <button
              onClick={() => navigate('/')}
              className="bg-[#0EB39C] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#0ca58f] transition shadow-lg"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[860px] mx-auto"> {/* Increased width for large devices */}

        {/* Back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#0A7DCF] hover:text-[#0A7DCF]/80 font-medium"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <p className="hidden sm:block text-sm text-gray-600">We usually respond within 24 hours</p>
        </div>

        {/* Stats - top on mobile, left on large */}
        <div className="mb-8 lg:mb-0 lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/60">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 flex items-center gap-2 justify-center lg:justify-start">
                <Sparkles className="text-amber-500" size={20} /> Live Stats
              </h3>

              <div className="grid grid-cols-3 lg:grid-cols-1 gap-5 lg:gap-6 text-center lg:text-left">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#0A7DCF]">
                    {testsBooked.toLocaleString()}+
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Tests Booked Today</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#0EB39C]">
                    {reportsGenerated.toLocaleString()}+
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Reports Generated</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-purple-600">
                    {Math.round(satisfaction)}%
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form - compact, wider on large */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mt-5">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  Send Message
                </h1>
                <p className="text-gray-600 text-base">
                  Get in touch — we’re here to help!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7DCF] transition text-base`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7DCF] transition text-base`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7DCF] transition text-base`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7DCF] transition text-base`}
                    />
                    {errors.age && <p className="mt-1 text-xs text-red-600">{errors.age}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7DCF] transition text-base bg-white`}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Alternative Phone
                  </label>
                  <input
                    type="tel"
                    name="altPhone"
                    placeholder="Alternative number (optional)"
                    value={formData.altPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7DCF] transition text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Complete Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    placeholder="Your full address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A7DCF] transition text-base resize-none`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg flex items-center justify-center gap-3 mt-6"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;