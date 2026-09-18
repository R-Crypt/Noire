import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length >= 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[450] bg-[#F8F5F0] flex flex-col"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          role="dialog"
          aria-label="Search collection"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center px-8 md:px-16 border-b border-[#E2DDD8] h-[72px]">
            <Search size={16} strokeWidth={1.5} className="text-[#A8A4A0] mr-4 flex-shrink-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collection, category..."
              className="flex-1 font-body text-[1rem] md:text-[1.1rem] bg-transparent text-[#141412] placeholder:text-[#C8C2BC] outline-none tracking-wide"
              aria-label="Search products"
            />
            <button onClick={onClose} className="ml-6 p-1 text-[#7A7672] hover:text-[#141412] transition-colors" aria-label="Close search">
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-8 md:px-16 py-10">
            {query.trim().length === 0 && (
              <div>
                <p className="label-sm text-[#A8A4A0] mb-6">BROWSE BY CATEGORY</p>
                <div className="flex flex-wrap gap-3">
                  {['Outerwear', 'Shirts', 'Trousers', 'Knitwear', 'Accessories', 'Jackets', 'Tops'].map((cat) => (
                    <Link
                      key={cat}
                      to={`/shop?category=${cat.toLowerCase()}`}
                      onClick={onClose}
                      className="font-body text-[0.78rem] tracking-wide text-[#141412] border border-[#E2DDD8] px-4 py-2 hover:bg-[#141412] hover:text-white hover:border-[#141412] transition-all duration-200"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {query.trim().length > 0 && results.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center pt-20">
                <p className="font-display text-3xl text-[#C8C2BC] mb-3">No results found.</p>
                <p className="font-body text-[0.8rem] text-[#A8A4A0]">Try a different search term.</p>
              </motion.div>
            )}

            {results.length > 0 && (
              <div>
                <p className="label-sm text-[#A8A4A0] mb-8">
                  {results.length} RESULT{results.length !== 1 ? 'S' : ''} FOR "{query.toUpperCase()}"
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6" role="list" aria-label="Search results">
                  {results.map((product, i) => (
                    <motion.div
                      key={product.id}
                      role="listitem"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35 }}
                    >
                      <Link
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="group block"
                        aria-label={`${product.name} — MOQ ${product.minimumOrderQuantity}`}
                      >
                        <div className="aspect-[3/4] bg-[#EEEAE4] overflow-hidden mb-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        </div>
                        <p className="font-body text-[0.78rem] font-medium text-[#141412]">{product.name}</p>
                        <p className="label-sm text-[#A8A4A0] mt-1">{product.category.toUpperCase()}</p>
                        <p className="label-sm text-[#A8A4A0] mt-0.5">MOQ {product.minimumOrderQuantity}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
