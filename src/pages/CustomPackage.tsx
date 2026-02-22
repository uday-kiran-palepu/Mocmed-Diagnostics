// import { useState } from 'react';
// import { tests } from '../data/tests';
// import { useCart } from '../context/CartContext';

// const CustomPackage = () => {
//   const [selectedTests, setSelectedTests] = useState<string[]>([]);
//   const { addToCart } = useCart();

//   const handleTestToggle = (testId: string) => {
//     setSelectedTests((prev) => prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]);
//   };

//   const totalPrice = tests.filter((test) => selectedTests.includes(test.id)).reduce((sum, test) => sum + test.price, 0);

//   const handleAddToCart = () => {
//     if (selectedTests.length === 0) { alert('Select at least one test'); return; }
//     const selectedTestNames = tests.filter((test) => selectedTests.includes(test.id)).map((test) => test.name);
//     addToCart({ id: `custom-${Math.random()}`, name: 'Custom Health Package', price: totalPrice, type: 'custom', tests: selectedTestNames });
//     setSelectedTests([]);
//   };

//   const categories = [...new Set(tests.map((test) => test.category))];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Build Your Custom Package</h1>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-md p-6">
//               {categories.map((category) => (
//                 <div key={category} className="mb-8">
//                   <h3 className="text-lg font-semibold text-[#0A7DCF] mb-4">{category}</h3>
//                   <div className="space-y-3">
//                     {tests.filter((test) => test.category === category).map((test) => (
//                       <label key={test.id} className="flex items-center p-4 rounded-lg border-2 cursor-pointer">
//                         <input type="checkbox" checked={selectedTests.includes(test.id)} onChange={() => handleTestToggle(test.id)} className="w-5 h-5" />
//                         <span className="ml-4 flex-1">{test.name}</span>
//                         <span className="text-lg font-bold text-[#0A7DCF]">₹{test.price}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 h-fit">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Total: ₹{totalPrice}</h2>
//             <button onClick={handleAddToCart} className="w-full bg-[#0EB39C] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomPackage;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import SearchBar from './components/SearchBar';
// import CategoryFilter from './components/CategoryFilter';
// import TestCard from './components/TestCard';
// import SelectedTestsSidebar from './components/SelectedTestsSidebar';
// import RecommendationSection from './components/RecommendationSection';
// import TestInfoModal from './components/TestInfoModal';
// import {
//   Search,
//   SlidersHorizontal,
//   X,
//   Star,
//   TrendingUp,
//   Clock,
//   Droplet,
//   Coffee,
//   CheckCircle,
//   Home,
//   TestTube,
//   Sparkles,
//   ArrowRight,
// } from 'lucide-react';

