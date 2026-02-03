// import { Link } from 'react-router-dom';
// import { Heart, Users, Clock, Award, Home as HomeIcon, FileText, CheckCircle, Star, ArrowRight } from 'lucide-react';
// import { packages } from '../data/packages';
// import { testimonials } from '../data/testimonials';
// import { useCart } from '../context/CartContext';

// const Home = () => {
//   const { addToCart } = useCart();

//   const handleAddToCart = (pkg: typeof packages[0]) => {
//     addToCart({
//       id: pkg.id,
//       name: pkg.name,
//       price: pkg.price,
//       type: 'package',
//       tests: pkg.tests,
//     });
//   };

//   const features = [
//     { icon: Award, title: 'Certified Technicians', description: 'Trained professionals with years of experience' },
//     { icon: HomeIcon, title: 'At-Home Sample Collection', description: 'Convenient doorstep service' },
//     { icon: Clock, title: 'Fast & Accurate Reports', description: 'Results within 24-48 hours' },
//     { icon: Heart, title: 'Affordable Pricing', description: 'Quality diagnostics at competitive rates' },
//     { icon: CheckCircle, title: 'NABL Partnered Labs', description: 'Accredited laboratories' },
//     { icon: Users, title: '24/7 Support', description: 'Always available to assist' },
//   ];

//   const steps = [
//     { number: '01', title: 'Book your package', description: 'Choose from our health packages' },
//     { number: '02', title: 'Home visit for sample collection', description: 'Our technician visits you' },
//     { number: '03', title: 'Download your report', description: 'Access results online' },
//   ];

//   const popularPackages = packages.slice(0, 6);

//   return (
//     <div className="min-h-screen">
//       <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-4xl mx-auto">
//             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//               Comprehensive Diagnostic Services at <span className="text-[#0A7DCF]">Your Convenience</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Accurate tests, home sample collection, expert care — designed for your well-being.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link to="/packages" className="bg-[#0A7DCF] hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center">
//                 Explore Packages <ArrowRight className="ml-2 w-5 h-5" />
//               </Link>
//               <Link to="/contact" className="bg-[#0EB39C] hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all inline-flex items-center justify-center">
//                 Book Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Health Packages</h2>
//             <p className="text-lg text-gray-600">Comprehensive health screening packages tailored to your needs</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {popularPackages.map((pkg) => (
//               <div key={pkg.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
//                 <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-500 mb-2">Includes {pkg.tests.length} tests:</p>
//                   <ul className="text-sm text-gray-600 space-y-1">
//                     {pkg.tests.slice(0, 3).map((test, index) => (
//                       <li key={index} className="flex items-start">
//                         <CheckCircle className="w-4 h-4 text-[#0EB39C] mr-2 mt-0.5 flex-shrink-0" />
//                         {test}
//                       </li>
//                     ))}
//                     {pkg.tests.length > 3 && <li className="text-[#0A7DCF] font-medium">+{pkg.tests.length - 3} more tests</li>}
//                   </ul>
//                 </div>
//                 <div className="flex items-end justify-between mb-4">
//                   <p className="text-3xl font-bold text-[#0A7DCF]">₹{pkg.price}</p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-2">
//                   <Link to="/packages" className="flex-1 border border-[#0A7DCF] text-[#0A7DCF] px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center">
//                     View Details
//                   </Link>
//                   <button onClick={() => handleAddToCart(pkg)} className="flex-1 bg-[#0EB39C] hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all">
//                 <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
//                   <feature.icon className="w-8 h-8 text-[#0A7DCF]" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {steps.map((step, index) => (
//               <div key={index} className="relative">
//                 <div className="bg-gradient-to-br from-[#0A7DCF] to-[#0EB39C] rounded-xl p-8 text-white">
//                   <div className="text-5xl font-bold opacity-20 mb-4">{step.number}</div>
//                   <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
//                   <p className="text-blue-50">{step.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial) => (
//               <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
//                 <div className="flex mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
//                 <p className="text-gray-900 font-semibold">— {testimonial.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Star,
  ArrowRight,
  Activity,
  Droplet,
  Calendar,
  Phone,
  CheckCircle,
  FileText,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  Quote,
  Home as HomeIcon,
  Search,
} from 'lucide-react';

