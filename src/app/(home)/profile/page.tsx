/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */
// 'use client';

// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ImagePlus, User } from 'lucide-react';
// import Loading from '@/components/ui/icon/loading';
// import { useUpdateProfileMutation, useUserProfileQuery } from '@/redux/feature/userSlice';

// export default function Profile() {
//   const { data: profile, isLoading } = useUserProfileQuery(undefined);

//   const [updateProfile] = useUpdateProfileMutation();

//   const [data, setData] = useState<string>('');
//   const [selectedVehicle, setSelectedVehicle] = useState('Pickup Van');
//   const [formData, setFormData] = useState({
//     name: profile?.data?.name || '',
//     email: profile?.data?.email || '',
//     phone: profile?.data?.phone_number || '',
//     vehicleRegistration: ' 123456789',
//     drivingLicense: ' 123456789',
//   });
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const vehicles = ['Bike', 'Pickup Van', 'Truck'];

//   console.log(profile?.data, 'profiledata');

//   // Handle input changes for text fields
//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     console.log(role)
//     if (role) {
//       setData(role);
//     }
//   }, []);

//   // Handle image upload
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file type and size
//       const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
//       if (!validTypes.includes(file.type)) {
//         setError('Please upload a valid image (JPEG, PNG, or GIF).');
//         return;
//       }


//       setError(null);
//       setIsUploading(true);

//       // Simulate upload delay (replace with actual upload logic, e.g., API call)
//       setTimeout(() => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setProfileImage(reader.result as string);
//           setIsUploading(false);
//         };
//         reader.readAsDataURL(file);
//       }, 1000); // Simulate 1-second upload
//     }
//   };

//   // Handle form submission (for "Save Now")
//   const handleSubmit = () => {
//     // Add your form submission logic here (e.g., API call)
//     console.log('Form Data:', { ...formData, vehicle: selectedVehicle, profileImage });
//   };
//   // Inside your component, after `const [selectedVehicle, setSelectedVehicle] = useState('Pickup Van');`
//   useEffect(() => {
//     if (profile?.data?.vehicle) {
//       setSelectedVehicle(profile.data.vehicle);
//     }
//   }, [profile]);


//   if (isLoading) {
//     return <div className="flex items-center justify-center h-screen">
//       <Loading />
//     </div>
//   }

//   const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

//   return (
//     <div className="flex items-center justify-center px-4 py-8  ">
//       <div className="w-full max-w-md mx-auto space-y-6 bg-white border border-gray-200 rounded-lg p-6 shadow-md">
//         {/* Profile Picture Section */}
//         <div className="flex justify-center mb-8">
//           <div className="relative">
//             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary overflow-hidden bg-gray-100 flex items-center justify-center">
//               {isUploading ? (
//                 <Loading />
//               ) : profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : profile?.data?.image ? (
//                 <img
//                   src={IMAGE + profile?.data?.image}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
//               )}
//             </div>

//             <div className="absolute bottom-0 -right-2 top-8  rounded-full flex items-center justify-center">
//               <ImagePlus className="text-primary" />
//             </div>
//             {/* Image Upload Input */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               title="Upload profile picture"
//             />
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="text-red-500 text-sm text-center">{error}</div>
//         )}

//         {/* Form Fields */}
//         <div className="space-y-6">
//           <p className="text-primary  bg- text-lg text-center capitalize">Role: {profile?.data?.role}</p>

//           {/* Name Input */}
//           <div>
//             <Input
//               type="text"
//               placeholder="Enter your Name"
//               value={profile?.data?.name || ''}
//               onChange={(e) => handleInputChange('name', e.target.value)}
//               className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//             />
//           </div>

//           {/* Email Input */}
//           <div>
//             <Input
//               type="email"
//               placeholder="Enter your Email"
//               value={profile?.data?.email || ''}
//               onChange={(e) => handleInputChange('email', e.target.value)}
//               className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//             />
//           </div>

