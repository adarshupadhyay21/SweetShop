import React, { useState, useEffect } from 'react';
import { addSweet, updateSweet } from '../api/api';

const SweetForm = ({ sweet, onSubmit }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (sweet) {
            setName(sweet.name);
            setCategory(sweet.category);
            setPrice(sweet.price);
            setQuantity(sweet.quantity);
        }
    }, [sweet]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const sweetData = { name, category, price, quantity };
        if (sweet) {
            updateSweet(sweet._id, sweetData).then(onSubmit);
        } else {
            addSweet(sweetData).then(onSubmit);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{sweet ? 'Update Sweet' : 'Add Sweet'}</button>
        </form>
    );
};

export default SweetForm;