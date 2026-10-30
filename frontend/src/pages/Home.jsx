import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const FEATURED = [
  { id: 1, name: 'Oslo Sofa', price: 1299, category: 'Living Room', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', rating: 4.8 },
  { id: 2, name: 'Nordic Dining Table', price: 899, category: 'Dining', img: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=400&q=80', rating: 4.6 },
  { id: 3, name: 'Milano Armchair', price: 549, category: 'Living Room', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', rating: 4.9 },
];

const BENEFITS = [
  { icon: <Truck size={24} />, title: 'Free Delivery', desc: 'On all orders over $500' },
  { icon: <Shield size={24} />, title: '5-Year Warranty', desc: 'Crafted to last a lifetime' },
  { icon: <Star size={24} />, title: '50k+ Reviews', desc: 'Trusted by thousands' },
];

export default function Home() {
  const { addItem, count } = useCart();

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar cartCount={count} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/3 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slideRight">
            <span className="badge bg-white/10 text-brand-silver border border-white/20 mb-4 inline-block">
              ✦ New 2026 Collection
            </span>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-brand-white leading-tight mb-6">
              Where Design<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-mist to-brand-silver">
                Meets Comfort
              </span>
            </h1>
            <p className="text-brand-silver text-lg leading-relaxed mb-8 max-w-md">
              Curated furniture collections for modern living. Every piece tells a story of craftsmanship and elegance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/category" className="btn-primary group">
                Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/category" className="btn-ghost">View Lookbook</Link>
            </div>
          </div>
          <div className="relative animate-fadeIn">
            <div className="card-glass p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80"
                alt="Hero furniture"
                className="rounded-xl w-full h-80 object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 card-glass px-4 py-3 shadow-xl">
              <p className="text-xs text-brand-silver">Most Loved</p>
              <p className="font-semibold text-brand-white">Oslo Sofa Collection</p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-brand-white text-brand-white" />
                ))}
                <span className="text-xs text-brand-silver ml-1">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="border-y border-white/10 bg-brand-charcoal/50 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {BENEFITS.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <span className="text-brand-silver">{icon}</span>
              <h3 className="font-semibold text-brand-white">{title}</h3>
              <p className="text-xs text-brand-smoke">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-smoke mb-2">Handpicked For You</p>
            <h2 className="font-display text-4xl font-bold text-brand-white">Featured Pieces</h2>
          </div>
          <Link to="/category" className="nav-link flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((product) => (
            <div key={product.id} className="card-glass group overflow-hidden hover:border-white/25 transition-all duration-300 hover:-translate-y-1">
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-2">
                <span className="text-xs text-brand-smoke uppercase tracking-wider">{product.category}</span>
                <h3 className="font-semibold text-brand-white text-lg mt-1">{product.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-brand-white text-xl">${product.price.toLocaleString()}</span>
                  <div className="flex items-center gap-1 text-xs text-brand-silver">
                    <Star size={12} className="fill-brand-silver" /> {product.rating}
                  </div>
                </div>
                <button
                  onClick={() => addItem(product)}
                  className="btn-primary w-full mt-3 py-2 text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <div className="card-glass p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <h2 className="font-display text-4xl font-bold text-brand-white mb-4">Elevate Your Space</h2>
          <p className="text-brand-silver mb-8 max-w-md mx-auto">
            Explore our full catalog of over 200 curated furniture pieces shipped to your door.
          </p>
          <Link to="/category" className="btn-primary">
            Shop All Furniture <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
