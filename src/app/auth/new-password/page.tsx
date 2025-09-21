'use client';
import { Button } from '@/components/ui/button';
import AuthIcon from '@/components/ui/icon/auth';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

 function CreatePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  // Parse query parameters and set initial state
  useEffect(() => {
    const service = searchParams.get('service') as 'Customer' | 'Driver' | 'Company' | null;
    const emailParam = searchParams.get('email');
    if (service && ['Customer', 'Driver', 'Company'].includes(service)) {
      setSelectedService(service);
    }
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validate password and confirm password
    if (!password || !confirmPassword) {
      setError('Please enter both password and confirm password');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Simulate password creation (replace with actual API call)
    console.log('Password submitted:', { selectedService, email, password });

    // Redirect to dashboard or login page (modify as needed)
    router.push('/auth/signin');

    // Reset form
    setPassword('');
    setConfirmPassword('');
  };

  const imageMap = {
    Customer: '/images/customer.png',
    Driver: '/images/driver.png',
    Company: '/images/company.png',
  };

  return (
    <>
      <Head>
        <title>Create Password</title>
      </Head>
      <div className="bg-authBg min-h-screen">
        <div className="p-4 max-w-6xl flex flex-col mx-auto">
          <div onClick={() => router.back()} className="flex items-center gap-4 mb-4">
            <ArrowLeft className="cursor-pointer w-6 h-6" />
            <AuthIcon />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
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
            <div className="space-y-8 md:space-y-12 px-4 md:px-0">
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Create Password</h1>
                <p className="text-secondary text-sm md:text-base">
                  Set a password for {email || 'your account'}.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-8">
                  {['Customer', 'Driver', 'Company'].map((service) => (
                    <Button
                      key={service}
                      className={`px-4 py-2 text-base md:text-lg ${
                        selectedService === service
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                      disabled={selectedService !== service}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="relative">
                    {/* <Label className="text-base md:text-lg px-2 font-normal text-secondary">
                      Password
                    </Label> */}
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="relative">
                    {/* <Label className="text-base md:text-lg px-2 font-normal text-secondary">
                      Confirm Password
                    </Label> */}
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div>
                    <Button
                      type="submit"
                      className="bg-primary text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
                    >
                      Create Password
                    </Button>
                   
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

export default function Page(){
  return <Suspense fallback={<div>Loading...</div>}>
      <CreatePassword />
  </Suspense>
}