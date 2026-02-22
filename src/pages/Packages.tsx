// import { CheckCircle } from 'lucide-react';
// import { packages } from '../data/packages';
// import { useCart } from '../context/CartContext';

// const Packages = () => {
//   const { addToCart } = useCart();

//   const handleAddToCart = (pkg: typeof packages[0]) => {
//     addToCart({ id: pkg.id, name: pkg.name, price: pkg.price, type: 'package', tests: pkg.tests });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Health Packages</h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {packages.map((pkg) => (
//             <div key={pkg.id} className="bg-white rounded-xl shadow-md p-6">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
//               <p className="text-gray-600 mb-4">{pkg.description}</p>
//               <p className="text-3xl font-bold text-[#0A7DCF] mb-4">₹{pkg.price}</p>
//               <button onClick={() => handleAddToCart(pkg)} className="w-full bg-[#0EB39C] hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Packages;

// ---------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
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
import { useCart } from '../context/CartContext';

// ── Config / Theme constants ────────────────────────────────────────────────
const BRAND_COLOR_PRIMARY = '#0A7DCF';
const BRAND_COLOR_SECONDARY = '#0EB39C';
const BRAND_COLOR_ACCENT = '#F97316';

const UNIFIED_CARD_IMAGE = "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800";
const HERO_IMAGE = "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=2000";

const LAB_NAME = "MediTrust Diagnostics";
const LAB_SUBTITLE = "NABL & ISO 15189 Accredited • Trusted by 1.2 Lakh+ Customers";

const CATEGORIES = [
  'Full Body Checkup',
  'Cardiac Health',
  'Diabetes',
  'Thyroid',
  'Liver Function',
  'Kidney Function',
  'Women Health',
  'Men Health',
];

const PRICE_RANGES = [
  { value: '0-1000',   label: 'Under ₹1,000' },
  { value: '1000-2500', label: '₹1,000 – ₹2,500' },
  { value: '2500-5000', label: '₹2,500 – ₹5,000' },
  { value: '5000+',     label: '₹5,000+' },
];

