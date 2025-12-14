import React, { useEffect, useState } from 'react';
import { getUsers, promoteUser } from '../api/api.js';
import { isAdmin } from '../utils/auth';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAdmin()) return setError('Admin access required');
        const fetch = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (loading) return <div className="container">Loading users...</div>;
    if (error) return <div className="container">{error}</div>;

    return (
        <div className="container">
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <div className="overflow-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="text-left">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Email</th>
                            <th className="pb-2">Role</th>
                            <th className="pb-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} className="border-t">
                                <td className="py-2">{u.name}</td>
                                <td className="py-2">{u.email}</td>
                                <td className="py-2 capitalize">{u.role}</td>
                                <td className="py-2">
                                    {u.role !== 'admin' && (
                                        <button
                                            className="bg-blue-600 text-white rounded px-3 py-1"
                                            onClick={async () => {
                                                if (!window.confirm(`Promote ${u.email} to admin?`)) return;
                                                try {
                                                    await promoteUser(u._id);
                                                    setUsers(prev => prev.map(p => (p._id === u._id ? { ...p, role: 'admin' } : p)));
                                                } catch (err) {
                                                    alert(err.response?.data?.message || err.message);
                                                }
                                            }}
                                        >
                                            Promote
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