// // ── Test Data ───────────────────────────────────────────────────────────────
// const tests = [
//   { id: 'cbc', name: 'Complete Blood Count (CBC)', description: 'Full blood cell analysis', price: 350, duration: '6 hours', sampleType: 'Blood', category: 'blood', fasting: false },
//   { id: 'lft', name: 'Liver Function Test (LFT)', description: 'Liver enzymes & proteins', price: 550, duration: '12 hours', sampleType: 'Blood', category: 'blood', fasting: true },
//   { id: 'kft', name: 'Kidney Function Test (KFT)', description: 'Kidney health markers', price: 500, duration: '12 hours', sampleType: 'Blood', category: 'blood', fasting: true },
//   { id: 'iron', name: 'Iron Studies', description: 'Iron, ferritin & TIBC', price: 700, duration: '24 hours', sampleType: 'Blood', category: 'blood', fasting: true },
//   { id: 'thyroid', name: 'Thyroid Profile (T3,T4,TSH)', description: 'Thyroid hormone levels', price: 450, duration: '24 hours', sampleType: 'Blood', category: 'thyroid', fasting: true },
//   { id: 'vitd', name: 'Vitamin D Test', description: 'Vitamin D level for bones & immunity', price: 800, duration: '24 hours', sampleType: 'Blood', category: 'vitamin', fasting: false },
//   { id: 'vitb12', name: 'Vitamin B12 Test', description: 'B12 for nerves & blood cells', price: 600, duration: '24 hours', sampleType: 'Blood', category: 'vitamin', fasting: true },
//   { id: 'hba1c', name: 'HbA1c', description: '3-month average blood sugar', price: 400, duration: '24 hours', sampleType: 'Blood', category: 'diabetes', fasting: false },
//   { id: 'fbs', name: 'Fasting Blood Sugar (FBS)', description: 'Fasting glucose level', price: 100, duration: '2 hours', sampleType: 'Blood', category: 'diabetes', fasting: true },
//   { id: 'lipid', name: 'Lipid Profile', description: 'Cholesterol & triglycerides', price: 500, duration: '12 hours', sampleType: 'Blood', category: 'cardiac', fasting: true },
//   { id: 'cardiac', name: 'Cardiac Risk Markers', description: 'hs-CRP, homocysteine', price: 1200, duration: '24 hours', sampleType: 'Blood', category: 'cardiac', fasting: true },
//   { id: 'uric', name: 'Uric Acid Test', description: 'Gout & kidney stone risk', price: 250, duration: '6 hours', sampleType: 'Blood', category: 'blood', fasting: true },
//   { id: 'psa', name: 'PSA (Prostate Specific Antigen)', description: 'Prostate health screening', price: 650, duration: '24 hours', sampleType: 'Blood', category: 'cancer', fasting: false },
//   { id: 'ca125', name: 'CA-125', description: 'Ovarian cancer marker', price: 900, duration: '24 hours', sampleType: 'Blood', category: 'cancer', fasting: false },
//   { id: 'crp', name: 'C-Reactive Protein (CRP)', description: 'Inflammation marker', price: 400, duration: '12 hours', sampleType: 'Blood', category: 'infection', fasting: false },
//   { id: 'iga', name: 'IgE (Allergy Panel)', description: 'Allergy screening', price: 1200, duration: '48 hours', sampleType: 'Blood', category: 'allergy', fasting: false },
//   { id: 'beta-hcg', name: 'Beta-hCG', description: 'Pregnancy confirmation', price: 350, duration: '6 hours', sampleType: 'Blood', category: 'pregnancy', fasting: false },
//   { id: 'calcium', name: 'Calcium & Bone Profile', description: 'Bone health markers', price: 600, duration: '12 hours', sampleType: 'Blood', category: 'bone', fasting: true },
// ];

// // ── Dummy Labs with random additional fees ────────────────────────────────
// const labs = [
//   { id: '1', name: 'Apollo Diagnostics', location: 'Mumbai Central', rating: 4.8, extraFee: 200 },
//   { id: '2', name: 'Dr. Lal PathLabs', location: 'Delhi NCR', rating: 4.7, extraFee: 150 },
//   { id: '3', name: 'Thyrocare', location: 'Bangalore', rating: 4.6, extraFee: 100 },
//   { id: '4', name: 'SRL Diagnostics', location: 'Hyderabad', rating: 4.5, extraFee: 250 },
//   { id: '5', name: 'Metropolis Healthcare', location: 'Pune', rating: 4.9, extraFee: 300 },
//   { id: '6', name: 'Pathkind Labs', location: 'Chennai', rating: 4.4, extraFee: 180 },
//   { id: '7', name: 'Redcliffe Labs', location: 'Kolkata', rating: 4.6, extraFee: 220 },
//   { id: '8', name: 'Healthians', location: 'Ahmedabad', rating: 4.7, extraFee: 120 },
//   { id: '9', name: '1mg Labs', location: 'Jaipur', rating: 4.5, extraFee: 280 },
//   { id: '10', name: 'Orange Health Labs', location: 'Lucknow', rating: 4.8, extraFee: 160 },
// ];

// const CustomPackage = () => {
//   const navigate = useNavigate();
//   const [selectedTests, setSelectedTests] = useState<string[]>([]);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredTests, setFilteredTests] = useState(tests);
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedTestInfo, setSelectedTestInfo] = useState(null);
//   const [showInfoModal, setShowInfoModal] = useState(false);
//   const [showLabSelection, setShowLabSelection] = useState(false);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

