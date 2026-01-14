// 'use client';
// import { Button } from '@/components/ui/button'
// import AuthIcon from '@/components/ui/icon/auth'
// import { Label } from '@/components/ui/label'
// import { ArrowLeft, Eye, EyeOff, Trash, Upload } from 'lucide-react'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { Checkbox } from '@/components/ui/checkbox'
// import { useRegisterMutation } from '@/redux/feature/authSlice';
// import { toast } from 'sonner';

// export default function SignUp() {
//     const router = useRouter()
//     const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')
//     const [name, setName] = useState('')
//     const [phoneNumber, setPhoneNumber] = useState('')
//     const [image, setImage] = useState("");
//     const [deliveryAddress, setDeliveryAddress] = useState('')
//     const [driverLicense, setDriverLicense] = useState('')
//     const [companyName, setCompanyName] = useState('')
//     const [businessAddress, setBusinessAddress] = useState('')
//     const [termsAccepted, setTermsAccepted] = useState(false)
//     const [error, setError] = useState('')
//     const [showPassword, setShowPassword] = useState(false)
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//     const [vehicleRegistration, setVehicleRegistration] = useState('')
//     const [selectedVehicle, setSelectedVehicle] = useState('')
//     const [loading, setLoading] = useState(false)

//     // api mutations
//     const [register] = useRegisterMutation();

//     const handleServiceSelect = (service: 'Customer' | 'Driver' | 'Company') => {
//         setSelectedService(service)
//     }

//     const handleVehicleSelect = (vehicle: string) => {
//         setSelectedVehicle(vehicle)
//     }

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword)
//     }

//     const toggleConfirmPasswordVisibility = () => {
//         setShowConfirmPassword(!showConfirmPassword)
//     }


//     const handleUploadImage = () => {
//         const input = document.getElementById("image_input");
//         if (input) {
//             input.click();
//         }
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const files = e.target?.files;
//         const file = files && files[0];
//         if (file) {
//             const imageURL = URL.createObjectURL(file);
//             setImage(imageURL);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setError('');
//         setLoading(true);

//         // Common validation
//         if (!email || !password || !confirmPassword || !termsAccepted) {
//             setError('Please fill in all required fields and accept the terms');
//             setLoading(false);
//             return;
//         }
//         if (!/\S+@\S+\.\S+/.test(email)) {
//             setError('Please enter a valid email address');
//             setLoading(false);
//             return;
//         }
//         if (password !== confirmPassword) {
//             setError('Passwords do not match');
//             setLoading(false);
//             return;
//         }
//         if (!/^\+?[\d\s-]{10,}$/.test(phoneNumber)) {
//             setError('Please enter a valid phone number');
//             setLoading(false);
//             return;
//         }

//         // Service-specific validation
//         if (selectedService === 'Customer' && (!name || !deliveryAddress)) {
//             setError('Please fill in name and delivery address');
//             setLoading(false);
//             return;
//         }
//         if (selectedService === 'Driver' && (!name || !driverLicense || !selectedVehicle || !vehicleRegistration)) {
//             setError('Please fill in name, driver’s license number, vehicle type, and vehicle registration');
//             setLoading(false);
//             return;
//         }
//         if (selectedService === 'Company' && (!companyName || !businessAddress)) {
//             setError('Please fill in company name and business address');
//             setLoading(false);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             if(image) formData.append('image', image);
//             formData.append('role', selectedService.toLowerCase());
//             formData.append('email', email);
//             formData.append('password', password);
//             formData.append('phone_number', phoneNumber);

