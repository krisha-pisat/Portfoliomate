
import React from 'react';

const AboutSection = ({ description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-3">
        About
      </h3>
      
      <div className="space-y-2.5 text-sm text-gray-500 leading-normal whitespace-pre-line">
       
        {description || "Loading description..."}
      </div>
    </div>
  );
};

export default AboutSection;