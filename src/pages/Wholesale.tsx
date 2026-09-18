import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp } from '../utils/animations';

const retailers = [
  { label: 'BOUTIQUES', desc: 'Independent fashion boutiques seeking a considered contemporary offer.' },
  { label: 'RETAIL STORES', desc: 'Multi-brand fashion retailers with a premium, curated positioning.' },
  { label: 'DEPARTMENT STORES', desc: 'Contemporary fashion floors within larger retail environments.' },
  { label: 'ONLINE RETAILERS', desc: 'Digital-first stores focused on a refined, contemporary assortment.' },
  { label: 'INTERNATIONAL BUYERS', desc: 'Wholesale buyers operating across key international fashion markets.' },
];

export function Wholesale() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] overflow-hidden" aria-label="NOIRÉ Wholesale">
        <img
          src="/images/about_hero_1789735774360.jpg"
          alt="NOIRÉ — Wholesale, designed for considered retail"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24"
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} custom={0} className="label-sm text-white/60 mb-4">WHOLESALE</motion.p>
          <motion.h1 variants={fadeUp} custom={0.1} className="font-display text-5xl md:text-7xl text-white leading-tight tracking-tight max-w-xl mb-4">
            Designed for considered retail.
          </motion.h1>
          <motion.p variants={fadeUp} custom={0.2} className="font-body text-[0.82rem] text-white/70 max-w-sm mb-10">
            NOIRÉ works with selected retailers and independent stores internationally. Explore the collection and submit an enquiry to begin a wholesale conversation.
          </motion.p>
          <motion.div variants={fadeUp} custom={0.3} className="flex items-center gap-4 flex-wrap">
            <Link to="/shop" className="btn btn-outline border-white text-white hover:bg-white hover:text-[#141412]">
              EXPLORE COLLECTION
            </Link>
            <Link to="/enquiry/request" className="btn btn-ghost text-white/80 hover:text-white" style={{ padding: '0.875rem 0' }}>
              BUILD AN ENQUIRY <ArrowRight size={12} className="ml-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Who We Work With */}
      <section className="section-padding bg-[#F8F5F0]" aria-label="Who we work with">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-8">WHO WE WORK WITH</motion.p>
            <motion.h2 variants={fadeUp} custom={0.1} className="font-display text-4xl md:text-5xl text-[#141412] tracking-tight mb-12 max-w-xl">
              Selected retailers with a considered point of view.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E2DDD8]">
            {retailers.map((r, i) => (
              <motion.div
                key={r.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.08}
                className="bg-[#F8F5F0] p-8"
              >
                <p className="label-sm text-[#141412] mb-3">{r.label}</p>
                <p className="font-body text-[0.78rem] leading-relaxed text-[#7A7672]">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-[#141412]" aria-label="How wholesale works">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-6">THE PROCESS</motion.p>
            <motion.h2 variants={fadeUp} custom={0.1} className="font-display text-4xl md:text-6xl text-white tracking-tight mb-16">
              Wholesale, considered.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                n: '01', title: 'EXPLORE',
                body: 'Discover the current NOIRÉ collection. Browse by category, gender or collection. Each piece is presented with its minimum order quantity and available colourways.',
              },
              {
                n: '02', title: 'BUILD',
                body: 'Create a wholesale enquiry based on the pieces suited to your store. Select your colour and distribute quantities across sizes. You can add multiple products to a single enquiry.',
              },
              {
                n: '03', title: 'CONNECT',
                body: 'Submit your enquiry along with your business information. Our sales team reviews your request and follows up regarding pricing, availability, delivery timelines and next steps.',
              },
            ].map((step, i) => (
              <motion.div key={step.n} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.12}>
                <p className="label-sm text-[#7A7672] mb-5">{step.n}</p>
                <h3 className="font-display text-2xl text-white mb-4 tracking-tight">{step.title}</h3>
                <div className="w-8 h-px bg-[#2A2A28] mb-5" />
                <p className="font-body text-[0.8rem] leading-relaxed text-[#7A7672]">{step.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.35} className="mt-14 flex items-center gap-4 flex-wrap">
            <Link to="/shop" className="btn btn-outline border-white text-white hover:bg-white hover:text-[#141412]">
              EXPLORE COLLECTION
            </Link>
            <Link to="/enquiry/request" className="btn btn-ghost text-[#7A7672] hover:text-white" style={{ padding: '0.875rem 0' }}>
              REQUEST A QUOTE DIRECTLY
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Key images split */}
      <section className="grid grid-cols-1 md:grid-cols-2" aria-label="Collection preview">
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative group">
          <img src="/images/collection_ss26_1789735823177.jpg" alt="NOIRÉ Spring / Summer 26" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8">
            <p className="label-sm text-white/60 mb-2">NEW SEASON</p>
            <p className="font-display text-3xl text-white tracking-tight">Spring / Summer 26</p>
          </div>
        </div>
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden relative group">
          <img src="/images/collection_essentials_1789735918038.jpg" alt="NOIRÉ The Essentials" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-8 left-8">
            <p className="label-sm text-white/60 mb-2">ONGOING</p>
            <p className="font-display text-3xl text-white tracking-tight">The Essentials</p>
          </div>
        </div>
      </section>

      {/* Wholesale Enquiry CTA */}
      <section className="section-padding bg-[#EEEAE4]" aria-label="Wholesale enquiry CTA">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
            <motion.p variants={fadeUp} custom={0} className="label-sm text-[#A8A4A0] mb-5">WHOLESALE ENQUIRY</motion.p>
            <motion.h2 variants={fadeUp} custom={0.1} className="font-display text-4xl md:text-6xl text-[#141412] tracking-tight mb-4">
              "Begin a conversation."
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.2} className="font-body text-[0.82rem] text-[#7A7672] max-w-sm mx-auto mb-10">
              Explore the collection, build your enquiry and submit your business details. Our sales team will respond to all genuine enquiries.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.3} className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/shop" className="btn btn-primary">EXPLORE COLLECTION</Link>
              <Link to="/enquiry" className="btn btn-outline">REVIEW ENQUIRY</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