//             if (selectedService === 'Customer') {
//                 formData.append('name', name);
//                 formData.append('address', deliveryAddress);
//             } else if (selectedService === 'Driver') {
//                 formData.append('name', name);
//                 formData.append('driver_license', driverLicense);
//                 formData.append('vehicle_type', selectedVehicle);
//                 formData.append('vehicle_registration', vehicleRegistration);
//             } else if (selectedService === 'Company') {
//                 // Specific data for Company role with name "Mehdi"
//                 if (companyName === 'Mehdi') {
//                     formData.append('company_name', companyName);
//                     formData.append('business_address', businessAddress || 'Dhaka, Bangladesh'); // Default if not set
//                     formData.append('email', 'mhasan.devs@gmail.com'); // Fixed email
//                     formData.append('password', '12345678'); // Fixed password
//                     formData.append('phone_number', '01758546852'); // Fixed phone number
//                     if (image) {
//                         formData.append('image', image); // Ensure image is included
//                     }
//                 } else {
//                     formData.append('company_name', companyName);
//                     formData.append('business_address', businessAddress);
//                 }
//             }

//             const res = await register(formData).unwrap();
//             toast.success(res?.message || 'Registration successful');
//             console.log(res, 'res data');

//             // Redirect to verification page
//             const query = new URLSearchParams({
//                 service: selectedService,
//                 email,
//             }).toString();
//             // router.push(`/auth/verify?${query}`);
//         } catch (error: any) {
//             const errorMessage = error?.data?.message || 'Registration failed. Please try again.';
//             toast.error(errorMessage);
//             setError(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const imageMap = {
//         Customer: '/images/customer.png',
//         Driver: '/images/driver.png',
//         Company: '/images/company.png',
//     }

//     return (
//         <>
//             <title>Sign Up</title>
//             <div className="bg-authBg ">
//                 <div className="p-4 max-w-6xl flex flex-col mx-auto">
//                     <div onClick={() => router.back()} className="flex items-center gap-4 mb-4 ">
//                         <ArrowLeft className="cursor-pointer w-6 h-6" />
//                         <AuthIcon />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
//                         <div className="hidden md:block">
//                             <Image
//                                 src={imageMap[selectedService]}
//                                 width={500}
//                                 height={500}
//                                 alt={`${selectedService} auth`}
//                                 className="w-full h-auto object-cover"
//                                 priority
//                             />
//                         </div>
//                         <div className="space-y-8 md:space-y-12 px-4 md:px-0 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar">
//                             <div>
//                                 <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Sign Up</h1>
//                                 <div className="flex flex-wrap items-center gap-3 mt-8">
//                                     {['Customer', 'Driver', 'Company'].map((service) => (
//                                         <Button
//                                             key={service}
//                                             className={`px-4 py-2 text-base md:text-lg ${selectedService === service
//                                                 ? 'bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white'
//                                                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                                                 }`}
//                                             onClick={() => handleServiceSelect(service as 'Customer' | 'Driver' | 'Company')}
//                                         >
//                                             {service}
//                                         </Button>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div>
//                                 <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

//                                     {/* image upload */}
//                                     <div className="mb-4 flex items-center justify-center w-[120px] h-[120px] border-primary rounded-full overflow-hidden border 
//                                      dark:border-slate-600">
//                                         <input
//                                             type="file"
//                                             name="image"
//                                             id="image_input"
//                                             className="hidden"
//                                             onChange={handleFileChange}
//                                         />
//                                         {image === "" ? (
//                                             <div
//                                                 className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
//                                                 onClick={handleUploadImage}
//                                             >
//                                                 <Upload className="text-[2rem] text-[#777777] dark:text-[#abc2d3]" />
//                                                 <p className="text-[#777777] dark:text-[#abc2d3] text-sm text-center">
//                                                     Upload Image
//                                                 </p>
//                                             </div>
//                                         ) : (
//                                             <div className="relative w-full h-full">
//                                                 <Image
//                                                     src={image}
//                                                     alt="image"
//                                                     height={200}
//                                                     width={200}
//                                                     className="w-full h-full object-cover rounded-full"
//                                                 />
//                                                 <Trash
//                                                     className="text-[2rem] text-white bg-[#FF0000] p-1 absolute top-20 right-6 left-12  bottom-0 cursor-pointer rounded-full"
//                                                     onClick={() => setImage("")}
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>

//                                     {(selectedService === 'Customer' || selectedService === 'Driver') && (
//                                         <div>

