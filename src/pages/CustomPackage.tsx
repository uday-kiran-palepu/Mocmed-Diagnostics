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

// src/pages/CustomPackage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import TestCard from './components/TestCard';
import SelectedTestsSidebar from './components/SelectedTestsSidebar';
import RecommendationSection from './components/RecommendationSection';
import PopularCombinations from './components/PopularCombinations';
import TestInfoModal from './components/TestInfoModal';

// Expanded dummy tests data
const tests = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive blood analysis measuring red cells, white cells, and platelets',
    fullDescription: `Complete Blood Count (CBC) is one of the most common blood tests that provides important information about the types and numbers of cells in your blood, especially red blood cells, white blood cells, and platelets. This test helps doctors check for various disorders including anemia, infection, and many other diseases.`,
    clinicalSignificance: `CBC is essential for diagnosing conditions such as anemia, infections, blood clotting problems, blood cancers, and immune system disorders. It provides baseline health information and helps monitor the effectiveness of treatments.`,
    preparation: [
      'No fasting required for standard CBC',
      'Inform your doctor about any medications you are taking',
      'Stay hydrated before the test',
      'Wear comfortable clothing with easy arm access',
    ],
    normalRange: 'RBC: 4.5-5.5 million cells/mcL, WBC: 4,500-11,000 cells/mcL, Platelets: 150,000-400,000/mcL',
    price: 350,
    originalPrice: 500,
    duration: '6 hours',
    sampleType: 'Blood',
    category: 'blood',
    fasting: false,
  },
  {
    id: 'thyroid',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Complete thyroid function assessment for metabolism and hormone balance',
    fullDescription: `Thyroid Profile test measures the levels of thyroid hormones T3, T4, and TSH in your blood. These hormones regulate metabolism, energy levels, and overall body function. This comprehensive test helps diagnose thyroid disorders including hypothyroidism and hyperthyroidism.`,
    clinicalSignificance: `Essential for diagnosing thyroid disorders that affect metabolism, weight, energy levels, mood, and overall health. Helps monitor thyroid medication effectiveness and detect autoimmune thyroid conditions.`,
    preparation: [
      'Fasting for 8-12 hours recommended',
      'Take thyroid medication after the test if prescribed',
      'Inform about biotin supplements (stop 2 days before)',
      'Schedule test in the morning for accurate TSH levels',
    ],
    normalRange: 'TSH: 0.4-4.0 mIU/L, T3: 80-200 ng/dL, T4: 5-12 mcg/dL',
    price: 450,
    originalPrice: 650,
    duration: '24 hours',
    sampleType: 'Blood',
    category: 'hormone',
    fasting: true,
  },
  {
    id: 'lipid',
    name: 'Lipid Profile',
    description: 'Cholesterol and triglycerides measurement for heart health assessment',
    fullDescription: `Lipid Profile is a comprehensive test that measures cholesterol levels including total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides. This test is crucial for assessing cardiovascular disease risk and monitoring heart health.`,
    clinicalSignificance: `Critical for evaluating risk of heart disease, stroke, and atherosclerosis. Helps guide treatment decisions for cholesterol management and monitors effectiveness of lifestyle changes or medications.`,
    preparation: [
      'Fasting for 9-12 hours is mandatory',
      'Only water is allowed during fasting period',
      'Avoid alcohol for 24 hours before test',
      'Continue regular medications unless advised otherwise',
    ],
    normalRange: 'Total Cholesterol: <200 mg/dL, LDL: <100 mg/dL, HDL: >40 mg/dL, Triglycerides: <150 mg/dL',
    price: 500,
    originalPrice: 700,
    duration: '12 hours',
    sampleType: 'Blood',
    category: 'cardiac',
    fasting: true,
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Hemoglobin)',
    description: 'Long-term blood sugar control indicator for diabetes management',
    fullDescription: `HbA1c test measures your average blood sugar levels over the past 2-3 months. It shows the percentage of hemoglobin proteins in your blood that are coated with sugar. This test is the gold standard for monitoring diabetes control and diagnosing diabetes.`,
    clinicalSignificance: `Essential for diabetes diagnosis and monitoring long-term blood sugar control. Helps assess risk of diabetes complications and guides treatment adjustments. Unlike daily glucose tests, HbA1c provides a comprehensive picture of blood sugar management.`,
    preparation: [
      'No fasting required',
      'Can be done at any time of day',
      'Continue regular medications and meals',
      'Results not affected by recent food intake',
    ],
    normalRange: 'Normal: <5.7%, Prediabetes: 5.7-6.4%, Diabetes: ≥6.5%',
    price: 400,
    originalPrice: 600,
    duration: '24 hours',
    sampleType: 'Blood',
    category: 'diabetes',
    fasting: false,
  },
  {
    id: 'lft',
    name: 'Liver Function Test (LFT)',
    description: 'Comprehensive liver health assessment measuring enzymes and proteins',
    fullDescription: `Liver Function Test (LFT) is a panel of blood tests that measure various enzymes, proteins, and substances produced or processed by the liver. This test helps evaluate liver health, detect liver damage, and monitor liver disease progression or treatment effectiveness.`,
    clinicalSignificance: `Critical for diagnosing liver diseases including hepatitis, cirrhosis, and fatty liver disease. Helps monitor medication side effects on liver, assess liver damage from alcohol, and evaluate overall liver function before surgeries.`,
    preparation: [
      'Fasting for 8-12 hours recommended',
      'Avoid alcohol for 24 hours before test',
      'Inform about all medications and supplements',
      'Stay well hydrated',
    ],
    normalRange: 'ALT: 7-56 U/L, AST: 10-40 U/L, Bilirubin: 0.1-1.2 mg/dL, Albumin: 3.5-5.5 g/dL',
    price: 550,
    originalPrice: 800,
    duration: '12 hours',
    sampleType: 'Blood',
    category: 'blood',
    fasting: true,
  },
  {
    id: 'kft',
    name: 'Kidney Function Test (KFT)',
    description: 'Renal health evaluation measuring creatinine and urea levels',
    fullDescription: `Kidney Function Test (KFT) measures how well your kidneys are filtering waste from your blood. It includes tests for creatinine, blood urea nitrogen (BUN), and electrolytes. This comprehensive panel helps detect kidney disease early and monitor kidney health.`,
    clinicalSignificance: `Essential for detecting kidney disease, monitoring chronic kidney conditions, and assessing kidney function before starting certain medications. Helps evaluate dehydration, urinary tract problems, and overall kidney health.`,
    preparation: [
      'Fasting for 8-10 hours recommended',
      'Avoid high-protein meals before test',
      'Stay normally hydrated',
      'Inform about medications affecting kidney function',
    ],
    normalRange: 'Creatinine: 0.7-1.3 mg/dL, BUN: 7-20 mg/dL, eGFR: >60 mL/min/1.73m²',
    price: 500,
    originalPrice: 750,
    duration: '12 hours',
    sampleType: 'Blood',
    category: 'blood',
    fasting: true,
  },
  {
    id: 'vitd',
    name: 'Vitamin D Test',
    description: 'Vitamin D level measurement for bone health and immunity',
    fullDescription: `Vitamin D test measures the level of vitamin D in your blood, which is essential for bone health, immune function, and overall wellbeing. Vitamin D deficiency is common and can lead to various health problems including weak bones, fatigue, and increased infection risk.`,
    clinicalSignificance: `Important for diagnosing vitamin D deficiency, monitoring supplementation effectiveness, and assessing risk for osteoporosis and bone disorders. Helps evaluate causes of fatigue, muscle weakness, and frequent infections.`,
    preparation: [
      'No fasting required',
      'Can be done at any time',
      'Inform about vitamin D supplements',
      'Continue regular medications',
    ],
    normalRange: 'Sufficient: 30-100 ng/mL, Insufficient: 20-30 ng/mL, Deficient: <20 ng/mL',
    price: 800,
    originalPrice: 1200,
    duration: '24 hours',
    sampleType: 'Blood',
    category: 'hormone',
    fasting: false,
  },
  {
    id: 'vitb12',
    name: 'Vitamin B12 Test',
    description: 'B12 level assessment for nerve function and red blood cell production',
    fullDescription: `Vitamin B12 test measures the amount of vitamin B12 in your blood. This vitamin is crucial for nerve function, red blood cell formation, and DNA synthesis. Deficiency can cause anemia, nerve damage, and cognitive problems.`,
    clinicalSignificance: `Essential for diagnosing pernicious anemia, evaluating causes of fatigue and weakness, and monitoring B12 supplementation. Particularly important for vegetarians, elderly, and those with digestive disorders.`,
    preparation: [
      'Fasting for 6-8 hours recommended',
      'Avoid B12 supplements for 24 hours before test',
      'Continue regular medications',
      'Can be combined with other blood tests',
    ],
    normalRange: 'Normal: 200-900 pg/mL, Borderline: 200-300 pg/mL, Deficient: <200 pg/mL',
    price: 600,
    originalPrice: 900,
    duration: '24 hours',
    sampleType: 'Blood',
    category: 'hormone',
    fasting: true,
  },
  {
    id: 'cardiac',
    name: 'Cardiac Risk Markers',
    description: 'Advanced heart disease risk assessment including CRP and homocysteine',
    fullDescription: `Cardiac Risk Markers test includes advanced biomarkers like high-sensitivity C-reactive protein (hs-CRP), homocysteine, and lipoprotein(a) that help assess cardiovascular disease risk beyond standard cholesterol tests. These markers provide early warning signs of heart disease.`,
    clinicalSignificance: `Critical for identifying individuals at high risk for heart attack and stroke, even with normal cholesterol levels. Helps guide aggressive preventive treatment and lifestyle modifications for cardiovascular health.`,
    preparation: [
      'Fasting for 9-12 hours required',
      'Avoid strenuous exercise for 24 hours',
      'No alcohol for 24 hours before test',
      'Inform about recent infections or inflammation',
    ],
    normalRange: 'hs-CRP: <1.0 mg/L (low risk), Homocysteine: 5-15 μmol/L, Lp(a): <30 mg/dL',
    price: 1200,
    originalPrice: 1800,
    duration: '24 hours',
    sampleType: 'Blood',
    category: 'cardiac',
    fasting: true,
  },
  {
    id: 'fbs',
    name: 'Fasting Blood Sugar (FBS)',
    description: 'Basic glucose level measurement for diabetes screening',
    fullDescription: `Fasting Blood Sugar (FBS) test measures your blood glucose level after an overnight fast. It's a simple yet effective screening tool for diabetes and prediabetes. This test helps identify how well your body regulates blood sugar levels.`,
    clinicalSignificance: `Essential first-line test for diabetes screening and diagnosis. Helps monitor blood sugar control in diabetics and assess risk for developing diabetes. Quick and cost-effective way to evaluate glucose metabolism.`,
    preparation: [
      'Fasting for 8-10 hours mandatory',
      'Only water allowed during fasting',
      'Take diabetes medications after test',
      'Schedule test in early morning',
    ],
    normalRange: 'Normal: 70-100 mg/dL, Prediabetes: 100-125 mg/dL, Diabetes: ≥126 mg/dL',
    price: 100,
    originalPrice: 150,
    duration: '2 hours',
    sampleType: 'Blood',
    category: 'diabetes',
    fasting: true,
  },
  {
    id: 'uric',
    name: 'Uric Acid Test',
    description: 'Uric acid level measurement for gout and kidney stone risk',
    fullDescription: `Uric Acid test measures the amount of uric acid in your blood. High levels can lead to gout, kidney stones, and may indicate kidney problems. This test helps diagnose and monitor conditions related to uric acid metabolism.`,
    clinicalSignificance: `Important for diagnosing gout, monitoring treatment effectiveness, and assessing kidney stone risk. Helps evaluate kidney function and guide dietary modifications for uric acid management.`,
    preparation: [
      'Fasting for 4-6 hours recommended',
      'Avoid high-purine foods for 24 hours',
      'Stay well hydrated',
      'Inform about medications affecting uric acid',
    ],
    normalRange: 'Men: 3.4-7.0 mg/dL, Women: 2.4-6.0 mg/dL',
    price: 250,
    originalPrice: 400,
    duration: '6 hours',
    sampleType: 'Blood',
    category: 'blood',
    fasting: true,
  },
  {
    id: 'iron',
    name: 'Iron Studies',
    description: 'Comprehensive iron level assessment including ferritin and TIBC',
    fullDescription: `Iron Studies is a panel of tests that measure iron levels in your blood, including serum iron, ferritin, transferrin, and total iron-binding capacity (TIBC). This comprehensive test helps diagnose iron deficiency anemia and iron overload conditions.`,
    clinicalSignificance: `Essential for diagnosing different types of anemia, monitoring iron supplementation, and detecting iron overload disorders like hemochromatosis. Helps evaluate causes of fatigue and weakness related to iron imbalance.`,
    preparation: [
      'Fasting for 8-12 hours recommended',
      'Avoid iron supplements for 24 hours',
      'Schedule test in morning for accurate results',
      'Inform about recent blood transfusions',
    ],
    normalRange: 'Serum Iron: 60-170 mcg/dL, Ferritin: 12-300 ng/mL, TIBC: 250-450 mcg/dL',
    price: 700,
    originalPrice: 1000,
    duration: '24 hours',
    sampleType: 'Blood',
    category: 'blood',
    fasting: true,
  },
];

