import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEnquiry } from '../context/EnquiryContext';

export function EnquiryDrawer() {
  const { state, removeItem, closeDrawer, totalProducts, totalUnits } = useEnquiry();
  const navigate = useNavigate();

  const handleReview = () => {
    closeDrawer();
    navigate('/enquiry');
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-[200] backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-[460px] bg-[#F8F5F0] z-[250] flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-label="Wholesale enquiry"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-8 py-6 border-b border-[#E2DDD8]">
              <div>
                <h2 className="font-display text-xl tracking-wide">Your Wholesale Enquiry</h2>
                {totalProducts > 0 && (
                  <p className="label-sm text-[#7A7672] mt-1">
                    {totalProducts} {totalProducts === 1 ? 'PRODUCT' : 'PRODUCTS'} · {totalUnits} TOTAL UNITS
                  </p>
                )}
              </div>
              <button
                onClick={closeDrawer}
                className="p-1 text-[#141412] hover:opacity-60 transition-opacity mt-0.5"
                aria-label="Close enquiry"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <AnimatePresence initial={false}>
                {state.items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FileText size={36} strokeWidth={1} className="text-[#C8C2BC]" />
                    <div>
                      <p className="font-display text-2xl text-[#141412] mb-2">Your enquiry is empty.</p>
                      <p className="font-body text-[0.8rem] text-[#7A7672]">
                        Browse the collection and add pieces to begin.
                      </p>
                    </div>
                    <Link to="/shop" onClick={closeDrawer} className="btn btn-outline mt-2">
                      EXPLORE COLLECTION
                    </Link>
                  </motion.div>
                ) : (
                  <ul className="divide-y divide-[#E2DDD8]" aria-label="Enquiry items">
                    {state.items.map((item) => (
                      <motion.li
                        key={`${item.product.id}-${item.selectedColor}`}
                        className="flex gap-5 px-8 py-5"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.3 }}
                        layout
                      >
                        {/* Thumbnail */}
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeDrawer}
                          className="w-20 h-28 flex-shrink-0 bg-[#EEEAE4] overflow-hidden block"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                            loading="lazy"
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="label-sm text-[#A8A4A0] mb-1">{item.product.category.toUpperCase()}</p>
                              <p className="font-body text-[0.78rem] font-medium text-[#141412] tracking-wide leading-tight">
                                {item.product.name}
                              </p>
                              <p className="label-sm text-[#A8A4A0] mt-1">{item.selectedColor}</p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.selectedColor)}
                              className="text-[#A8A4A0] hover:text-[#141412] transition-colors mt-0.5"
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <X size={14} strokeWidth={1.5} />
                            </button>
                          </div>

                          {/* Size breakdown */}
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-x-3 gap-y-1">
                              {Object.entries(item.sizeQuantities)
                                .filter(([, qty]) => qty > 0)
                                .map(([size, qty]) => (
                                  <span key={size} className="font-body text-[0.65rem] text-[#7A7672] tracking-wide">
                                    {size} ×{qty}
                                  </span>
                                ))}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="label-sm text-[#A8A4A0]">TOTAL</span>
                              <span className="font-body text-[0.8rem] font-medium text-[#141412]">
                                {item.totalQuantity} units
                              </span>
                            </div>
                          </div>

                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={closeDrawer}
                            className="mt-2 font-body text-[0.62rem] tracking-[0.12em] text-[#A8A4A0] hover:text-[#141412] transition-colors uppercase underline underline-offset-2"
                          >
                            Edit quantities
                          </Link>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-[#E2DDD8] px-8 py-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-body text-[0.75rem] text-[#7A7672] tracking-wide">TOTAL UNITS</span>
                  <span className="font-display text-2xl text-[#141412]">{totalUnits}</span>
                </div>
                <button onClick={handleReview} className="btn btn-primary w-full justify-center">
                  REVIEW ENQUIRY
                </button>
                <button
                  onClick={closeDrawer}
                  className="w-full text-center font-body text-[0.62rem] tracking-[0.14em] text-[#7A7672] hover:text-[#141412] transition-colors mt-4"
                >
                  CONTINUE BROWSING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Suppress unused imports
void Minus;
void Plus;