//   // ── Categories ─────────────────────────────────────────────────────────────
//   const categories = [
//     { id: 'all', name: 'All Tests', count: tests.length },
//     ...[...new Set(tests.map(t => t.category))].map(cat => ({
//       id: cat,
//       name: cat.charAt(0).toUpperCase() + cat.slice(1),
//       count: tests.filter(t => t.category === cat).length,
//     })),
//   ];

//   // ── Filter Tests ───────────────────────────────────────────────────────────
//   useEffect(() => {
//     let result = tests;
//     if (activeCategory !== 'all') {
//       result = result.filter(t => t.category === activeCategory);
//     }
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(t =>
//         t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
//       );
//     }
//     setFilteredTests(result);
//   }, [activeCategory, searchQuery]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       const results = tests.filter(t =>
//         t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
//       ).slice(0, 5);
//       setSuggestions(results);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSuggestionClick = (test) => {
//     if (!selectedTests.includes(test.id)) {
//       setSelectedTests([...selectedTests, test.id]);
//     }
//     setSearchQuery('');
//     setSuggestions([]);
//   };

//   const handleTestToggle = (testId) => {
//     setSelectedTests(prev =>
//       prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
//     );
//   };

//   const handleRemoveTest = (testId) => {
//     setSelectedTests(prev => prev.filter(id => id !== testId));
//   };

//   const handleClearAll = () => {
//     setSelectedTests([]);
//   };

//   const handleProceedNext = () => {
//     if (selectedTests.length === 0) {
//       alert('Please select at least one test');
//       return;
//     }
//     setShowLabSelection(true);
//   };

//   const handleLabSelect = (lab) => {
//     setSelectedLab(lab);
//   };

//   const handleBookTests = () => {
//     if (!selectedLab) {
//       alert('Please select a lab first');
//       return;
//     }
//     setShowLabSelection(false);
//     setShowBookingConfirmation(true);
//   };

//   const getTotalTestsPrice = () => {
//     return selectedTests.reduce((sum, id) => {
//       const test = tests.find(t => t.id === id);
//       return sum + (test ? test.price : 0);
//     }, 0);
//   };

//   const getRecommendations = () => {
//     return tests
//       .filter(t => !selectedTests.includes(t.id))
//       .slice(0, 3)
//       .map(t => ({ ...t, reason: 'Commonly added with your selections' }));
//   };

//   const handleTestInfo = (test) => {
//     setSelectedTestInfo(test);
//     setShowInfoModal(true);
//   };

//   // ── Helper: Format price with discount style like screenshot ───────────────
//   const renderPrice = (currentPrice, originalPrice = null) => {
//     if (!originalPrice || originalPrice <= currentPrice) {
//       return (
//         <span className="text-xl md:text-2xl font-bold text-[#0A7DCF]">
//           ₹{currentPrice.toLocaleString()}
//         </span>
//       );
//     }

//     const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

//     return (
//       <div className="flex flex-col items-start">
//         <div className="flex items-baseline gap-2">
//           <span className="text-xl md:text-2xl font-bold text-[#0A7DCF]">
//             ₹{currentPrice.toLocaleString()}
//           </span>
//           <span className="text-sm md:text-base text-gray-500 line-through">
//             ₹{originalPrice.toLocaleString()}
//           </span>
//         </div>
//         <span className="text-sm md:text-base font-medium text-green-600">
//           {discountPercent}% OFF
//         </span>
//       </div>
//     );
//   };

//   // ── Booking Confirmation Page ──────────────────────────────────────────────
//   if (showBookingConfirmation) {
//     const testsTotal = getTotalTestsPrice();
//     const labFee = selectedLab.extraFee || 0;
//     const totalBeforeDiscount = testsTotal + labFee;
//     const discountPercent = Math.floor(Math.random() * 11) + 5; // 5–15%
//     const discountAmount = Math.round(totalBeforeDiscount * (discountPercent / 100));
//     const finalAmount = totalBeforeDiscount - discountAmount;

//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
//             {/* Success Message */}
//             <div className="text-center mb-10">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
//                 <CheckCircle className="w-12 h-12 text-green-600" />
//               </div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Booking Confirmed!
//               </h1>
//               <p className="text-lg text-gray-600">
//                 Thank you for choosing us. Your booking has been recorded successfully.
//               </p>
//             </div>

//             {/* Selected Lab */}
//             <div className="bg-gray-50 rounded-xl p-6 mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Lab</h2>
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                 <div>
//                   <h3 className="text-xl font-semibold">{selectedLab.name}</h3>
//                   <p className="text-gray-600">{selectedLab.location}</p>
//                   <div className="flex items-center mt-2">
//                     <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                     <span className="ml-1 font-medium">{selectedLab.rating}</span>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-600">Lab Service Fee</p>
//                   <p className="text-xl font-bold text-[#0A7DCF]">₹{labFee.toLocaleString()}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Selected Tests */}
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Tests</h2>
//               <div className="space-y-4">
//                 {selectedTests.map(id => {
//                   const test = tests.find(t => t.id === id);
//                   if (!test) return null;
//                   return (
//                     <div key={id} className="flex justify-between items-center border-b pb-3">
//                       <div>
//                         <p className="font-medium">{test.name}</p>
//                         <p className="text-sm text-gray-600">{test.description}</p>
//                       </div>
//                       {renderPrice(test.price, test.price * 2)}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Pricing Summary */}
//             <div className="bg-gray-50 rounded-xl p-6 mb-10">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between text-lg">
//                   <span>Tests Total:</span>
//                   <span>₹{testsTotal.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-lg">
//                   <span>Lab Service Fee:</span>
//                   <span>₹{labFee.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-lg font-bold border-t pt-4">
//                   <span>Total Before Discount:</span>
//                   <span>₹{totalBeforeDiscount.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-lg text-green-600">
//                   <span>Discount ({discountPercent}%):</span>
//                   <span>-₹{discountAmount.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-2xl font-bold border-t pt-4">
//                   <span>Final Amount:</span>
//                   <span className="text-[#0EB39C]">₹{finalAmount.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() => {
//                   alert("Payment gateway simulation: Payment of ₹" + finalAmount + " successful!");
//                   navigate('/');
//                 }}
//                 className="bg-[#0EB39C] text-white px-10 py-4 rounded-xl font-bold hover:bg-green-700 transition"
//               >
//                 Proceed to Pay ₹{finalAmount.toLocaleString()}
//               </button>

//               <button
//                 onClick={() => {
//                   setShowBookingConfirmation(false);
//                   setSelectedLab(null);
//                 }}
//                 className="px-10 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
//               >
//                 Back to Lab Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Lab Selection Screen ───────────────────────────────────────────────────
//   if (showLabSelection) {
//     const testsTotal = getTotalTestsPrice();

//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
//             Choose a Lab
//           </h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {labs.map(lab => {
//               const finalAmount = testsTotal + lab.extraFee;
//               const discountPercent = Math.floor(Math.random() * 11) + 5;
//               const discountAmount = Math.round(finalAmount * (discountPercent / 100));
//               const payable = finalAmount - discountAmount;

//               return (
//                 <div
//                   key={lab.id}
//                   onClick={() => handleLabSelect(lab)}
//                   className={`p-6 bg-white rounded-xl shadow-md border-2 cursor-pointer transition-all hover:shadow-lg ${
//                     selectedLab?.id === lab.id
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-blue-300'
//                   }`}
//                 >
//                   <h3 className="text-lg font-bold text-gray-900 mb-2">{lab.name}</h3>
//                   <p className="text-sm text-gray-600 mb-2">{lab.location}</p>
//                   <div className="flex items-center mb-3">
//                     <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                     <span className="ml-1 text-sm font-medium">{lab.rating}</span>
//                   </div>

//                   <div className="mt-4 pt-4 border-t">
//                     <p className="text-sm text-gray-600">Tests Total</p>
//                     <p className="text-lg font-bold text-gray-900">₹{testsTotal.toLocaleString()}</p>

//                     <p className="text-sm text-gray-600 mt-2">Lab Fee</p>
//                     <p className="text-lg font-bold text-gray-900">₹{lab.extraFee.toLocaleString()}</p>

//                     <p className="text-sm text-gray-600 mt-2">Final Amount</p>
//                     <p className="text-xl font-bold text-[#0A7DCF]">₹{finalAmount.toLocaleString()}</p>

//                     <p className="text-sm text-green-600 mt-1">
//                       {discountPercent}% OFF → Save ₹{discountAmount.toLocaleString()}
//                     </p>
//                     <p className="text-base font-bold text-green-700 mt-1">
//                       Pay only ₹{payable.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={handleBookTests}
//               disabled={!selectedLab}
//               className={`px-10 py-4 rounded-xl font-bold text-white transition ${
//                 selectedLab
//                   ? 'bg-blue-600 hover:bg-blue-700'
//                   : 'bg-gray-400 cursor-not-allowed'
//               }`}
//             >
//               Proceed to Book the Tests
//             </button>

//             <button
//               onClick={() => setShowLabSelection(false)}
//               className="px-10 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
//             >
//               Back to Tests
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── Main Page ──────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
//           Build Your Custom Health Package
//         </h1>

//         {/* Search */}
//         <SearchBar
//           onSearch={handleSearch}
//           suggestions={suggestions}
//           onSuggestionClick={handleSuggestionClick}
//         />

//         {/* Categories */}
//         <div className="mb-10">
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
//             Browse by Category
//           </h2>
//           <div className="flex flex-wrap gap-3">
//             {categories.map(cat => (
//               <button
//                 key={cat.id}
//                 onClick={() => setActiveCategory(cat.id)}
//                 className={`px-5 py-2.5 rounded-full font-medium transition-all ${
//                   activeCategory === cat.id
//                     ? 'bg-blue-600 text-white shadow-md'
//                     : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
//                 }`}
//               >
//                 {cat.name} ({cat.count})
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Recommendations */}
//         {selectedTests.length > 0 && (
//           <RecommendationSection
//             recommendations={getRecommendations()}
//             onAddTest={(test) => handleTestToggle(test.id)}
//           />
//         )}

