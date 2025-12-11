
import React from 'react';

const InfoCard = ({ icon, label, value, isLink, isTag, isSocial }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between h-full hover:shadow-sm transition-shadow">
      
      <div className="flex items-center gap-2 mb-3 text-indigo-700">
        
        {/* Icon Wrapper */}
        <span className="w-5 h-5 flex-shrink-0">
          {icon}
        </span>
        
        
        <span className="text-xs font-semibold text-gray-500 tracking-wide">
          {label}
        </span>
      </div>

      {/* Value Row */}
      <div className="font-semibold text-gray-900 text-sm break-words leading-relaxed">
        {isLink ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline hover:text-indigo-800">
            {value}
          </a>
        ) : isTag ? (
          <span className="inline-flex items-center bg-orange-50 text-orange-700 text-xs font-medium px-2.5 py-1 rounded-md border border-orange-200">
            {value}
          </span>
        ) : isSocial ? (
           <div className="text-[#0077b5]"> {/* LinkedIn Blue */}
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
             </svg>
           </div>
        ) : (
          value || "--" 
        )}
      </div>
    </div>
  );
};

export default InfoCard;