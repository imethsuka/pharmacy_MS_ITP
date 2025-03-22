import React from "react";
import "../../styles/Customer/Input.css";  // Assuming you create a new CSS file for styles

const Input = ({ id, icon: Icon, ...props }) => {
    return (
        <div className="input-container">
            {Icon && <Icon className="input-icon" />}
            <input
                id={id}
                {...props}
                className={`input-field ${props.className}`}
            />
        </div>
    );
};

export default Input;