//         {/* Test Grid */}
//         <div className="lg:grid lg:grid-cols-4 lg:gap-8">
//           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 lg:mb-0">
//             {filteredTests.length === 0 ? (
//               <div className="col-span-full text-center py-20 text-gray-600 text-lg">
//                 No tests found matching your search or category.
//               </div>
//             ) : (
//               filteredTests.map(test => (
//                 <TestCard
//                   key={test.id}
//                   test={{
//                     ...test,
//                     originalPrice: test.price * 2, // Simulate discount
//                   }}
//                   isSelected={selectedTests.includes(test.id)}
//                   onToggle={() => handleTestToggle(test.id)}
//                   onInfoClick={() => handleTestInfo(test)}
//                   renderPrice={renderPrice} // Pass the helper function
//                 />
//               ))
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1 sticky top-24 self-start">
//             <SelectedTestsSidebar
//               selectedTests={selectedTests.map(id => tests.find(t => t.id === id))}
//               onRemoveTest={handleRemoveTest}
//               onClearAll={handleClearAll}
//               onProceed={handleProceedNext}
//             />
//           </div>
//         </div>
//       </div>

//       <TestInfoModal
//         test={selectedTestInfo}
//         isOpen={showInfoModal}
//         onClose={() => setShowInfoModal(false)}
//       />
//     </div>
//   );
// };

