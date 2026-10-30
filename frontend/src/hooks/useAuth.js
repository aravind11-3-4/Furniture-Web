// Simple auth context stored in localStorage using JWT
import { useState, useEffect } from 'react';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('furniture_token'));

  const payload = token ? parseJwt(token) : null;
  const isAuthenticated = !!payload;
  const isAdmin = payload?.role === 'ADMIN';
  const username = payload?.sub || '';

  function login(newToken) {
    localStorage.setItem('furniture_token', newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem('furniture_token');
    setToken(null);
  }

  // Auto-logout when token expires
  useEffect(() => {
    if (payload?.exp) {
      const ms = payload.exp * 1000 - Date.now();
      if (ms <= 0) { logout(); return; }
      const id = setTimeout(logout, ms);
      return () => clearTimeout(id);
    }
  }, [token]);

  return { token, isAuthenticated, isAdmin, username, login, logout };
}
