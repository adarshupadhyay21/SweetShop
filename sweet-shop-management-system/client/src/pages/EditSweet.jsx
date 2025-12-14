import React, { useEffect, useState } from 'react';
import SweetForm from '../components/SweetForm.jsx';
import { getSweetById } from '../api/api.js';
import { useHistory, useParams } from 'react-router-dom';

const EditSweet = () => {
    const { id } = useParams();
    const history = useHistory();
    const [sweet, setSweet] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const s = await getSweetById(id);
            setSweet(s);
        };
        fetch();
    }, [id]);

    const handleSubmit = () => {
        history.push(`/sweets/${id}`);
    };

    if (!sweet) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Sweet</h2>
            <SweetForm sweet={sweet} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditSweet;