// ── Original 16 packages (unchanged) ────────────────────────────────────────────
const packagesData = [
  // Full Body Checkup
  {
    id: 1,
    name: "Complete Health Checkup Premium",
    category: "Full Body Checkup",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    tests: 85,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: true,
    rating: 4.8,
    reviews: 2847,
    description: "Comprehensive screening covering cardiac, liver, kidney, thyroid, diabetes & vitamins.",
  },
  {
    id: 2,
    name: "Full Body Vital Screening",
    category: "Full Body Checkup",
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    tests: 58,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.6,
    reviews: 1342,
    description: "Essential full body check covering major organs and metabolic health markers.",
  },

  // Cardiac Health
  {
    id: 3,
    name: "Cardiac Risk Assessment",
    category: "Cardiac Health",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    tests: 42,
    reportTime: "12 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: true,
    rating: 4.7,
    reviews: 1923,
    description: "Advanced heart screening with lipid profile, ECG & inflammation markers.",
  },
  {
    id: 4,
    name: "Heart Health Advanced",
    category: "Cardiac Health",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    tests: 55,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.8,
    reviews: 987,
    description: "Complete cardiac evaluation including enzymes, ECG and stress markers.",
  },

  // Diabetes
  {
    id: 5,
    name: "Diabetes Management Package",
    category: "Diabetes",
    price: 999,
    originalPrice: 1799,
    discount: 44,
    tests: 28,
    reportTime: "6 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.6,
    reviews: 1456,
    description: "HbA1c, fasting & post-meal glucose, insulin & kidney function monitoring.",
  },
  {
    id: 6,
    name: "Diabetes Care Plus",
    category: "Diabetes",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    tests: 38,
    reportTime: "12 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.7,
    reviews: 1123,
    description: "Extended diabetes screening with pancreatic function & neuropathy markers.",
  },

  // Thyroid
  {
    id: 7,
    name: "Thyroid Function Complete",
    category: "Thyroid",
    price: 799,
    originalPrice: 1299,
    discount: 38,
    tests: 15,
    reportTime: "12 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    popular: false,
    rating: 4.5,
    reviews: 987,
    description: "T3, T4, TSH, antibodies for full thyroid health evaluation.",
  },
  {
    id: 8,
    name: "Thyroid Advanced Profile",
    category: "Thyroid",
    price: 1199,
    originalPrice: 1999,
    discount: 40,
    tests: 22,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: false,
    homeCollection: true,
    popular: false,
    rating: 4.6,
    reviews: 765,
    description: "Includes reverse T3 & detailed autoimmune thyroid markers.",
  },

  // Liver Function
  {
    id: 9,
    name: "Liver Function Advanced",
    category: "Liver Function",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    tests: 24,
    reportTime: "12 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.6,
    reviews: 876,
    description: "Complete liver enzymes, bilirubin, protein & hepatitis screening.",
  },
  {
    id: 10,
    name: "Liver Health Complete",
    category: "Liver Function",
    price: 1299,
    originalPrice: 2199,
    discount: 41,
    tests: 32,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.7,
    reviews: 654,
    description: "Extended liver panel with fibrosis markers & fatty liver assessment.",
  },

  // Kidney Function
  {
    id: 11,
    name: "Kidney Function Complete",
    category: "Kidney Function",
    price: 799,
    originalPrice: 1399,
    discount: 43,
    tests: 22,
    reportTime: "12 Hours",
    sampleType: "Blood & Urine",
    fastingRequired: false,
    homeCollection: true,
    popular: false,
    rating: 4.5,
    reviews: 743,
    description: "Creatinine, BUN, electrolytes, urine analysis & GFR calculation.",
  },
  {
    id: 12,
    name: "Renal Health Advanced",
    category: "Kidney Function",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    tests: 35,
    reportTime: "24 Hours",
    sampleType: "Blood & Urine",
    fastingRequired: false,
    homeCollection: true,
    popular: false,
    rating: 4.6,
    reviews: 521,
    description: "Extended kidney screening with stone risk & electrolyte balance.",
  },

  // Women Health
  {
    id: 13,
    name: "Women's Health Wellness",
    category: "Women Health",
    price: 2199,
    originalPrice: 3999,
    discount: 45,
    tests: 62,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: true,
    rating: 4.9,
    reviews: 2134,
    description: "Hormonal profile, reproductive health, bone density, thyroid & anemia screening.",
  },
  {
    id: 14,
    name: "PCOD & Hormonal Balance",
    category: "Women Health",
    price: 1899,
    originalPrice: 3299,
    discount: 42,
    tests: 48,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.7,
    reviews: 987,
    description: "Specialized for PCOS/PCOD with hormonal, insulin & ovarian marker screening.",
  },

  // Men Health
  {
    id: 15,
    name: "Men's Health Vitality",
    category: "Men Health",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    tests: 58,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.7,
    reviews: 1678,
    description: "Testosterone, PSA, cardiac, liver, kidney & complete metabolic panel.",
  },
  {
    id: 16,
    name: "Prostate & Men's Wellness",
    category: "Men Health",
    price: 1699,
    originalPrice: 2899,
    discount: 41,
    tests: 45,
    reportTime: "24 Hours",
    sampleType: "Blood",
    fastingRequired: true,
    homeCollection: true,
    popular: false,
    rating: 4.6,
    reviews: 912,
    description: "Focused on prostate health, testosterone & male hormonal balance screening.",
  }
];

