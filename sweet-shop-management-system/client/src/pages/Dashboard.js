import React, { useEffect, useState } from 'react';
import { getAllSweets } from '../api/api';
import SweetList from '../components/SweetList';

const Dashboard = () => {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Sweet Shop Dashboard</h1>
            <SweetList sweets={sweets} />
        </div>
    );
};

export default Dashboard;