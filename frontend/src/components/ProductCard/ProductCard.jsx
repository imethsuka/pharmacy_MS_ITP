import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, image, name, price, requiresPrescription, onAddToCart, onMoreInfo, _id, productId, category, catergory }) => {
  const navigate = useNavigate();
  
  // Support both old and new prop styles
  const isLegacyProps = !product && (image || name);
  
  // Create a product object if using legacy props
  const productData = isLegacyProps ? {
    _id,
    name,
    price,
    imageUrl: image,
    productId,
    category: category || catergory,
    requiresPrescription
  } : product;

  // Handle navigation to product detail page
  const handleCardClick = () => {
    // Try multiple ID properties with fallbacks
    let id;
    
    if (productData) {
      // Try all possible ID properties on the product object
      id = productData._id || productData.id || productData.productId;
    }
    
    // If we still don't have an ID, try using the direct props
    if (!id) {
      id = _id || productId;
    }
    
    // Ensure we have a valid ID and navigate using a consistent path format
    if (id) {
      navigate(`/order/product/${id}`);
    } else {
      console.error("⚠️ Navigation failed - No product ID found");
      alert("Sorry, we couldn't find this product's details. Please try another product.");
    }
  };

  const handleMoreInfoClick = (e) => {
    e.stopPropagation();
    if (isLegacyProps && onMoreInfo) {
      onMoreInfo(e);
      return;
    }
    onMoreInfo(productData);
  };

  // Safely access product properties (handles both new and legacy prop styles)
  const displayImage = isLegacyProps ? image : productData?.imageUrl;
  const displayName = isLegacyProps ? name : productData?.name;
  const displayPrice = isLegacyProps ? price : productData?.price;

  return (
    <div className="product-card">
      <div className="product-image" onClick={handleCardClick}>
        <img src={displayImage} alt={displayName} />
        {productData?.requiresPrescription && (
          <span className="prescription-badge">Rx</span>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-name" onClick={handleCardClick}>{displayName}</h3>
        
        <div className="product-bottom">
          <span className="product-price">Rs. {displayPrice}</span>
          <div className="product-actions">
            <button className="more-info" onClick={handleMoreInfoClick}>
              Details <HiOutlineChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;