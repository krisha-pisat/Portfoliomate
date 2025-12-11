
import React, { useState } from 'react';
import portfolioLogo from '../assets/portfolio_logo.png';


import { 
  LuLayoutGrid, 
  LuClipboardList, 
  LuUsers, 
  LuHandshake, 
  LuListTodo, 
  LuBell, 
  LuMessageSquare, 
  LuLink, 
  LuSettings, 
  LuLogOut,
  LuChevronLeft,
  LuX
} from "react-icons/lu";

const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [activeTab, setActiveTab] = useState('Stakeholders');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LuLayoutGrid },
    { name: 'Screening', icon: LuClipboardList },
    { name: 'Stakeholders', icon: LuUsers }, 
    { name: 'Engagements', icon: LuHandshake },
    { name: 'Task Manager', icon: LuListTodo },
    { name: 'Notifications', icon: LuBell },
    { name: 'Chats', icon: LuMessageSquare },
    { name: 'Portfolio Share', icon: LuLink },
    { name: 'Settings', icon: LuSettings },
  ];

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64
      `}
    >
      
 
      <div className={`p-6 flex items-center ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
        <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg overflow-hidden whitespace-nowrap">
          
         
          <div className={`w-8 h-8 bg-indigo-100 rounded-lg flex-shrink-0 items-center justify-center p-1.5 ${isCollapsed ? 'hidden' : 'flex'}`}>
            <img src={portfolioLogo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          
          <span className={`transition-opacity duration-200 ${isCollapsed ? 'md:hidden' : 'block'}`}>
            Portfoliomate
          </span>
        </div>


        <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-gray-500 p-1 hover:text-indigo-600 transition-colors">
          <LuX className="w-6 h-6" />
        </button>

  
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="hidden md:block text-gray-400 hover:text-indigo-600 transition-colors"
        >
           <LuChevronLeft 
             className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
           />
        </button>
      </div>


      <nav className="flex-1 px-4 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                isActive 
                  ? 'bg-indigo-900 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isCollapsed ? 'md:justify-center' : ''}`}
              title={isCollapsed ? item.name : ''}
            >
              <IconComponent 
                className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'}`} 
              />
              
              <span className={`whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'md:hidden md:opacity-0 md:w-0' : 'block opacity-100'}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-100">
         <button className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors ${isCollapsed ? 'md:justify-center' : ''}`}>
           <LuLogOut className="w-5 h-5 text-gray-400 flex-shrink-0" />
           <span className={`whitespace-nowrap ${isCollapsed ? 'md:hidden' : 'block'}`}>Logout</span>
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;