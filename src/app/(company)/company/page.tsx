'use client';
import Counter from '@/components/shareUi/counter'
import Calculator from '@/components/ui/icon/calcutor';
import Canceleds from '@/components/ui/icon/Canceleds';
import Completes from '@/components/ui/icon/Completes';
import Times from '@/components/ui/icon/times';
import { ChevronRight, DollarSign, MessageCircleMore, Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Company() {
    const router = useRouter()

    const items = [
        { title: "Total Order Today", count: 12, icon: <Calculator /> },
        { title: "Ongoing Order", count: 2, icon: <Times /> },
        { title: "Completed Order", count: 2, icon: <Completes /> },
        { title: "Canceled Order", count: 2, icon: <Canceleds /> },
    ]

    const handmessage = () => {
        router.push('/customer/message')
    }

    const orders = [
        { id: '1', date: '14 May 2019', title: 'Engine oil', status: 'Processing' },
        { id: '2', date: '14 May 2019', title: 'Engine oil', status: 'Processing' },
        { id: '3', date: '15 May 2019', title: 'Engine oil', status: 'Processing' },
        { id: '4', date: '16 May 2019', title: 'Engine oil', status: 'Delivered' },
        { id: '5', date: '17 May 2019', title: 'Engine oil', status: 'Delivered' },
    ]


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
                        <Link href={'/company/deliveries-history'} className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
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
                <div>
                    <h1 className="text-2xl font-medium text-secondary mb-4">Track Order / Rider</h1>

                    <div className="bg-white rounded-3xl shadow-sm w-full  overflow-hidden  p-4">
                        {orders.map((order) => (
                            <div
                                key={order.id} 
                                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 sm:p-2  "
                            >
                                <Link
                                    href={`/driver/deliveries-history/${order.id}`}
                                    className="flex items-center w-full justify-between px-2 sm:px-4  py-2 sm:py-3 bg-[#FDF7E9] rounded-lg hover:bg-[#FBE8C6] transition-colors duration-200"
                                >
                                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <span className="text-xs sm:text-sm md:text-lg font-medium text-gray-900">
                                                ID: #{order.id}
                                            </span>
                                            <span className="text-xs sm:text-sm md:text-lg text-[#D69D21]">
                                                {order.date} - {order.title} - {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 bg-white p-1 sm:p-2 rounded-lg">
                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}
