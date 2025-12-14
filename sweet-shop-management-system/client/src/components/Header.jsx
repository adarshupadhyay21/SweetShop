// Header.jsx
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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">
          <Link to="/">Sweet Shop</Link>
        </div>

        <nav>
          <ul className="flex items-center gap-4 text-gray-700">
            <li>
              <Link className="hover:text-purple-600 transition" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-purple-600 transition" to="/">Dashboard</Link>
            </li>

            {auth ? (
              <>
                <li>
                  <Link className="hover:text-purple-600 transition" to="/add-sweet">Add Sweet</Link>
                </li>
                {isAdmin() && (
                  <li>
                    <Link className="hover:text-purple-600 transition" to="/users">Users</Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                  >
                    Logout
                  </button>
                </li>
                <li className="text-gray-800 font-medium">{user?.name}</li>
              </>
            ) : (
              <>
                <li>
                  <Link className="hover:text-purple-600 transition" to="/login">Login</Link>
                </li>
                <li>
                  <Link className="hover:text-purple-600 transition" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
