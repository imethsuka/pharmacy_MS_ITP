import React from "react";
import styles from "../../styles/Customer/LoginPage.module.css";

const Input = ({ id, icon: Icon, ...props }) => {
    return (
        <div className={styles["input-container"]}>
            {Icon && <Icon className={styles["input-icon"]} />}
            <input
                id={id}
                {...props}
                className={`${styles["input-field"]} ${props.className}`}
            />
        </div>
    );
};

export default Input;
