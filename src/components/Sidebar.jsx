// src/components/Sidebar.jsx
import React, { useState } from 'react';
import portfolioLogo from '../assets/portfolio_logo.png';

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [activeTab, setActiveTab] = useState('Stakeholders');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: 'grid' },
    { name: 'Screening', icon: 'clipboard' },
    { name: 'Stakeholders', icon: 'users' }, 
    { name: 'Engagements', icon: 'handshake' },
    { name: 'Task Manager', icon: 'list' },
    { name: 'Notifications', icon: 'bell' },
    { name: 'Chats', icon: 'chat' },
    { name: 'Portfolio Share', icon: 'link' },
    { name: 'Settings', icon: 'cog' },
  ];

  return (
    <aside 
      className={`
        /* Mobile: Fixed position, full height, z-50 (highest priority) */
        fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        
        /* Desktop: Relative position, always shown */
        md:relative md:translate-x-0
        
        /* Width Logic */
        ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64
      `}
    >
      
      {/* Header */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex-shrink-0 flex items-center justify-center p-1.5">
            <img src={portfolioLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className={`transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
            Portfoliomate
          </span>
        </div>

        {/* Mobile Close Button */}
        <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-gray-500 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Desktop Collapse Button */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden md:block text-gray-400 hover:text-indigo-600 transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
           </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name);
              setMobileMenuOpen(false); // Close sidebar when item clicked (Mobile)
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
              activeTab === item.name ? 'bg-indigo-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } ${isCollapsed ? 'md:justify-center' : ''}`}
          >
            <Icon name={item.icon} className={`w-5 h-5 flex-shrink-0 ${activeTab === item.name ? 'text-white' : 'text-gray-400'}`} />
            <span className={`${isCollapsed ? 'md:hidden' : 'block'}`}>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
         <button className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg ${isCollapsed ? 'md:justify-center' : ''}`}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 flex-shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
           <span className={`${isCollapsed ? 'md:hidden' : 'block'}`}>Logout</span>
         </button>
      </div>
    </aside>
  );
};

const Icon = ({ name, className }) => { /* ... keep your icon code ... */ return <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">{/* icons map... */}</svg>};

export default Sidebar;