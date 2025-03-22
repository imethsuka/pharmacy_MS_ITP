import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/NavBar.css';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <a 
                        href="/" 
                        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        href="/Categories" 
                        className={`nav-link ${location.pathname === '/Categories' ? 'active' : ''}`}
                    >
                        Categories
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        href="#contact" 
                        className={`nav-link ${location.pathname === '#contact' ? 'active' : ''}`}
                    >
                        About Us
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;