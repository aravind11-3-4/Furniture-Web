import { useState } from 'react';
import { Search, SlidersHorizontal, Star, ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const ALL_PRODUCTS = [
  { id: 1,  name: 'Oslo Sofa',           price: 1299, category: 'Living Room', rating: 4.8, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  { id: 2,  name: 'Nordic Dining Table', price: 899,  category: 'Dining',      rating: 4.6, img: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=400&q=80' },
  { id: 3,  name: 'Milano Armchair',     price: 549,  category: 'Living Room', rating: 4.9, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { id: 4,  name: 'Zen Bed Frame',       price: 799,  category: 'Bedroom',     rating: 4.7, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80' },
  { id: 5,  name: 'Loft Coffee Table',   price: 349,  category: 'Living Room', rating: 4.5, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80' },
  { id: 6,  name: 'Bloom Wardrobe',      price: 1099, category: 'Bedroom',     rating: 4.8, img: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&q=80' },
  { id: 7,  name: 'Arc Floor Lamp',      price: 199,  category: 'Lighting',    rating: 4.4, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: 8,  name: 'Cane Dining Chair',   price: 279,  category: 'Dining',      rating: 4.6, img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&q=80' },
  { id: 9,  name: 'Tokyo Bookshelf',     price: 449,  category: 'Storage',     rating: 4.7, img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80' },
  { id: 10, name: 'Marble Side Table',   price: 389,  category: 'Living Room', rating: 4.5, img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&q=80' },
  { id: 11, name: 'Velvet Ottoman',      price: 299,  category: 'Living Room', rating: 4.6, img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&q=80' },
  { id: 12, name: 'Solid Oak Desk',      price: 699,  category: 'Office',      rating: 4.9, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80' },
];

const CATEGORIES = ['All', ...new Set(ALL_PRODUCTS.map(p => p.category))];

export default function Category() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const { addItem, count } = useCart();
  const [notif, setNotif] = useState('');

  function handleAdd(product) {
    addItem(product);
    setNotif(product.name);
    setTimeout(() => setNotif(''), 2000);
  }

  let products = ALL_PRODUCTS
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (sortBy === 'price-asc') products.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') products.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') products.sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar cartCount={count} />

      {/* Toast */}
      {notif && (
        <div className="fixed bottom-6 right-6 z-50 card-glass border border-white/20 px-5 py-3 text-sm text-brand-white animate-fadeIn shadow-2xl">
          ✓ <strong>{notif}</strong> added to cart
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-brand-smoke mb-2">Browse</p>
          <h1 className="font-display text-4xl font-bold text-brand-white">All Collections</h1>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
            <input
              id="search-products"
              type="text"
              placeholder="Search furniture..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
            <select
              id="sort-products"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="input-field pl-9 w-48 appearance-none cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-brand-white text-brand-black border-brand-white'
                  : 'border-brand-graphite text-brand-silver hover:border-brand-silver'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="text-center text-brand-smoke py-24">No products found.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="card-glass group overflow-hidden hover:border-white/25 transition-all duration-300 hover:-translate-y-1">
                <div className="overflow-hidden rounded-xl mb-4">
                  <img src={p.img} alt={p.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-2">
                  <span className="text-xs text-brand-smoke uppercase tracking-wider">{p.category}</span>
                  <h2 className="font-semibold text-brand-white mt-1 truncate">{p.name}</h2>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-brand-white">${p.price.toLocaleString()}</span>
                    <span className="flex items-center gap-1 text-xs text-brand-silver">
                      <Star size={11} className="fill-brand-silver" /> {p.rating}
                    </span>
                  </div>
                  <button onClick={() => handleAdd(p)} className="btn-primary w-full mt-3 py-2 text-sm">
                    <ShoppingCart size={15} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
