import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSweetById, purchaseSweet, restockSweet } from '../api/api';
import { isAdmin, isAuthenticated } from '../utils/auth';

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

    const [restockQty, setRestockQty] = React.useState(0);

    return (
        <div>
            <h1>{sweet.name}</h1>
            <p>Category: {sweet.category}</p>
            <p>Price: ${sweet.price}</p>
            <p>Quantity: {sweet.quantity}</p>
            <p>Description: {sweet.description}</p>
            <div>
                <button
                    onClick={async () => {
                        try {
                            await purchaseSweet(sweet._id, 1);
                            setSweet(prev => ({ ...prev, quantity: Math.max(0, prev.quantity - 1) }));
                        } catch (err) {
                            alert(err.response?.data?.message || err.message);
                        }
                    }}
                    disabled={sweet.quantity <= 0}
                >
                    Purchase
                </button>
            </div>
            {isAuthenticated() && isAdmin() && (
                <div>
                    <h3>Admin Restock</h3>
                    <input type="number" value={restockQty} onChange={(e) => setRestockQty(Number(e.target.value))} />
                    <button onClick={async () => {
                        try {
                            await restockSweet(sweet._id, Number(restockQty));
                            setSweet(prev => ({ ...prev, quantity: prev.quantity + Number(restockQty) }));
                        } catch (err) {
                            alert(err.response?.data?.message || err.message);
                        }
                    }}>Restock</button>
                </div>
            )}
        </div>
    );
};

export default SweetDetails;
