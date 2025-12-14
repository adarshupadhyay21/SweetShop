import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const client = axios.create({ baseURL: API_URL });

client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const register = async (data) => {
    const res = await client.post('/auth/register', data);
    return res.data;
};

export const login = async (data) => {
    const res = await client.post('/auth/login', data);
    return res.data;
};

export const getAllSweets = async () => {
    const response = await client.get('/sweets');
    return response.data;
};

export const getSweetById = async (id) => {
    const response = await client.get(`/sweets/${id}`);
    return response.data;
};

export const addSweet = async (sweetData) => {
    const response = await client.post('/sweets', sweetData);
    return response.data;
};

export const updateSweet = async (id, sweetData) => {
    const response = await client.put(`/sweets/${id}`, sweetData);
    return response.data;
};

export const deleteSweet = async (id) => {
    const response = await client.delete(`/sweets/${id}`);
    return response.data;
};

export const searchSweets = async (params) => {
    const response = await client.get('/sweets/search', { params });
    return response.data;
};

export const purchaseSweet = async (id, quantity = 1) => {
    const response = await client.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
};

export const restockSweet = async (id, quantity) => {
    const response = await client.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
};
