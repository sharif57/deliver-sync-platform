/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {  ImagePlus,  User } from 'lucide-react';
import Loading from '@/components/ui/icon/loading';

export default function DriverRegistration() {
  const [data, setData] = useState<string>('');
  console.log(data,'kkkkkkkkkkkkkkkk');
  const [selectedVehicle, setSelectedVehicle] = useState('Pickup Van');
  const [formData, setFormData] = useState({
    name: 'Sharif Mahmud',
    email: 'sharifmahamud@gmail.com',
    phone: '0123456789',
    vehicleRegistration: ' 123456789',
    drivingLicense: ' 123456789',
  });
  const [profileImage, setProfileImage] = useState<string | null>(null); // Store image preview URL
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [error, setError] = useState<string | null>(null); // Track errors

  const vehicles = ['Bike', 'Pickup Van', 'Truck'];

  // Handle input changes for text fields
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    console.log(role)
    if (role) {
      setData(role);
    }
  }, []);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPEG, PNG, or GIF).');
        return;
      }
      if (file.size > maxSize) {
        setError('Image size must be less than 5MB.');
        return;
      }

      setError(null);
      setIsUploading(true);

      // Simulate upload delay (replace with actual upload logic, e.g., API call)
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000); // Simulate 1-second upload
    }
  };

  // Handle form submission (for "Save Now")
  const handleSubmit = () => {
    // Add your form submission logic here (e.g., API call)
    console.log('Form Data:', { ...formData, vehicle: selectedVehicle, profileImage });
  };

  return (
    <div className="flex items-center justify-center px-4 py-8  bg-gray-100">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary overflow-hidden bg-gray-100 flex items-center justify-center">
              {isUploading ? (
                <Loading /> // Show loading spinner during upload
              ) : profileImage ? (
                <div>
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  
                </div>

              ) : (
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              )}
            </div>
            <div className="absolute bottom-0 -right-2 top-8  rounded-full flex items-center justify-center">
              <ImagePlus className="text-primary" />
            </div>
            {/* Image Upload Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload profile picture"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Form Fields */}
        <div className="space-y-6">
          <p className="text-primary  bg- text-lg text-center">Role: {data}</p>
          
          {/* Name Input */}
          <div>
            <Input
              type="text"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Email Input */}
          <div>
            <Input
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Phone Input */}
          <div>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-4">
            <label className="text-gray-600 text-sm font-medium">Select Vehicle</label>
            <div className="flex gap-2 flex-wrap mt-2">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedVehicle === vehicle
                      ? 'bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {vehicle}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Registration Input */}
          <div>
            <Input
              type="text"
              placeholder="Vehicle Registration"
              value={formData.vehicleRegistration}
              onChange={(e) => handleInputChange('vehicleRegistration', e.target.value)}
              className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Driving License Input */}
          <div>
            <Input
              type="text"
              placeholder="Driving License Number"
              value={formData.drivingLicense}
              onChange={(e) => handleInputChange('drivingLicense', e.target.value)}
              className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 space-y-4">


          {/* Save Button */}
          <Button
            className="w-full h-14 text-lg font-medium bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-lg transition-colors duration-200"
            size="lg"
            onClick={handleSubmit}
          >
            Save Now
          </Button>
        </div>
      </div>
    </div>
  );
}