// export default CustomPackage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import TestCard from './components/TestCard';
import SelectedTestsSidebar from './components/SelectedTestsSidebar';
import RecommendationSection from './components/RecommendationSection';
import TestInfoModal from './components/TestInfoModal';
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  TrendingUp,
  Clock,
  Droplet,
  Coffee,
  CheckCircle,
  Home,
  TestTube,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

// ── Test Data ───────────────────────────────────────────────────────────────
const tests = [
  { id: 'cbc', name: 'Complete Blood Count (CBC)', description: 'Full blood cell analysis', price: 350, duration: '6 hours', sampleType: 'Blood', category: 'blood', fasting: false },
  { id: 'lft', name: 'Liver Function Test (LFT)', description: 'Liver enzymes & proteins', price: 550, duration: '12 hours', sampleType: 'Blood', category: 'blood', fasting: true },
  { id: 'kft', name: 'Kidney Function Test (KFT)', description: 'Kidney health markers', price: 500, duration: '12 hours', sampleType: 'Blood', category: 'blood', fasting: true },
  { id: 'iron', name: 'Iron Studies', description: 'Iron, ferritin & TIBC', price: 700, duration: '24 hours', sampleType: 'Blood', category: 'blood', fasting: true },
  { id: 'thyroid', name: 'Thyroid Profile (T3,T4,TSH)', description: 'Thyroid hormone levels', price: 450, duration: '24 hours', sampleType: 'Blood', category: 'thyroid', fasting: true },
  { id: 'vitd', name: 'Vitamin D Test', description: 'Vitamin D level for bones & immunity', price: 800, duration: '24 hours', sampleType: 'Blood', category: 'vitamin', fasting: false },
  { id: 'vitb12', name: 'Vitamin B12 Test', description: 'B12 for nerves & blood cells', price: 600, duration: '24 hours', sampleType: 'Blood', category: 'vitamin', fasting: true },
  { id: 'hba1c', name: 'HbA1c', description: '3-month average blood sugar', price: 400, duration: '24 hours', sampleType: 'Blood', category: 'diabetes', fasting: false },
  { id: 'fbs', name: 'Fasting Blood Sugar (FBS)', description: 'Fasting glucose level', price: 100, duration: '2 hours', sampleType: 'Blood', category: 'diabetes', fasting: true },
  { id: 'lipid', name: 'Lipid Profile', description: 'Cholesterol & triglycerides', price: 500, duration: '12 hours', sampleType: 'Blood', category: 'cardiac', fasting: true },
  { id: 'cardiac', name: 'Cardiac Risk Markers', description: 'hs-CRP, homocysteine', price: 1200, duration: '24 hours', sampleType: 'Blood', category: 'cardiac', fasting: true },
  { id: 'uric', name: 'Uric Acid Test', description: 'Gout & kidney stone risk', price: 250, duration: '6 hours', sampleType: 'Blood', category: 'blood', fasting: true },
  { id: 'psa', name: 'PSA (Prostate Specific Antigen)', description: 'Prostate health screening', price: 650, duration: '24 hours', sampleType: 'Blood', category: 'cancer', fasting: false },
  { id: 'ca125', name: 'CA-125', description: 'Ovarian cancer marker', price: 900, duration: '24 hours', sampleType: 'Blood', category: 'cancer', fasting: false },
  { id: 'crp', name: 'C-Reactive Protein (CRP)', description: 'Inflammation marker', price: 400, duration: '12 hours', sampleType: 'Blood', category: 'infection', fasting: false },
  { id: 'iga', name: 'IgE (Allergy Panel)', description: 'Allergy screening', price: 1200, duration: '48 hours', sampleType: 'Blood', category: 'allergy', fasting: false },
  { id: 'beta-hcg', name: 'Beta-hCG', description: 'Pregnancy confirmation', price: 350, duration: '6 hours', sampleType: 'Blood', category: 'pregnancy', fasting: false },
  { id: 'calcium', name: 'Calcium & Bone Profile', description: 'Bone health markers', price: 600, duration: '12 hours', sampleType: 'Blood', category: 'bone', fasting: true },
];

