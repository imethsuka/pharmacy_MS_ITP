import React from "react";
import HeaderStripe from "../components/HeaderStripe";
import NavBar from "../components/home/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const Categories = () => {
  return (
    <div className={styles.pageContainer}>
      <HeaderStripe />

      <div className={styles.fixedHeader}>
        <NavBar />
      </div>

      <div className={styles.contentWrapper}>
        {/* Categories content will go here */}
        <Footer />
      </div>
    </div>
  );
};

export default Categories;
