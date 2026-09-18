import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';

export function About() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden" aria-label="About NOIRÉ">
        <img
          src="/images/about_hero_1789735774360.jpg"
          alt="NOIRÉ — A space where clothing lives"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-16 md:pb-24"
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} custom={0} className="label-sm text-white/60 mb-4">
            ABOUT
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            className="font-display text-5xl md:text-7xl text-white leading-tight tracking-tight max-w-xl"
          >
            Built around
            <br />
            <em>restraint.</em>
          </motion.h1>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[#F8F5F0]">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-display text-4xl md:text-5xl text-[#141412] tracking-tight leading-[1.05]"
              >
                NOIRÉ explores contemporary clothing through proportion, material and movement.
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="space-y-6"
            >
              <motion.p variants={fadeUp} custom={0.1} className="font-body text-[0.82rem] leading-relaxed text-[#7A7672]">
                Each piece begins with a question about proportion. How something falls from the shoulder, how fabric negotiates space, what stays and what gives. These are not decorative concerns.
              </motion.p>
              <motion.p variants={fadeUp} custom={0.2} className="font-body text-[0.82rem] leading-relaxed text-[#7A7672]">
                The work is quiet by design. Not because of an aversion to presence, but because the loudest statement is often no statement at all.
              </motion.p>
              <motion.p variants={fadeUp} custom={0.3} className="font-body text-[0.82rem] leading-relaxed text-[#7A7672]">
                Clothing designed to occupy the correct amount of space. Pieces intended to remain relevant beyond the expectations of a single season.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <section className="overflow-hidden">
        <motion.div
          className="h-[50vh] md:h-[65vh] min-h-[320px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/lookbook_05_1789735761045.jpg"
            alt="NOIRÉ — Movement through architecture"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#F8F5F0]">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                number: '01',
                title: 'MATERIAL',
                body: 'Every fabric is chosen for its hand, its longevity, and the way it behaves over time. Natural fibres where possible. Synthetics only when they genuinely serve the piece.',
              },
              {
                number: '02',
                title: 'PROPORTION',
                body: 'The silhouette is everything. Not the trend of this quarter, but the relationship between body and cloth. Considered. Intentional. Unforced.',
              },
              {
                number: '03',
                title: 'RESTRAINT',
                body: 'Less detail means every detail matters. Seams, closures, pockets — none of them are accidents. None of them are decorative.',
              },
            ].map((val, i) => (
              <motion.div
                key={val.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i * 0.12}
              >
                <p className="label-sm text-[#A8A4A0] mb-5">{val.number}</p>
                <h3 className="font-display text-2xl text-[#141412] mb-4 tracking-tight">{val.title}</h3>
                <div className="w-8 h-px bg-[#E2DDD8] mb-5" />
                <p className="font-body text-[0.8rem] leading-relaxed text-[#7A7672]">{val.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography statement */}
      <section className="section-padding bg-[#EEEAE4]" aria-label="Brand statement">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.blockquote
              variants={fadeUp}
              custom={0}
              className="font-display text-4xl md:text-6xl lg:text-7xl text-[#141412] leading-[1.05] tracking-tight max-w-4xl mx-auto"
            >
              "Designed for the spaces
              <br />
              <em>between occasions."</em>
            </motion.blockquote>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding bg-[#F8F5F0]" aria-label="Contact">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="label-sm text-[#A8A4A0] mb-4">CONTACT</p>
              <h2 className="font-display text-3xl md:text-4xl text-[#141412] tracking-tight mb-6">
                Reach us.
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="label-sm text-[#A8A4A0] mb-1">EMAIL</p>
                  <a href="mailto:contact@noire.co" className="font-body text-[0.82rem] text-[#141412] hover:text-[#7A7672] transition-colors">
                    contact@noire.co
                  </a>
                </div>
                <div>
                  <p className="label-sm text-[#A8A4A0] mb-1">INSTAGRAM</p>
                  <a href="#" className="font-body text-[0.82rem] text-[#141412] hover:text-[#7A7672] transition-colors">
                    @noire
                  </a>
                </div>
                <div>
                  <p className="label-sm text-[#A8A4A0] mb-1">PRESS</p>
                  <a href="mailto:press@noire.co" className="font-body text-[0.82rem] text-[#141412] hover:text-[#7A7672] transition-colors">
                    press@noire.co
                  </a>
                </div>
              </div>
            </div>
            <div>
              <p className="label-sm text-[#A8A4A0] mb-4">SEND A NOTE</p>
              <form className="space-y-4" aria-label="Contact form">
                <div>
                  <label htmlFor="contact-name" className="label-sm text-[#A8A4A0] block mb-2">YOUR NAME</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.78rem] text-[#141412] bg-transparent outline-none focus:border-[#141412] transition-colors placeholder:text-[#C8C2BC]"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="label-sm text-[#A8A4A0] block mb-2">YOUR EMAIL</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.78rem] text-[#141412] bg-transparent outline-none focus:border-[#141412] transition-colors placeholder:text-[#C8C2BC]"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="label-sm text-[#A8A4A0] block mb-2">MESSAGE</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.78rem] text-[#141412] bg-transparent outline-none focus:border-[#141412] transition-colors placeholder:text-[#C8C2BC] resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn btn-primary">SEND</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
