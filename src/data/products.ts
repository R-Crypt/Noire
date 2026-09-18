export interface Product {
  id: string;
  name: string;
  category: 'outerwear' | 'shirts' | 'trousers' | 'knitwear' | 'accessories' | 'jackets' | 'tops';
  minimumOrderQuantity: number;
  description: string;
  details: string;
  materials: string;
  careInstructions: string;
  colors: string[];
  sizes: string[];
  images: string[];
  featured: boolean;
  newArrival: boolean;
  gender: 'women' | 'men' | 'unisex';
  number: string;
}

const img = (name: string) => `/images/${name}`;

export const products: Product[] = [
  {
    id: 'structured-wool-coat',
    name: 'Structured Wool Coat',
    category: 'outerwear',
    minimumOrderQuantity: 20,
    description: 'An architectural outer layer defined by a clean shoulder and relaxed silhouette. Cut from a dense double-faced wool, it holds its form while moving naturally with the body.',
    details: 'The defining piece of the season. Single-breasted construction with a notched lapel and minimal topstitching. Two side pockets with clean welt finish. Fully lined in a lightweight cupro.',
    materials: '100% Double-Faced Wool.',
    careInstructions: 'Dry clean only. Store on a padded hanger.',
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [img('product_wool_coat_1789735492221.jpg'), img('hero_coat_editorial_1789735455135.jpg'), img('lookbook_05_1789735761045.jpg')],
    featured: true,
    newArrival: true,
    gender: 'women',
    number: '01',
  },
  {
    id: 'relaxed-silk-shirt',
    name: 'Relaxed Silk Shirt',
    category: 'shirts',
    minimumOrderQuantity: 30,
    description: 'A shirt defined by its quiet luxury. Cut from a matte silk with a subtle natural texture, it falls easily from the shoulder without effort.',
    details: 'Relaxed through the body with a slightly oversized silhouette. Classic collar, mother-of-pearl buttons, single breast pocket.',
    materials: '100% Silk.',
    careInstructions: 'Hand wash cold or dry clean. Do not tumble dry. Iron on low heat.',
    colors: ['Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [img('product_silk_shirt_1789735470132.jpg'), img('women_category_1789735625285.jpg'), img('lookbook_04_1789735723541.jpg')],
    featured: true,
    newArrival: true,
    gender: 'women',
    number: '02',
  },
  {
    id: 'wide-pleated-trouser',
    name: 'Wide Pleated Trouser',
    category: 'trousers',
    minimumOrderQuantity: 24,
    description: 'A considered wide-leg cut with a single front pleat. Drapes cleanly from the hip and falls to a full-length hem.',
    details: 'High-waisted construction with a flat front and single pleat for volume. Side pockets, back welt pocket. Internal waistband with adjusters.',
    materials: '72% Wool, 28% Polyester.',
    careInstructions: 'Dry clean recommended. Press with a damp cloth.',
    colors: ['Charcoal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [img('product_wide_trouser_1789735504225.jpg'), img('lookbook_02_1789735669341.jpg')],
    featured: true,
    newArrival: false,
    gender: 'women',
    number: '03',
  },
  {
    id: 'minimal-leather-tote',
    name: 'Minimal Leather Tote',
    category: 'accessories',
    minimumOrderQuantity: 10,
    description: 'A structured bag for daily use. Built from a full-grain leather that will develop character over time. Open top with a single interior pocket.',
    details: 'Rigid bottom panel for structure. Two parallel handles with a comfortable drop. Unlined interior in dark canvas with one slip pocket. Brass hardware throughout.',
    materials: 'Full-grain calf leather.',
    careInstructions: 'Condition regularly with a leather cream. Store stuffed in dustbag.',
    colors: ['Black'],
    sizes: ['One Size'],
    images: [img('product_leather_tote_1789735516236.jpg'), img('lookbook_05_1789735761045.jpg')],
    featured: true,
    newArrival: false,
    gender: 'unisex',
    number: '04',
  },
  {
    id: 'cashmere-crewneck',
    name: 'Cashmere Crewneck',
    category: 'knitwear',
    minimumOrderQuantity: 20,
    description: 'A foundation piece for every season. Knitted from a grade-A Mongolian cashmere with a relaxed, slightly oversized fit. Soft without being precious.',
    details: 'Crew neckline with a 2×2 rib trim at cuffs and hem. Dropped shoulder seam for a relaxed silhouette. Generous body length.',
    materials: '100% Grade A Mongolian Cashmere.',
    careInstructions: 'Hand wash cold. Dry flat. Do not hang.',
    colors: ['Oatmeal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [img('product_cashmere_1789735933755.jpg'), img('lookbook_03_1789735706937.jpg'), img('lookbook_04_1789735723541.jpg')],
    featured: false,
    newArrival: true,
    gender: 'unisex',
    number: '05',
  },
  {
    id: 'cotton-overshirt',
    name: 'Cotton Overshirt',
    category: 'shirts',
    minimumOrderQuantity: 30,
    description: 'Sits between a shirt and a jacket. Cut from a dense cotton canvas, it works as an outer layer in its own right or over a lightweight knit.',
    details: 'Boxy cut with a relaxed body and dropped shoulder. Two chest patch pockets. Concealed button placket. Hem falls below the hip.',
    materials: '100% Organic Cotton Canvas.',
    careInstructions: 'Machine wash cold. Tumble dry low.',
    colors: ['Stone'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('collection_essentials_1789735918038.jpg'), img('lookbook_02_1789735669341.jpg')],
    featured: false,
    newArrival: true,
    gender: 'men',
    number: '06',
  },
  {
    id: 'cropped-wool-jacket',
    name: 'Cropped Wool Jacket',
    category: 'jackets',
    minimumOrderQuantity: 20,
    description: 'A tailored jacket cropped to the natural waist. Clean lines, no fuss. Built from a mid-weight Italian wool in a tight bouclé weave.',
    details: 'Single-breasted, single button closure. Welt chest pocket, two flap side pockets. Slightly suppressed waist. Fully lined.',
    materials: '90% Wool, 10% Nylon.',
    careInstructions: 'Dry clean only.',
    colors: ['Ivory'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [img('women_category_1789735625285.jpg'), img('product_wool_coat_1789735492221.jpg')],
    featured: false,
    newArrival: false,
    gender: 'women',
    number: '07',
  },
  {
    id: 'tailored-trouser-men',
    name: 'Tailored Trouser',
    category: 'trousers',
    minimumOrderQuantity: 24,
    description: 'A clean, straight-leg trouser cut for all-day wear. Neither slim nor wide — a proportion designed to work with everything.',
    details: 'Mid-rise, straight leg with a clean break at the shoe. Side pockets, back welt pockets. Button and bar closure at the waistband. Creased front.',
    materials: '68% Wool, 32% Polyester.',
    careInstructions: 'Dry clean recommended.',
    colors: ['Charcoal'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [img('men_category_1789735638934.jpg'), img('collection_essentials_1789735918038.jpg')],
    featured: false,
    newArrival: false,
    gender: 'men',
    number: '08',
  },
  {
    id: 'asymmetric-knit-top',
    name: 'Asymmetric Knit Top',
    category: 'tops',
    minimumOrderQuantity: 30,
    description: 'A fine-gauge knit with an offset neckline and subtly uneven hem. Understated in texture, considered in form.',
    details: 'Semi-fitted silhouette. Asymmetric draped neckline with a subtle cowl. Ribbed side seams. Slightly longer at the back.',
    materials: '80% Merino Wool, 20% Silk.',
    careInstructions: 'Hand wash cold. Dry flat.',
    colors: ['Ivory'],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [img('lookbook_04_1789735723541.jpg'), img('women_category_1789735625285.jpg')],
    featured: false,
    newArrival: true,
    gender: 'women',
    number: '09',
  },
  {
    id: 'relaxed-linen-shirt',
    name: 'Relaxed Linen Shirt',
    category: 'shirts',
    minimumOrderQuantity: 30,
    description: 'A summer-weight shirt cut in a slightly boxy silhouette. Washed and pre-softened for immediate wear. The more you wear it, the better it gets.',
    details: 'Relaxed through the body with a spread collar. Single chest pocket. Corozo buttons. Hem slightly rounded at the sides.',
    materials: '100% Belgian Linen.',
    careInstructions: 'Machine wash cold. Tumble dry low. Iron while slightly damp.',
    colors: ['Ivory'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [img('lookbook_02_1789735669341.jpg'), img('collection_essentials_1789735918038.jpg')],
    featured: false,
    newArrival: false,
    gender: 'men',
    number: '10',
  },
  {
    id: 'minimal-cardholder',
    name: 'Minimal Cardholder',
    category: 'accessories',
    minimumOrderQuantity: 20,
    description: 'Six card slots. A slim central pocket. Nothing more. Made in Italy from a vegetable-tanned leather that will age gracefully.',
    details: 'Three card slots per side. Central bill pocket. Dimensions: 10 × 7.5 cm. Available in a gift box.',
    materials: 'Vegetable-tanned calf leather.',
    careInstructions: 'Wipe clean with a dry cloth.',
    colors: ['Black'],
    sizes: ['One Size'],
    images: [img('product_leather_tote_1789735516236.jpg')],
    featured: false,
    newArrival: false,
    gender: 'unisex',
    number: '11',
  },
  {
    id: 'clean-leather-sneaker',
    name: 'Clean Leather Sneaker',
    category: 'accessories',
    minimumOrderQuantity: 12,
    description: 'A low-profile sneaker stripped of all unnecessary detail. Clean leather upper, understated sole. The right foundation.',
    details: 'Full-grain leather upper. Leather lining. Minimal rubber cupsole. Six-eyelet lacing. Tonal stitching throughout.',
    materials: 'Full-grain leather.',
    careInstructions: 'Clean with a damp cloth. Use leather conditioner regularly.',
    colors: ['White'],
    sizes: ['EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    images: [img('lookbook_01_1789735652453.jpg')],
    featured: false,
    newArrival: false,
    gender: 'unisex',
    number: '12',
  },
];

export const collections = [
  {
    id: 'ss26',
    title: 'SPRING / SUMMER 26',
    subtitle: 'New Season',
    description: 'Lightness, proportion, and an architecture of ease. The season builds around a quiet optimism.',
    image: img('collection_ss26_1789735823177.jpg'),
    href: '/collections/ss26',
  },
  {
    id: 'essentials',
    title: 'THE ESSENTIALS',
    subtitle: 'Ongoing',
    description: 'Pieces that do not follow trends because they never needed to. Updated in material, unchanged in intent.',
    image: img('collection_essentials_1789735918038.jpg'),
    href: '/collections/essentials',
  },
  {
    id: 'objects',
    title: 'OBJECTS',
    subtitle: 'Accessories',
    description: 'A considered range of accessories and objects. Each one made to complement rather than compete.',
    image: img('product_leather_tote_1789735516236.jpg'),
    href: '/collections/objects',
  },
  {
    id: 'evening',
    title: 'EVENING',
    subtitle: 'Occasion',
    description: 'Designed for the spaces between occasions. Effortless enough for dinner, considered enough for the night after.',
    image: img('campaign_editorial_1789735533438.jpg'),
    href: '/collections/evening',
  },
];

export const lookbookImages = [
  { id: 'lb1', src: img('lookbook_05_1789735761045.jpg'), label: 'LOOK 01', aspect: 'tall' },
  { id: 'lb2', src: img('lookbook_04_1789735723541.jpg'), label: 'LOOK 02', aspect: 'tall' },
  { id: 'lb3', src: img('lookbook_02_1789735669341.jpg'), label: 'LOOK 03', aspect: 'wide' },
  { id: 'lb4', src: img('lookbook_03_1789735706937.jpg'), label: 'DETAIL 01', aspect: 'tall' },
  { id: 'lb5', src: img('hero_coat_editorial_1789735455135.jpg'), label: 'LOOK 04', aspect: 'tall' },
  { id: 'lb6', src: img('product_wool_coat_1789735492221.jpg'), label: 'LOOK 05', aspect: 'tall' },
  { id: 'lb7', src: img('women_category_1789735625285.jpg'), label: 'LOOK 06', aspect: 'tall' },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, limit);
}
