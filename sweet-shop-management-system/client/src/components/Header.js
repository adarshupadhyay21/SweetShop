import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Sweet Shop Management System</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/add-sweet">Add Sweet</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;