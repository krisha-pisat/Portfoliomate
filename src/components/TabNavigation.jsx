// src/components/TabNavigation.jsx
import React, { useState } from 'react';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Documents', 'Funding', 'Engagements', 'Logs'];

  return (
    <div className="w-full">
      <div className={`
        /* Base (Mobile): Full width, scrollable, single row */
        flex w-full overflow-x-auto items-center gap-1 p-1 bg-white border border-gray-200 rounded-lg
        
        /* Desktop (md): Compact pill shape, auto width, no scroll needed */
        md:inline-flex md:w-auto md:overflow-visible
        
        /* Utility: Hide scrollbar but keep functionality (optional) */
        scrollbar-hide
      `}>
        
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              /* Layout: Don't wrap text, don't shrink buttons */
              whitespace-nowrap flex-shrink-0
              
              /* Sizing: Smaller text/padding on mobile */
              px-3 py-1.5 md:px-4 text-xs md:text-sm font-medium rounded-md transition-all 
              
              /* State Colors */
              ${activeTab === tab
                ? 'bg-indigo-900 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            {tab}
          </button>
        ))}
        
      </div>
    </div>
  );
};

export default TabNavigation;