//                                             <input
//                                                 type="text"
//                                                 placeholder={`Enter your ${selectedService === 'Customer' ? 'name' : 'driver name'}`}
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                             />
//                                         </div>
//                                     )}
//                                     {selectedService === 'Company' && (
//                                         <div className="space-y-4">
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Enter your Name"
//                                                     value={companyName}
//                                                     onChange={(e) => setCompanyName(e.target.value)}
//                                                     className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Enter your company name"
//                                                     value={companyName}
//                                                     onChange={(e) => setCompanyName(e.target.value)}
//                                                     className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                     <div>
//                                         {/* <Label className="text-base md:text-lg px-2 font-normal text-secondary">
//                                             Email
//                                         </Label> */}
//                                         <input
//                                             type="email"
//                                             placeholder="Enter your email address"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                         />
//                                     </div>
//                                     <div>
//                                         <input
//                                             type="tel"
//                                             placeholder="Enter your phone number"
//                                             value={phoneNumber}
//                                             onChange={(e) => setPhoneNumber(e.target.value)}
//                                             className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                         />
//                                     </div>
//                                     {selectedService === 'Customer' && (
//                                         <div>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Enter your delivery address"
//                                                 value={deliveryAddress}
//                                                 onChange={(e) => setDeliveryAddress(e.target.value)}
//                                                 className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                             />
//                                         </div>
//                                     )}
//                                     {selectedService === 'Driver' && (
//                                         <div className="space-y-4 ">

//                                             <div className=''>
//                                                 <label htmlFor="vehicleRegistration" className="cursor-pointer">Select Vehicle</label>
//                                                 {selectedService === 'Driver' && (
//                                                     <div className="space-y-4">
//                                                         <div>

//                                                             <div className="grid grid-cols-3 gap-2 mt-2">
//                                                                 {['Bike', 'Pickup Van', 'Truck'].map((vehicle) => (
//                                                                     <Button
//                                                                         key={vehicle}
//                                                                         type="button"
//                                                                         className={`w-full ${selectedVehicle === vehicle
//                                                                             ? 'bg-primary text-white'
//                                                                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                                                                             }`}
//                                                                         onClick={() => handleVehicleSelect(vehicle)}
//                                                                     >
//                                                                         {vehicle}
//                                                                     </Button>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                         <div>

//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Enter vehicle registration"
//                                                                 value={vehicleRegistration}
//                                                                 onChange={(e) => setVehicleRegistration(e.target.value)}
//                                                                 className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                                             />
//                                                         </div>
//                                                         <div>

//                                                             <input
//                                                                 type="text"
//                                                                 placeholder="Enter your driver’s license number"
//                                                                 value={driverLicense}
//                                                                 onChange={(e) => setDriverLicense(e.target.value)}
//                                                                 className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Vehicle Registration"
//                                                     value={vehicleRegistration}
//                                                     onChange={(e) => setVehicleRegistration(e.target.value)}
//                                                     className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Enter your driver’s license number"
//                                                     value={driverLicense}
//                                                     onChange={(e) => setDriverLicense(e.target.value)}
//                                                     className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                     {selectedService === 'Company' && (
//                                         <div>

//                                             <input
//                                                 type="text"
//                                                 placeholder="Enter your company address"
//                                                 value={businessAddress}
//                                                 onChange={(e) => setBusinessAddress(e.target.value)}
//                                                 className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                             />
//                                         </div>
//                                     )}
//                                     <div className="relative">
//                                         {/* <Label className="text-base md:text-lg px-2 font-normal text-secondary">
//                                             Password
//                                         </Label> */}
//                                         <input
//                                             type={showPassword ? 'text' : 'password'}
//                                             placeholder="Enter Password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={togglePasswordVisibility}
//                                             className="absolute right-2 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                                         >
//                                             {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                         </button>
//                                     </div>
//                                     <div className="relative">

