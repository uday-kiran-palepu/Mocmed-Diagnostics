import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import CartDrawer from './components/CartDrawer';

import Home from './pages/Home';
import Packages from './pages/Packages';
import CustomPackage from './pages/CustomPackage';
import UploadDocuments from './pages/UploadDocuments';
import Reports from './pages/Reports';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <CartDrawer />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/custom-package" element={<CustomPackage />} />
              <Route path="/upload" element={<UploadDocuments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <FloatingButtons />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
