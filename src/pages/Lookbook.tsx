import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { lookbookImages } from '../data/products';
import { Lightbox } from '../components/Lightbox';
import { fadeUp } from '../utils/animations';

const allImages = [
  ...lookbookImages,
  { id: 'extra1', src: '/images/product_wool_coat_1789735492221.jpg', label: 'LOOK 07', aspect: 'tall' as const },
  { id: 'extra2', src: '/images/campaign_editorial_1789735533438.jpg', label: 'CAMPAIGN', aspect: 'wide' as const },
];

export function Lookbook() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxImages = allImages.map((lb) => ({ src: lb.src, label: lb.label }));

  const open = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <main className="pt-[72px]">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <motion.div initial="hidden" animate="visible">
          <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-4">
            VISUAL / 2026
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="font-display text-5xl md:text-7xl text-[#141412] tracking-tight mb-6 max-w-2xl leading-tight"
          >
            The Lookbook
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="font-body text-[0.82rem] text-[#7A7672] max-w-sm"
          >
            A visual record of the season. Edited with intention.
          </motion.p>
        </motion.div>
      </div>

      {/* Asymmetric grid */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 auto-rows-auto">
          {/* Large portrait — spans 2 cols, 2 rows */}
          <motion.button
            className="col-span-2 row-span-2 relative overflow-hidden group"
            onClick={() => open(0)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            aria-label={allImages[0].label}
          >
            <div className="aspect-[3/4]">
              <img src={allImages[0].src} alt={allImages[0].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <LookLabel label={allImages[0].label} />
          </motion.button>

          {/* Top center */}
          <motion.button
            className="col-span-1 relative overflow-hidden group"
            onClick={() => open(1)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            aria-label={allImages[1].label}
          >
            <div className="aspect-[3/4]">
              <img src={allImages[1].src} alt={allImages[1].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <LookLabel label={allImages[1].label} />
          </motion.button>

          {/* Wide landscape — 3 cols */}
          <motion.button
            className="col-span-1 md:col-span-3 relative overflow-hidden group"
            onClick={() => open(2)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            aria-label={allImages[2].label}
          >
            <div className="aspect-video">
              <img src={allImages[2].src} alt={allImages[2].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <LookLabel label={allImages[2].label} />
          </motion.button>

          {/* Bottom of center row */}
          <motion.button
            className="col-span-1 relative overflow-hidden group"
            onClick={() => open(3)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            aria-label={allImages[3].label}
          >
            <div className="aspect-square md:aspect-[3/4]">
              <img src={allImages[3].src} alt={allImages[3].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <LookLabel label={allImages[3].label} />
          </motion.button>

          {/* Row 3 — 4 equal items */}
          {allImages.slice(4).map((img, i) => (
            <motion.button
              key={img.id}
              className="col-span-1 md:col-span-1 lg:col-span-2 relative overflow-hidden group"
              onClick={() => open(i + 4)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              aria-label={img.label}
            >
              <div className="aspect-[3/4]">
                <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <LookLabel label={img.label} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Wholesale Banner */}
      <section className="bg-[#141412] text-white py-20 px-8 md:px-12 mb-16">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="label-sm text-[#A8A4A0] mb-3">WHOLESALE AVAILABILITY</p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight text-white mb-3">
              Stock this collection.
            </h2>
            <p className="font-body text-[0.82rem] text-[#A8A4A0] max-w-md">
              All pieces featured in this lookbook are available for boutique, department store, and international wholesale ordering.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/wholesale" className="btn btn-outline border-white text-white hover:bg-white hover:text-[#141412]">
              WHOLESALE OVERVIEW
            </Link>
            <Link to="/shop" className="btn btn-primary bg-white text-[#141412] hover:bg-[#F8F5F0]">
              VIEW ALL PIECES <ArrowRight size={13} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}

function LookLabel({ label }: { label: string }) {
  return (
    <span className="absolute bottom-3 left-3 label-sm text-white bg-black/40 backdrop-blur-sm px-2 py-1">
      {label}
    </span>
  );
}
