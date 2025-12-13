import { useState, useEffect } from 'react';
import api from '../api/api';

const useSweets = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const response = await api.get('/sweets');
                setSweets(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSweets();
    }, []);

    const addSweet = async (sweet) => {
        try {
            const response = await api.post('/sweets', sweet);
            setSweets((prevSweets) => [...prevSweets, response.data]);
        } catch (err) {
            setError(err);
        }
    };

    const updateSweet = async (id, updatedSweet) => {
        try {
            const response = await api.put(`/sweets/${id}`, updatedSweet);
            setSweets((prevSweets) =>
                prevSweets.map((sweet) => (sweet._id === id ? response.data : sweet))
            );
        } catch (err) {
            setError(err);
        }
    };

    const deleteSweet = async (id) => {
        try {
            await api.delete(`/sweets/${id}`);
            setSweets((prevSweets) => prevSweets.filter((sweet) => sweet._id !== id));
        } catch (err) {
            setError(err);
        }
    };

    return { sweets, loading, error, addSweet, updateSweet, deleteSweet };
};

export default useSweets;