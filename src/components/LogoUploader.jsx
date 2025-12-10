// src/components/LogoUploader.jsx
import React, { useRef } from 'react';

// Receives 'previewImage' (url) and 'onFileSelect' (function) from parent
const LogoUploader = ({ previewImage, onFileSelect }) => {
  const fileInputRef = useRef(null);

  // Trigger the hidden input when "Edit" is clicked
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file); // Send file back to parent
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
      <h3 className="text-sm font-bold text-gray-900 mb-1">Company Logo</h3>
      <p className="text-xs text-gray-500 mb-4">Update the logo image</p>
      
      <div className="flex flex-col items-center">
        {/* Logo Preview Box */}
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center p-2 mb-3 bg-gray-50">
          {previewImage ? (
            <img 
              src={previewImage} 
              alt="Logo Preview" 
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <span className="text-gray-400 text-xs">No Logo</span>
          )}
        </div>
        
        <p className="text-[10px] text-gray-400 mb-4 text-center">
          Recommended: PNG, JPG (max 5 MB)
        </p>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden" 
        />

        <button 
          onClick={handleEditClick}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-full justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Change Logo
        </button>
      </div>
    </div>
  );
};

export default LogoUploader;