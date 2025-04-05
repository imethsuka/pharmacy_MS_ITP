import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Health and Wellness <br/>for
          <span className={styles.highlight}> Everyone</span>
        </h1>
        <ul className={styles.heroBenefits}>
          <li className={styles.benefitItem}>
            <span className={styles.checkmark}>✓</span>
            20+ licensed pharmacists available 24/7
          </li>
          <li className={styles.benefitItem}>
            <span className={styles.checkmark}>✓</span>
            Every order double-checked for accuracy and safety
          </li>
          <li className={styles.benefitItem}>
            <span className={styles.checkmark}>✓</span>
            Refills and auto refills online or in our Web app
          </li>
        </ul>
        <Link to="/order" className={styles.ctaButton}>
          Shop Medicines Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
