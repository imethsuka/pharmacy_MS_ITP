import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "../styles/SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Search" className={styles.searchInput} />
      <AiOutlineSearch className={styles.searchIcon} />
    </div>
  );
};

export default SearchBar;