//           {/* Phone Input */}
//           <div>
//             <Input
//               type="tel"
//               placeholder="Enter your phone number"
//               value={profile?.data?.phone_number || ''}
//               onChange={(e) => handleInputChange('phone', e.target.value)}
//               className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//             />
//           </div>

//           {/* Vehicle Selection */}
//           {profile?.data?.role === 'driver' && (
//             <div>
//               {/* <div className="space-y-4">
//                 <label className="text-gray-600 text-sm font-medium">Select Vehicle</label>
//                 <div className="flex gap-2 flex-wrap mt-2">
//                   {vehicles.map((vehicle) => (
//                     <button
//                       key={vehicle}
//                       onClick={() => setSelectedVehicle(vehicle)}
//                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${selectedVehicle === vehicle
//                         ? 'bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white'
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                         }`}
//                     >
//                       {vehicle && profile?.data?.vehicle_type === vehicle ? vehicle + ' (Current)' : vehicle}
//                     </button>
//                   ))}
//                 </div>
//               </div> */}
//               <div className="space-y-4">
//                 <label className="text-gray-600 text-sm font-medium">Select Vehicle</label>
//                 <div className="flex gap-2 flex-wrap mt-2">
//                   {vehicles.map((vehicle) => {
//                     const isCurrentVehicle = profile?.data?.vehicle === vehicle;
//                     const isSelected = selectedVehicle === vehicle;

//                     return (
//                       <button
//                         key={vehicle}
//                         onClick={() => setSelectedVehicle(vehicle)}
//                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
//             ${isSelected
//                             ? 'bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
//           `}
//                       >
//                         {vehicle}
//                         {isCurrentVehicle && (
//                           <span className="ml-1 text-xs text-green-600 font-semibold">
//                             (Current)
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>


//               {/* Vehicle Registration Input */}
//               <div>
//                 <Input
//                   type="text"
//                   placeholder="Vehicle Registration"
//                   value={profile?.data?.vehicle_registration_number || ''}
//                   onChange={(e) => handleInputChange('vehicleRegistration', e.target.value)}
//                   className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 />
//               </div>

//               {/* Driving License Input */}
//               <div>
//                 <Input
//                   type="text"
//                   placeholder="Driving License Number"
//                   value={profile?.data?.driving_license_number || ''}
//                   onChange={(e) => handleInputChange('drivingLicense', e.target.value)}
//                   className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 />
//               </div>
//             </div>
//           )
//           }

//           {/* company related */}

//           {profile?.data?.role === 'company' && (
//             <div>
//               {/* Company Name Input */}
//               <div>
//                 <Input
//                   type="text"
//                   placeholder="Company Name"
//                   value={profile?.data?.name || ''}
//                   onChange={(e) => handleInputChange('companyName', e.target.value)}
//                   className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 />
//               </div>
//               <div>
//                 <Input
//                   type="text"
//                   placeholder="Company Address"
//                   value={profile?.data?.address || ''}
//                   onChange={(e) => handleInputChange('companyName', e.target.value)}
//                   className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
//                 />
//               </div>

//             </div>
//           )}

//         </div>

//         {/* Buttons */}
//         <div className="pt-6 space-y-4">


//           {/* Save Button */}
//           <Button
//             className="w-full h-14 text-lg font-medium bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-lg transition-colors duration-200"
//             size="lg"
//             onClick={handleSubmit}
//           >
//             Save Now
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImagePlus, User } from 'lucide-react';
import Loading from '@/components/ui/icon/loading';
import { useUpdateProfileMutation, useUserProfileQuery } from '@/redux/feature/userSlice';
import { toast } from 'sonner';

