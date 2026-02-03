import { Heart, Target, Award, Users, CheckCircle, Activity } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Heart, title: 'Patient-Centric Care', description: 'We put your health first' },
    { icon: Target, title: 'Accuracy & Precision', description: 'Reliable diagnostic results' },
    { icon: Award, title: 'Quality Assurance', description: 'NABL accredited' },
    { icon: Users, title: 'Expert Team', description: 'Experienced professionals' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Activity className="w-12 h-12 text-[#0A7DCF]" />
            <div>
              <h1 className="text-5xl font-bold text-gray-900">Mocmed Diagnostics</h1>
              <p className="text-xl text-[#0EB39C]">Your Wellness Partner</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            We provide comprehensive diagnostic services combining accuracy, convenience, and affordability. Our commitment is to make quality healthcare accessible to everyone.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#0A7DCF]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['NABL Accredited', 'ISO 9001:2015', 'CAP Accredited', 'Quality Control'].map((cert, i) => (
              <div key={i} className="bg-blue-50 rounded-xl p-6">
                <CheckCircle className="w-10 h-10 text-[#0EB39C] mx-auto mb-2" />
                <p className="font-semibold">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
