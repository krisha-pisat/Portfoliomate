// src/pages/EditProfile.jsx
// ... (imports remain the same) ...
import React, { useState, useEffect } from 'react';
import FormSection from '../components/FormSection';
import LogoUploader from '../components/LogoUploader';
import defaultLogo from '../assets/logo.png'; 
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase"; 

// Accept 'onSaveSuccess' instead of just onCancel logic inside save
const EditProfile = ({ onCancel, onSaveSuccess }) => {
  // ... (State definitions remain the same) ...
  const [formData, setFormData] = useState({
    companyName: '', brandName: '', country: '', cin: '', website: '',
    pincode: '', address: '', about: '', sector: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(defaultLogo);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ... (useEffect for fetching initial data remains the same) ...
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "companies", "tomo_corp");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const details = data.details || {};
          if (details.logoUrl) setLogoPreview(details.logoUrl);
          setFormData({
            companyName: details.registeredName || '',
            brandName: details.brandName || '',
            country: details.incorporatedAt || '',
            cin: details.cin || '',
            website: details.website || '',
            pincode: details.pincode || '',
            address: details.address || '',
            about: data.about || '',
            sector: details.sector || ''
          });
        }
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoSelect = (file) => {
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  // --- UPDATED SAVE FUNCTION ---
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, "companies", "tomo_corp");
      let newLogoUrl = logoPreview; 
      
      if (logoFile) {
        const storageRef = ref(storage, `company_logos/tomo_corp_logo_${Date.now()}`);
        await uploadBytes(storageRef, logoFile);
        newLogoUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(docRef, {
        "about": formData.about,
        "details.registeredName": formData.companyName, // This is the Company Name
        "details.brandName": formData.brandName,
        "details.incorporatedAt": formData.country,
        "details.cin": formData.cin,
        "details.website": formData.website,
        "details.pincode": formData.pincode,
        "details.address": formData.address,
        "details.sector": formData.sector,
        "details.logoUrl": newLogoUrl 
      });

      // Call the success callback passed from App.jsx
      // This will trigger the refresh in the parent component
      onSaveSuccess();

    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving profile");
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    // ... (Your JSX remains exactly the same as before) ...
    <div className="flex-1 max-w-7xl mx-auto w-full pb-20">
      {/* ... Header ... */}
      <div className="mb-8">
        <button onClick={onCancel} className="flex items-center text-xs text-gray-500 hover:text-indigo-600 mb-2 gap-1">
           ← Back to Profile
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Company Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Update your company information and save changes to apply them.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ... Forms ... */}
        <div className="lg:col-span-2">
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
              {/* ... Rest of your inputs ... */}
              <InputGroup label="Brand Name" name="brandName" value={formData.brandName} onChange={handleInputChange} required />
              <InputGroup label="Country" name="country" value={formData.country} onChange={handleInputChange} required />
              <InputGroup label="CIN" name="cin" value={formData.cin} onChange={handleInputChange} required />
              <div className="md:col-span-2">
                <InputGroup label="Website" name="website" value={formData.website} onChange={handleInputChange} required />
              </div>
            </div>
          </FormSection>
          {/* ... Other sections ... */}
          <FormSection title="Address Information">
            <div className="grid grid-cols-1 gap-4">
              <InputGroup label="Pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
              <InputGroup label="Address" name="address" value={formData.address} onChange={handleInputChange} isTextArea required />
            </div>
          </FormSection>
          <FormSection title="About Company">
             <InputGroup label="About" name="about" value={formData.about} onChange={handleInputChange} isTextArea rows={4} required />
          </FormSection>
          <FormSection title="Business Sectors">
             <InputGroup label="Sector" name="sector" value={formData.sector} onChange={handleInputChange} placeholder="e.g. Gold, Technology" required />
          </FormSection>
        </div>

        <div className="lg:col-span-1">
          <LogoUploader previewImage={logoPreview} onFileSelect={handleLogoSelect} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4 z-20 md:pl-24 lg:pl-64">
        <button onClick={onCancel} className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-indigo-900 rounded-lg text-sm font-medium text-white hover:bg-indigo-800 transition-colors shadow-sm disabled:opacity-50">
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

// ... (InputGroup component stays the same) ...
const InputGroup = ({ label, name, value, onChange, placeholder, isTextArea, rows, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
    {isTextArea ? (
      <textarea name={name} value={value} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-400" placeholder={placeholder} rows={rows || 3} />
    ) : (
      <input type="text" name={name} value={value} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-400 h-10" placeholder={placeholder} />
    )}
  </div>
);

export default EditProfile;