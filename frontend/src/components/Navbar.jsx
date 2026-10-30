import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ cartCount = 0 }) {
  const { isAuthenticated, isAdmin, username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/category', label: 'Shop' },
    { to: '/cart', label: 'Cart' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-black/80 backdrop-blur-lg border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-brand-white flex items-center justify-center">
            <span className="text-brand-black font-display font-bold text-sm">F</span>
          </span>
          <span className="font-display font-bold text-xl text-brand-white group-hover:text-brand-mist transition-colors">
            Furniture Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={isActive(to) ? 'nav-link-active' : 'nav-link'}
            >
              {label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className={isActive('/admin') ? 'nav-link-active' : 'nav-link'}>
              Admin
            </Link>
          )}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart */}
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/10 transition">
            <ShoppingCart size={20} className="text-brand-silver" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-white text-brand-black text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-silver hidden lg:block">{username}</span>
              {isAdmin && (
                <Link to="/admin" className="p-2 rounded-lg hover:bg-white/10 transition" title="Admin Dashboard">
                  <LayoutDashboard size={18} className="text-brand-silver" />
                </Link>
              )}
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-white/10 transition" title="Logout">
                <LogOut size={18} className="text-brand-silver" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-4 text-sm">
              <User size={16} /> Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-brand-charcoal border-b border-white/10 px-4 py-4 flex flex-col gap-4 animate-fadeIn">
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="nav-link text-base" onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          {isAdmin && <Link to="/admin" className="nav-link text-base" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>}
          <div className="divider" />
          {isAuthenticated ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn-ghost w-full">
              <LogOut size={16} /> Sign Out
            </button>
          ) : (
            <Link to="/login" className="btn-primary w-full" onClick={() => setMenuOpen(false)}>
              <User size={16} /> Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
