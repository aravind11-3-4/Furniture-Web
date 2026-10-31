import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import API from '../api/api';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/auth/register', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        (err.code === 'ERR_NETWORK'
          ? 'Cannot reach the backend on port 8080. Start the Spring Boot server and try again.'
          : err.message || 'Registration failed.');
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-white/3 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md card-glass p-8 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-white flex items-center justify-center mx-auto mb-3">
            <span className="font-display font-bold text-brand-black text-xl">F</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-brand-white">Create Account</h1>
          <p className="text-sm text-brand-smoke mt-1">Register to save your profile in Furniture Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
              <input
                id="name"
                type="text"
                required
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                className="input-field pl-9"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
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
                minLength={6}
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

          <div>
            <label htmlFor="confirm" className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-smoke" />
              <input
                id="confirm"
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                className="input-field pl-9"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            id="register-btn"
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 mt-2"
          >
            <UserPlus size={18} /> {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-xs text-brand-smoke mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-silver hover:text-brand-white transition underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