// Dummy labs
const labs = [
  { id: '1', name: 'Lab A', location: 'City A', rating: 4.5 },
  { id: '2', name: 'Lab B', location: 'City B', rating: 4.7 },
  { id: '3', name: 'Lab C', location: 'City C', rating: 4.2 },
  { id: '4', name: 'Lab D', location: 'City D', rating: 4.9 },
  { id: '5', name: 'Lab E', location: 'City E', rating: 4.6 },
  { id: '6', name: 'Lab F', location: 'City F', rating: 4.8 },
  { id: '7', name: 'Lab G', location: 'City G', rating: 4.3 },
  { id: '8', name: 'Lab H', location: 'City H', rating: 4.4 },
  { id: '9', name: 'Lab I', location: 'City I', rating: 4.1 },
  { id: '10', name: 'Lab J', location: 'City J', rating: 4.0 },
];

// Dummy popular combinations
const popularCombinations = [
  {
    id: '1',
    name: 'Basic Checkup',
    description: 'Essential health screening',
    tests: ['cbc', 'thyroid', 'lipid'],
    price: 1200,
    savings: 300,
    popularity: '5000+ users',
  },
  {
    id: '2',
    name: 'Diabetes Package',
    description: 'Comprehensive diabetes monitoring',
    tests: ['hba1c', 'fbs'],
    price: 500,
    savings: 100,
    popularity: '3000+ users',
  },
  // Add more if needed
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

  const categories = [
    { id: 'all', name: 'All Tests', icon: 'Grid3x3', count: tests.length },
    ...[...new Set(tests.map((test) => test.category))].map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      icon: 'TestTube',
      count: tests.filter(test => test.category === category).length,
    })),
  ];

  useEffect(() => {
    let filtered = tests;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(test => test.category === activeCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(test => test.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredTests(filtered);
  }, [activeCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const results = tests.filter(test => test.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (test) => {
    handleTestToggle(test.id);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleTestToggle = (testId: string) => {
    setSelectedTests(prev => prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]);
  };

  const handleRemoveTest = (testId: string) => {
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
      alert('Please select a lab');
      return;
    }
    // Simulate booking - you can add actual logic here (e.g., add to cart)
    alert(`Tests booked at ${selectedLab.name}!`);
    setShowLabSelection(false);
    setSelectedTests([]);
  };

  const getRecommendations = () => {
    return tests.filter(test => !selectedTests.includes(test.id)).slice(0, 3).map(test => ({
      ...test,
      reason: 'Commonly added with your selections',
    }));
  };

  const handleAddCombination = (combo) => {
    const newTestIds = combo.tests.filter(id => !selectedTests.includes(id));
    setSelectedTests([...selectedTests, ...newTestIds]);
  };

  const handleTestInfo = (test) => {
    setSelectedTestInfo(test);
    setShowInfoModal(true);
  };

  if (showLabSelection) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Select a Lab</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map(lab => (
              <div
                key={lab.id}
                onClick={() => handleLabSelect(lab)}
                className={`cursor-pointer p-6 bg-white rounded-xl shadow-md border-2 ${
                  selectedLab?.id === lab.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                } hover:shadow-lg transition`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{lab.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{lab.location}</p>
                <p className="text-sm text-gray-600">Rating: {lab.rating}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleBookTests}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedLab}
            >
              Proceed to Book the Tests
            </button>
            <button
              onClick={() => setShowLabSelection(false)}
              className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Build Your Custom Package</h1>
        <SearchBar onSearch={handleSearch} suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
        <CategoryFilter categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        {selectedTests.length > 0 && (
          <RecommendationSection recommendations={getRecommendations()} onAddTest={handleTestToggle} />
        )}
        <PopularCombinations combinations={popularCombinations} onAddCombination={handleAddCombination} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTests.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 py-12">No tests found. Try a different search or category.</p>
          ) : (
            filteredTests.map(test => (
              <TestCard
                key={test.id}
                test={test}
                isSelected={selectedTests.includes(test.id)}
                onToggle={() => handleTestToggle(test.id)}
                onInfoClick={() => handleTestInfo(test)}
              />
            ))
          )}
        </div>
      </div>
      <SelectedTestsSidebar
        selectedTests={selectedTests.map(id => tests.find(t => t.id === id))}
        onRemoveTest={handleRemoveTest}
        onClearAll={handleClearAll}
        onProceed={handleProceedNext}
      />
      <TestInfoModal test={selectedTestInfo} isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </div>
  );
};

export default CustomPackage;