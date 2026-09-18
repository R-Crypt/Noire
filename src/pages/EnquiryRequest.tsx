import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';

interface FormData {
  companyName: string;
  businessType: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  city: string;
  vatNumber: string;
  targetTimeline: string;
  notes: string;
}

const initialForm: FormData = {
  companyName: '',
  businessType: 'Independent Boutique',
  contactName: '',
  jobTitle: '',
  email: '',
  phone: '',
  website: '',
  country: '',
  city: '',
  vatNumber: '',
  targetTimeline: 'Spring / Summer 2026',
  notes: '',
};

export function EnquiryRequest() {
  const { state, totalProducts, totalUnits, clearEnquiry } = useEnquiry();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If items empty, redirect to shop
  if (state.items.length === 0) {
    return (
      <main className="pt-[72px] min-h-screen bg-[#F8F5F0] flex items-center justify-center p-8">
        <div className="bg-white border border-[#E2DDD8] p-12 text-center max-w-md">
          <p className="font-display text-2xl text-[#141412] mb-3">No Items in Enquiry</p>
          <p className="font-body text-[0.8rem] text-[#7A7672] mb-6">
            Please select at least one piece from our collection to submit a wholesale enquiry.
          </p>
          <Link to="/shop" className="btn btn-primary w-full justify-center">
            EXPLORE COLLECTION
          </Link>
        </div>
      </main>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.companyName.trim()) errs.companyName = 'Company name is required';
    if (!form.contactName.trim()) errs.contactName = 'Contact name is required';
    if (!form.email.trim()) {
      errs.email = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.country.trim()) errs.country = 'Country is required';
    if (!form.city.trim()) errs.city = 'City is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const reference = `NQ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload = {
      reference,
      submittedAt: new Date().toISOString(),
      buyer: form,
      items: state.items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        color: i.selectedColor,
        sizes: i.sizeQuantities,
        totalQuantity: i.totalQuantity,
        moq: i.product.minimumOrderQuantity,
        image: i.product.images[0],
      })),
      totalProducts,
      totalUnits,
    };

    // Try calling Supabase Edge Function if configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        await fetch(`${supabaseUrl}/functions/v1/send-wholesale-enquiry`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Edge function dispatch bypassed or failed:', err);
      }
    }

    // Save submission record for confirmation page
    sessionStorage.setItem('noire_last_enquiry', JSON.stringify(payload));
    clearEnquiry();
    setIsSubmitting(false);
    navigate('/enquiry/success');
  };

  return (
    <main className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-12 md:py-20">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2DDD8]">
          <Link
            to="/enquiry"
            className="inline-flex items-center gap-2 label-sm text-[#7A7672] hover:text-[#141412] transition-colors"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            BACK TO REVIEW
          </Link>
          <span className="label-sm text-[#A8A4A0]">
            STEP 2 OF 2 · BUYER & STORE DETAILS
          </span>
        </div>

        {/* Title */}
        <div className="mb-12">
          <p className="label-sm text-[#A8A4A0] mb-3">WHOLESALE ENQUIRY</p>
          <h1 className="font-display text-4xl md:text-6xl text-[#141412] tracking-tight">
            Wholesale Request Form
          </h1>
          <p className="font-body text-[0.85rem] text-[#7A7672] mt-3 max-w-xl">
            Please provide your business and store details. Our commercial sales team will review your application and provide line sheets, wholesale price schedules, and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white border border-[#E2DDD8] p-8 md:p-12 space-y-10">
              {/* Section 1: Business Information */}
              <div>
                <h2 className="font-display text-2xl text-[#141412] tracking-tight mb-2">
                  1. Company & Store Information
                </h2>
                <p className="font-body text-[0.76rem] text-[#7A7672] mb-6">
                  Tell us about your retail location, presence, and store concept.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="label-sm text-[#141412] block mb-2">
                      COMPANY / STORE NAME *
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      placeholder="e.g. Hudson Atelier"
                      className={`w-full border px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none transition-colors ${
                        errors.companyName ? 'border-[#B91C1C]' : 'border-[#E2DDD8] focus:border-[#141412]'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="label-sm text-[#B91C1C] mt-1.5">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="businessType" className="label-sm text-[#141412] block mb-2">
                      BUSINESS TYPE *
                    </label>
                    <select
                      id="businessType"
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.8rem] bg-white outline-none focus:border-[#141412] transition-colors"
                    >
                      <option value="Independent Boutique">Independent Boutique</option>
                      <option value="Multi-Brand Retailer">Multi-Brand Retailer</option>
                      <option value="Department Store">Department Store</option>
                      <option value="Concept Store">Concept Store</option>
                      <option value="Online Fashion Retailer">Online Fashion Retailer</option>
                      <option value="Showroom / Agent">Showroom / Agent</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="website" className="label-sm text-[#141412] block mb-2">
                      STORE / WEBSITE OR INSTAGRAM
                    </label>
                    <input
                      id="website"
                      type="text"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="https:// or @storename"
                      className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none focus:border-[#141412] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="vatNumber" className="label-sm text-[#141412] block mb-2">
                      VAT / TAX ID / EIN (OPTIONAL)
                    </label>
                    <input
                      id="vatNumber"
                      type="text"
                      value={form.vatNumber}
                      onChange={(e) => setForm({ ...form, vatNumber: e.target.value })}
                      placeholder="e.g. 12-3456789 or Tax ID"
                      className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none focus:border-[#141412] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="label-sm text-[#141412] block mb-2">
                      CITY / STATE *
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Jersey City, New Jersey"
                      className={`w-full border px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none transition-colors ${
                        errors.city ? 'border-[#B91C1C]' : 'border-[#E2DDD8] focus:border-[#141412]'
                      }`}
                    />
                    {errors.city && (
                      <p className="label-sm text-[#B91C1C] mt-1.5">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="label-sm text-[#141412] block mb-2">
                      COUNTRY *
                    </label>
                    <input
                      id="country"
                      type="text"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder="e.g. United States"
                      className={`w-full border px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none transition-colors ${
                        errors.country ? 'border-[#B91C1C]' : 'border-[#E2DDD8] focus:border-[#141412]'
                      }`}
                    />
                    {errors.country && (
                      <p className="label-sm text-[#B91C1C] mt-1.5">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Buyer / Contact Person */}
              <div className="pt-8 border-t border-[#E2DDD8]">
                <h2 className="font-display text-2xl text-[#141412] tracking-tight mb-2">
                  2. Primary Contact Details
                </h2>
                <p className="font-body text-[0.76rem] text-[#7A7672] mb-6">
                  Direct contact information for the buyer or merchandise manager.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactName" className="label-sm text-[#141412] block mb-2">
                      FULL NAME *
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full border px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none transition-colors ${
                        errors.contactName ? 'border-[#B91C1C]' : 'border-[#E2DDD8] focus:border-[#141412]'
                      }`}
                    />
                    {errors.contactName && (
                      <p className="label-sm text-[#B91C1C] mt-1.5">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="jobTitle" className="label-sm text-[#141412] block mb-2">
                      ROLE / TITLE
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      value={form.jobTitle}
                      onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                      placeholder="e.g. Buying Director / Owner"
                      className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none focus:border-[#141412] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="label-sm text-[#141412] block mb-2">
                      BUSINESS EMAIL *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="buyer@store.com"
                      className={`w-full border px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none transition-colors ${
                        errors.email ? 'border-[#B91C1C]' : 'border-[#E2DDD8] focus:border-[#141412]'
                      }`}
                    />
                    {errors.email && (
                      <p className="label-sm text-[#B91C1C] mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="label-sm text-[#141412] block mb-2">
                      DIRECT PHONE / WHATSAPP *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (201) 555-0192"
                      className={`w-full border px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none transition-colors ${
                        errors.phone ? 'border-[#B91C1C]' : 'border-[#E2DDD8] focus:border-[#141412]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="label-sm text-[#B91C1C] mt-1.5">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Order Requirements */}
              <div className="pt-8 border-t border-[#E2DDD8]">
                <h2 className="font-display text-2xl text-[#141412] tracking-tight mb-2">
                  3. Order Requirements & Timeline
                </h2>
                <p className="font-body text-[0.76rem] text-[#7A7672] mb-6">
                  Specify your ideal delivery window and any custom logistics instructions.
                </p>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="targetTimeline" className="label-sm text-[#141412] block mb-2">
                      TARGET DELIVERY TIMELINE / SEASON *
                    </label>
                    <select
                      id="targetTimeline"
                      value={form.targetTimeline}
                      onChange={(e) => setForm({ ...form, targetTimeline: e.target.value })}
                      className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.8rem] bg-white outline-none focus:border-[#141412] transition-colors"
                    >
                      <option value="Spring / Summer 2026">Spring / Summer 2026</option>
                      <option value="Immediate / Current Season Stock">Immediate / Current Season Stock</option>
                      <option value="Autumn / Winter 2026">Autumn / Winter 2026</option>
                      <option value="Flexible / Ongoing Assortment">Flexible / Ongoing Assortment</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="notes" className="label-sm text-[#141412] block mb-2">
                      ADDITIONAL NOTES / SPECIFIC STORE REQUIREMENTS
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Provide any context regarding brand adjacency in your boutique, specific delivery windows, or bespoke fabric requirements..."
                      className="w-full border border-[#E2DDD8] px-4 py-3 font-body text-[0.8rem] bg-transparent outline-none focus:border-[#141412] transition-colors resize-none placeholder:text-[#C8C2BC]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6 border-t border-[#E2DDD8] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-[#7A7672]">
                  <ShieldCheck size={16} strokeWidth={1.5} />
                  <span className="label-sm">Confidential wholesale submission</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full sm:w-auto justify-center min-w-[220px]"
                >
                  {isSubmitting ? (
                    'PROCESSING...'
                  ) : (
                    <>
                      TRANSMIT ENQUIRY <Send size={12} className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E2DDD8] p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD8]">
                <h3 className="font-display text-xl text-[#141412]">Assortment Summary</h3>
                <Link
                  to="/enquiry"
                  className="label-sm text-[#7A7672] hover:text-[#141412] underline underline-offset-2"
                >
                  Edit
                </Link>
              </div>

              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {state.items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-4 pb-4 border-b border-[#F0ECE6]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover bg-[#EEEAE4] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-[0.76rem] font-medium text-[#141412] truncate">
                        {item.product.name}
                      </p>
                      <p className="label-sm text-[#A8A4A0] mt-0.5">
                        {item.selectedColor}
                      </p>
                      <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5">
                        {Object.entries(item.sizeQuantities)
                          .filter(([, qty]) => qty > 0)
                          .map(([s, q]) => (
                            <span key={s} className="font-body text-[0.62rem] text-[#7A7672]">
                              {s}:{q}
                            </span>
                          ))}
                      </div>
                      <p className="font-body text-[0.74rem] text-[#141412] mt-1 font-medium">
                        {item.totalQuantity} units
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2 font-body text-[0.8rem]">
                <div className="flex justify-between text-[#7A7672]">
                  <span>Total Products</span>
                  <span className="text-[#141412] font-medium">{totalProducts}</span>
                </div>
                <div className="flex justify-between text-[#7A7672]">
                  <span>Total Wholesale Units</span>
                  <span className="text-[#141412] font-medium text-lg">{totalUnits}</span>
                </div>
              </div>
            </div>

            {/* Turnaround Box */}
            <div className="bg-[#EEEAE4] p-6 space-y-3">
              <div className="flex items-center gap-2 text-[#141412]">
                <Clock size={16} strokeWidth={1.5} />
                <span className="label-sm font-medium">24–48 HOUR RESPONSE</span>
              </div>
              <p className="font-body text-[0.75rem] text-[#7A7672] leading-relaxed">
                Our New Jersey wholesale showroom will verify line allocations and reply directly with complete line sheets, FOB / EXW pricing, and fabric sample dispatch options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
