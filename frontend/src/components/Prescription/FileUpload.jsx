import React, { useState, useCallback } from "react";
import axios from "axios";
import "./FileUpload.css"; // Add styles for the component

const FileUpload = () => {
  const [files, setFiles] = useState([]); // Store selected files
  const [isDragging, setIsDragging] = useState(false); // Track drag state
  const [uploadStatus, setUploadStatus] = useState(""); // Upload status message

  // Handle file selection via input
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus("No files selected.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); // Append each file to FormData
    });

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Upload successful!");
      console.log("Upload response:", response.data);
    } catch (error) {
      setUploadStatus("Upload failed.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>File Upload</h2>
      <div
        className={`drop-zone ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Drag and drop files here or</p>
        <input
          type="file"
          id="file-input"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" className="file-input-label">
          Select Files
        </label>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <span>{file.name}</span>
            <span>{(file.size / 1024).toFixed(2)} KB</span>
          </div>
        ))}
      </div>
      <button onClick={handleUpload} className="upload-button">
        Upload Files
      </button>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;