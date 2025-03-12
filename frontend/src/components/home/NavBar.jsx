import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
                <li className="nav-item"><a href="#categories" className="nav-link">Categories</a></li>
                <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
        </nav>
    );
};

export default NavBar;