//                                         <input
//                                             type={showConfirmPassword ? 'text' : 'password'}
//                                             placeholder="Confirm Password"
//                                             value={confirmPassword}
//                                             onChange={(e) => setConfirmPassword(e.target.value)}
//                                             className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={toggleConfirmPasswordVisibility}
//                                             className="absolute right-2 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                                         >
//                                             {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                         </button>
//                                     </div>
//                                     {error && <p className="text-red-500 text-sm">{error}</p>}
//                                     <div className="flex items-center space-x-2">
//                                         <Checkbox
//                                             id="terms"
//                                             className="border-2 border-secondary"
//                                             checked={termsAccepted}
//                                             onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
//                                         />
//                                         <Label htmlFor="terms" className="text-sm md:text-base">
//                                             You agree to the Terms of Service and acknowledge you have read the Privacy Policy
//                                         </Label>
//                                     </div>
//                                     <div>
//                                         <Button
//                                             type="submit"
//                                             disabled={loading}
//                                             className="bg-gradient-to-r from-[#EFB639] to-[#C59325] text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
//                                         >
//                                             {loading ? 'Signing Up...' : 'Sign Up'}
//                                         </Button>
//                                         <p className="text-secondary text-center mt-4 text-sm md:text-base">
//                                             Already have an account?{' '}
//                                             <Link href="/auth/signin" className="text-primary cursor-pointer">
//                                                 Sign In
//                                             </Link>
//                                         </p>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

'use client';
import { Button } from '@/components/ui/button';
import AuthIcon from '@/components/ui/icon/auth';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff, Trash, Upload } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useRegisterMutation } from '@/redux/feature/authSlice';
import { toast } from 'sonner';

