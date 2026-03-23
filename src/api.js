// ─────────────────────────────────────────────────────────────────────────────
// NexusTech — Frontend API Connector
// src/api.js এ এই file টি রাখুন
// ─────────────────────────────────────────────────────────────────────────────

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Token localStorage থেকে নেওয়া
const getToken = () => localStorage.getItem('nexustech_token');

// Common headers
const headers = (withAuth = false) => {
  const h = { 'Content-Type': 'application/json' };
  if (withAuth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
};

// ── AUTH ──────────────────────────────────────────────────────────────────────
export const register = async (name, email, password, phone) => {
  const res = await fetch(`${BASE}/api/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name, email, password, phone }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Register failed');
  // Save token
  localStorage.setItem('nexustech_token', data.token);
  return data;
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('nexustech_token', data.token);
  return data;
};

export const getMe = async () => {
  const res = await fetch(`${BASE}/api/auth/me`, { headers: headers(true) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const logout = () => {
  localStorage.removeItem('nexustech_token');
};

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
export const getProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/products?${query}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data; // { products, total, page, totalPages }
};

export const getProduct = async (id) => {
  const res = await fetch(`${BASE}/api/products/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const createProduct = async (productData) => {
  // productData can be FormData (with images) or plain object
  const isFormData = productData instanceof FormData;
  const res = await fetch(`${BASE}/api/products`, {
    method: 'POST',
    headers: isFormData
      ? { 'Authorization': `Bearer ${getToken()}` }
      : headers(true),
    body: isFormData ? productData : JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const updateProduct = async (id, productData) => {
  const isFormData = productData instanceof FormData;
  const res = await fetch(`${BASE}/api/products/${id}`, {
    method: 'PUT',
    headers: isFormData
      ? { 'Authorization': `Bearer ${getToken()}` }
      : headers(true),
    body: isFormData ? productData : JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE}/api/products/${id}`, {
    method: 'DELETE',
    headers: headers(true),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const updateStock = async (id, stock) => {
  const res = await fetch(`${BASE}/api/products/${id}/stock`, {
    method: 'PATCH',
    headers: headers(true),
    body: JSON.stringify({ stock }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

// ── ORDERS ────────────────────────────────────────────────────────────────────
export const placeOrder = async (orderData) => {
  const res = await fetch(`${BASE}/api/orders`, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const getMyOrders = async () => {
  const res = await fetch(`${BASE}/api/orders/my`, { headers: headers(true) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const getAllOrders = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/orders?${query}`, { headers: headers(true) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${BASE}/api/orders/${id}/status`, {
    method: 'PUT',
    headers: headers(true),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

// ── USERS (Admin) ─────────────────────────────────────────────────────────────
export const getAllUsers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/api/users?${query}`, { headers: headers(true) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE}/api/users/${id}`, {
    method: 'DELETE',
    headers: headers(true),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
};
