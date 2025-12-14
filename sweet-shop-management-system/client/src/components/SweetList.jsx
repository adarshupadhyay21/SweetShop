import React, { useEffect, useState } from 'react';
import { getAllSweets, purchaseSweet, deleteSweet } from '../api/api';
import { useHistory } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../utils/auth';

const DUMMY_SWEETS = [
    'Choco Delight','Strawberry Swirl','Vanilla Dream','Caramel Crunch','Minty Morsel',
    'Honey Blossom','Lemon Zest','Blueberry Bliss','Cinnamon Twist','Maple Bite',
    'Almond Joy','Orange Spark','Rose Petal','Coffee Caramel','Pistachio Pop'
].map((name, idx) => ({
    _id: `dummy-${idx+1}`,
    name,
    category: ['Candy','Chocolate','Pastry'][idx % 3],
    price: (Math.random() * 5 + 1).toFixed(2),
    quantity: Math.floor(Math.random() * 20),
    description: `Delicious ${name} made with love.`
}));

const SweetList = ({ sweets: initialSweets }) => {
    const [sweets, setSweets] = useState(initialSweets || []);
    const [loading, setLoading] = useState(!initialSweets);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (initialSweets) {
            if (initialSweets.length === 0) {
                setSweets(DUMMY_SWEETS);
            } else {
                setSweets(initialSweets);
            }
            return;
        }
        const fetchSweets = async () => {
            try {
                const data = await getAllSweets();
                if (!data || data.length === 0) setSweets(DUMMY_SWEETS);
                else setSweets(data);
            } catch (err) {
                setError(err.message || 'Failed to load sweets');
            } finally {
                setLoading(false);
            }
        };

        fetchSweets();
    }, [initialSweets]);

    if (loading) return <div className="container">Loading...</div>;
    if (error) return <div className="container">Error: {error}</div>;

    return (
        <div className="container">
            <h2>Sweet List</h2>
            <div className="sweet-list">
                {sweets.map(sweet => (
                    <div className="sweet-card" key={sweet._id}>
                        <div className="thumb">{sweet.name.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
                        <h3>{sweet.name}</h3>
                        <div className="sweet-meta">
                            <span>{sweet.category}</span>
                            <span className="price-badge">${Number(sweet.price).toFixed(2)}</span>
                        </div>
                        <p style={{ color: '#6c757d', marginTop: 6 }}>{sweet.description}</p>
                        <div className="card-actions">
                            <button className="btn btn-success"
                                onClick={async () => {
                                    try {
                                        if (!sweet._id.startsWith('dummy-')) await purchaseSweet(sweet._id, 1);
                                        setSweets((prev) => prev.map(s => s._id === sweet._id ? { ...s, quantity: Math.max(0, s.quantity - 1) } : s));
                                    } catch (err) {
                                        alert(err.response?.data?.message || err.message);
                                    }
                                }}
                                disabled={sweet.quantity <= 0}
                            >
                                {sweet.quantity <= 0 ? 'Sold Out' : 'Purchase'}
                            </button>
                            {isAuthenticated() && isAdmin() && (
                                <>
                                    <button className="btn btn-primary" onClick={() => history.push(`/sweets/${sweet._id}/edit`)}>Edit</button>
                                    <button className="btn btn-danger" onClick={async () => {
                                        if (!window.confirm('Delete this sweet?')) return;
                                        try {
                                            if (!sweet._id.startsWith('dummy-')) await deleteSweet(sweet._id);
                                            setSweets((prev) => prev.filter(s => s._id !== sweet._id));
                                        } catch (err) {
                                            alert(err.response?.data?.message || err.message);
                                        }
                                    }}>Delete</button>
                                </>
                            )}
                            <div style={{ marginLeft: 'auto', color: '#6c757d', fontWeight: 700 }}>Qty: {sweet.quantity}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SweetList;
