import React, { useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa"; // Icons for close and upload
import "./Popup.css"; // Ensure this import is correct

const Popup = ({ message, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Allowed file types and size
  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  // Handle file selection
  const handleFileChange = (file) => {
    if (file) {
      // Validate file type
      if (!allowedFileTypes.includes(file.type)) {
        setErrorMessage("Invalid file type. Please upload a JPG, PNG, or PDF file.");
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        setErrorMessage("File size exceeds the limit of 5MB.");
        return;
      }

      // If valid, set the file and clear any previous error message
      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    handleFileChange(file);
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      // Simulate saving the file to the public/images folder
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const filePath = `/images/${fileName}`;

      // Simulate saving the file path to MongoDB
      const response = await saveFilePathToMongoDB(filePath);

      if (response.success) {
        alert(`File "${selectedFile.name}" uploaded successfully!`);
        onClose(); // Close the popup after upload
      } else {
        setErrorMessage("Failed to save file path. Please try again.");
      }
    } else {
      setErrorMessage("Please select a file to upload.");
    }
  };

  // Simulate saving the file path to MongoDB
  const saveFilePathToMongoDB = async (filePath) => {
    // Replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("File path saved to MongoDB:", filePath);
        resolve({ success: true });
      }, 1000);
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Close Icon */}
        <button className="popup-close-icon" onClick={onClose}>
          <FaTimes />
        </button>

        <p>{message}</p>

        {/* File Drop Area */}
        <div
          className={`file-drop-area ${isDragging ? "dragging" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <FaCloudUploadAlt className="upload-icon" />
          <p>Drag & drop your file here or</p>
          <input
            type="file"
            id="file-upload"
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
          <label htmlFor="file-upload" className="file-upload-label">
            Choose File
          </label>
          {selectedFile && (
            <p className="file-name">{selectedFile.name}</p>
          )}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        {/* Upload Button */}
        <button className="popup-upload-button" onClick={handleUpload}>
          Upload
        </button>

        {/* File Requirements */}
        <p className="file-requirements">
          Accepted file formats: JPG, PNG, PDF. Max file size: 5MB.
        </p>
      </div>
    </div>
  );
};

export default Popup;