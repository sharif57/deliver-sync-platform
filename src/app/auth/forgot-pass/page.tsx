'use client';
import { Button } from '@/components/ui/button'
import AuthIcon from '@/components/ui/icon/auth'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Head from 'next/head'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function SignIn() {

    const router = useRouter();

    const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleServiceSelect = (service: 'Customer' | 'Driver' | 'Company') => {
        setSelectedService(service)
    }



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (!email) {
            setError('Please enter your email address')
            return
        }
        router.push(`/auth/forgot-otp?email=${encodeURIComponent(email)}&service=${selectedService}`)


        console.log('Form submitted:', { email, selectedService })
        // Reset form
        setEmail('')
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
                                <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Forgot Password</h1>
                                <div className="flex flex-wrap items-center gap-3 mt-8">
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
                                </div>
                            </div>
                            <div>
                                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                    <div>
                                        {/* <Label className="text-base md:text-lg px-2 font-normal text-secondary">
                                            Email
                                        </Label> */}
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base"
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div>
                                        <Button
                                            type="submit"
                                            className="bg-primary text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
                                        >
                                            Send OTP
                                        </Button>

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