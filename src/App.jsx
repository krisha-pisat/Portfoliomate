
import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CompanyProfile from './pages/CompanyProfile';
import EditProfile from './pages/EditProfile';
import {Routes, Route} from "react-router-dom";


import { doc, getDoc } from "firebase/firestore";
import { db,COMPANY_ID } from "./firebase";

function App() {
  // 1. Define State for Data at the Top Level
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation States
  const [isEditing, setIsEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const fetchCompanyData = async () => {
    try {
      const docRef = doc(db, "companies", COMPANY_ID);
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
        
       
        <Navbar 
          isEditing={isEditing} 
          onBack={() => setIsEditing(false)}
          onMenuClick={() => setMobileMenuOpen(true)}
          companyName={companyData?.details?.registeredName} 
          logoUrl={companyData?.details?.logoUrl}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
          <Routes>
            <Route 
              path="/" 
              element={
                <CompanyProfile 
                  data={companyData} 
                  loading={loading} 
                />
              } 
            />
            <Route 
              path="/edit" 
              element={
                <EditProfile 
                  refreshData={fetchCompanyData} 
                />
              } 
            />
          </Routes>
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