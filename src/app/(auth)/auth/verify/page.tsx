// 'use client';
// import { Button } from '@/components/ui/button';
// import AuthIcon from '@/components/ui/icon/auth';
// import { Label } from '@/components/ui/label';
// import { ArrowLeft } from 'lucide-react';
// import Image from 'next/image';
// import Head from 'next/head';
// import React, { useState, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
// import { useVerifyEmailMutation } from '@/redux/feature/authSlice';
// import { toast } from 'sonner';
// import { saveTokens } from '@/service/authService';


// function Verify() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer');
//     const [otp, setOtp] = useState('');
//     const [error, setError] = useState('');
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);

//     const [verifyEmail] = useVerifyEmailMutation();

//     // Parse query parameters and set initial state
//     useEffect(() => {
//         const service = searchParams.get('service') as 'Customer' | 'Driver' | 'Company' | null;
//         const emailParam = searchParams.get('email');
//         if (service && ['Customer', 'Driver', 'Company'].includes(service)) {
//             setSelectedService(service);
//         }
//         if (emailParam) {
//             setEmail(decodeURIComponent(emailParam));
//         }
//     }, [searchParams]);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         setError('');
//         setLoading(true);


//         // Validate OTP
//         if (!otp || otp.length !== 6) {
//             setError('Please enter a valid 6-digit OTP');
//             return;
//         }
//         try {
//             const res = await verifyEmail({ email, otp });
//             console.log(res,'otp')
//             toast.success(res?.message || 'Email verified successfully');
//             setLoading(false);
//             localStorage.setItem('accessToken', res?.access_token || '');
//             await saveTokens(res?.access_token || '');
//             // router.push('/dashboard');
//         } catch (error) {
//             toast.error(error?.message || 'Email verification failed. Please try again.');
//             setError(error?.message || 'Email verification failed. Please try again.');
//             setLoading(false);
//         }

//         console.log('OTP submitted:', { selectedService, email, otp });

//         setOtp('');
//     };

//     const imageMap = {
//         Customer: '/images/customer.png',
//         Driver: '/images/driver.png',
//         Company: '/images/company.png',
//     };

//     return (
//         <>
//             <Head>
//                 <title>Verify Your Email</title>
//             </Head>
//             <div className="bg-authBg min-h-screen">
//                 <div className="p-4 max-w-6xl flex flex-col mx-auto">
//                     <div onClick={() => router.back()} className="flex items-center gap-4 mb-4">
//                         <ArrowLeft className="cursor-pointer w-6 h-6" />
//                         <AuthIcon />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
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
//                         <div className="space-y-8 md:space-y-12 px-4 md:px-0">
//                             <div>
//                                 <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Enter OTP</h1>
//                                 <p className="text-secondary text-sm md:text-base">
//                                     A verification code has been sent to {email || 'your email'}.
//                                 </p>
//                                 <div className="flex flex-wrap items-center gap-3 mt-8">
//                                     {['Customer', 'Driver', 'Company'].map((service) => (
//                                         <Button
//                                             key={service}
//                                             className={`px-4 py-2 text-base md:text-lg ${selectedService === service
//                                                 ? 'bg-primary text-white'
//                                                 : 'bg-gray-200 text-gray-700 opacity-50 cursor-not-allowed'
//                                                 }`}
//                                             disabled={selectedService !== service}
//                                         >
//                                             {service}
//                                         </Button>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div>
//                                 <form className="flex space-y-10 flex-col gap-6" onSubmit={handleSubmit}>
//                                     <div className=''>
//                                         <div>
//                                             <Label className="text-base md:text-lg pb-3 font-normal text-secondary">
//                                                 OTP
//                                             </Label>
//                                             <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
//                                                 <InputOTPGroup>
//                                                     <InputOTPSlot index={0} />
//                                                     <InputOTPSlot index={1} />
//                                                     <InputOTPSlot index={2} />
//                                                     <InputOTPSlot index={3} />
//                                                     <InputOTPSlot index={4} />
//                                                     <InputOTPSlot index={5} />
//                                                 </InputOTPGroup>
//                                             </InputOTP>
//                                         </div>
//                                     </div>

