import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Menu, FileText } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

const navLinks = [
  { label: 'COLLECTION', href: '/shop' },
  { label: 'WOMEN', href: '/shop?gender=women' },
  { label: 'MEN', href: '/shop?gender=men' },
  { label: 'ACCESSORIES', href: '/shop?category=accessories' },
  { label: 'LOOKBOOK', href: '/lookbook' },
  { label: 'WHOLESALE', href: '/wholesale' },
];

const mobileLinks = [
  { label: 'COLLECTION', href: '/shop' },
  { label: 'WOMEN', href: '/shop?gender=women' },
  { label: 'MEN', href: '/shop?gender=men' },
  { label: 'ACCESSORIES', href: '/shop?category=accessories' },
  { label: 'LOOKBOOK', href: '/lookbook' },
  { label: 'WHOLESALE', href: '/wholesale' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/about#contact' },
];

interface NavbarProps {
  onSearchOpen: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalProducts, openDrawer } = useEnquiry();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navBg = isHomePage
    ? scrolled
      ? 'bg-[#F8F5F0]/95 backdrop-blur-sm border-b border-[#E2DDD8]'
      : 'bg-transparent'
    : 'bg-[#F8F5F0]/95 backdrop-blur-sm border-b border-[#E2DDD8]';

  const textColor = isHomePage && !scrolled ? 'text-white' : 'text-[#141412]';
  const logoColor = isHomePage && !scrolled ? 'text-white' : 'text-[#141412]';
  const underlineColor = isHomePage && !scrolled ? 'bg-white' : 'bg-[#141412]';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[400] transition-all duration-500 ${navBg}`} role="banner">
        <div className="max-w-[1440px] mx-auto px-8 md:px-12">
          <nav className="flex items-center justify-between h-[64px] md:h-[72px]" aria-label="Main navigation">
            {/* Logo */}
            <Link
              to="/"
              className={`font-display text-xl tracking-[0.22em] font-medium transition-colors duration-300 ${logoColor}`}
              aria-label="NOIRÉ — Wholesale"
            >
              NOIRÉ
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-body text-[0.6rem] tracking-[0.16em] font-medium uppercase transition-all duration-300 relative group ${textColor}`}
                >
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${underlineColor}`} />
                </Link>
              ))}
            </div>

            {/* Desktop Right */}
            <div className={`hidden lg:flex items-center gap-5 ${textColor}`}>
              <button
                onClick={onSearchOpen}
                className="p-1 transition-opacity duration-200 hover:opacity-60"
                aria-label="Open search"
              >
                <Search size={15} strokeWidth={1.5} />
              </button>
              <button
                onClick={openDrawer}
                className="flex items-center gap-2 p-1 transition-opacity duration-200 hover:opacity-60"
                aria-label={`Wholesale enquiry — ${totalProducts} products`}
              >
                <FileText size={15} strokeWidth={1.5} />
                <span className="font-body text-[0.6rem] tracking-[0.14em]">
                  ENQUIRY ({totalProducts})
                </span>
              </button>
            </div>

            {/* Mobile Right */}
            <div className={`flex lg:hidden items-center gap-4 ${textColor}`}>
              <button
                onClick={openDrawer}
                className="flex items-center gap-1.5"
                aria-label={`Enquiry — ${totalProducts} products`}
              >
                <FileText size={16} strokeWidth={1.5} />
                {totalProducts > 0 && (
                  <span className="font-body text-[0.6rem] tracking-wider">({totalProducts})</span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={18} strokeWidth={1.5} />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={18} strokeWidth={1.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[350] bg-[#F8F5F0] flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
          >
            <div className="flex items-center justify-between h-[64px] px-6 border-b border-[#E2DDD8]">
              <Link to="/" className="font-display text-xl tracking-[0.22em] font-medium text-[#141412]">NOIRÉ</Link>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col justify-center flex-1 px-8" aria-label="Mobile navigation">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
                >
                  <Link
                    to={link.href}
                    className="block py-4 font-display text-3xl text-[#141412] tracking-tight border-b border-[#E2DDD8] hover:text-[#7A7672] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 py-8 border-t border-[#E2DDD8] flex items-center gap-6">
              <button onClick={onSearchOpen} className="label-sm flex items-center gap-2 text-[#141412]">
                <Search size={14} strokeWidth={1.5} />
                SEARCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
