// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CompanyProfile from './pages/CompanyProfile';
import EditProfile from './pages/EditProfile';

// Firebase imports
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  // 1. Define State for Data at the Top Level
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation States
  const [isEditing, setIsEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Fetch Data Function (Reusable)
  const fetchCompanyData = async () => {
    try {
      const docRef = doc(db, "companies", "tomo_corp");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCompanyData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Initial Fetch
  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 w-full overflow-hidden text-left">
      
      <Sidebar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        
        {/* 4. Pass Data to Navbar */}
        <Navbar 
          isEditing={isEditing} 
          onBack={() => setIsEditing(false)}
          onMenuClick={() => setMobileMenuOpen(true)}
          // Pass the dynamic name/logo here
          companyName={companyData?.details?.registeredName} 
          logoUrl={companyData?.details?.logoUrl}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
          {isEditing ? (
            <EditProfile 
              onCancel={() => setIsEditing(false)} 
              // Pass a refresh function so App updates immediately after save
              onSaveSuccess={() => {
                fetchCompanyData(); 
                setIsEditing(false);
              }}
            />
          ) : (
            <CompanyProfile 
              onEdit={() => setIsEditing(true)} 
              // Pass the fetched data down (no need to fetch again inside)
              data={companyData} 
              loading={loading}
            />
          )}
        </main>
        
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  )
}

export default App;