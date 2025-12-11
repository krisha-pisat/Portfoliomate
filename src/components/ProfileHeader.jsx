// src/components/ProfileHeader.jsx
import React from 'react';
import heroImg from '../assets/hero.png';
import logoImg from '../assets/logo.png'; 

const ProfileHeader = ({ onEdit, logoUrl, companyName }) => {
  return (
    <div className="w-full bg-white rounded-t-xl overflow-hidden border-b border-gray-200">
      
    
      <div className="h-32 md:h-48 w-full relative">
        <img 
          src={heroImg} 
          alt="Cover" 
          className="w-full h-full object-cover" 
        />
      </div>

   
      <div className="px-4 md:px-8 pb-4 md:pb-6">
   
        <div className="flex justify-between items-end -mt-10 md:-mt-12">
          
          {/* Left Side: Logo + Text */}
          <div className="flex items-end gap-3 md:gap-6">
            
            {/* Logo Container */}
            <div className="relative p-1 bg-white rounded-xl md:rounded-2xl shadow-sm">
              <img 
                src={logoUrl || logoImg} 
                alt="Company Logo" 
                className="w-20 h-20 md:w-32 md:h-32 rounded-lg md:rounded-xl object-contain border border-gray-100 bg-white" 
              />
            </div>


            <div className="mb-0.5 md:mb-1 pb-1 md:pb-2">
          
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight">
                {companyName || "Tomo Corp"}
              </h1>
              
   
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-1 md:mt-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                  Startup
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Profile Completed</span>
                  <span className="sm:hidden">Completed</span> 
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <button 
            onClick={onEdit}
            className="mb-1 md:mb-4 flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>Edit <span className="hidden sm:inline">Profile</span></span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;