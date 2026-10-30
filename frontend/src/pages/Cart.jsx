import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQty, total, count } = useCart();

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar cartCount={count} />
      <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-brand-smoke mb-2">Review</p>
          <h1 className="font-display text-4xl font-bold text-brand-white">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 card-glass">
            <ShoppingBag size={52} className="mx-auto text-brand-graphite mb-4" />
            <p className="text-brand-silver text-lg mb-6">Your cart is empty.</p>
            <Link to="/category" className="btn-primary inline-flex">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={item.id} className="card-glass p-4 flex gap-4 items-center group">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-brand-white truncate">{item.name}</h3>
                    <p className="text-sm text-brand-smoke">{item.category}</p>
                    <p className="font-bold text-brand-white mt-1">${item.price.toLocaleString()}</p>
                  </div>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 rounded-lg border border-brand-graphite flex items-center justify-center hover:border-brand-silver transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-brand-white font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 rounded-lg border border-brand-graphite flex items-center justify-center hover:border-brand-silver transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {/* Line total */}
                  <span className="text-brand-white font-bold w-20 text-right">
                    ${(item.price * item.qty).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-brand-smoke hover:text-red-400 transition ml-2"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="card-glass p-6 h-fit">
              <h2 className="font-display text-xl font-bold text-brand-white mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm text-brand-silver">
                <div className="flex justify-between">
                  <span>Subtotal ({count} items)</span>
                  <span className="text-brand-white">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-brand-white">{total >= 500 ? 'Free' : '$29'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span className="text-brand-white">${(total * 0.08).toFixed(2)}</span>
                </div>
              </div>
              <div className="divider" />
              <div className="flex justify-between font-bold text-brand-white text-lg mb-6">
                <span>Total</span>
                <span>${(total + (total < 500 ? 29 : 0) + total * 0.08).toFixed(2)}</span>
              </div>
              <Link to="/payment" className="btn-primary w-full">
                Proceed to Checkout <ArrowRight size={18} />
              </Link>
              <Link to="/category" className="btn-ghost w-full mt-3 text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
