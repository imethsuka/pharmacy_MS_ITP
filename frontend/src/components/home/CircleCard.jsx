import React from 'react';
import '../../styles/CircleCard.css';

const CircleCard = ({ imageUrl, title }) => {
    return (
        <div className="circle-card">
            <div className="circle-image-container">
                <img src={imageUrl} alt={title} className="circle-image" />
            </div>
            <h3 className="circle-title">{title}</h3>
        </div>
    );
};

export default CircleCard;