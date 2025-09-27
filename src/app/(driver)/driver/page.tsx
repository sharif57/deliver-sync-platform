'use client';
import Counter from '@/components/shareUi/counter'
import { Button } from '@/components/ui/button'
import Car from '@/components/ui/icon/car'
import House from '@/components/ui/icon/house'
import Loading from '@/components/ui/icon/loading';
import Money from '@/components/ui/icon/money'
import { DollarSign, MessageCircleMore, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Driver() {
    const router = useRouter()

    const items = [
        { title: "Total Earnings", count: 12, icon: <Money /> },
        { title: "Pending Deliveries", count: 2, icon: <Money /> },
        { title: "Completed Deliveries", count: 2, icon: <Money /> },
    ]

    const handmessage = () => {
        router.push('/customer/message')
    }

    const [isSearching, setIsSearching] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSearching(false);
        }, 3000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <title>Driver Dashboard</title>
            <div className='space-y-6'>
                <div>
                    <h1 className='text-2xl font-medium text-secondary'>Welcome Back, Rahim!</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        items.map((item, index) => (
                            <Counter key={index} title={item.title} count={item.count} icon={item.icon} />
                        ))
                    }
                </div>
                <div>
                    <h1 className='text-2xl font-medium text-secondary'>Actions</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                        <Link href={'/driver/deliveries-history'} className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                                <Plus className='size-[35px]' />

                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>Delivery History</h3>
                            </div>
                        </Link>
                        <Link href={'/driver/earning-history'} className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                                <DollarSign className='size-[35px]' />
                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>My Earnings</h3>
                            </div>
                        </Link>
                        <div onClick={handmessage} className='bg-white cursor-pointer  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                                <MessageCircleMore className='size-[35px]' />

                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>Message</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" flex items-center justify-center  ">
                    {isSearching ? (
                        // Searching State (First 3 seconds)
                        <div className='container'>
                            <h1 className="text-2xl font-medium text-secondary mb-4 text-start">Wait for delivery request</h1>
                            <div className="bg-white rounded-3xl shadow-sm py-10">
                                <div className="py-8 px-6">
                                    <div className="flex flex-col justify-center items-center space-y-10">
                                        <p className="text-4xl text-center font-medium text-secondary">
                                            We’re <span className="text-primary font-medium">Searching</span> a order for you…
                                        </p>
                                        <div className="flex justify-center">
                                            <Loading />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Delivery Request State (After 3 seconds)
                        <div className='container'>
                            <h1 className="text-2xl font-medium text-secondary mb-4 text-start">New Request</h1>
                            <div className="bg-white rounded-3xl shadow-sm">
                                <div className="py-8 px-6">
                                    <h1 className="text-secondary text-center text-3xl md:text-4xl font-medium mb-8">
                                        New Delivery Request
                                    </h1>
                                    <div className="flex flex-col md:flex-row md:justify-between gap-8">
                                        {/* Left Side (Locations + Details) */}
                                        <div className="flex-1">
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <Car />
                                                    <div>
                                                        <h2 className="text-secondary text-xl md:text-2xl font-medium">
                                                            Pickup Location
                                                        </h2>
                                                        <p className="text-[#545454] text-sm md:text-base">
                                                            123 Main Street, City, Country
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <House />
                                                    <div>
                                                        <h2 className="text-secondary text-xl md:text-2xl font-medium">
                                                            Drop-off Location
                                                        </h2>
                                                        <p className="text-[#545454] text-sm md:text-base">
                                                            456 Park Avenue, City, Country
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="border-gray-200 my-6" />
                                            <div className="space-y-4 text-secondary">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg">Package: Truck Alternator</span>
                                                    <span className="font-semibold text-xl">15 KG</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg">Distance</span>
                                                    <span className="font-semibold text-xl">12 KM</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg">Estimate Payment</span>
                                                    <span className="font-semibold text-xl">$12</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Right Side (Buttons) */}
                                        <div className="flex-1 flex flex-col items-center justify-center">
                                            <div className="flex flex-col gap-4 w-full max-w-sm">
                                                <button
                                                    className="w-full border-2 border-gray-300 px-14  text-secondary text-base py-3 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 transition"
                                                    aria-label="Decline request"
                                                >
                                                    Decline
                                                </button>
                                                <Link href="/driver/accept-request" className="w-full">
                                                    <button
                                                        className="w-full text-base px-14 bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition"
                                                        aria-label="Accept request"
                                                    >
                                                        Accept
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}
