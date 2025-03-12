import React from "react";
import "../styles/hero.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>
          Health and Wellness <br />
          <span className="highlight">for Everyone</span>
        </h1>
        <ul>
          <li>✔️ 20+ licensed pharmacists available 24/7</li>
          <li>✔️ Every order double-checked for accuracy and safety</li>
          <li>✔️ Refills and auto refills online or in our Web app</li>
        </ul>
      </div>
    </section>
  );
};

export default HeroSection;
