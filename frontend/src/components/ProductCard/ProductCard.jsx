import React from "react";
import { HiOutlineChevronRight, HiShoppingCart, HiOutlineInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

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

  // Handle entire card click for showing popup
  const handleCardClick = () => {
    if (onMoreInfo) {
      onMoreInfo(productData);
    }
  };

  // Handle navigation to product detail page
  const handleNavigateToProduct = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
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

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(productData);
    }
  };

  // Safely access product properties (handles both new and legacy prop styles)
  const displayImage = isLegacyProps ? image : productData?.imageUrl;
  const displayName = isLegacyProps ? name : productData?.name;
  const displayPrice = isLegacyProps ? price : productData?.price;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img src={displayImage} alt={displayName} className={styles.productImage} />
        {productData?.requiresPrescription && (
          <span className={styles.prescriptionBadge}>Rx</span>
        )}
      </div>

      <div className={styles.productDetails}>
        <h3 className={styles.productName} onClick={handleCardClick}>{displayName}</h3>
        
        <div className={styles.productMeta}>
          <span className={styles.productCategory}>
            {productData?.category || "Medicine"}
          </span>
          {productData?.inStock !== false && (
            <span className={styles.inStock}>In Stock</span>
          )}
        </div>
        
        {/* Add "more info >>" link */}
        <div className={styles.moreInfo}>
          <a onClick={handleNavigateToProduct} className={styles.moreInfoLink}>
            more info <HiOutlineChevronRight style={{ marginLeft: '3px' }} />
          </a>
        </div>
        
        <div className={styles.productBottom}>
          <span className={styles.productPrice}>Rs. {displayPrice}</span>
          <div className={styles.productActions}>
            <button className={styles.addToCartBtn} onClick={handleAddToCartClick}>
              <HiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;