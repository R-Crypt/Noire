import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Copy, ArrowRight, Printer, Mail, Clock, FileCheck } from 'lucide-react';

interface SubmissionData {
  reference: string;
  submittedAt: string;
  buyer: {
    companyName: string;
    businessType: string;
    contactName: string;
    jobTitle: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    targetTimeline: string;
    notes: string;
  };
  items: Array<{
    id: string;
    name: string;
    color: string;
    sizes: Record<string, number>;
    totalQuantity: number;
    image: string;
  }>;
  totalProducts: number;
  totalUnits: number;
}

export function EnquirySuccess() {
  const [data, setData] = useState<SubmissionData | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = sessionStorage.getItem('noire_last_enquiry');
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {
        // fallback
      }
    }
  }, []);

  const handleCopy = () => {
    if (!data?.reference) return;
    navigator.clipboard.writeText(data.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const reference = data?.reference || 'NQ-2026-84920';

  return (
    <main className="pt-[72px] min-h-screen bg-[#F8F5F0]">
      <div className="max-w-[1000px] mx-auto px-8 md:px-12 py-16 md:py-24">
        {/* Header Badge & Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 label-sm text-[#15803D] bg-[#DCFCE7] px-3 py-1 mb-6">
            <Check size={12} strokeWidth={2} />
            ENQUIRY TRANSMITTED
          </span>

          <h1 className="font-display text-4xl md:text-6xl text-[#141412] tracking-tight mb-4">
            Wholesale Request Received
          </h1>

          <p className="font-body text-[0.88rem] text-[#7A7672] max-w-lg mx-auto">
            Thank you for your interest in representing NOIRÉ. Our international wholesale team is reviewing your assortment.
          </p>

          {/* Reference Box */}
          <div className="mt-8 inline-flex items-center gap-4 bg-white border border-[#E2DDD8] px-6 py-4 shadow-sm">
            <div>
              <p className="label-sm text-[#A8A4A0] text-left">REFERENCE IDENTIFIER</p>
              <p className="font-mono text-lg font-semibold text-[#141412] tracking-wider">{reference}</p>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 border border-[#E2DDD8] hover:bg-[#F8F5F0] transition-colors text-[#7A7672] hover:text-[#141412]"
              title="Copy Reference Number"
            >
              {copied ? <Check size={15} className="text-[#15803D]" /> : <Copy size={15} />}
            </button>
          </div>
        </motion.div>

        {/* Process Timeline */}
        <div className="bg-[#141412] text-white p-8 md:p-12 mb-12">
          <p className="label-sm text-[#A8A4A0] mb-6">WHAT TO EXPECT NEXT</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-[#A8A4A0]" />
                <span className="label-sm text-white">01. REVIEW (24–48H)</span>
              </div>
              <p className="font-body text-[0.78rem] text-[#A8A4A0] leading-relaxed">
                Our wholesale director examines your store profile and confirms line availability and territory exclusivity.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileCheck size={16} className="text-[#A8A4A0]" />
                <span className="label-sm text-white">02. LINE SHEET & PRICING</span>
              </div>
              <p className="font-body text-[0.78rem] text-[#A8A4A0] leading-relaxed">
                You will receive full commercial terms, volume pricing tiers, freight estimates, and fabric swatch dispatch.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Mail size={16} className="text-[#A8A4A0]" />
                <span className="label-sm text-white">03. ORDER CONFIRMATION</span>
              </div>
              <p className="font-body text-[0.78rem] text-[#A8A4A0] leading-relaxed">
                Direct coordination with a dedicated account manager to finalize your purchase order and delivery schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Assortment & Buyer Summary */}
        {data && (
          <div className="bg-white border border-[#E2DDD8] p-8 md:p-12 mb-12 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-[#E2DDD8]">
              <div>
                <p className="label-sm text-[#A8A4A0] mb-1">REGISTERED ACCOUNT</p>
                <h3 className="font-display text-2xl text-[#141412]">{data.buyer.companyName}</h3>
                <p className="font-body text-[0.78rem] text-[#7A7672] mt-0.5">
                  Attn: {data.buyer.contactName} ({data.buyer.jobTitle || 'Buyer'}) · {data.buyer.city}, {data.buyer.country}
                </p>
              </div>
              <div className="text-right">
                <p className="label-sm text-[#A8A4A0] mb-1">TARGET TIMELINE</p>
                <p className="font-body text-[0.8rem] text-[#141412] font-medium">{data.buyer.targetTimeline}</p>
              </div>
            </div>

            {/* Items Table */}
            <div>
              <p className="label-sm text-[#A8A4A0] mb-4">REQUESTED PIECES ({data.totalUnits} UNITS TOTAL)</p>
              <div className="divide-y divide-[#E2DDD8]">
                {data.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-12 h-16 object-cover bg-[#EEEAE4]" />
                      )}
                      <div>
                        <p className="font-body text-[0.8rem] font-medium text-[#141412]">{item.name}</p>
                        <p className="label-sm text-[#7A7672]">{item.color}</p>
                        <div className="flex gap-2 mt-1">
                          {Object.entries(item.sizes)
                            .filter(([, q]) => q > 0)
                            .map(([s, q]) => (
                              <span key={s} className="label-sm text-[#A8A4A0]">
                                {s}:{q}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-body text-[0.82rem] font-medium text-[#141412]">
                        {item.totalQuantity} units
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={handlePrint} className="btn btn-outline w-full sm:w-auto">
            <Printer size={13} className="mr-1.5" />
            PRINT / SAVE SUMMARY
          </button>
          <Link to="/shop" className="btn btn-primary w-full sm:w-auto">
            RETURN TO COLLECTION <ArrowRight size={13} className="ml-1" />
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center label-sm text-[#A8A4A0] mt-12">
          HAVE AN IMMEDIATE INQUIRY? CONTACT OUR WHOLESALE DESK AT WHOLESALE@NOIRE.CO
        </p>
      </div>
    </main>
  );
}
