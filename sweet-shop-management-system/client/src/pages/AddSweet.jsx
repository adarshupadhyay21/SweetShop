import React from 'react';
import SweetForm from '../components/SweetForm.jsx';
import { useHistory } from 'react-router-dom';

const AddSweet = () => {
    const history = useHistory();

    const handleSubmit = () => {
        history.push('/');
    };

    return (
        <div>
            <h2>Add Sweet</h2>
            <SweetForm onSubmit={handleSubmit} />
        </div>
    );
};

export default AddSweet;
