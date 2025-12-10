// src/components/Navbar.jsx
import React from 'react';
import deepakImage from '../assets/deepak.png';

// Accept companyName and logoUrl
const Navbar = ({ isEditing, onBack, onMenuClick, companyName, logoUrl }) => {
  
  // Fallback text if data hasn't loaded yet
  const displayName = companyName || "Tomo Corp";

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-3 bg-white border-b border-gray-200 w-full">
      
      <div className="flex items-center flex-1 min-w-0"> 
        <button 
          onClick={onMenuClick}
          className="mr-2 md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <button 
          onClick={onBack}
          className={`hidden md:block p-2 mr-4 rounded-full transition-colors flex-shrink-0 ${isEditing ? 'text-gray-700 hover:bg-gray-100 cursor-pointer' : 'text-gray-400 cursor-default'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>

        <div className="flex flex-col md:border-l border-gray-200 md:pl-4 min-w-0">
          <h1 className="text-sm font-bold text-gray-900 leading-tight truncate">
            {isEditing ? "Edit Profile" : displayName}
          </h1>
          <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-500 mt-0.5 truncate">
             <span className="hidden md:inline hover:text-gray-700 cursor-pointer">Stakeholders</span>
             <span className="hidden md:inline text-gray-900 text-xs">›</span>
             <span className="text-gray-900 font-medium truncate">
               {isEditing ? "Edit Profile" : displayName}
             </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:border-l border-gray-200 md:pl-6 h-full flex-shrink-0 ml-2">
        <img src={deepakImage} alt="Profile" className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 bg-gray-50" />
        <div className="text-left hidden sm:block"> 
          <p className="text-sm font-bold text-gray-900 leading-none">Deepak Krishna K</p>
          <p className="text-xs text-gray-500 mt-1">UI/UX Designer</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;