import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" className="search-input" />
      <AiOutlineSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
