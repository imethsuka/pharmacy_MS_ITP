import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/NavBar.module.css';

const NavBar = () => {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <a 
                        href="/" 
                        className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
                    >
                        Home
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a 
                        href="/Categories" 
                        className={`${styles.navLink} ${location.pathname === '/Categories' ? styles.active : ''}`}
                    >
                        Categories
                    </a>
                </li>
                <li className={styles.navItem}>
                    <a 
                        href="#contact" 
                        className={`${styles.navLink} ${location.pathname === '#contact' ? styles.active : ''}`}
                    >
                        About Us
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;