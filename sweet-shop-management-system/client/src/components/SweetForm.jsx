import React, { useState, useEffect } from 'react';
import { addSweet, updateSweet } from "../api/api.js";


const SweetForm = ({ sweet, onSubmit }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sweet) {
            setName(sweet.name || '');
            setCategory(sweet.category || '');
            setPrice(sweet.price || '');
            setQuantity(sweet.quantity || '');
        }
    }, [sweet]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const sweetData = { name, category, price: Number(price), quantity: Number(quantity) };
        try {
            if (sweet) {
                await updateSweet(sweet._id, sweetData);
            } else {
                await addSweet(sweetData);
            }
            if (onSubmit) onSubmit();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow rounded p-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input className="w-full border rounded px-3 py-2" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Classic Chocolate Bar" required />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input className="w-full border rounded px-3 py-2" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Chocolate" required />
                </div>

                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input className="w-full border rounded px-3 py-2" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1.99" required />
                    </div>
                    <div style={{ width: 140 }}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                        <input className="w-full border rounded px-3 py-2" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="10" required />
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <button className="bg-blue-600 text-white rounded px-4 py-2" type="submit" disabled={loading}>{loading ? 'Saving...' : (sweet ? 'Update Sweet' : 'Add Sweet')}</button>
                    <button className="border rounded px-4 py-2" type="button" onClick={() => { setName(''); setCategory(''); setPrice(''); setQuantity(''); }}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default SweetForm;
