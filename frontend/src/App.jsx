import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function ProtectedAdmin({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated || !isAdmin) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart"     element={<Cart />} />
          <Route path="/payment"  element={<Payment />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/admin"    element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
