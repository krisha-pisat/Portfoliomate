// src/pages/CompanyProfile.jsx
import React from 'react'; // Removed useState, useEffect imports
import ProfileHeader from '../components/ProfileHeader';
import TabNavigation from '../components/TabNavigation';
import AboutSection from '../components/AboutSection';
import CompanyDetails from '../components/CompanyDetails';
import SidebarWidget from '../components/SidebarWidget';

// 1. Accept 'data' and 'loading' from App.jsx
const CompanyProfile = ({ onEdit, data, loading }) => {
  
  // Mock Data (Unchanged)
  const associatedMembers = [
    { name: "John Smith", role: "CEO", imageUrl: "https://i.pravatar.cc/150?u=john", linkedinUrl: "#" },
    { name: "David Taylor", role: "Director of Operations", imageUrl: "https://i.pravatar.cc/150?u=david", linkedinUrl: "#" },
    { name: "Michael Brown", role: "Policy & Compliance Officer", imageUrl: "https://i.pravatar.cc/150?u=mike", linkedinUrl: "#" },
  ];
  const referredBy = [
    { name: "Laura White", role: "Head of Research & Analysis", imageUrl: "https://i.pravatar.cc/150?u=laura", linkedinUrl: "#" },
    { name: "Emily Johnson", role: "Marketing Manager", imageUrl: "https://i.pravatar.cc/150?u=emily", linkedinUrl: "#" },
  ];

  return (
    <div className="flex-1">
      
      {/* 2. Use the 'data' prop directly */}
      <ProfileHeader 
        onEdit={onEdit} 
        logoUrl={data?.details?.logoUrl} 
        companyName={data?.details?.registeredName}
      />

      <div className="mt-6">
        <TabNavigation />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {loading ? (
             <div className="p-10 text-center text-gray-400">Loading company info...</div>
          ) : (
            <>
              <AboutSection description={data?.about} />
              <CompanyDetails data={data?.details} />
            </>
          )}
        </div>

        <div className="space-y-6">
           <SidebarWidget title="Associated members" members={associatedMembers} />
           <SidebarWidget title="Referred by" members={referredBy} />
           <SidebarWidget title="Incubated by" members={[]} emptyMessage="No incubator added" />
        </div>

      </div>
    </div>
  );
};

export default CompanyProfile;