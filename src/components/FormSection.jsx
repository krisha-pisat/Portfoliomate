
import React from 'react';

const FormSection = ({ title, subtitle, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;