import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroTitle}>
            Your Health Is Our{" "}
            <span className={styles.highlight}>Priority</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Quality medicines and healthcare products delivered to your doorstep
          </p>
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
              Home delivery with real-time tracking
            </li>
          </ul>
          <div className={styles.ctaContainer}>
            <Link to="/prescription/upload" className={styles.secondaryCta}>
              Upload Prescription
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