export default function Profile() {
  const { data: profile, isLoading } = useUserProfileQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [selectedVehicle, setSelectedVehicle] = useState('Pickup Van');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleRegistration: '',
    drivingLicense: '',
    companyName: '',
    companyAddress: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null); // Store file object
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicles = ['Bike', 'Pickup Van', 'Truck'];

  // Initialize form data and selected vehicle when profile data loads
  useEffect(() => {
    if (profile?.data) {
      setFormData({
        name: profile.data.name || '',
        phone: profile.data.phone_number || '',
        vehicleRegistration: profile.data.vehicle_registration_number || '',
        drivingLicense: profile.data.driving_license_number || '',
        companyName: profile.data.name || '', // For company role
        companyAddress: profile.data.address || '', // For company role
      });
      if (profile.data.vehicle) {
        setSelectedVehicle(profile.data.vehicle);
      }
    }
  }, [profile]);

  // Handle input changes for text fields
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPEG, PNG, or GIF).');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
        setError('Image size must be less than 5MB.');
        return;
      }

      setError(null);
      setIsUploading(true);

      // Read file for preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(file); // Store the file object
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      // Common fields for both roles
      if (formData.name) formDataToSend.append('name', formData.name);
      if (formData.phone) formDataToSend.append('phone_number', formData.phone);

      // Role-specific fields
      if (profile?.data?.role === 'driver') {
        if (selectedVehicle) formDataToSend.append('vehicle', selectedVehicle);
        if (formData.vehicleRegistration)
          formDataToSend.append('vehicle_registration_number', formData.vehicleRegistration);
        if (formData.drivingLicense)
          formDataToSend.append('driving_license_number', formData.drivingLicense);
      } else if (profile?.data?.role === 'company') {
        if (formData.companyName) formDataToSend.append('name', formData.companyName); // Override name for company
        if (formData.companyAddress) formDataToSend.append('address', formData.companyAddress);
      }

      // Append image if selected
      if (profileImage) {
        formDataToSend.append('image', profileImage);
      }

      // Call the update profile mutation
      const response = await updateProfile({id: profile?.data?.id, data: formDataToSend}).unwrap();
      toast.success(response?.message || 'Profile updated successfully!');
      console.log('Update Response:', response);
    } catch (err: any) {
      setError(err?.data?.message || err?.data?.name[0] ||'Failed to update profile. Please try again.');
      console.error('Update Error:', err?.data?.name[0]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto space-y-6 bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-primary overflow-hidden bg-gray-100 flex items-center justify-center">
              {isUploading ? (
                <Loading />
              ) : profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : profile?.data?.image ? (
                <img
                  src={`${IMAGE}${profile.data.image}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              )}
            </div>
            <div className="absolute bottom-0 -right-2 top-8 rounded-full flex items-center justify-center">
              <ImagePlus className="text-primary" />
            </div>
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
          <p className="text-primary text-lg text-center capitalize">
            Role: {profile?.data?.role}
          </p>

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

          {/* Email Input (Read-only) */}
          <div>
            <Input
              type="email"
              placeholder="Enter your Email"
              value={profile?.data?.email || ''}
              readOnly
              className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 text-gray-400 cursor-not-allowed"
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

          {/* Driver-Specific Fields */}
          {profile?.data?.role === 'driver' && (
            <div>
              <div className="space-y-4">
                <label className="text-gray-600 text-sm font-medium">Select Vehicle</label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {vehicles.map((vehicle) => {
                    const isCurrentVehicle = profile?.data?.vehicle === vehicle;
                    const isSelected = selectedVehicle === vehicle;

                    return (
                      <button
                        key={vehicle}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                          ${isSelected
                            ? 'bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                        `}
                      >
                        {vehicle}
                        {isCurrentVehicle && (
                          <span className="ml-1 text-xs text-green-600 font-semibold">
                            (Current)
                          </span>
                        )}
                      </button>
                    );
                  })}
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
          )}

          {/* Company-Specific Fields */}
          {profile?.data?.role === 'company' && (
            <div>
              <div>
                <Input
                  type="text"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Company Address"
                  value={formData.companyAddress}
                  onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                  className="w-full h-12 px-0 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="pt-6 space-y-4">
          <Button
            className="w-full cursor-pointer h-14 text-lg font-medium bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-lg transition-colors duration-200"
            size="lg"
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? <Loading /> : 'Save Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}