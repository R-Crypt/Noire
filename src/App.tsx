import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnquiryDrawer } from './components/EnquiryDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { EnquiryProvider } from './context/EnquiryContext';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Product } from './pages/Product';
import { Lookbook } from './pages/Lookbook';
import { Collections } from './pages/Collections';
import { About } from './pages/About';
import { Wholesale } from './pages/Wholesale';
import { Enquiry } from './pages/Enquiry';
import { EnquiryRequest } from './pages/EnquiryRequest';
import { EnquirySuccess } from './pages/EnquirySuccess';

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <EnquiryDrawer />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/shop/:category" element={<PageTransition><Shop /></PageTransition>} />
          <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
          <Route path="/collections" element={<PageTransition><Collections /></PageTransition>} />
          <Route path="/lookbook" element={<PageTransition><Lookbook /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/wholesale" element={<PageTransition><Wholesale /></PageTransition>} />
          <Route path="/enquiry" element={<PageTransition><Enquiry /></PageTransition>} />
          <Route path="/enquiry/request" element={<PageTransition><EnquiryRequest /></PageTransition>} />
          <Route path="/enquiry/success" element={<PageTransition><EnquirySuccess /></PageTransition>} />
          <Route path="*" element={
            <PageTransition>
              <div className="min-h-screen flex flex-col items-center justify-center pt-[72px] px-8 text-center bg-[#F8F5F0]">
                <p className="label-sm text-[#A8A4A0] mb-4">404</p>
                <h1 className="font-display text-5xl text-[#141412] mb-4">Page not found.</h1>
                <a href="/" className="btn btn-outline mt-4">RETURN HOME</a>
              </div>
            </PageTransition>
          } />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <EnquiryProvider>
        <AppContent />
      </EnquiryProvider>
    </BrowserRouter>
  );
}

export default App;
