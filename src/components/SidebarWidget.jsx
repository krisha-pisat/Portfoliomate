
import React from 'react';

const SidebarWidget = ({ title, members = [], emptyMessage = "No members added" }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      
   
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <button className="text-indigo-600 text-xs font-medium hover:underline flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add members
        </button>
      </div>

      {members.length > 0 ? (
        <div className="space-y-3">
          {members.map((member, index) => (
            <MemberRow key={index} {...member} />
          ))}
        </div>
      ) : (
        <EmptyState message={emptyMessage} />
      )}
    </div>
  );
};

const MemberRow = ({ name, role, imageUrl, linkedinUrl }) => {
  return (
    
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-300 transition-all">
      <div className="flex items-center gap-3">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
     
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 leading-tight">
            {name}
          </span>
          <span className="text-xs text-gray-500 mt-0.5">
            {role}
          </span>
        </div>
      </div>

      {linkedinUrl && (
        <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-[#0077b5] hover:opacity-80">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      )}
    </div>
  );
};


const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      </div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default SidebarWidget;