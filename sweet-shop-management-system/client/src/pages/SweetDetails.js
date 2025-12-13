import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSweetById } from '../api/api';

const SweetDetails = () => {
    const { id } = useParams();
    const [sweet, setSweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSweet = async () => {
            try {
                const data = await getSweetById(id);
                setSweet(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSweet();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{sweet.name}</h1>
            <p>Category: {sweet.category}</p>
            <p>Price: ${sweet.price}</p>
            <p>Quantity: {sweet.quantity}</p>
            <p>Description: {sweet.description}</p>
        </div>
    );
};

export default SweetDetails;