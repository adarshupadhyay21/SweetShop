import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ===== AUTH APIs ===== */
export const login = async (credentials) => {
  const res = await client.post("/auth/login", credentials);
  return res.data;
};

/* ===== USER / ADMIN APIs ===== */
export const getUsers = async () => {
  const res = await client.get("/users");
  return res.data;
};

export const promoteUser = async (id) => {
  const res = await client.post(`/users/${id}/promote`);
  return res.data;
};


export const register = async (userData) => {
  const res = await client.post("/auth/register", userData);
  return res.data;
};

/* ===== SWEET APIs ===== */
export const getAllSweets = async () => {
  const res = await client.get("/sweets");
  return res.data;
};

export const getSweetById = async (id) => {
  const res = await client.get(`/sweets/${id}`);
  return res.data;
};

export const addSweet = async (sweet) => {
  const res = await client.post("/sweets", sweet);
  return res.data;
};

export const updateSweet = async (id, sweet) => {
  const res = await client.put(`/sweets/${id}`, sweet);
  return res.data;
};

export const deleteSweet = async (id) => {
  const res = await client.delete(`/sweets/${id}`);
  return res.data;
};

export const searchSweets = async (query) => {
  const res = await client.get(`/sweets/search?q=${query}`);
  return res.data;
};

/* ===== PURCHASE & RESTOCK APIs ===== */
export const purchaseSweet = async (id, quantity) => {
  const res = await client.post(`/sweets/${id}/purchase`, { quantity });
  return res.data;
};

export const restockSweet = async (id, quantity) => {
  const res = await client.post(`/sweets/${id}/restock`, { quantity });
  return res.data;
};
