import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { register } from '../api/api.js';
import { setAuth } from '../utils/auth';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ name, email, password });
            setAuth({ user: res.user, token: res.token });
            history.push('/');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
                <p className="text-sm text-gray-500 mb-4">Join the Sweet Shop community</p>
                {error && <div className="bg-red-100 text-red-800 px-3 py-2 rounded mb-3">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                        <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 border-gray-200" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 border-gray-200" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 border-gray-200" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg" type="submit">Register</button>
                        <Link className="text-purple-600 font-medium" to="/login">Already have an account?</Link>
                    </div>
                    <div className="text-sm text-gray-500 mt-4">We respect your privacy — your data is safe.</div>
                </form>
            </div>
        </div>
    );
};

export default Register;
