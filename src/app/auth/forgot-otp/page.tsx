'use client';
import { Button } from '@/components/ui/button';
import AuthIcon from '@/components/ui/icon/auth';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function ForgotOTP() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer');
    const [otp, setOtp] = useState('');
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

        // Validate OTP
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        // Simulate OTP verification (replace with actual API call)
        console.log('OTP submitted:', { selectedService, email, otp });

        // Redirect to a success page or dashboard (modify as needed)
        router.push(`/auth/new-password?email=${encodeURIComponent(email)}&service=${selectedService.toString()}`);

        // Reset form
        setOtp('');
    };

    const imageMap = {
        Customer: '/images/customer.png',
        Driver: '/images/driver.png',
        Company: '/images/company.png',
    };

    return (
        <>
            <Head>
                <title>Verify Your Email</title>
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
                                <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Enter OTP</h1>
                                <p className="text-secondary text-sm md:text-base">
                                    A verification code has been sent to {email || 'your email'}.
                                </p>
                                <div className="flex flex-wrap items-center gap-3 mt-8">
                                    {['Customer', 'Driver', 'Company'].map((service) => (
                                        <Button
                                            key={service}
                                            className={`px-4 py-2 text-base md:text-lg ${selectedService === service
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
                                <form className="flex space-y-10 flex-col gap-6" onSubmit={handleSubmit}>
                                    <div className=''>
                                        <div>
                                            <Label className="text-base md:text-lg pb-3 font-normal text-secondary">
                                                OTP
                                            </Label>
                                            <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div>
                                        <Button
                                            type="submit"
                                            className="bg-primary text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
                                        >
                                            Verify
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