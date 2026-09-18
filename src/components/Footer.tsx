import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#141412] text-[#F8F5F0] pt-20 pb-10" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-[#2A2A28]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="font-display text-2xl tracking-[0.2em] text-white block mb-4">
              NOIRÉ
            </Link>
            <p className="font-body text-[0.72rem] leading-relaxed text-[#7A7672] max-w-[200px]">
              Contemporary clothing, considered for retail.
            </p>
          </div>

          {/* Collection */}
          <div>
            <p className="label-sm text-[#A8A4A0] mb-5">COLLECTION</p>
            <ul className="space-y-3">
              {[
                { label: 'New Arrivals', href: '/shop?filter=new' },
                { label: 'Women', href: '/shop?gender=women' },
                { label: 'Men', href: '/shop?gender=men' },
                { label: 'Accessories', href: '/shop?category=accessories' },
                { label: 'Lookbook', href: '/lookbook' },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="font-body text-[0.75rem] text-[#A8A4A0] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wholesale */}
          <div>
            <p className="label-sm text-[#A8A4A0] mb-5">WHOLESALE</p>
            <ul className="space-y-3">
              {[
                { label: 'How It Works', href: '/wholesale' },
                { label: 'Build an Enquiry', href: '/shop' },
                { label: 'Review Enquiry', href: '/enquiry' },
                { label: 'About NOIRÉ', href: '/about' },
                { label: 'Contact', href: '/about#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="font-body text-[0.75rem] text-[#A8A4A0] hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <p className="label-sm text-[#A8A4A0] mb-5">FOLLOW</p>
            <ul className="space-y-3 mb-10">
              {['INSTAGRAM', 'PINTEREST'].map((social) => (
                <li key={social}>
                  <a href="#" className="font-body text-[0.75rem] tracking-wider text-[#A8A4A0] hover:text-white transition-colors duration-200" aria-label={`Follow NOIRÉ on ${social}`}>
                    {social}
                  </a>
                </li>
              ))}
            </ul>
            <p className="label-sm text-[#A8A4A0] mb-5">LEGAL</p>
            <ul className="space-y-3">
              {['Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-[0.75rem] text-[#A8A4A0] hover:text-white transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8">
          <p className="font-body text-[0.65rem] tracking-[0.1em] text-[#7A7672] uppercase">
            © {new Date().getFullYear()} NOIRÉ. A portfolio concept project.
          </p>
          <p className="font-body text-[0.65rem] tracking-[0.08em] text-[#7A7672]">
            Wholesale enquiries welcome.
          </p>
        </div>
      </div>
    </footer>
  );
}
