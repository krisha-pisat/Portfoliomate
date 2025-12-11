// src/components/LogoUploader.jsx
import React from 'react';
import defaultLogo from '../assets/logo.png'; 

// Now accepts a string 'logoUrl' and a setter function
const LogoUploader = ({ logoUrl, onUrlChange }) => {

  const handleImageError = (e) => {
    e.target.src = defaultLogo; // Fallback if link is broken
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
      <h3 className="text-sm font-bold text-gray-900 mb-1">Company Logo</h3>
      <p className="text-xs text-gray-500 mb-4">Enter a valid image URL</p>
      
      <div className="flex flex-col items-center gap-4">
        {/* 1. Preview Box */}
        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center p-2 bg-gray-50">
          <img 
            src={logoUrl || defaultLogo} 
            alt="Logo Preview" 
            className="w-full h-full object-contain rounded-lg"
            onError={handleImageError} 
          />
        </div>
        
        {/* 2. URL Input Field (Replaces the File Button) */}
        <div className="w-full">
          <label className="text-[10px] font-semibold text-gray-500 mb-1 block uppercase">
            Image Link
          </label>
          <input 
            type="text" 
            value={logoUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="https://example.com/logo.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default LogoUploader;