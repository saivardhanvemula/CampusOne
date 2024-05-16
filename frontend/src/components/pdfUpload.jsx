import React, { useState } from 'react';
import axios from 'axios';

export const UploadPDF = () => {
    const [file, setFile] = useState(null);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleUpload = (e) => {
      e.preventDefault();

      // Logic to handle file upload can be implemented here
      console.log('Uploading file:', file);
    };
  
    return (
      <div>
        <h2>Upload PDF</h2>
        
        <form onSubmit={handleUpload}>
          <label>
            Upload the drive link :
            <input 
              type="text" 
              onChange={handleFileChange} 
            />
          </label>
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  };