//                                     {error && <p className="text-red-500 text-sm">{error}</p>}
//                                     <div>
//                                         <Button
//                                             type="submit"
//                                             disabled={loading}
//                                             className="bg-primary text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
//                                         >
//                                            {loading ? 'Verifying...' : 'Verify'}
//                                         </Button>
//                                         <p className="text-secondary text-center mt-4 text-sm md:text-base">
//                                             Don’t have an account?{' '}
//                                             <Link href="/auth/signup" className="text-primary cursor-pointer">
//                                                 Sign Up
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
//     );
// }

// export default function Page() {
//     return <Suspense fallback={<div>Loading...</div>}>
//         <Verify />
//     </Suspense>
// }

'use client';
import { Button } from '@/components/ui/button';
import AuthIcon from '@/components/ui/icon/auth';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useVerifyEmailMutation } from '@/redux/feature/authSlice';
import { toast } from 'sonner';
import { saveTokens } from '@/service/authService';

// Define types for API response and mutation
interface VerifyEmailResponse {
    message: string;
    access_token: string;
    // Add other fields as per your API response
}

interface VerifyEmailPayload {
    email: string;
    otp: string;
}

function Verify() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedService, setSelectedService] = useState<'Customer' | 'Driver' | 'Company'>('Customer');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // Validate OTP
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const payload: VerifyEmailPayload = { email, otp };
            const res = await verifyEmail(payload).unwrap() as VerifyEmailResponse;
            console.log(res,'===========')
            toast.success(res.message || 'Email verified successfully');
            localStorage.setItem('accessToken', res.access_token);
            await saveTokens(res.access_token); 
            router.push('/');
        } catch (error: any) {
            const errorMessage = error?.data?.message || 'Email verification failed. Please try again.';
            toast.error(errorMessage);
            setError(errorMessage);
        }
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
                    <div onClick={() => router.back()} className="flex items-center gap-4 mb-4" aria-label="Back to previous page">
                        <ArrowLeft className="cursor-pointer w-6 h-6" />
                        <AuthIcon />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                        <div className="hidden md:block">
                            <Image
                                src={imageMap[selectedService]}
                                width={500}
                                height={500}
                                alt={`${selectedService} authentication`}
                                className="w-full h-auto object-cover"
                                layout="responsive"
                                priority
                            />
                        </div>
                        <div className="space-y-8 md:space-y-12 px-4 md:px-0">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-semibold text-primary mb-4">Enter OTP</h1>
                                <p className="text-secondary text-sm md:text-base">
                                    A verification code has been sent to {email || 'your email'}.
                                </p>
                            </div>
                            <div>
                                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                    <div>
                                        <Label htmlFor="otp" className="text-base md:text-lg pb-3 font-normal text-secondary">
                                            OTP
                                        </Label>
                                        <InputOTP
                                            id="otp"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(value) => setOtp(value)}
                                            className="w-full"
                                            aria-label="Enter 6-digit OTP"
                                        >
                                            <InputOTPGroup className="justify-center gap-2">
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-primary text-base md:text-xl font-medium text-white w-full py-4 md:py-6 mt-4"
                                            aria-label={isLoading ? 'Verifying...' : 'Verify email'}
                                        >
                                            {isLoading ? 'Verifying...' : 'Verify'}
                                        </Button>
                                        <p className="text-secondary text-center mt-4 text-sm md:text-base">
                                            Don’t have an account?{' '}
                                            <Link href="/auth/signup" className="text-primary cursor-pointer">
                                                Sign Up
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

export default function Page() {
    return <Suspense fallback={<div>Loading...</div>}>
        <Verify />
    </Suspense>
}