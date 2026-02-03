import { Link } from 'react-router-dom';
import { Activity, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-8 h-8 text-[#0A7DCF]" />
              <div>
                <h3 className="text-xl font-bold">Mocmed Diagnostics</h3>
                <p className="text-sm text-[#0EB39C]">Your Wellness Partner</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Providing accurate diagnostic services with care and convenience. Your health is our priority.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/custom-package" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Custom Package
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Upload Documents
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Download Reports
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#0A7DCF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#0EB39C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">+91 98765 43210</p>
                  <p className="text-gray-400">+91 98765 43211</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#0EB39C] mt-0.5 flex-shrink-0" />
                <p className="text-gray-400">info@mocmed.com</p>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#0EB39C] mt-0.5 flex-shrink-0" />
                <p className="text-gray-400">
                  123 Medical Center, Health Street, Mumbai - 400001
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mocmed Diagnostics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
