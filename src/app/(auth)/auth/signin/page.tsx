'use client';
import { Button } from '@/components/ui/button'
import AuthIcon from '@/components/ui/icon/auth'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Head from 'next/head'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoginMutation } from '@/redux/feature/authSlice';
import { toast } from 'sonner';
import { saveTokens } from '@/service/authService';

export default function SignIn() {

    const router = useRouter();

    // const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const [loading, setLoading] = useState(false);

    const [login] = useLoginMutation();

    // const handleServiceSelect = (service: 'Customer' | 'Driver' | 'Company') => {
    //     setSelectedService(service)
    // }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address')
            return
        }

        try {
            const res = await login({ email, password }).unwrap();
            console.log(res, 'login')
            toast.success(res?.message || 'Login successful');
            localStorage.setItem('accessToken', res?.access_token || '');
            localStorage.setItem('userRole', res?.data?.role || '');
            const locationData = {
                latitude: res?.data?.location_latitude,
                longitude: res?.data?.location_longitude,
                timestamp: new Date().toISOString(),
            };

            localStorage.setItem("userLocation", JSON.stringify(locationData));

            await saveTokens(res?.access_token || '');
            router.push(`/auth/enable-location?id=${res?.data?.id}`);
            setLoading(false);
        } catch (error: any) {
            setError('Invalid email or password');
            console.error('Login error:', error);
            const errors = error?.data?.message || error?.data?.email || 'Login failed. Please try again.';
            toast.error(errors);
            setLoading(false);
        }


        // Reset form
        setEmail('')
        setPassword('')
    }

    const imageMap = {
        Customer: '/images/customer.png',
        Driver: '/images/driver.png',
        Company: '/images/company.png'
    }

    return (
        <>
            <Head>
                <title>Sign Up</title>
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
                                src={'/images/customer.png'}
                                width={500}
                                height={500}
                                alt={`$auth`}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                        <div className="space-y-8 md:space-y-12 px-4 md:px-0">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Sign In</h1>
                                {/* <div className="flex flex-wrap items-center gap-3 mt-8">
                                    {['Customer', 'Driver', 'Company'].map((service) => (
                                        <Button
                                            key={service}
                                            className={`px-4 py-2 text-base md:text-lg ${selectedService === service
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            onClick={() => handleServiceSelect(service as 'Customer' | 'Driver' | 'Company')}
                                        >
                                            {service}
                                        </Button>
                                    ))}
                                </div> */}
                            </div>
                            <div>
                                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                    <div>
                                        <Label className="text-base md:text-lg px-2 font-normal text-secondary">
                                            Email
                                        </Label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Label className="text-base md:text-lg px-2 font-normal text-secondary">
                                            Password
                                        </Label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-2 top-[60%] pb-2  transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                        <div className="flex justify-end">
                                            <Link href="/auth/forgot-pass" className="text-end text-[#93273E] pt-3 cursor-pointer text-sm md:text-base">
                                                Forgot your password?
                                            </Link>
                                        </div>
                                    </div>
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-primary text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
                                        >
                                            {loading ? 'Signing In...' : 'Sign In'}
                                        </Button>
                                        <p className="text-secondary text-center mt-4 text-sm md:text-base">
                                            Don’t have an account?{' '}
                                            <Link href="/auth/signup" className="text-primary cursor-pointer">Sign Up</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}