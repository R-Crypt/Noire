// Supabase Edge Function: send-wholesale-enquiry
// Follows standard Deno HTTP server pattern

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface EnquiryPayload {
  reference: string;
  submittedAt: string;
  buyer: {
    companyName: string;
    businessType: string;
    contactName: string;
    jobTitle?: string;
    email: string;
    phone: string;
    website?: string;
    vatNumber?: string;
    city: string;
    country: string;
    targetTimeline: string;
    notes?: string;
  };
  items: Array<{
    id: string;
    name: string;
    color: string;
    sizes: Record<string, number>;
    totalQuantity: number;
    moq: number;
  }>;
  totalProducts: number;
  totalUnits: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload: EnquiryPayload = await req.json();

    // Basic Validation
    if (!payload.reference || !payload.buyer?.email || !payload.buyer?.companyName || !payload.items?.length) {
      return new Response(
        JSON.stringify({ error: 'Missing required enquiry fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const salesEmail = Deno.env.get('SALES_EMAIL') || 'wholesale@noire.co';
    const fromEmail = Deno.env.get('FROM_EMAIL') || 'NOIRÉ Wholesale <wholesale@noire.co>';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured in environment variables.');
      return new Response(
        JSON.stringify({
          success: true,
          mock: true,
          message: 'Enquiry received in mock/demo mode (RESEND_API_KEY not set)',
          reference: payload.reference,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build items HTML table
    const itemsRowsHtml = payload.items
      .map((item) => {
        const sizeAlloc = Object.entries(item.sizes)
          .filter(([, q]) => q > 0)
          .map(([s, q]) => `${s}: ${q}`)
          .join(', ');
        return `
          <tr style="border-bottom: 1px solid #E2DDD8;">
            <td style="padding: 12px 8px; font-family: sans-serif; font-size: 13px;">${item.name}</td>
            <td style="padding: 12px 8px; font-family: sans-serif; font-size: 13px; color: #7A7672;">${item.color}</td>
            <td style="padding: 12px 8px; font-family: sans-serif; font-size: 13px; color: #7A7672;">${sizeAlloc}</td>
            <td style="padding: 12px 8px; font-family: sans-serif; font-size: 13px; text-align: right; font-weight: 600;">${item.totalQuantity} units</td>
          </tr>
        `;
      })
      .join('');

    // 1. Internal Wholesale Team Notification Email
    const internalEmailBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F8F5F0; padding: 32px; color: #141412;">
        <h1 style="font-size: 20px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px;">New Wholesale Enquiry (${payload.reference})</h1>
        
        <div style="background: #FFFFFF; border: 1px solid #E2DDD8; padding: 24px; margin-bottom: 24px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #7A7672; margin-top: 0;">Buyer & Store Profile</h2>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Company:</strong> ${payload.buyer.companyName} (${payload.buyer.businessType})</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Contact:</strong> ${payload.buyer.contactName} ${payload.buyer.jobTitle ? `(${payload.buyer.jobTitle})` : ''}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${payload.buyer.email}">${payload.buyer.email}</a></p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> ${payload.buyer.phone}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Location:</strong> ${payload.buyer.city}, ${payload.buyer.country}</p>
          ${payload.buyer.website ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Website:</strong> <a href="${payload.buyer.website}">${payload.buyer.website}</a></p>` : ''}
          ${payload.buyer.vatNumber ? `<p style="margin: 4px 0; font-size: 14px;"><strong>VAT / Tax ID:</strong> ${payload.buyer.vatNumber}</p>` : ''}
          <p style="margin: 4px 0; font-size: 14px;"><strong>Target Timeline:</strong> ${payload.buyer.targetTimeline}</p>
          ${payload.buyer.notes ? `<p style="margin: 8px 0 0 0; font-size: 14px; color: #555;"><strong>Buyer Notes:</strong><br/>${payload.buyer.notes}</p>` : ''}
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E2DDD8; padding: 24px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #7A7672; margin-top: 0;">Requested Allocation (${payload.totalUnits} Total Units)</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid #141412; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">
                <th style="padding: 8px;">Product</th>
                <th style="padding: 8px;">Color</th>
                <th style="padding: 8px;">Size Breakdown</th>
                <th style="padding: 8px; text-align: right;">Units</th>
              </tr>
            </thead>
            <tbody>
              ${itemsRowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // 2. Buyer Confirmation Email
    const buyerEmailBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F8F5F0; padding: 40px; color: #141412;">
        <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #7A7672; margin: 0 0 16px 0;">NOIRÉ WHOLESALE</p>
        <h1 style="font-size: 26px; font-weight: 400; letter-spacing: -0.02em; margin: 0 0 16px 0;">Enquiry Received</h1>
        <p style="font-size: 14px; line-height: 1.6; color: #555; margin-bottom: 24px;">
          Dear ${payload.buyer.contactName},<br/><br/>
          Thank you for submitting your wholesale enquiry for <strong>${payload.buyer.companyName}</strong>. Your reference identifier is <strong>${payload.reference}</strong>.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #555; margin-bottom: 28px;">
          Our international wholesale team is reviewing your selected pieces and store concept. We will be in touch within 24–48 business hours with official line sheets, commercial terms, and production availability.
        </p>

        <div style="background: #FFFFFF; border: 1px solid #E2DDD8; padding: 24px; margin-bottom: 28px;">
          <h2 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #7A7672; margin-top: 0; margin-bottom: 12px;">Enquiry Summary (${payload.totalUnits} Units)</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <tbody>
              ${itemsRowsHtml}
            </tbody>
          </table>
        </div>

        <p style="font-size: 12px; color: #888; margin: 0;">
          NOIRÉ Wholesale Showroom · New Jersey, USA<br/>
          For urgent enquiries: <a href="mailto:wholesale@noire.co" style="color: #141412;">wholesale@noire.co</a>
        </p>
      </div>
    `;

    // Send both emails using Resend API
    const resendCalls = [
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: salesEmail,
          subject: `[Wholesale Enquiry] ${payload.buyer.companyName} (${payload.reference})`,
          html: internalEmailBody,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: payload.buyer.email,
          subject: `NOIRÉ Wholesale Enquiry Confirmation (${payload.reference})`,
          html: buyerEmailBody,
        }),
      }),
    ];

    await Promise.all(resendCalls);

    return new Response(
      JSON.stringify({ success: true, reference: payload.reference }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown server error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
