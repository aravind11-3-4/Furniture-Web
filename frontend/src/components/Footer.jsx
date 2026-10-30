// Footer component
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-charcoal mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold text-brand-white mb-3">Furniture Hub</h3>
          <p className="text-sm text-brand-silver leading-relaxed">
            Crafting spaces that inspire. Premium furniture for modern living.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-mist mb-3 uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-2 text-sm text-brand-silver">
            <li><a href="/" className="hover:text-brand-white transition">Home</a></li>
            <li><a href="/category" className="hover:text-brand-white transition">Shop</a></li>
            <li><a href="/cart" className="hover:text-brand-white transition">Cart</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-mist mb-3 uppercase tracking-widest">Contact</h4>
          <ul className="space-y-2 text-sm text-brand-silver">
            <li>hello@furniturehub.com</li>
            <li>+1 (800) 123-4567</li>
            <li>Mon – Fri, 9am – 6pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-brand-smoke">
        &copy; {new Date().getFullYear()} Furniture Hub. All rights reserved.
      </div>
    </footer>
  );
}