// ── Hero Content ──────────────────────────────────────────────────────────
const HERO_TITLE = "Your Wellness Partner for Accurate Diagnostics";
const HERO_DESCRIPTION =
  "Experience healthcare excellence with our comprehensive diagnostic services. From routine checkups to specialized tests, we're committed to your health journey with precision, care, and convenience.";

const HERO_IMAGES = [
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1cac3c4b8-1768764885880.png",
    alt: "Modern medical laboratory with advanced diagnostic equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=1200",
    alt: "Lab technician examining test samples",
  },
  {
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1cac3c4b8-1768764885880.png",
    alt: "Professional clinical sample collection",
  },
];

// ── Packages, Features, Steps, Testimonials ───────────────────────────────
const PACKAGES = [
  {
    id: 1,
    name: "Complete Health Checkup",
    description: "Comprehensive screening covering blood, organ function & metabolic markers",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    tests: 85,
    popular: true,
    features: ["Fasting Required", "Home Collection", "Report in 24 hrs"],
  },
  {
    id: 2,
    name: "Diabetes Care Package",
    description: "HbA1c, glucose levels, kidney function assessment",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    tests: 42,
    popular: false,
    features: ["Fasting Required", "Home Collection", "Report in 12 hrs"],
  },
  {
    id: 3,
    name: "Heart Health Package",
    description: "Lipid profile, ECG, cardiac enzymes & inflammation markers",
    price: 1799,
    originalPrice: 2799,
    discount: 36,
    tests: 38,
    popular: true,
    features: ["Fasting Required", "Home Collection", "Report in 24 hrs"],
  },
  {
    id: 4,
    name: "Women Wellness Package",
    description: "Hormonal profile, thyroid, vitamin levels & reproductive markers",
    price: 2199,
    originalPrice: 3499,
    discount: 37,
    tests: 65,
    popular: false,
    features: ["No Fasting", "Home Collection", "Report in 24 hrs"],
  },
];

const FEATURES = [
  { icon: Award, title: "NABL Certified", desc: "Highest quality standards & accurate results", color: "#0A7DCF" },
  { icon: Clock, title: "Quick Reports", desc: "Results within 24 hours", color: "#0EB39C" },
  { icon: HomeIcon, title: "Home Collection", desc: "Safe & convenient doorstep service", color: "#0A7DCF" },
  { icon: Shield, title: "99.9% Accuracy", desc: "Advanced equipment & expert technicians", color: "#0EB39C" },
];

const STEPS = [
  { num: "01", title: "Choose Your Test", desc: "Browse our catalog or search for tests/packages", icon: Search, color: "#0A7DCF" },
  { num: "02", title: "Book Appointment", desc: "Select date/time for lab or home collection", icon: Calendar, color: "#0EB39C" },
  { num: "03", title: "Sample Collection", desc: "Certified professionals collect samples safely", icon: Droplet, color: "#0A7DCF" },
  { num: "04", title: "Get Your Report", desc: "Accurate reports delivered within 24 hours – online access", icon: FileText, color: "#0EB39C" },
];

const TESTIMONIALS = [
  { name: "Rajesh Kumar", text: "Excellent service! Home collection was very convenient and reports on time.", rating: 5 },
  { name: "Priya Sharma", text: "Very impressed with accuracy and quick turnaround time.", rating: 5 },
  { name: "Amit Patel", text: "Best diagnostic center — affordable packages and skilled staff.", rating: 5 },
  { name: "Sneha Reddy", text: "Outstanding experience from booking to report delivery.", rating: 5 },
  { name: "Vikram Singh", text: "Highly professional — perfect for senior citizens.", rating: 5 },
];

// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = HERO_IMAGES[heroIndex];

  function handlePrevTestimonial() {
    setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  }

  function handleNextTestimonial() {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero Section (exactly matching your Rocket layout + single rotating image) ── */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 lg:pt-32 pb-12 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#0A7DCF] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0EB39C] rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0A7DCF] bg-opacity-10 rounded-full mb-4 lg:mb-6">
                <Award className="w-5 h-5 text-[#0A7DCF]" />
                <span className="text-sm font-semibold text-[#0A7DCF]">NABL Certified Lab</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                Your Wellness Partner for <span className="text-[#0A7DCF]">Accurate Diagnostics</span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                {HERO_DESCRIPTION}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/packages#top"
                  className="bg-[#0A7DCF] text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <Calendar className="w-5 h-5 mr-2" /> Book Appointment
                </Link>
                <button
                  onClick={() => window.location.href = "tel:+15551234567"}
                  className="border-2 border-[#0A7DCF] text-[#0A7DCF] px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" /> Emergency: +1 555-123-4567
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0A7DCF]">50K+</div>
                  <div className="text-xs md:text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0EB39C]">500+</div>
                  <div className="text-xs md:text-sm text-gray-600">Tests Available</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#0A7DCF]">24/7</div>
                  <div className="text-xs md:text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right side - single rotating image + badges (exact positioning from your Rocket code) */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  key={heroIndex}
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover transition-opacity duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Bottom-left badge */}
              <div className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-xl shadow-lg p-4 lg:p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-teal-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 lg:w-7 lg:h-7 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-lg lg:text-xl font-bold text-gray-900">99.9%</div>
                    <div className="text-xs lg:text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                </div>
              </div>

              {/* Top-right badge */}
              <div className="absolute -top-4 -right-4 lg:-right-8 bg-white rounded-xl shadow-lg p-4 lg:p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 lg:w-7 lg:h-7 text-[#0A7DCF]" />
                  </div>
                  <div>
                    <div className="text-lg lg:text-xl font-bold text-gray-900">24 Hours</div>
                    <div className="text-xs lg:text-sm text-gray-600">Report Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Packages ──────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">Popular Health Packages</h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose from our carefully curated diagnostic packages designed for comprehensive health monitoring and early detection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 pt-10 ${
                  pkg.popular ? 'border-teal-200 bg-teal-50/20' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Popular
                    </span>
                  </div>
                )}

                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-3xl lg:text-4xl font-bold text-[#0A7DCF]">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-3">
                        ₹{pkg.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold">{pkg.discount}% OFF</span>
                  </div>

                  <div className="text-sm text-gray-600 mb-6">
                    Includes <span className="font-semibold text-gray-900">{pkg.tests} tests</span>
                  </div>

                  <Link
                    to="/packages#top"
                    className="block w-full bg-[#0EB39C] text-white py-3.5 rounded-lg font-medium text-center hover:bg-teal-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">Your Trusted Healthcare Partner</h2>
          <p className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto">
            Experience excellence in diagnostic services with our commitment to accuracy, convenience, and patient care
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
                  <f.icon className="w-7 h-7" style={{ color: f.color }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works (classic Rocket style) ──────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get your diagnostic tests done in four simple steps with complete convenience and accuracy
            </p>
          </div>

          {/* Gradient line (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-[#0A7DCF] via-[#0EB39C] to-[#0EB39C] opacity-30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  <div className="relative inline-block mb-6">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto relative z-10"
                      style={{ backgroundColor: `${step.color}15` }}
                    >
                      <step.icon className="w-9 h-9" style={{ color: step.color }} />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold z-20"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>

                {/* Arrow between steps (desktop only) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-8 h-8 text-[#0A7DCF]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Read testimonials from our satisfied patients who trust us with their healthcare needs
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="flex justify-center mb-6">
              {Array(TESTIMONIALS[testimonialIndex].rating)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="w-7 h-7 text-yellow-400 fill-current mx-1" />
                ))}
            </div>

            <p className="text-xl lg:text-2xl text-gray-800 italic text-center mb-8 leading-relaxed">
              "{TESTIMONIALS[testimonialIndex].text}"
            </p>

            <p className="text-center font-bold text-lg">{TESTIMONIALS[testimonialIndex].name}</p>
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={handlePrevTestimonial}
              className="p-4 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextTestimonial}
              className="p-4 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}