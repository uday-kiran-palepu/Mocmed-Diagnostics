// import { Heart, Target, Award, Users, CheckCircle, Activity } from 'lucide-react';

// const About = () => {
//   const values = [
//     { icon: Heart, title: 'Patient-Centric Care', description: 'We put your health first' },
//     { icon: Target, title: 'Accuracy & Precision', description: 'Reliable diagnostic results' },
//     { icon: Award, title: 'Quality Assurance', description: 'NABL accredited' },
//     { icon: Users, title: 'Expert Team', description: 'Experienced professionals' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <div className="flex items-center justify-center space-x-3 mb-6">
//             <Activity className="w-12 h-12 text-[#0A7DCF]" />
//             <div>
//               <h1 className="text-5xl font-bold text-gray-900">Mocmed Diagnostics</h1>
//               <p className="text-xl text-[#0EB39C]">Your Wellness Partner</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
//           <p className="text-gray-600 mb-4 leading-relaxed">
//             We provide comprehensive diagnostic services combining accuracy, convenience, and affordability. Our commitment is to make quality healthcare accessible to everyone.
//           </p>
//         </div>
//       </section>

//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <div key={index} className="bg-white rounded-xl p-6 text-center">
//                 <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <value.icon className="w-8 h-8 text-[#0A7DCF]" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {['NABL Accredited', 'ISO 9001:2015', 'CAP Accredited', 'Quality Control'].map((cert, i) => (
//               <div key={i} className="bg-blue-50 rounded-xl p-6">
//                 <CheckCircle className="w-10 h-10 text-[#0EB39C] mx-auto mb-2" />
//                 <p className="font-semibold">{cert}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;


import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Award, Users, CheckCircle, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Hero background - professional medical diagnostics lab image
const heroBg = "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=2000";

const About = () => {
  const values = [
    { icon: Heart, title: 'Patient-Centric Care', description: 'Your health and comfort are our top priority in every interaction.' },
    { icon: Target, title: 'Accuracy & Precision', description: 'State-of-the-art equipment ensures reliable, error-free results.' },
    { icon: Award, title: 'Quality Assurance', description: 'NABL accredited with strict quality protocols.' },
    { icon: Users, title: 'Expert Team', description: 'Highly qualified pathologists and technicians with years of experience.' },
  ];

  const stats = [
    { number: '10,000+', label: 'Tests Performed Monthly' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24 hrs', label: 'Average Report Delivery' },
    { number: '50+', label: 'Expert Professionals' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[70vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroBg}')`,
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/40" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center text-white z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Activity className="w-16 h-16 text-[#0EB39C]" />
              <div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                  Mocmed Diagnostics
                </h1>
                <p className="text-2xl md:text-3xl font-light mt-3 opacity-90">
                  Your Trusted Wellness Partner
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed opacity-90">
              Delivering accurate, fast, and affordable diagnostic services with care and precision since 2020.
            </p>

            <Link
              to="/packages"
              className="inline-flex items-center gap-3 bg-[#0EB39C] hover:bg-[#0ca489] text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105"
            >
              Explore Our Services
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            To make high-quality diagnostic services accessible, accurate, and convenient for everyone, empowering individuals and doctors with timely insights for better health decisions.
          </p>
        </div>
      </motion.section>

      {/* Stats / Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-br from-blue-50 to-green-50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Why Choose Mocmed?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition"
              >
                <div className="text-5xl font-extrabold text-[#0A7DCF] mb-4">{stat.number}</div>
                <p className="text-lg font-medium text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  <value.icon className="w-10 h-10 text-[#0A7DCF]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certifications */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Certifications & Quality Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {['NABL Accredited', 'ISO 9001:2015 Certified', 'CAP Accredited', 'Strict Quality Control'].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
              >
                <CheckCircle className="w-14 h-14 text-[#0EB39C] mx-auto mb-6" />
                <p className="text-xl font-semibold text-gray-900">{cert}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;