import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const client = axios.create({ baseURL: API_URL });
client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const getUsers = async () => {
    const res = await client.get('/users');
    return res.data;
};

export const promoteUser = async (id) => {
    const res = await client.post(`/users/${id}/promote`);
    return res.data;
};
