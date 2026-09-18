import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products, collections, lookbookImages } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Lightbox } from '../components/Lightbox';
import { fadeUp } from '../utils/animations';

const featuredProducts = products.filter((p) => p.featured);

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxImages = lookbookImages.map((lb) => ({ src: lb.src, label: lb.label }));

  return (
    <main>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden" aria-label="NOIRÉ Wholesale Collection">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <img
            src="/images/hero_coat_editorial_1789735455135.jpg"
            alt="NOIRÉ — Wholesale Collection 2026"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <motion.p variants={fadeUp} custom={0} className="font-body text-[0.62rem] tracking-[0.22em] text-white/70 uppercase mb-4">
              WHOLESALE COLLECTION / 26
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-[0.88] tracking-[-0.02em] mb-5 max-w-2xl"
            >
              "Form, proportion, and restraint."
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="font-body text-[0.8rem] text-white/70 mb-10 max-w-sm leading-relaxed tracking-wide"
            >
              Explore the NOIRÉ wholesale collection and build an enquiry for your store.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.3} className="flex items-center gap-4 flex-wrap">
              <Link to="/shop" className="btn btn-outline border-white text-white hover:bg-white hover:text-[#141412]">
                EXPLORE COLLECTION
              </Link>
              <Link to="/wholesale" className="btn btn-ghost text-white/80 hover:text-white" style={{ padding: '0.875rem 0' }}>
                HOW WHOLESALE WORKS <ArrowRight size={12} className="ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── INTRODUCTION ── */}
      <section className="section-padding bg-[#F8F5F0]" aria-label="Wholesale introduction">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-end">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-8">THE COLLECTION</motion.p>
              <motion.h2 variants={fadeUp} custom={0.1} className="font-display text-4xl md:text-5xl lg:text-6xl text-[#141412] leading-[1.05] tracking-tight">
                Contemporary essentials
                <br />
                <em>designed for considered retail.</em>
              </motion.h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.p variants={fadeUp} custom={0.15} className="font-body text-[0.85rem] leading-relaxed text-[#7A7672] max-w-sm md:ml-auto">
                NOIRÉ works with selected boutiques, fashion retailers and independent stores internationally. Each piece is built around proportion, material and restraint.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.25} className="mt-8 md:ml-auto max-w-sm">
                <Link to="/wholesale" className="btn btn-ghost text-[#141412]">
                  HOW WHOLESALE WORKS <ArrowRight size={12} className="ml-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTION ── */}
      <section className="section-padding bg-[#F8F5F0]" aria-label="Featured collection — The New Edit">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="label-sm text-[#A8A4A0] mb-3">FEATURED</p>
              <h2 className="font-display text-3xl md:text-5xl text-[#141412] tracking-tight">The New Edit</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 font-body text-[0.65rem] tracking-[0.16em] text-[#7A7672] hover:text-[#141412] transition-colors group">
              VIEW ALL
              <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="mt-10 flex justify-center md:hidden">
            <Link to="/shop" className="btn btn-outline">VIEW ALL</Link>
          </div>
        </div>
      </section>

      {/* ── WHOLESALE PROCESS ── */}
      <section className="section-padding bg-[#141412]" aria-label="How wholesale works">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-6">THE PROCESS</motion.p>
            <motion.h2 variants={fadeUp} custom={0.1} className="font-display text-4xl md:text-6xl text-white tracking-tight mb-16">
              Wholesale, considered.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {[
              {
                n: '01',
                title: 'EXPLORE',
                body: 'Discover the current NOIRÉ collection. Browse by category or follow the editorial.',
              },
              {
                n: '02',
                title: 'BUILD',
                body: 'Create an enquiry based on the pieces and quantities suited to your store. Specify by size, colour and volume.',
              },
              {
                n: '03',
                title: 'CONNECT',
                body: 'Our sales team reviews your request and follows up regarding pricing, availability and delivery.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.12}
              >
                <p className="label-sm text-[#7A7672] mb-5">{step.n}</p>
                <h3 className="font-display text-2xl text-white mb-4 tracking-tight">{step.title}</h3>
                <div className="w-8 h-px bg-[#2A2A28] mb-5" />
                <p className="font-body text-[0.8rem] leading-relaxed text-[#7A7672]">{step.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.3}
            className="mt-14"
          >
            <Link to="/shop" className="btn btn-outline border-white text-white hover:bg-white hover:text-[#141412]">
              BUILD AN ENQUIRY
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CAMPAIGN ── */}
      <section className="relative overflow-hidden" aria-label="Campaign — The Language of Less">
        <div className="relative h-[60vh] md:h-[80vh] min-h-[400px]">
          <img
            src="/images/campaign_editorial_1789735533438.jpg"
            alt="NOIRÉ — Campaign 2026"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <motion.p variants={fadeUp} custom={0} className="label-sm text-white/60 mb-6">CAMPAIGN 2026</motion.p>
              <motion.h2 variants={fadeUp} custom={0.1} className="font-display text-4xl md:text-7xl text-white leading-tight tracking-tight mb-6">
                "The Language of Less."
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.2} className="font-body text-[0.8rem] text-white/70 max-w-xs mx-auto mb-10">
                Clothing that occupies the right amount of space.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.3}>
                <Link to="/lookbook" className="btn btn-outline border-white text-white hover:bg-white hover:text-[#141412]">
                  VIEW CAMPAIGN
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY SPLIT ── */}
      <section className="section-padding bg-[#F8F5F0]" aria-label="Shop by gender">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Link to="/shop?gender=women" className="group relative block overflow-hidden" aria-label="Shop women">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src="/images/women_category_1789735625285.jpg" alt="NOIRÉ Women" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-display text-4xl md:text-5xl text-white leading-tight tracking-tight">Women</p>
                  <p className="font-body text-[0.65rem] tracking-[0.18em] text-white/70 mt-2 uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    Explore collection <ArrowRight size={10} />
                  </p>
                </div>
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.12}>
              <Link to="/shop?gender=men" className="group relative block overflow-hidden" aria-label="Shop men">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src="/images/men_category_1789735638934.jpg" alt="NOIRÉ Men" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-display text-4xl md:text-5xl text-white leading-tight tracking-tight">Men</p>
                  <p className="font-body text-[0.65rem] tracking-[0.18em] text-white/70 mt-2 uppercase flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    Explore collection <ArrowRight size={10} />
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK ── */}
      <section className="section-padding bg-[#EEEAE4]" aria-label="Lookbook">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-sm text-[#A8A4A0] mb-3">VISUAL</p>
              <h2 className="font-display text-3xl md:text-5xl text-[#141412] tracking-tight">Lookbook</h2>
            </div>
            <Link to="/lookbook" className="hidden md:flex items-center gap-2 font-body text-[0.65rem] tracking-[0.16em] text-[#7A7672] hover:text-[#141412] transition-colors group">
              VIEW ALL <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="col-span-1 md:col-span-1 lg:col-span-2 row-span-2">
              <LookbookItem image={lookbookImages[0]} onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} />
            </div>
            <div className="col-span-1">
              <LookbookItem image={lookbookImages[1]} onClick={() => { setLightboxIndex(1); setLightboxOpen(true); }} />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <LookbookItem image={lookbookImages[2]} onClick={() => { setLightboxIndex(2); setLightboxOpen(true); }} aspectWide />
            </div>
            <div className="col-span-1">
              <LookbookItem image={lookbookImages[3]} onClick={() => { setLightboxIndex(3); setLightboxOpen(true); }} />
            </div>
            <div className="col-span-2 md:col-span-1 lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
              <LookbookItem image={lookbookImages[4]} onClick={() => { setLightboxIndex(4); setLightboxOpen(true); }} />
              <LookbookItem image={lookbookImages[5]} onClick={() => { setLightboxIndex(5); setLightboxOpen(true); }} />
            </div>
          </div>
        </div>
      </section>

      <Lightbox images={lightboxImages} initialIndex={lightboxIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />

      {/* ── COLLECTIONS ── */}
      <section className="section-padding bg-[#F8F5F0]" aria-label="Collections">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-sm text-[#A8A4A0] mb-3">EXPLORE</p>
              <h2 className="font-display text-3xl md:text-5xl text-[#141412] tracking-tight">Collections</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {collections.map((col, i) => (
              <motion.div key={col.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={i * 0.1}>
                <Link to="/collections" className="group block" aria-label={col.title}>
                  <div className="aspect-[3/4] overflow-hidden bg-[#EEEAE4] mb-4">
                    <img src={col.image} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  </div>
                  <p className="label-sm text-[#A8A4A0] mb-1">{col.subtitle}</p>
                  <h3 className="font-body text-[0.82rem] font-medium text-[#141412] tracking-wide mb-2">{col.title}</h3>
                  <p className="font-body text-[0.72rem] text-[#7A7672] line-clamp-2">{col.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHOLESALE CTA ── */}
      <section className="section-padding bg-[#EEEAE4]" aria-label="Start your wholesale enquiry">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="max-w-xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-5">WHOLESALE</motion.p>
              <motion.h2 variants={fadeUp} custom={0.1} className="font-display text-4xl md:text-5xl text-[#141412] tracking-tight mb-4">
                Ready to enquire?
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.2} className="font-body text-[0.82rem] text-[#7A7672] mb-10">
                Browse the collection, build your enquiry by size and quantity, and our sales team will be in touch.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.3} className="flex items-center justify-center gap-4 flex-wrap">
                <Link to="/shop" className="btn btn-primary">EXPLORE COLLECTION</Link>
                <Link to="/wholesale" className="btn btn-outline">HOW IT WORKS</Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface LookbookItemProps {
  image: typeof lookbookImages[0];
  onClick: () => void;
  aspectWide?: boolean;
}

function LookbookItem({ image, onClick, aspectWide }: LookbookItemProps) {
  return (
    <button onClick={onClick} className="group relative block overflow-hidden w-full text-left" aria-label={`View ${image.label}`}>
      <div className={`overflow-hidden ${aspectWide ? 'aspect-video' : 'aspect-[3/4]'}`}>
        <img src={image.src} alt={image.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
      </div>
      <div className="absolute bottom-3 left-3 label-sm text-white bg-black/40 backdrop-blur-sm px-2 py-1">{image.label}</div>
    </button>
  );
}
