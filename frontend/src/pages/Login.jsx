import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import API from '../api/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('user');         // 'user' | 'admin'
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await API.post('/auth/login', { ...form, role: tab.toUpperCase() });
      login(res.data.token);
      navigate(tab === 'admin' ? '/admin' : '/');
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || 'Login failed. Check your credentials or start the backend.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/3 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md card-glass p-8 animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-white flex items-center justify-center mx-auto mb-3">
            <span className="font-display font-bold text-brand-black text-xl">F</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-brand-white">Welcome Back</h1>
          <p className="text-sm text-brand-smoke mt-1">Sign in to your account</p>
        </div>

        {/* Role tabs */}
        <div className="flex bg-brand-charcoal rounded-xl p-1 mb-6">
          {['user', 'admin'].map(t => (
            <button
              key={t}
              id={`tab-${t}`}
              onClick={() => { setTab(t); setError(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                tab === t ? 'bg-brand-white text-brand-black shadow' : 'text-brand-silver hover:text-brand-white'
              }`}
            >
              {t === 'user' ? '👤 User' : '🛡️ Admin'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
              Email
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
              <input
                id="email"
                type="email"
                required
                placeholder={tab === 'admin' ? 'admin@furniturehub.com' : 'you@example.com'}
                value={form.email}
                onChange={handleChange}
                className="input-field pl-9"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="input-field pl-9 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-smoke hover:text-brand-silver transition"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            id="login-btn"
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 mt-2"
          >
            <LogIn size={18} /> {loading ? 'Signing in…' : `Sign in as ${tab === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>

        <p className="text-center text-xs text-brand-smoke mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-silver hover:text-brand-white transition underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
