import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getUser, isAuthenticated, logout, isAdmin } from '../utils/auth';

const Header = () => {
    const history = useHistory();
    const [auth, setAuth] = useState(isAuthenticated());
    const [user, setUser] = useState(getUser());

    useEffect(() => {
        const onStorage = () => {
            setAuth(isAuthenticated());
            setUser(getUser());
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const handleLogout = () => {
        logout();
        setAuth(false);
        setUser(null);
        history.push('/');
    };

    return (
        <header>
            <div className="site-header-inner">
                <div className="brand">Sweet Shop</div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Dashboard</Link></li>
                        {auth ? (
                            <>
                                <li><Link to="/add-sweet">Add Sweet</Link></li>
                                {isAdmin() && <li><Link to="/users">Users</Link></li>}
                                <li><button onClick={handleLogout}>Logout</button></li>
                                <li style={{ opacity: 0.95 }}>{user?.name}</li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
