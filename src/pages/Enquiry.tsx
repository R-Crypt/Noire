import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { fadeUp } from '../utils/animations';

export function Enquiry() {
  const { state, updateItem, removeItem, clearEnquiry, totalProducts, totalUnits } = useEnquiry();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, selectedColor: string, size: string, delta: number) => {
    const item = state.items.find((i) => i.product.id === productId && i.selectedColor === selectedColor);
    if (!item) return;

    const currentQty = item.sizeQuantities[size] || 0;
    const newQty = Math.max(0, currentQty + delta);
    const updatedQuantities = { ...item.sizeQuantities, [size]: newQty };
    const newTotal = Object.values(updatedQuantities).reduce((a, b) => a + b, 0);

    if (newTotal === 0) {
      removeItem(productId, selectedColor);
    } else {
      updateItem(productId, selectedColor, updatedQuantities, newTotal);
    }
  };

  const handleQuantitySet = (productId: string, selectedColor: string, size: string, newQty: number) => {
    const item = state.items.find((i) => i.product.id === productId && i.selectedColor === selectedColor);
    if (!item) return;

    const qty = Math.max(0, Math.min(9999, newQty));
    const updatedQuantities = { ...item.sizeQuantities, [size]: qty };
    const newTotal = Object.values(updatedQuantities).reduce((a, b) => a + b, 0);

    if (newTotal === 0) {
      removeItem(productId, selectedColor);
    } else {
      updateItem(productId, selectedColor, updatedQuantities, newTotal);
    }
  };

  const allMoqMet = state.items.every((item) => item.totalQuantity >= item.product.minimumOrderQuantity);

  return (
    <main className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-12 md:py-20">
        {/* Breadcrumb / Top Back */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2DDD8]">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 label-sm text-[#7A7672] hover:text-[#141412] transition-colors"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            BACK TO COLLECTION
          </Link>
          <span className="label-sm text-[#A8A4A0]">
            STEP 1 OF 2 · ENQUIRY REVIEW
          </span>
        </div>

        {/* Page Title */}
        <div className="mb-12">
          <p className="label-sm text-[#A8A4A0] mb-3">WHOLESALE</p>
          <h1 className="font-display text-4xl md:text-6xl text-[#141412] tracking-tight">
            Review Wholesale Enquiry
          </h1>
          <p className="font-body text-[0.85rem] text-[#7A7672] mt-3 max-w-xl">
            Review your selected pieces and sizing allocation before submitting your wholesale enquiry. Pricing, line sheets, and lead times will be provided upon review.
          </p>
        </div>

        {state.items.length === 0 ? (
          <motion.div
            className="bg-[#EEEAE4] p-16 md:p-24 text-center max-w-2xl mx-auto flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FileText size={40} strokeWidth={1} className="text-[#A8A4A0]" />
            <div>
              <h2 className="font-display text-3xl text-[#141412] mb-3">Your enquiry is currently empty.</h2>
              <p className="font-body text-[0.82rem] text-[#7A7672] max-w-md mx-auto">
                Explore our current collection and allocate your desired sizing to build an enquiry.
              </p>
            </div>
            <Link to="/shop" className="btn btn-primary mt-2">
              EXPLORE COLLECTION
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Items Table / List */}
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD8]">
                <span className="label-sm text-[#141412]">
                  {totalProducts} {totalProducts === 1 ? 'PIECE' : 'PIECES'} SELECTED
                </span>
                <button
                  onClick={clearEnquiry}
                  className="label-sm text-[#A8A4A0] hover:text-[#B91C1C] transition-colors"
                >
                  CLEAR ENQUIRY
                </button>
              </div>

              <div className="space-y-6">
                {state.items.map((item, idx) => {
                  const isMoqMet = item.totalQuantity >= item.product.minimumOrderQuantity;
                  return (
                    <motion.div
                      key={`${item.product.id}-${item.selectedColor}`}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={idx * 0.05}
                      className="bg-white border border-[#E2DDD8] p-6 md:p-8"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Thumbnail */}
                        <Link
                          to={`/product/${item.product.id}`}
                          className="w-full sm:w-32 h-44 bg-[#EEEAE4] overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="label-sm text-[#A8A4A0] mb-1">{item.product.category.toUpperCase()}</p>
                                <Link
                                  to={`/product/${item.product.id}`}
                                  className="font-display text-2xl text-[#141412] hover:text-[#7A7672] transition-colors"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="label-sm text-[#7A7672] mt-1.5">
                                  COLOUR: <span className="text-[#141412]">{item.selectedColor}</span>
                                </p>
                              </div>

                              <button
                                onClick={() => removeItem(item.product.id, item.selectedColor)}
                                className="text-[#A8A4A0] hover:text-[#B91C1C] transition-colors p-1"
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 size={16} strokeWidth={1.5} />
                              </button>
                            </div>

                            {/* MOQ Notice */}
                            <div className="mt-4 flex items-center gap-3">
                              <span className="label-sm text-[#A8A4A0]">
                                MOQ: {item.product.minimumOrderQuantity} UNITS
                              </span>
                              {!isMoqMet && (
                                <span className="label-sm text-[#B91C1C] bg-[#FEE2E2] px-2 py-0.5">
                                  NEED {item.product.minimumOrderQuantity - item.totalQuantity} MORE TO MEET MOQ
                                </span>
                              )}
                              {isMoqMet && (
                                <span className="label-sm text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 flex items-center gap-1">
                                  <CheckCircle2 size={11} /> MOQ MET
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Size Allocation Controls */}
                          <div className="mt-6 pt-6 border-t border-[#E2DDD8]">
                            <p className="label-sm text-[#A8A4A0] mb-3">SIZE ALLOCATION</p>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                              {item.product.sizes.map((size) => {
                                const qty = item.sizeQuantities[size] || 0;
                                return (
                                  <div
                                    key={size}
                                    className="border border-[#E2DDD8] p-2 text-center bg-[#F8F5F0]/50"
                                  >
                                    <div className="label-sm text-[#7A7672] mb-1">{size}</div>
                                    <div className="flex items-center justify-between gap-0 bg-white border border-[#E2DDD8] px-0.5 py-0.5">
                                      <button
                                        type="button"
                                        onClick={() => handleQuantityChange(item.product.id, item.selectedColor, size, -1)}
                                        className="p-1 text-[#7A7672] hover:text-[#141412] transition-colors"
                                        aria-label={`Decrease ${size}`}
                                      >
                                        <Minus size={11} />
                                      </button>
                                      <input
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        value={qty}
                                        onFocus={(e) => e.target.select()}
                                        onChange={(e) => {
                                          const val = e.target.value.replace(/[^0-9]/g, '');
                                          handleQuantitySet(item.product.id, item.selectedColor, size, val === '' ? 0 : parseInt(val, 10));
                                        }}
                                        className="w-10 text-center font-body text-[0.78rem] font-medium text-[#141412] bg-transparent outline-none focus:bg-[#F8F5F0]"
                                        aria-label={`Quantity for ${size}`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleQuantityChange(item.product.id, item.selectedColor, size, 1)}
                                        className="p-1 text-[#7A7672] hover:text-[#141412] transition-colors"
                                        aria-label={`Increase ${size}`}
                                      >
                                        <Plus size={11} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Item Footer */}
                          <div className="mt-4 flex items-center justify-between">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-body text-[0.65rem] tracking-[0.12em] text-[#7A7672] hover:text-[#141412] uppercase underline underline-offset-4"
                            >
                              Edit product details
                            </Link>
                            <p className="font-body text-[0.8rem] text-[#141412]">
                              ITEM TOTAL: <span className="font-medium">{item.totalQuantity} units</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Link
                  to="/shop"
                  className="btn btn-outline"
                >
                  ADD MORE PIECES
                </Link>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#E2DDD8] p-8 sticky top-28 space-y-6">
                <h3 className="font-display text-2xl text-[#141412] tracking-tight pb-4 border-b border-[#E2DDD8]">
                  Enquiry Summary
                </h3>

                <div className="space-y-3 font-body text-[0.8rem]">
                  <div className="flex justify-between text-[#7A7672]">
                    <span>Total Products</span>
                    <span className="text-[#141412] font-medium">{totalProducts}</span>
                  </div>
                  <div className="flex justify-between text-[#7A7672]">
                    <span>Total Units</span>
                    <span className="text-[#141412] font-medium text-lg">{totalUnits}</span>
                  </div>
                </div>

                <div className="py-4 border-y border-[#E2DDD8] space-y-2">
                  <p className="label-sm text-[#A8A4A0]">COMMERCIAL TERMS</p>
                  <p className="font-body text-[0.76rem] text-[#7A7672] leading-relaxed">
                    Official wholesale pricing, tiered discount schedules, freight quotations, and production schedules will be dispatched upon review.
                  </p>
                </div>

                {!allMoqMet && (
                  <div className="p-4 bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E]">
                    <p className="font-body text-[0.74rem] leading-relaxed">
                      One or more pieces do not satisfy the minimum order requirement. You may still proceed with submission, noting special requirements in your enquiry form.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => navigate('/enquiry/request')}
                  className="btn btn-primary w-full justify-center group"
                >
                  PROCEED TO BUYER DETAILS
                  <ArrowRight size={13} className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <p className="label-sm text-center text-[#A8A4A0]">
                  NO PAYMENT REQUIRED AT THIS STAGE
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