// ── Dummy Labs ──────────────────────────────────────────────────────────────
const labs = [
  { id: '1', name: 'Apollo Diagnostics', location: 'Mumbai Central', rating: 4.8, extraFee: 200 },
  { id: '2', name: 'Dr. Lal PathLabs', location: 'Delhi NCR', rating: 4.7, extraFee: 150 },
  { id: '3', name: 'Thyrocare', location: 'Bangalore', rating: 4.6, extraFee: 100 },
  { id: '4', name: 'SRL Diagnostics', location: 'Hyderabad', rating: 4.5, extraFee: 250 },
  { id: '5', name: 'Metropolis Healthcare', location: 'Pune', rating: 4.9, extraFee: 300 },
  { id: '6', name: 'Pathkind Labs', location: 'Chennai', rating: 4.4, extraFee: 180 },
  { id: '7', name: 'Redcliffe Labs', location: 'Kolkata', rating: 4.6, extraFee: 220 },
  { id: '8', name: 'Healthians', location: 'Ahmedabad', rating: 4.7, extraFee: 120 },
  { id: '9', name: '1mg Labs', location: 'Jaipur', rating: 4.5, extraFee: 280 },
  { id: '10', name: 'Orange Health Labs', location: 'Lucknow', rating: 4.8, extraFee: 160 },
];

