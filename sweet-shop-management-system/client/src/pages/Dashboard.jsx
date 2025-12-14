import React, { useEffect, useState } from 'react';
import { getAllSweets, searchSweets } from '../api/api';
import SweetList from '../components/SweetList';

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        getAllSweets()
            .then(setSweets)
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const params = { q: query, minPrice, maxPrice };
            const data = await searchSweets(params);
            setSweets(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Sweet Shop Dashboard</h1>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input placeholder="Search by name" value={query} onChange={e => setQuery(e.target.value)} />
                <input placeholder="Min price" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                <input placeholder="Max price" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                <button type="submit">Search</button>
                <button type="button" onClick={() => {
                    setQuery('');
                    setMinPrice('');
                    setMaxPrice('');
                    setLoading(true);
                    getAllSweets().then(setSweets).finally(() => setLoading(false));
                }}>
                    Reset
                </button>
            </form>

            <SweetList sweets={sweets} />
        </div>
    );
};

export default Dashboard;
