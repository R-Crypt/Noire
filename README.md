# NOIRÉ — B2B Wholesale Fashion Platform

A contemporary luxury fashion platform tailored for wholesale ordering, retail buyer enquiries, and line sheet exploration.

> **Note:** NOIRÉ is a conceptual premium fashion brand built as a portfolio demonstration project showcasing high-end digital design, interaction design, and B2B ordering workflows.

---

## Overview

Unlike standard consumer retail e-commerce, NOIRÉ operates on a dedicated **B2B wholesale model**:
- **Zero Consumer Checkout / Credit Card Gate**: Replaces conventional retail checkout with a wholesale enquiry transmission workflow.
- **Minimum Order Quantity (MOQ)**: Displays MOQs for each piece with live validation and quantity distribution.
- **Size & Volume Allocation Grid**: Buyers distribute order quantities across sizes (XS through XL) with real-time unit counting.
- **Editorial Brand Presentation**: Retains a high-fashion editorial aesthetic (restrained palettes, subtle transitions, typography hierarchy, and lookbook imagery).
- **Wholesale Request Pipeline**: Collects store profile, retail business model (Boutique, Department Store, Concept Store), VAT registration, and seasonal delivery timelines.
- **Backend Email Integration**: Supabase Edge Function (`supabase/functions/send-wholesale-enquiry`) supporting automated buyer confirmation and sales desk alerts via Resend.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS & modern CSS design tokens
- **Motion & Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Backend / Edge Functions**: [Supabase](https://supabase.com/) (Deno Edge Function) + [Resend](https://resend.com/)

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
git clone https://github.com/R-Crypt/Noire.git
cd Noire
npm install
```

### Local Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Configure your credentials:

```env
# Frontend (Vite)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Supabase Edge Function Secrets
RESEND_API_KEY=re_your_api_key
SALES_EMAIL=wholesale@noire.co
FROM_EMAIL=NOIRÉ Wholesale <wholesale@noire.co>
```

---

## Project Structure

```
├── public/
│   └── images/               # High-resolution editorial photography
├── src/
│   ├── components/
│   │   ├── EnquiryDrawer.tsx # Slide-out wholesale enquiry tray
│   │   ├── Footer.tsx        # B2B footer navigation
│   │   ├── Lightbox.tsx      # Full-screen lookbook zoom
│   │   ├── Navbar.tsx        # Responsive navigation with enquiry badge
│   │   ├── ProductCard.tsx   # Wholesale product card with MOQ
│   │   ├── QuantityBreakdown.tsx # Size allocation +/- controls
│   │   └── SearchOverlay.tsx # Collection quick search
│   ├── context/
│   │   └── EnquiryContext.tsx# Persistent wholesale enquiry state
│   ├── data/
│   │   └── products.ts       # Product catalogue, MOQs, materials
│   ├── pages/
│   │   ├── About.tsx         # Brand philosophy and values
│   │   ├── Collections.tsx   # Curated seasonal stories
│   │   ├── Enquiry.tsx       # Assortment review & quantity editing
│   │   ├── EnquiryRequest.tsx# Buyer information submission form
│   │   ├── EnquirySuccess.tsx# Confirmation, reference code, next steps
│   │   ├── Home.tsx          # Editorial hero, 3-step wholesale flow
│   │   ├── Lookbook.tsx      # Editorial visual record
│   │   ├── Product.tsx       # Detail view with size grid
│   │   ├── Shop.tsx          # Full collection filterable catalogue
│   │   └── Wholesale.tsx     # Wholesale landing page
│   └── utils/
│       └── animations.ts     # Framer Motion transitions
└── supabase/
    └── functions/
        └── send-wholesale-enquiry/ # Edge function email handler
```

---

## License

MIT License.