export default function Packages() {
  const { addToCart } = useCart();
  const location = useLocation();

  const [filters, setFilters] = useState({
    searchQuery: '',
    categories: [],
    priceRanges: [],
    homeCollection: false,
    noFasting: false,
    sortBy: 'popular',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterPackages = () => {
    let filtered = [...packagesData];

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query) ||
          pkg.category.toLowerCase().includes(query)
      );
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((pkg) => filters.categories.includes(pkg.category));
    }

    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter((pkg) => {
        return filters.priceRanges.some((range) => {
          if (range === '5000+') return pkg.price >= 5000;
          const [min, max] = range.split('-').map(Number);
          return pkg.price >= min && (max ? pkg.price <= max : true);
        });
      });
    }

    if (filters.homeCollection) filtered = filtered.filter((pkg) => pkg.homeCollection);
    if (filters.noFasting) filtered = filtered.filter((pkg) => !pkg.fastingRequired);

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        filtered.sort((a, b) => Number(b.popular) - Number(a.popular));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredPackages = filterPackages();

  const handleAddToCart = (pkg) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      type: 'package',
      tests: [],
    });
    setToastMessage(`${pkg.name} added to cart!`);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      priceRanges: [],
      homeCollection: false,
      noFasting: false,
      sortBy: 'popular',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up">
          <CheckCircle className="w-6 h-6" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hero */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white py-14 sm:py-20 lg:py-28 xl:py-32"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">Health Packages</h1>
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto">
            Choose from our expertly curated diagnostic packages designed for complete health monitoring
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header + Mobile Filter Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Available Packages</h2>
            <p className="text-gray-600 mt-1">
              Showing {filteredPackages.length} of {packagesData.length} packages
            </p>
          </div>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-medium shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-full lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-20 bg-white rounded-2xl shadow-md p-6 border max-h-[82vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" />
                  Filters
                </h3>
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-[${BRAND_COLOR_PRIMARY}] hover:underline font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-7">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${BRAND_COLOR_PRIMARY}] focus:border-[${BRAND_COLOR_PRIMARY}] text-base transition"
                />
              </div>

              {/* Sort By */}
              <div className="mb-7">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${BRAND_COLOR_PRIMARY}] text-base"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Categories */}
              <div className="mb-7">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat)}
                      onChange={() => {
                        const newCats = filters.categories.includes(cat)
                          ? filters.categories.filter((c) => c !== cat)
                          : [...filters.categories, cat];
                        setFilters({ ...filters, categories: newCats });
                      }}
                      className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>

              {/* Price Range */}
              <div className="mb-7">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                {PRICE_RANGES.map((range) => (
                  <label key={range.value} className="flex items-center gap-2 mb-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.priceRanges.includes(range.value)}
                      onChange={() => {
                        const newRanges = filters.priceRanges.includes(range.value)
                          ? filters.priceRanges.filter((r) => r !== range.value)
                          : [...filters.priceRanges, range.value];
                        setFilters({ ...filters, priceRanges: newRanges });
                      }}
                      className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>

              {/* Special Features */}
              <div className="space-y-3.5">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.homeCollection}
                    onChange={(e) => setFilters({ ...filters, homeCollection: e.target.checked })}
                    className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Home Collection Available</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.noFasting}
                    onChange={(e) => setFilters({ ...filters, noFasting: e.target.checked })}
                    className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">No Fasting Required</span>
                </label>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="flex-1">
            {filteredPackages.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No packages found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={handleClearFilters}
                  className="px-7 py-3 bg-[${BRAND_COLOR_PRIMARY}] text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-7 lg:gap-8">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full max-w-[380px] sm:max-w-none mx-auto"
                  >
                    <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
                      <img
                        src={UNIFIED_CARD_IMAGE}
                        alt={pkg.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {pkg.popular && (
                        <span className="absolute top-4 left-4 bg-[${BRAND_COLOR_ACCENT}] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                          <TrendingUp className="w-4 h-4" /> Popular
                        </span>
                      )}
                      {pkg.discount > 0 && (
                        <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                          {pkg.discount}% OFF
                        </span>
                      )}
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-[${BRAND_COLOR_PRIMARY}] bg-blue-50 px-3 py-1 rounded-full">
                          {pkg.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-gray-800 text-sm">{pkg.rating}</span>
                          <span className="text-xs text-gray-500">({pkg.reviews})</span>
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {pkg.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-3">
                        {pkg.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                        <div className="flex items-center gap-2">
                          <TestTube className="w-4 h-4 text-[${BRAND_COLOR_PRIMARY}]" />
                          <span>{pkg.tests} Tests</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[${BRAND_COLOR_PRIMARY}]" />
                          <span>{pkg.reportTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplet className="w-4 h-4 text-[${BRAND_COLOR_PRIMARY}]" />
                          <span>{pkg.sampleType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {pkg.fastingRequired ? (
                            <Coffee className="w-4 h-4 text-amber-600" />
                          ) : (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                          <span>{pkg.fastingRequired ? "Fasting" : "No Fasting"}</span>
                        </div>
                      </div>

                      {pkg.homeCollection && (
                        <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3.5 py-2 rounded-lg mb-6 text-xs font-medium">
                          <Home className="w-4 h-4" />
                          Free Home Collection
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-6 mt-auto">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-bold text-[${BRAND_COLOR_PRIMARY}]">
                            ₹{pkg.price.toLocaleString()}
                          </span>
                          {pkg.originalPrice > pkg.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{pkg.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {pkg.discount > 0 && (
                          <span className="text-green-600 font-medium text-sm">{pkg.discount}% OFF</span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <button
                          onClick={() => handleAddToCart(pkg)}
                          className="flex-1 bg-[${BRAND_COLOR_SECONDARY}] hover:bg-green-700 text-white py-3 rounded-xl font-medium transition text-sm shadow-sm"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="flex-1 border-2 border-[${BRAND_COLOR_PRIMARY}] text-[${BRAND_COLOR_PRIMARY}] hover:bg-blue-50 py-3 rounded-xl font-medium transition text-sm"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom Package Card */}
        <div className="mt-12 sm:mt-16 p-8 md:p-12 bg-gradient-to-r from-[${BRAND_COLOR_PRIMARY}] to-[${BRAND_COLOR_SECONDARY}] text-white rounded-3xl text-center shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-7 h-7" />
            Can't find the perfect package?
          </h3>
          <p className="text-lg sm:text-xl opacity-90 mb-7 max-w-2xl mx-auto">
            Build your own custom health package — select exactly the tests you need
          </p>
          <Link
            to="/custom-package"
            className="inline-flex items-center gap-3 bg-white text-[${BRAND_COLOR_PRIMARY}] px-8 py-4 rounded-2xl font-semibold text-base hover:bg-gray-100 transition shadow-lg"
          >
            Build Custom Package
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-3 hover:bg-gray-100 rounded-full">
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="space-y-7">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${BRAND_COLOR_PRIMARY}] text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-base"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(cat)}
                        onChange={() => {
                          const newCats = filters.categories.includes(cat)
                            ? filters.categories.filter((c) => c !== cat)
                            : [...filters.categories, cat];
                          setFilters({ ...filters, categories: newCats });
                        }}
                        className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-5 h-5"
                      />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
                  {PRICE_RANGES.map((range) => (
                    <label key={range.value} className="flex items-center gap-2.5 mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.priceRanges.includes(range.value)}
                        onChange={() => {
                          const newRanges = filters.priceRanges.includes(range.value)
                            ? filters.priceRanges.filter((r) => r !== range.value)
                            : [...filters.priceRanges, range.value];
                          setFilters({ ...filters, priceRanges: newRanges });
                        }}
                        className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-5 h-5"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-4 pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.homeCollection}
                      onChange={(e) => setFilters({ ...filters, homeCollection: e.target.checked })}
                      className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-5 h-5"
                    />
                    <span className="text-sm text-gray-700">Home Collection Available</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.noFasting}
                      onChange={(e) => setFilters({ ...filters, noFasting: e.target.checked })}
                      className="rounded text-[${BRAND_COLOR_PRIMARY}] focus:ring-[${BRAND_COLOR_PRIMARY}] w-5 h-5"
                    />
                    <span className="text-sm text-gray-700">No Fasting Required</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            className="fixed inset-0 bg-black/65 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPackage(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[92vh] overflow-y-auto"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-7 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-8">{selectedPackage.name}</h2>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="text-gray-500 hover:text-gray-800 transition p-1"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-7">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium">
                        {selectedPackage.category}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base">
                      {selectedPackage.description}
                    </p>
                  </div>
                  <img
                    src={UNIFIED_CARD_IMAGE}
                    alt={selectedPackage.name}
                    className="w-full sm:w-48 md:w-56 h-44 sm:h-48 object-cover rounded-xl shadow-md"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">{LAB_NAME}</h4>
                  <p className="text-gray-600 text-sm">
                    {LAB_SUBTITLE}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">Laboratory Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded-full text-sm">Automated Analyzers</span>
                    <span className="bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded-full text-sm">ELISA & CLIA</span>
                    <span className="bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded-full text-sm">Digital Pathology</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">Impact:</h4>
                  <p className="text-gray-700">
                    Helped thousands of patients detect health issues early with high accuracy and fast reporting.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3">Key Features:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2 text-[15px] sm:text-base">
                    <li>{selectedPackage.tests} essential diagnostic tests</li>
                    <li>Results in {selectedPackage.reportTime.toLowerCase()}</li>
                    <li>{selectedPackage.homeCollection ? 'Free' : 'Available'} home sample collection</li>
                    <li>Expert medical review & consultation</li>
                    <li>Digital reports with easy access</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4">Metrics:</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-[${BRAND_COLOR_PRIMARY}]">{selectedPackage.tests}</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">Tests</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-[${BRAND_COLOR_PRIMARY}]">{selectedPackage.reviews}+</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">Reviews</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-[${BRAND_COLOR_PRIMARY}]">98%</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-1">Satisfaction</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-5 border-t">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedPackage);
                      setSelectedPackage(null);
                    }}
                    className="flex-1 bg-[${BRAND_COLOR_SECONDARY}] hover:bg-green-700 text-white py-3.5 rounded-xl font-medium transition text-base shadow-sm"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setSelectedPackage(null)}
                    className="flex-1 border-2 border-[${BRAND_COLOR_PRIMARY}] text-[${BRAND_COLOR_PRIMARY}] hover:bg-blue-50 py-3.5 rounded-xl font-medium transition text-center text-base"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}