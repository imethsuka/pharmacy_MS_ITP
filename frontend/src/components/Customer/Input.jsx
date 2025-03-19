import React from "react";

const Input = ({ id, icon: Icon, ...props }) => {
    return (
        <div className="relative">
            {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
            <input
                id={id}
                {...props}
                className={`pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${props.className}`}
            />
        </div>
    );
};

export default Input;