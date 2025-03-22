import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderStripe from "../../components/HeaderStripe";
import Footer from "../../components/Footer";
import { FiShoppingCart, FiTrash2, FiArrowLeft, FiUpload, FiX, FiCheckCircle } from "react-icons/fi";
import '../../styles/Order/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptionImage, setPrescriptionImage] = useState(null);
  const [prescriptionPreview, setPrescriptionPreview] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
    
    // Calculate total
    calculateTotal(storedCart);
    
    // Check if prescription was previously uploaded
    const hasUploadedPrescription = localStorage.getItem('prescriptionUploaded') === 'true';
    setPrescriptionUploaded(hasUploadedPrescription);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    // Check if prescription is required but not uploaded
    const requiresPrescription = cartItems.some(item => item.requiresPrescription);
    const hasPrescription = localStorage.getItem('prescriptionUploaded') === 'true';
    
    if (requiresPrescription && !hasPrescription) {
      alert('Please upload your prescription before checkout');
      setShowPrescriptionModal(true);
      return;
    }
    
    // Implement checkout functionality here
    alert('Proceeding to checkout...');
    // navigate('/order/checkout');
  };

  const continueShopping = () => {
    navigate('/order/products');
  };
  
  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPrescriptionImage(file);
      setPrescriptionPreview(URL.createObjectURL(file));
    }
  };

  const uploadPrescription = async () => {
    if (!prescriptionImage) {
      setUploadStatus('Please select an image first');
      return;
    }

    setUploadStatus('Uploading...');
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('prescriptionFile', prescriptionImage);
    
    try {
      // Call to the backend API with full URL
      const response = await fetch('http://localhost:5555/api/prescriptions/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUploadStatus('Upload successful!');
        localStorage.setItem('prescriptionUploaded', 'true');
        localStorage.setItem('prescriptionId', data.prescription._id);
        setPrescriptionUploaded(true);
        
        // Close the modal after 1.5 seconds
        setTimeout(() => {
          setShowPrescriptionModal(false);
        }, 1500);
      } else {
        setUploadStatus('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error uploading prescription:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div>
      <HeaderStripe />
      <div className="cart-container">
        <h1 className="cart-title">
          <FiShoppingCart /> Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="continue-shopping-btn" onClick={continueShopping}>
              <FiArrowLeft /> Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <span className="header-product">Product</span>
                <span className="header-price">Price</span>
                <span className="header-quantity">Quantity</span>
                <span className="header-subtotal">Subtotal</span>
                <span className="header-actions">Actions</span>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-product">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-id">Product ID: {item.productId}</p>
                      {item.requiresPrescription && (
                        <span className="prescription-tag">Prescription Required</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-price">${item.price.toFixed(2)}</div>
                  
                  <div className="item-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >+</button>
                  </div>
                  
                  <div className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <div className="item-actions">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-actions">
                <button className="continue-shopping-btn" onClick={continueShopping}>
                  <FiArrowLeft /> Continue Shopping
                </button>
              </div>
            </div>

            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span>Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>Rs 350</span>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="prescription-note">
                {cartItems.some(item => item.requiresPrescription) && (
                  <>
                    {prescriptionUploaded ? (
                      <div className="prescription-success">
                        <FiCheckCircle className="success-icon" />
                        <p>Prescription uploaded successfully!</p>
                      </div>
                    ) : (
                      <>
                        <p className="prescription-warning">
                          Some items require a prescription. You'll need to upload your prescription before checkout.
                        </p>
                        <button 
                          className="upload-prescription-btn"
                          onClick={() => setShowPrescriptionModal(true)}
                        >
                          <FiUpload /> Upload Prescription
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
              
              <button className="checkout-btn" onClick={handleCheckout} disabled={cartItems.length === 0}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Prescription Upload Modal */}
      {showPrescriptionModal && (
        <div className="prescription-modal-overlay">
          <div className="prescription-modal">
            <button 
              className="close-modal-btn"
              onClick={() => setShowPrescriptionModal(false)}
            >
              <FiX />
            </button>
            <h2>Upload Prescription</h2>
            
            <div className="upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handlePrescriptionUpload}
                id="prescription-file"
                className="file-input"
              />
              <label htmlFor="prescription-file" className="file-label">
                <FiUpload /> Select Image
              </label>
              
              {prescriptionPreview && (
                <div className="image-preview">
                  <img src={prescriptionPreview} alt="Prescription preview" />
                </div>
              )}
              
              <button 
                className="upload-button"
                onClick={uploadPrescription}
                disabled={!prescriptionImage}
              >
                Upload Prescription
              </button>
              
              {uploadStatus && (
                <p className={`upload-status ${uploadStatus.includes('successful') ? 'success' : uploadStatus.includes('Uploading') ? 'uploading' : 'error'}`}>
                  {uploadStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default Cart;
