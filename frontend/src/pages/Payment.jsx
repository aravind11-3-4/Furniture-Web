import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import API from '../api/api';

export default function Payment() {
  const { items, total, count, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const grandTotal = (total + (total < 500 ? 29 : 0) + total * 0.08).toFixed(2);

  function handleChange(e) {
    let { id, value } = e.target;
    if (id === 'cardNumber') value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (id === 'expiry') value = value.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/');
    if (id === 'cvv') value = value.replace(/\D/g, '').slice(0, 3);
    setForm(prev => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/payment/checkout', {
        items: items.map(i => ({ productId: i.id, quantity: i.qty })),
        totalAmount: parseFloat(grandTotal),
      });
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Payment failed. Sign in and make sure the backend is running.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center text-center px-4">
        <CheckCircle size={72} className="text-brand-white mb-6 animate-fadeIn" />
        <h1 className="font-display text-4xl font-bold text-brand-white mb-3 animate-fadeIn">Order Placed!</h1>
        <p className="text-brand-silver mb-2 animate-fadeIn">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <p className="text-brand-smoke text-sm animate-fadeIn">Redirecting to home in 3 seconds…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar cartCount={count} />
      <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-brand-smoke mb-2">Checkout</p>
          <h1 className="font-display text-4xl font-bold text-brand-white">Secure Payment</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 card-glass p-6 space-y-5">
            <div className="flex items-center gap-2 text-brand-silver mb-2">
              <Lock size={16} />
              <span className="text-xs uppercase tracking-widest">SSL Encrypted</span>
            </div>

            <div>
              <label htmlFor="cardName" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
                Cardholder Name
              </label>
              <input id="cardName" required className="input-field" placeholder="John Smith" value={form.cardName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
                <input id="cardNumber" required className="input-field pl-9" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">Expiry</label>
                <input id="expiry" required className="input-field" placeholder="MM/YY" value={form.expiry} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">CVV</label>
                <input id="cvv" required type="password" className="input-field" placeholder="•••" value={form.cvv} onChange={handleChange} />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              id="pay-now-btn"
              disabled={loading}
              className="btn-primary w-full text-base py-4"
            >
              {loading ? 'Processing…' : `Pay $${grandTotal}`}
            </button>

            <p className="text-center text-xs text-brand-smoke">
              Your payment info is encrypted and never stored.
            </p>
          </form>

          {/* Order recap */}
          <div className="lg:col-span-2 card-glass p-6 h-fit space-y-4">
            <h2 className="font-display text-xl font-bold text-brand-white">Order Summary</h2>
            {items.map(i => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-brand-silver truncate max-w-[60%]">{i.name} ×{i.qty}</span>
                <span className="text-brand-white">${(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
            <div className="divider" />
            <div className="flex justify-between font-bold text-brand-white">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
