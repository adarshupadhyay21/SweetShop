import React, { useEffect, useState } from 'react';
import { getAllSweets, searchSweets } from '../api/api.js';
import SweetList from '../components/SweetList';

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Fetch all sweets on page load
    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const res = await getAllSweets();
                // Normalize API response
                setSweets(Array.isArray(res) ? res : res?.data || []);
            } catch (err) {
                setError(err.message || 'Failed to load sweets');
            } finally {
                setLoading(false);
            }
        };

        fetchSweets();
    }, []);

    // Search handler
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const params = { q: query, minPrice, maxPrice };
            const res = await searchSweets(params);
            setSweets(Array.isArray(res) ? res : res?.data || []);
        } catch (err) {
            setError(err.message || 'Search failed');
        } finally {
            setLoading(false);
        }
    };

    // Reset filters
    const handleReset = async () => {
        setQuery('');
        setMinPrice('');
        setMaxPrice('');
        setLoading(true);
        setError(null);

        try {
            const res = await getAllSweets();
            setSweets(Array.isArray(res) ? res : res?.data || []);
        } catch (err) {
            setError(err.message || 'Failed to reload sweets');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading sweets...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div className="container">
            <h1>Sweet Shop Dashboard</h1>

            {/* Search & Filters */}
            <form
                onSubmit={handleSearch}
                style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}
            >
                <input
                    type="text"
                    placeholder="Search by name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />

                <button type="submit">Search</button>
                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            </form>

            {/* Sweet List */}
            <SweetList sweets={sweets} />
        </div>
    );
};

export default Dashboard;