export default function SignUp() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState<File | null>(null); // Changed to store File object
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [vehicleRegistration, setVehicleRegistration] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [loading, setLoading] = useState(false);

  // API mutations
  const [register] = useRegisterMutation();

  const handleServiceSelect = (service: 'Customer' | 'Driver' | 'Company') => {
    setSelectedService(service);
  };

  const handleVehicleSelect = (vehicle: string) => {
    setSelectedVehicle(vehicle);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUploadImage = () => {
    const input = document.getElementById('image_input') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // Store the File object directly
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Common validation
    if (!email || !password || !confirmPassword || !termsAccepted) {
      setError('Please fill in all required fields and accept the terms');
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (!/^\+?[\d\s-]{10,}$/.test(phoneNumber)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    // Service-specific validation
    if (selectedService === 'Customer' && (!name || !deliveryAddress)) {
      setError('Please fill in name and delivery address');
      setLoading(false);
      return;
    }
    if (selectedService === 'Driver' && (!name || !driverLicense || !selectedVehicle || !vehicleRegistration)) {
      setError('Please fill in name, driver’s license number, vehicle type, and vehicle registration');
      setLoading(false);
      return;
    }
    if (selectedService === 'Company' && (!companyName || !businessAddress)) {
      setError('Please fill in company name and business address');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      }
      formData.append('role', selectedService.toLowerCase());
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone_number', phoneNumber);

      if (selectedService === 'Customer') {
        formData.append('name', name);
        formData.append('address', deliveryAddress);
      } else if (selectedService === 'Driver') {
        formData.append('name', name);
        formData.append('driving_license_number', driverLicense);
        formData.append('vehicle', selectedVehicle);
        formData.append('vehicle_registration_number', vehicleRegistration);
      } else if (selectedService === 'Company') {
        formData.append('name', name);
        //   formData.append('business_address', businessAddress || 'Dhaka, Bangladesh'); 
        //   formData.append('email', email); 
        //   formData.append('password', password); 
        //   formData.append('phone_number', phoneNumber); 
        //   if (image) {
        //     formData.append('image', image); 
        //   }
        // driving_license_number
        // vehicle_registration_number
        formData.append('company_name', companyName);
        formData.append('address', businessAddress);
        // formData.append('address', deliveryAddress);

      }

      const res = await register(formData).unwrap();
      toast.success(res?.message || 'Registration successful');
      console.log(res, 'res data');

      const query = new URLSearchParams({
        service: selectedService,
        email,
      }).toString();
      router.push(`/auth/verify?${query}`);
    } catch (error: any) {
      console.log(error?.data?.name[0])
      const errorMessage = error?.data?.message || error?.data?.email[0] || error?.data?.name[0] || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const imageMap = {
    Customer: '/images/customer.png',
    Driver: '/images/driver.png',
    Company: '/images/company.png',
  };

  return (
    <>
      <title>Sign Up</title>
      <div className="bg-authBg">
        <div className="p-4 max-w-6xl flex flex-col mx-auto">
          <div onClick={() => router.back()} className="flex items-center gap-4 mb-4">
            <ArrowLeft className="cursor-pointer w-6 h-6" />
            <AuthIcon />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            <div className="hidden md:block">
              <Image
                src={imageMap[selectedService]}
                width={500}
                height={500}
                alt={`${selectedService} auth`}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="space-y-8 md:space-y-12 px-4 md:px-0 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar">
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Sign Up</h1>
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  {['Customer', 'Driver', 'Company'].map((service) => (
                    <Button
                      key={service}
                      className={`px-4 py-2 text-base md:text-lg ${selectedService === service
                          ? 'bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      onClick={() => handleServiceSelect(service as 'Customer' | 'Driver' | 'Company')}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data" // Added for file upload
                >
                  {/* Image upload */}
                  <div className="mb-4 flex items-center justify-center w-[120px] h-[120px] border-primary rounded-full overflow-hidden border dark:border-slate-600">
                    <input
                      type="file"
                      name="image"
                      id="image_input"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*" // Restrict to image files
                    />
                    {image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={image ? URL.createObjectURL(image) : ''} // Use URL for preview
                          alt="profile"
                          width={120}
                          height={120}
                          className="w-full h-full object-cover rounded-full"
                        />
                        <Trash
                          className="text-[2rem] text-white bg-[#FF0000] p-1 absolute top-20 right-6 left-12 bottom-0 cursor-pointer rounded-full"
                          onClick={() => setImage(null)}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer"
                        onClick={handleUploadImage}
                      >
                        <Upload className="text-[2rem] text-[#777777] dark:text-[#abc2d3]" />
                        <p className="text-[#777777] dark:text-[#abc2d3] text-sm text-center">Upload Image</p>
                      </div>
                    )}
                  </div>

                  {(selectedService === 'Customer' || selectedService === 'Driver') && (
                    <div>
                      <input
                        type="text"
                        placeholder={`Enter your ${selectedService === 'Customer' ? 'name' : 'driver name'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                      />
                    </div>
                  )}
                  {selectedService === 'Company' && (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Enter your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter your company name"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                    />
                  </div>
                  {selectedService === 'Customer' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter your delivery address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                      />
                    </div>
                  )}
                  {selectedService === 'Driver' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="vehicleRegistration" className="cursor-pointer">Select Vehicle</label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {[ 'Pickup Van', 'Truck'].map((vehicle) => (
                            <Button
                              key={vehicle}
                              type="button"
                              className={`w-full ${selectedVehicle === vehicle
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                              onClick={() => handleVehicleSelect(vehicle)}
                            >
                              {vehicle}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter vehicle registration"
                          value={vehicleRegistration}
                          onChange={(e) => setVehicleRegistration(e.target.value)}
                          className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter your driver’s license number"
                          value={driverLicense}
                          onChange={(e) => setDriverLicense(e.target.value)}
                          className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                        />
                      </div>
                    </div>
                  )}
                  {selectedService === 'Company' && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter your company address"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-2 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      className="border-2 border-secondary"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm md:text-base">
                      You agree to the Terms of Service and acknowledge you have read the Privacy Policy
                    </Label>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-[#EFB639] to-[#C59325] text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
                    >
                      {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                    <p className="text-secondary text-center mt-4 text-sm md:text-base">
                      Already have an account?{' '}
                      <Link href="/auth/signin" className="text-primary cursor-pointer">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}