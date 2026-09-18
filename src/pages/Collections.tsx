import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { collections } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { fadeUp } from '../utils/animations';

export function Collections() {
  return (
    <main className="pt-[72px]">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 md:py-24">
        <motion.div initial="hidden" animate="visible">
          <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-4">
            EXPLORE
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="font-display text-5xl md:text-7xl text-[#141412] tracking-tight mb-4"
          >
            Collections
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="font-body text-[0.82rem] text-[#7A7672] max-w-sm"
          >
            Seasonal and ongoing edits, each built around a distinct point of view.
          </motion.p>
        </motion.div>
      </div>

      {/* Collections grid */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 pb-24">
        {/* Feature collection large */}
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Link
            to="/shop"
            className="group relative block overflow-hidden"
            aria-label={collections[0].title}
          >
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={collections[0].image}
                alt={collections[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16">
              <p className="label-sm text-white/60 mb-3">{collections[0].subtitle}</p>
              <h2 className="font-display text-4xl md:text-6xl text-white tracking-tight mb-3">
                {collections[0].title}
              </h2>
              <p className="font-body text-[0.78rem] text-white/70 max-w-xs mb-6">
                {collections[0].description}
              </p>
              <span className="btn btn-outline border-white text-white group-hover:bg-white group-hover:text-[#141412] inline-flex items-center gap-2">
                EXPLORE
                <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Remaining collections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.slice(1).map((col, i) => (
            <motion.div
              key={col.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp}
              custom={i * 0.1}
            >
              <Link
                to="/shop"
                className="group block"
                aria-label={col.title}
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#EEEAE4] mb-5">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <p className="label-sm text-[#A8A4A0] mb-2">{col.subtitle}</p>
                <h2 className="font-body text-[0.85rem] font-medium text-[#141412] tracking-wide mb-2">{col.title}</h2>
                <p className="font-body text-[0.72rem] text-[#7A7672] mb-4">{col.description}</p>
                <span className="flex items-center gap-2 font-body text-[0.65rem] tracking-[0.16em] text-[#141412] group/link">
                  EXPLORE
                  <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
