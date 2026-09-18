import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { useEnquiry } from '../context/EnquiryContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { isInEnquiry } = useEnquiry();
  const inEnquiry = isInEnquiry(product.id);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block"
        aria-label={`${product.name} — MOQ ${product.minimumOrderQuantity} units`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-[#EEEAE4] aspect-[3/4] mb-4">
          <img
            src={primaryImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              hovered && secondaryImage ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} — alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'
              }`}
              loading="lazy"
            />
          )}

          {/* Tags */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.newArrival && (
              <span className="label-sm bg-[#F8F5F0] text-[#141412] px-2.5 py-1 block">NEW</span>
            )}
            {inEnquiry && (
              <span className="label-sm bg-[#141412] text-[#F8F5F0] px-2.5 py-1 block">IN ENQUIRY</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className={`transition-all duration-300 ${hovered ? '-translate-y-0.5' : 'translate-y-0'}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="label-sm text-[#7A7672] mb-1">{product.number} — {product.category.toUpperCase()}</p>
              <h3 className="font-body text-[0.82rem] font-medium text-[#141412] tracking-wide">
                {product.name}
              </h3>
            </div>
            <p className="label-sm text-[#A8A4A0] whitespace-nowrap pt-0.5">
              MOQ {product.minimumOrderQuantity}
            </p>
          </div>
          <p className="font-body text-[0.7rem] text-[#A8A4A0] mt-1 tracking-wide">
            {product.colors.join(' / ')}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
