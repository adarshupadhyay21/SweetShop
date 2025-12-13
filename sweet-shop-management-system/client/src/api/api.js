import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAllSweets = async () => {
    const response = await axios.get(`${API_URL}/sweets`);
    return response.data;
};

export const getSweetById = async (id) => {
    const response = await axios.get(`${API_URL}/sweets/${id}`);
    return response.data;
};

export const addSweet = async (sweetData) => {
    const response = await axios.post(`${API_URL}/sweets`, sweetData);
    return response.data;
};

export const updateSweet = async (id, sweetData) => {
    const response = await axios.put(`${API_URL}/sweets/${id}`, sweetData);
    return response.data;
};

export const deleteSweet = async (id) => {
    const response = await axios.delete(`${API_URL}/sweets/${id}`);
    return response.data;
};