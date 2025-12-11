
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; 
import countryList from 'react-select-country-list'; 
import FormSection from '../components/FormSection';
import LogoUploader from '../components/LogoUploader';
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db, COMPANY_ID } from "../firebase"; 


const SECTOR_OPTIONS = [
  { value: "Gold", label: "Gold" },
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Real Estate", label: "Real Estate" },
];

const EditProfile = ({ refreshData }) => {
  const navigate = useNavigate();
  const countryOptions = useMemo(() => countryList().getData(), []);

  const [formData, setFormData] = useState({
    companyName: '', brandName: '', cin: '', website: '',
    pincode: '', address: '', about: ''
  });

  const [errors, setErrors] = useState({});

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [logoUrlInput, setLogoUrlInput] = useState(''); 
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "companies", COMPANY_ID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          const details = data.details || {};

          if (details.logoUrl) setLogoUrlInput(details.logoUrl);

          setFormData({
            companyName: details.registeredName || '',
            brandName: details.brandName || '',
            cin: details.cin || '',
            website: details.website || '',
            pincode: details.pincode || '',
            address: details.address || '',
            about: data.about || ''
          });

          const savedCountryLabel = details.incorporatedAt; 
          if (savedCountryLabel) {
            const foundCountry = countryOptions.find(c => c.label === savedCountryLabel);
            setSelectedCountry(foundCountry || { label: savedCountryLabel, value: savedCountryLabel });
          }

          if (details.sector) {
            const sectorArray = details.sector.split(',').map(s => {
              const trimmed = s.trim();
              return { value: trimmed, label: trimmed };
            });
            setSelectedSectors(sectorArray);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countryOptions]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
 
    setFormData(prev => ({ ...prev, [name]: value }));
    
    let errorMsg = null;

  
    if (name === 'pincode') {
      if (/[^0-9]/.test(value)) {
        errorMsg = "Only numbers are allowed";
      } else if (value.length !== 6 && value.length > 0) {
       
      }
    }

  
    if (name === 'cin') {
      if (/[^a-zA-Z0-9]/.test(value)) {
        errorMsg = "Only alphanumeric characters allowed (A-Z, 0-9)";
      }
    }

  
    if (name === 'website') {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (value && !urlPattern.test(value)) {
        errorMsg = "URL is not valid (e.g., https://example.com)";
      }
    }


    if (!value.trim() && name !== 'website' && name !== 'cin' && name !== 'pincode') { 
       
        if (errors[name]) errorMsg = null; 
    }

    // Set Error State
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleCountryChange = (val) => {
    setSelectedCountry(val);
    if (errors.country) setErrors(prev => ({ ...prev, country: null }));
  };

  const handleSectorChange = (val) => {
    setSelectedSectors(val);
    if (errors.sectors) setErrors(prev => ({ ...prev, sectors: null }));
  };

  
  const handleSave = async (e) => {
    e.preventDefault(); 
    
  
    const newErrors = {};


    if (!formData.companyName.trim()) newErrors.companyName = "Required";
    if (!formData.brandName.trim()) newErrors.brandName = "Required";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.about.trim()) newErrors.about = "Required";
    if (!formData.pincode.trim()) newErrors.pincode = "Required";
    if (!formData.website.trim()) newErrors.website = "Required";
    if (!formData.cin.trim()) newErrors.cin = "Required";

    if (!selectedCountry) newErrors.country = "Required";
    if (selectedSectors.length === 0) newErrors.sectors = "Required";

    const finalErrors = { ...errors, ...newErrors };
    

    const hasErrors = Object.values(finalErrors).some(val => val !== null);

    if (hasErrors) {
      setErrors(finalErrors);
      return; 
    }

    setIsSaving(true);
    try {
      const docRef = doc(db, "companies", COMPANY_ID);

      await updateDoc(docRef, {
        "about": formData.about,
        "details.registeredName": formData.companyName,
        "details.brandName": formData.brandName,
        "details.incorporatedAt": selectedCountry.label, 
        "details.cin": formData.cin,
        "details.website": formData.website,
        "details.pincode": formData.pincode,
        "details.address": formData.address,
        "details.sector": selectedSectors.map(s => s.label).join(', '), 
        "details.logoUrl": logoUrlInput 
      });

      refreshData();
      navigate('/');

    } catch (error) {
      console.error("Error saving:", error);
      setIsSaving(false);
    }
  };

  const getDropdownStyles = (hasError) => ({
    control: (base) => ({
      ...base,
      borderColor: hasError ? '#ef4444' : '#d1d5db', 
      borderRadius: '0.5rem', 
      paddingTop: '2px',
      paddingBottom: '2px',
      fontSize: '0.875rem',
      boxShadow: 'none',
      '&:hover': { borderColor: hasError ? '#ef4444' : '#9ca3af' }, 
    }),
    input: (base) => ({ ...base, 'input:focus': { boxShadow: 'none' } }),
    menu: (base) => ({ ...base, zIndex: 50 })
  });

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full pb-20">
      
      <div className="mb-8">
        <button type="button" onClick={() => navigate('/')} className="flex items-center text-xs text-gray-500 hover:text-indigo-600 mb-2 gap-1">
           ← Back to Profile
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Company Profile</h1>
      </div>

      <form onSubmit={handleSave}> 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup 
                  label="Company Name" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleInputChange} 
                  errorMessage={errors.companyName} 
                  required 
                />
                <InputGroup 
                  label="Brand Name" 
                  name="brandName" 
                  value={formData.brandName} 
                  onChange={handleInputChange} 
                  errorMessage={errors.brandName} 
                  required 
                />
                
                {/* Country Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Country <span className="text-red-500">*</span></label>
                  <Select 
                    options={countryOptions} 
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    placeholder="Select Country..."
                    styles={getDropdownStyles(errors.country)} 
                    isClearable
                  />
                  {errors.country && <span className="text-[10px] text-red-500">Required</span>}
                </div>

                <InputGroup 
                  label="CIN" 
                  name="cin" 
                  value={formData.cin} 
                  onChange={handleInputChange} 
                  errorMessage={errors.cin} 
                  required 
                />
                <div className="md:col-span-2">
                  <InputGroup 
                    label="Website" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleInputChange} 
                    errorMessage={errors.website} 
                    required 
                  />
                </div>
              </div>
            </FormSection>

            <FormSection title="Address Information">
              <div className="grid grid-cols-1 gap-4">
                <InputGroup 
                  label="Pincode" 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleInputChange} 
                  errorMessage={errors.pincode}
                  required 
                  maxLength={6} // Still useful to limit typing
                />
                <InputGroup 
                  label="Address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  errorMessage={errors.address} 
                  isTextArea 
                  required 
                />
              </div>
            </FormSection>

            <FormSection title="About Company">
               <InputGroup 
                 label="About" 
                 name="about" 
                 value={formData.about} 
                 onChange={handleInputChange} 
                 errorMessage={errors.about} 
                 isTextArea rows={4} 
                 required 
               />
            </FormSection>

            <FormSection title="Business Sectors">
               <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Sectors <span className="text-red-500">*</span></label>
                  <Select 
                    isMulti 
                    options={SECTOR_OPTIONS} 
                    value={selectedSectors}
                    onChange={handleSectorChange}
                    placeholder="Select sectors..."
                    styles={getDropdownStyles(errors.sectors)} 
                    closeMenuOnSelect={false}
                  />
                  {errors.sectors && <span className="text-[10px] text-red-500">Required</span>}
               </div>
            </FormSection>

          </div>

          <div className="lg:col-span-1">
            <LogoUploader 
              logoUrl={logoUrlInput} 
              onUrlChange={setLogoUrlInput} 
            />
          </div>

        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4 z-20 md:pl-24 lg:pl-64">
          <button type="button" onClick={() => navigate('/')} className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-indigo-900 rounded-lg text-sm font-medium text-white hover:bg-indigo-800 transition-colors shadow-sm disabled:opacity-50">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
};


const InputGroup = ({ label, name, value, onChange, placeholder, isTextArea, rows, required, errorMessage, ...rest }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {isTextArea ? (
      <textarea 
        name={name} value={value} onChange={onChange} 
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 
          ${errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} 
          placeholder-gray-400`}
        placeholder={placeholder} rows={rows || 3} 
        {...rest}
      />
    ) : (
      <input 
        type="text" name={name} value={value} onChange={onChange} 
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 
          ${errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} 
          placeholder-gray-400`}
        placeholder={placeholder} 
        {...rest}
      />
    )}
    

    {errorMessage && <span className="text-[10px] text-red-500">{errorMessage}</span>}
  </div>
);

export default EditProfile;