import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../data/products';

type SortOption = 'featured' | 'newest' | 'moq-asc';
type GenderFilter = 'all' | 'women' | 'men';
type CategoryFilter = 'all' | Product['category'];

const categories: { label: string; value: CategoryFilter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'OUTERWEAR', value: 'outerwear' },
  { label: 'SHIRTS', value: 'shirts' },
  { label: 'TROUSERS', value: 'trousers' },
  { label: 'KNITWEAR', value: 'knitwear' },
  { label: 'ACCESSORIES', value: 'accessories' },
  { label: 'JACKETS', value: 'jackets' },
  { label: 'TOPS', value: 'tops' },
];

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'FEATURED', value: 'featured' },
  { label: 'NEWEST', value: 'newest' },
  { label: 'MOQ ↑', value: 'moq-asc' },
];

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState<SortOption>('featured');
  const [sortOpen, setSortOpen] = useState(false);

  const genderParam = searchParams.get('gender') as GenderFilter | null;
  const categoryParam = searchParams.get('category') as CategoryFilter | null;
  const filterParam = searchParams.get('filter');

  const [genderFilter, setGenderFilter] = useState<GenderFilter>(genderParam || 'all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(categoryParam || 'all');

  useEffect(() => {
    if (genderParam) setGenderFilter(genderParam);
    else setGenderFilter('all');
  }, [genderParam]);

  useEffect(() => {
    if (categoryParam) setCategoryFilter(categoryParam as CategoryFilter);
    else setCategoryFilter('all');
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filterParam === 'new') result = result.filter((p) => p.newArrival);
    if (genderFilter !== 'all') result = result.filter((p) => p.gender === genderFilter || p.gender === 'unisex');
    if (categoryFilter !== 'all') result = result.filter((p) => p.category === categoryFilter);

    switch (sort) {
      case 'newest':
        result = result.filter((p) => p.newArrival).concat(result.filter((p) => !p.newArrival));
        break;
      case 'moq-asc':
        result.sort((a, b) => a.minimumOrderQuantity - b.minimumOrderQuantity);
        break;
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
    }

    return result;
  }, [genderFilter, categoryFilter, sort, filterParam]);

  const setGender = (g: GenderFilter) => {
    setGenderFilter(g);
    const params = new URLSearchParams(searchParams);
    if (g === 'all') params.delete('gender');
    else params.set('gender', g);
    setSearchParams(params);
  };

  return (
    <main className="pt-[72px]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-[#E2DDD8] pb-10">
          <div>
            <h1 className="font-display text-5xl md:text-6xl text-[#141412] tracking-tight">Collection</h1>
            <p className="font-body text-[0.8rem] text-[#7A7672] mt-2">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} — wholesale enquiries welcome
            </p>
          </div>

          {/* Gender Filter */}
          <div className="flex items-center gap-6">
            {(['all', 'women', 'men'] as GenderFilter[]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`font-body text-[0.65rem] tracking-[0.16em] uppercase pb-1 border-b transition-all duration-200 ${
                  genderFilter === g
                    ? 'border-[#141412] text-[#141412]'
                    : 'border-transparent text-[#A8A4A0] hover:text-[#141412]'
                }`}
                aria-pressed={genderFilter === g}
              >
                {g === 'all' ? 'ALL' : g.charAt(0).toUpperCase() + g.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <aside className="lg:w-48 flex-shrink-0" aria-label="Collection filters">
            <div className="mb-8">
              <p className="label-sm text-[#A8A4A0] mb-4">CATEGORY</p>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.value}>
                    <button
                      onClick={() => setCategoryFilter(cat.value)}
                      className={`font-body text-[0.75rem] tracking-wide transition-colors duration-200 text-left ${
                        categoryFilter === cat.value ? 'text-[#141412] font-medium' : 'text-[#A8A4A0] hover:text-[#141412]'
                      }`}
                      aria-pressed={categoryFilter === cat.value}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-sm text-[#A8A4A0] mb-4">SORT BY</p>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 font-body text-[0.75rem] text-[#141412] tracking-wide"
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                >
                  {sortOptions.find((s) => s.value === sort)?.label}
                  <ChevronDown size={12} className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                {sortOpen && (
                  <ul className="absolute top-6 left-0 bg-white border border-[#E2DDD8] py-2 z-10 min-w-[140px]" role="listbox">
                    {sortOptions.map((opt) => (
                      <li key={opt.value}>
                        <button
                          onClick={() => { setSort(opt.value); setSortOpen(false); }}
                          className={`w-full text-left px-4 py-2 font-body text-[0.72rem] tracking-wide transition-colors ${
                            sort === opt.value ? 'text-[#141412] font-medium' : 'text-[#7A7672] hover:text-[#141412]'
                          }`}
                          role="option"
                          aria-selected={sort === opt.value}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-3xl text-[#C8C2BC]">No pieces found.</p>
                <button onClick={() => { setGenderFilter('all'); setCategoryFilter('all'); }} className="btn btn-outline mt-6">
                  CLEAR FILTERS
                </button>
              </div>
            ) : (
              <motion.div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8" layout>
                {filtered.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