const CustomPackage = () => {
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState(tests);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTestInfo, setSelectedTestInfo] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showLabSelection, setShowLabSelection] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  // ── Categories ─────────────────────────────────────────────────────────────
  const categories = [
    { id: 'all', name: 'All Tests', count: tests.length },
    ...[...new Set(tests.map(t => t.category))].map(cat => ({
      id: cat,
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: tests.filter(t => t.category === cat).length,
    })),
  ];

  // ── Filter Tests ───────────────────────────────────────────────────────────
  useEffect(() => {
    let result = tests;
    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    setFilteredTests(result);
  }, [activeCategory, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const q = query.toLowerCase();
      const results = tests.filter(t =>
        t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      ).slice(0, 5);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (test) => {
    if (!selectedTests.includes(test.id)) {
      setSelectedTests([...selectedTests, test.id]);
    }
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleTestToggle = (testId) => {
    setSelectedTests(prev =>
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  };

  const handleRemoveTest = (testId) => {
    setSelectedTests(prev => prev.filter(id => id !== testId));
  };

  const handleClearAll = () => {
    setSelectedTests([]);
  };

  const handleProceedNext = () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test');
      return;
    }
    setShowLabSelection(true);
  };

  const handleLabSelect = (lab) => {
    setSelectedLab(lab);
  };

  const handleBookTests = () => {
    if (!selectedLab) {
      alert('Please select a lab first');
      return;
    }
    setShowLabSelection(false);
    setShowBookingConfirmation(true);
  };

  const getTotalTestsPrice = () => {
    return selectedTests.reduce((sum, id) => {
      const test = tests.find(t => t.id === id);
      return sum + (test ? test.price : 0);
    }, 0);
  };

  const getRecommendations = () => {
    return tests
      .filter(t => !selectedTests.includes(t.id))
      .slice(0, 3)
      .map(t => ({ ...t, reason: 'Commonly added with your selections' }));
  };

  const handleTestInfo = (test) => {
    setSelectedTestInfo(test);
    setShowInfoModal(true);
  };

  // ── Reusable Price Renderer (matches your screenshot style) ────────────────
  const renderPrice = (currentPrice, originalPrice = null) => {
    if (!originalPrice || originalPrice <= currentPrice) {
      return (
        <span className="text-xl md:text-2xl font-bold text-[#0A7DCF]">
          ₹{currentPrice.toLocaleString()}
        </span>
      );
    }

    const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

    return (
      <div className="flex flex-col items-start">
        <div className="flex items-baseline gap-2">
          <span className="text-xl md:text-2xl font-bold text-[#0A7DCF]">
            ₹{currentPrice.toLocaleString()}
          </span>
          <span className="text-sm md:text-base text-gray-500 line-through">
            ₹{originalPrice.toLocaleString()}
          </span>
        </div>
        <span className="text-sm md:text-base font-medium text-green-600">
          {discountPercent}% OFF
        </span>
      </div>
    );
  };

  // ── Booking Confirmation Page ──────────────────────────────────────────────
  if (showBookingConfirmation) {
    const testsTotal = getTotalTestsPrice();
    const labFee = selectedLab.extraFee || 0;
    const totalBeforeDiscount = testsTotal + labFee;
    const discountPercent = Math.floor(Math.random() * 11) + 5; // 5–15%
    const discountAmount = Math.round(totalBeforeDiscount * (discountPercent / 100));
    const finalAmount = totalBeforeDiscount - discountAmount;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            {/* Success Message */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600">
                Thank you for choosing us. Your booking has been recorded successfully.
              </p>
            </div>

            {/* Selected Lab */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Lab</h2>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedLab.name}</h3>
                  <p className="text-gray-600">{selectedLab.location}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{selectedLab.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Lab Service Fee</p>
                  <p className="text-xl font-bold text-[#0A7DCF]">₹{labFee.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Selected Tests */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Selected Tests</h2>
              <div className="space-y-4">
                {selectedTests.map(id => {
                  const test = tests.find(t => t.id === id);
                  if (!test) return null;
                  return (
                    <div key={id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                      {renderPrice(test.price, test.price * 2)}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Tests Total:</span>
                  <span>₹{testsTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Lab Service Fee:</span>
                  <span>₹{labFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Total Before Discount:</span>
                  <span>₹{totalBeforeDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg text-green-600">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-2xl font-bold border-t pt-4">
                  <span>Final Amount:</span>
                  <span className="text-[#0EB39C]">₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  alert("Payment gateway simulation: Payment of ₹" + finalAmount + " successful!");
                  navigate('/');
                }}
                className="bg-[#0EB39C] text-white px-10 py-4 rounded-xl font-bold hover:bg-green-700 transition"
              >
                Proceed to Pay ₹{finalAmount.toLocaleString()}
              </button>

              <button
                onClick={() => {
                  setShowBookingConfirmation(false);
                  setSelectedLab(null);
                }}
                className="px-10 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
              >
                Back to Lab Selection
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Lab Selection Screen ───────────────────────────────────────────────────
  if (showLabSelection) {
    const testsTotal = getTotalTestsPrice();

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Choose a Lab
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {labs.map(lab => {
              const finalAmount = testsTotal + lab.extraFee;
              const discountPercent = Math.floor(Math.random() * 11) + 5;
              const discountAmount = Math.round(finalAmount * (discountPercent / 100));
              const payable = finalAmount - discountAmount;

              return (
                <div
                  key={lab.id}
                  onClick={() => handleLabSelect(lab)}
                  className={`p-6 bg-white rounded-xl shadow-md border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedLab?.id === lab.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{lab.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{lab.location}</p>
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{lab.rating}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">Tests Total</p>
                    <p className="text-lg font-bold text-gray-900">₹{testsTotal.toLocaleString()}</p>

                    <p className="text-sm text-gray-600 mt-2">Lab Fee</p>
                    <p className="text-lg font-bold text-gray-900">₹{lab.extraFee.toLocaleString()}</p>

                    <p className="text-sm text-gray-600 mt-2">Final Amount</p>
                    <p className="text-xl font-bold text-[#0A7DCF]">₹{finalAmount.toLocaleString()}</p>

                    <p className="text-sm text-green-600 mt-1">
                      {discountPercent}% OFF → Save ₹{discountAmount.toLocaleString()}
                    </p>
                    <p className="text-base font-bold text-green-700 mt-1">
                      Pay only ₹{payable.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleBookTests}
              disabled={!selectedLab}
              className={`px-10 py-4 rounded-xl font-bold text-white transition ${
                selectedLab
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Proceed to Book the Tests
            </button>

            <button
              onClick={() => setShowLabSelection(false)}
              className="px-10 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition"
            >
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Page ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
          Build Your Custom Health Package
        </h1>

        {/* Search */}
        <SearchBar
          onSearch={handleSearch}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {selectedTests.length > 0 && (
          <RecommendationSection
            recommendations={getRecommendations()}
            onAddTest={(test) => handleTestToggle(test.id)}
          />
        )}

        {/* Test Grid */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 lg:mb-0">
            {filteredTests.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-600 text-lg">
                No tests found matching your search or category.
              </div>
            ) : (
              filteredTests.map(test => (
                <TestCard
                  key={test.id}
                  test={{
                    ...test,
                    originalPrice: test.price * 2, // Simulate original price for discount
                  }}
                  isSelected={selectedTests.includes(test.id)}
                  onToggle={() => handleTestToggle(test.id)}
                  onInfoClick={() => handleTestInfo(test)}
                  renderPrice={renderPrice} // Pass the helper function to TestCard
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 sticky top-24 self-start">
            <SelectedTestsSidebar
              selectedTests={selectedTests.map(id => tests.find(t => t.id === id))}
              onRemoveTest={handleRemoveTest}
              onClearAll={handleClearAll}
              onProceed={handleProceedNext}
            />
          </div>
        </div>
      </div>

      <TestInfoModal
        test={selectedTestInfo}
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </div>
  );
};

export default CustomPackage;