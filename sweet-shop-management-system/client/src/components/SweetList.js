import React, { useEffect, useState } from 'react';
import { getAllSweets } from '../api/api';

const SweetList = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const data = await getAllSweets();
                setSweets(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSweets();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Sweet List</h2>
            <ul>
                {sweets.map(sweet => (
                    <li key={sweet._id}>
                        <h3>{sweet.name}</h3>
                        <p>Category: {sweet.category}</p>
                        <p>Price: ${sweet.price}</p>
                        <p>Quantity: {sweet.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SweetList;