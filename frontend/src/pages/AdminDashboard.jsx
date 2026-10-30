import { useState } from 'react';
import { Package, PlusCircle, Pencil, Trash2, LayoutDashboard, Users, ShoppingBag, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const INIT_PRODUCTS = [
  { id: 1, name: 'Oslo Sofa',           price: 1299, category: 'Living Room', stock: 12 },
  { id: 2, name: 'Nordic Dining Table', price: 899,  category: 'Dining',      stock: 7  },
  { id: 3, name: 'Milano Armchair',     price: 549,  category: 'Living Room', stock: 20 },
  { id: 4, name: 'Zen Bed Frame',       price: 799,  category: 'Bedroom',     stock: 5  },
  { id: 5, name: 'Solid Oak Desk',      price: 699,  category: 'Office',      stock: 9  },
];

const STATS = [
  { icon: <Package size={22} />, label: 'Products', value: '12' },
  { icon: <Users size={22} />, label: 'Customers', value: '1,248' },
  { icon: <ShoppingBag size={22} />, label: 'Orders', value: '84' },
  { icon: <LayoutDashboard size={22} />, label: 'Revenue', value: '$24,680' },
];

const EMPTY_FORM = { name: '', price: '', category: '', stock: '' };

export default function AdminDashboard() {
  const { count } = useCart();
  const { username } = useAuth();
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function openAdd() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }

  function openEdit(p) {
    setEditId(p.id);
    setForm({ name: p.name, price: p.price, category: p.category, stock: p.stock });
    setShowModal(true);
  }

  function handleSave(e) {
    e.preventDefault();
    const productData = {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock),
    };
    if (editId) {
      setProducts(prev => prev.map(p => p.id === editId ? { ...p, ...productData } : p));
    } else {
      setProducts(prev => [...prev, { ...productData, id: Date.now() }]);
    }
    setShowModal(false);
  }

  function handleDelete(id) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div className="min-h-screen bg-brand-black">
      <Navbar cartCount={count} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-smoke mb-2">Admin Panel</p>
            <h1 className="font-display text-4xl font-bold text-brand-white">Dashboard</h1>
            <p className="text-brand-smoke text-sm mt-1">Welcome back, {username || 'Admin'}</p>
          </div>
          <button id="add-product-btn" onClick={openAdd} className="btn-primary">
            <PlusCircle size={18} /> Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map(({ icon, label, value }) => (
            <div key={label} className="card-glass p-5 flex items-center gap-4">
              <span className="text-brand-silver">{icon}</span>
              <div>
                <p className="text-2xl font-bold text-brand-white">{value}</p>
                <p className="text-xs text-brand-smoke">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Products table */}
        <div className="card-glass overflow-hidden">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="font-semibold text-brand-white">Product Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-brand-smoke text-xs uppercase tracking-widest font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-white">{p.name}</td>
                    <td className="px-6 py-4 text-brand-silver">{p.category}</td>
                    <td className="px-6 py-4 text-brand-white">${p.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${p.stock < 6 ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-white/10 text-brand-silver hover:text-brand-white transition" title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-red-500/20 text-brand-silver hover:text-red-400 transition" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="card-glass w-full max-w-md p-7 relative animate-fadeIn">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-brand-smoke hover:text-brand-white transition">
              <X size={20} />
            </button>
            <h2 className="font-display text-2xl font-bold text-brand-white mb-6">
              {editId ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { id: 'name',     label: 'Product Name',  type: 'text',   placeholder: 'e.g. Oslo Sofa' },
                { id: 'category', label: 'Category',      type: 'text',   placeholder: 'e.g. Living Room' },
                { id: 'price',    label: 'Price ($)',      type: 'number', placeholder: '999' },
                { id: 'stock',    label: 'Stock (units)',  type: 'number', placeholder: '10' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs font-semibold uppercase tracking-widest text-brand-smoke mb-2">
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.id]}
                    onChange={e => setForm(prev => ({ ...prev, [f.id]: e.target.value }))}
                    className="input-field"
                  />
                </div>
              ))}
              <button type="submit" className="btn-primary w-full mt-2">
                {editId ? 'Save Changes' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
