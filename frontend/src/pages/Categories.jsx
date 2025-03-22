import React, { useState, useEffect } from "react";
import HeaderStripe from "../components/HeaderStripe";
import NavBar from "../components/home/NavBar";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Categories = () => {
  return (
    <div>
      <HeaderStripe />

      <div className="floating-navbar">
        <NavBar />
      </div>

      <div className="content-wrapper">
        <Footer />
      </div>
    </div>
  );
};

export default Categories;
