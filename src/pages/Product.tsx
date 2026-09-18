import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { useEnquiry } from '../context/EnquiryContext';
import { ProductCard } from '../components/ProductCard';
import { QuantityBreakdown } from '../components/QuantityBreakdown';

export function Product() {
  const { id } = useParams<{ id: string }>();
  const { addItem, openDrawer, isInEnquiry } = useEnquiry();

  const product = id ? getProductById(id) : undefined;
  const related = product ? getRelatedProducts(product) : [];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>(
    Object.fromEntries((product?.sizes || []).map((s) => [s, 0]))
  );
  const [addedState, setAddedState] = useState(false);
  const [moqError, setMoqError] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<string | null>('description');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-[72px]">
        <p className="font-display text-3xl text-[#141412] mb-4">Product not found.</p>
        <Link to="/shop" className="btn btn-outline">BACK TO COLLECTION</Link>
      </div>
    );
  }

  const totalQuantity = Object.values(sizeQuantities).reduce((sum, q) => sum + q, 0);
  const moq = product.minimumOrderQuantity;
  const moqMet = totalQuantity >= moq;
  const alreadyInEnquiry = isInEnquiry(product.id);

  const handleSizeChange = (size: string, qty: number) => {
    setMoqError(false);
    setSizeQuantities((prev) => ({ ...prev, [size]: qty }));
  };

  const handleAddToEnquiry = () => {
    if (!moqMet) {
      setMoqError(true);
      setTimeout(() => setMoqError(false), 3000);
      return;
    }
    addItem({
      product,
      selectedColor,
      sizeQuantities,
      totalQuantity,
    });
    setAddedState(true);
    setTimeout(() => {
      setAddedState(false);
      openDrawer();
    }, 800);
  };

  const accordions = [
    { id: 'description', label: 'DESCRIPTION', content: product.details },
    { id: 'materials', label: 'MATERIALS & CARE', content: `${product.materials} ${product.careInstructions}` },
    { id: 'shipping', label: 'SHIPPING & LEAD TIMES', content: 'Lead times vary by collection and volume. Our sales team will confirm availability, delivery windows and shipping terms as part of the wholesale quote process.' },
  ];

  return (
    <main className="pt-[72px]">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-body text-[0.62rem] tracking-wide text-[#A8A4A0]">
            <li><Link to="/" className="hover:text-[#141412] transition-colors">HOME</Link></li>
            <li aria-hidden>/</li>
            <li><Link to="/shop" className="hover:text-[#141412] transition-colors">COLLECTION</Link></li>
            <li aria-hidden>/</li>
            <li className="text-[#141412]">{product.name.toUpperCase()}</li>
          </ol>
        </nav>
      </div>

      {/* Product Layout */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Gallery */}
          <div className="flex gap-4">
            {product.images.length > 1 && (
              <div className="hidden md:flex flex-col gap-3 w-16 flex-shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-full aspect-[3/4] overflow-hidden border transition-all duration-200 ${selectedImage === i ? 'border-[#141412]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={selectedImage === i}
                  >
                    <img src={img} alt={`${product.name} — view ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            <div className="flex-1">
              <div className="aspect-[3/4] overflow-hidden bg-[#EEEAE4] relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
                {product.newArrival && (
                  <span className="absolute top-4 left-4 label-sm bg-[#F8F5F0] text-[#141412] px-2.5 py-1">NEW</span>
                )}
                {alreadyInEnquiry && (
                  <span className="absolute top-4 right-4 label-sm bg-[#141412] text-[#F8F5F0] px-2.5 py-1">IN ENQUIRY</span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex md:hidden gap-2 mt-3">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-14 aspect-[3/4] overflow-hidden border transition-all ${selectedImage === i ? 'border-[#141412]' : 'border-transparent opacity-50'}`} aria-label={`View image ${i + 1}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4">
            <div className="sticky top-[80px]">
              <p className="label-sm text-[#A8A4A0] mb-3">{product.number} — {product.category.toUpperCase()}</p>
              <h1 className="font-display text-3xl md:text-4xl text-[#141412] tracking-tight mb-3">
                {product.name}
              </h1>
              <p className="label-sm text-[#A8A4A0] mb-6">
                WHOLESALE PRICING AVAILABLE ON REQUEST
              </p>

              <p className="font-body text-[0.82rem] leading-relaxed text-[#7A7672] mb-8">
                {product.description}
              </p>

              {/* Colors — informational only */}
              <div className="mb-6">
                <p className="label-sm text-[#A8A4A0] mb-3">AVAILABLE COLOURS</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`font-body text-[0.65rem] tracking-wider px-3 py-1.5 border transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-[#141412] text-[#141412] bg-transparent'
                          : 'border-[#E2DDD8] text-[#A8A4A0] hover:border-[#141412] hover:text-[#141412]'
                      }`}
                      aria-pressed={selectedColor === color}
                      aria-label={`Select colour ${color}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                <p className="font-body text-[0.68rem] text-[#A8A4A0] mt-2 tracking-wide">
                  Colour selected for enquiry: <span className="text-[#141412]">{selectedColor}</span>
                </p>
              </div>

              {/* Quantity Breakdown */}
              <div className="mb-6">
                <QuantityBreakdown
                  sizes={product.sizes}
                  quantities={sizeQuantities}
                  onChange={handleSizeChange}
                  moq={moq}
                  totalQuantity={totalQuantity}
                />
              </div>

              {/* MOQ Error */}
              <AnimatePresence>
                {moqError && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-body text-[0.72rem] text-red-500 tracking-wide mb-4"
                    role="alert"
                  >
                    Minimum wholesale quantity is {moq} units. Please distribute quantities across sizes.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Add to Enquiry */}
              <button
                onClick={handleAddToEnquiry}
                disabled={addedState}
                className={`w-full btn justify-center mb-4 transition-all duration-300 ${
                  addedState
                    ? 'bg-[#4a7c59] border-[#4a7c59] text-white'
                    : moqMet && totalQuantity > 0
                    ? 'btn-primary'
                    : 'btn-outline opacity-70'
                }`}
                aria-live="polite"
                aria-label={addedState ? 'Added to enquiry' : alreadyInEnquiry ? 'Update enquiry' : 'Add to enquiry'}
              >
                <FileText size={14} strokeWidth={1.5} />
                {addedState
                  ? '✓ ADDED TO ENQUIRY'
                  : alreadyInEnquiry
                  ? 'UPDATE ENQUIRY'
                  : totalQuantity === 0
                  ? 'ENTER QUANTITIES ABOVE'
                  : !moqMet
                  ? `ADD TO ENQUIRY (${moq - totalQuantity} MORE NEEDED)`
                  : 'ADD TO ENQUIRY'}
              </button>

              {alreadyInEnquiry && (
                <Link
                  to="/enquiry"
                  className="block w-full text-center font-body text-[0.65rem] tracking-[0.14em] text-[#7A7672] hover:text-[#141412] transition-colors mb-4"
                >
                  REVIEW YOUR ENQUIRY →
                </Link>
              )}

              {/* Accordions */}
              <div className="border-t border-[#E2DDD8]">
                {accordions.map((acc) => (
                  <div key={acc.id} className="border-b border-[#E2DDD8]">
                    <button
                      onClick={() => setAccordionOpen(accordionOpen === acc.id ? null : acc.id)}
                      className="flex items-center justify-between w-full py-4 text-left"
                      aria-expanded={accordionOpen === acc.id}
                      aria-controls={`accordion-${acc.id}`}
                    >
                      <span className="label-sm text-[#141412]">{acc.label}</span>
                      {accordionOpen === acc.id
                        ? <ChevronUp size={14} className="text-[#A8A4A0]" />
                        : <ChevronDown size={14} className="text-[#A8A4A0]" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {accordionOpen === acc.id && (
                        <motion.div
                          id={`accordion-${acc.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-body text-[0.78rem] leading-relaxed text-[#7A7672] pb-5">{acc.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="mb-10">
              <p className="label-sm text-[#A8A4A0] mb-3">CONTINUE EXPLORING</p>
              <h2 className="font-display text-3xl md:text-4xl text-[#141412] tracking-tight">You may also like</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
