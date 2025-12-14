import React from 'react';
import { purchaseSweet, deleteSweet } from '../api/api.js';
import { useHistory } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../utils/auth';

const SweetList = ({ sweets }) => {
    const history = useHistory();

    if (!Array.isArray(sweets) || sweets.length === 0) {
        return <div className="container">No sweets available</div>;
    }

    return (
        <div className="container">
            <h2>Sweet List</h2>

            <div className="sweet-list">
                {sweets.map((sweet) => (
                    <div className="sweet-card" key={sweet._id}>
                        <div className="thumb">
                            {sweet.name
                                ?.split(' ')
                                .slice(0, 2)
                                .map(w => w[0])
                                .join('')}
                        </div>

                        <h3>{sweet.name}</h3>

                        <div className="sweet-meta">
                            <span>{sweet.category}</span>
                            <span className="price-badge">
                                ${Number(sweet.price).toFixed(2)}
                            </span>
                        </div>

                        <p>{sweet.description}</p>

                        <div className="card-actions">
                            <button
                                className="btn btn-success"
                                disabled={sweet.quantity <= 0}
                                onClick={() => purchaseSweet(sweet._id, 1)}
                            >
                                {sweet.quantity <= 0 ? 'Sold Out' : 'Purchase'}
                            </button>

                            {isAuthenticated() && isAdmin() && (
                                <>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            history.push(`/sweets/${sweet._id}/edit`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={async () => {
                                            if (!window.confirm('Delete this sweet?')) return;
                                            await deleteSweet(sweet._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}

                            <div style={{ marginLeft: 'auto' }}>
                                Qty: {sweet.quantity}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SweetList;
