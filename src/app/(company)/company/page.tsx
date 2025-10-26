'use client';
import Counter from '@/components/shareUi/counter'
import TrackRider from '@/components/TrackRider';
import Calculator from '@/components/ui/icon/calcutor';
import Canceleds from '@/components/ui/icon/Canceleds';
import Completes from '@/components/ui/icon/Completes';
import Loading from '@/components/ui/icon/loading';
import Times from '@/components/ui/icon/times';
import { useDashboardQuery } from '@/redux/feature/commonSlice';
import {  DollarSign, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Company() {

    const { data, isLoading } = useDashboardQuery(undefined, {
        pollingInterval: 1000,
        refetchOnFocus: true,
        refetchOnReconnect: true
    });
    console.log(data?.data, 'company')
    const companyDetails = data?.data;

    const items = [
        { title: "Total Order Today", count: companyDetails?.todays_order || 0, icon: <Calculator /> },
        { title: "Ongoing Order", count: companyDetails?.total_ongoing_order || 0, icon: <Times /> },
        { title: "Completed Order", count: companyDetails?.total_complited_order || 0, icon: <Completes /> },
        { title: "Canceled Order", count: companyDetails?.total_canceled_order || 0, icon: <Canceleds /> },
    ]

    // const handmessage = () => {
    //     router.push('/customer/message')
    // }


    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'><Loading /></div>
    }

    return (
        <>
            <title>Company Dashboard</title>
            <div className='space-y-6'>
                <div>
                    <h1 className='text-2xl font-medium text-secondary'>Welcome Back, Sharif Mahamud !</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                        items.map((item, index) => (
                            <Counter key={index} title={item.title} count={item.count} icon={item.icon} />
                        ))
                    }
                </div>
                <div>
                    <h1 className='text-2xl font-medium text-secondary'>Actions</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                        <Link href={'/company/hire-driver'} className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                                <Plus className='size-[35px]' />

                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>Hire a Driver</h3>
                            </div>
                        </Link>
                        <Link href={'/company/earning-history'} className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                                <DollarSign className='size-[35px]' />
                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>Delivery History</h3>
                            </div>
                        </Link>
                        {/* <Link href={'/company/message-list'} className='bg-white cursor-pointer  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                                <MessageCircleMore className='size-[35px]' />

                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>Message</h3>
                            </div>
                        </Link> */}
                    </div>
                </div>
                <div>
                 
                    <TrackRider />
                </div>
            </div >
        </>
    )
}
