import Counter from '@/components/shareUi/counter'
import Money from '@/components/ui/icon/money'
import { DollarSign, History, Plus } from 'lucide-react'
import React from 'react'

export default function Driver() {

    const items = [
        { title: "Total Earnings", count: 12, icon: <Money /> },
        { title: "Pending Deliveries", count: 2, icon: <Money /> },
        { title: "Completed Deliveries", count: 2, icon: <Money /> },
    ]

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
                        <div className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                               <Plus className='size-[35px]' />

                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>Delivery History</h3>
                            </div>
                        </div>
                        <div className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                                <DollarSign  className='size-[35px]' />
                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>My Earnings</h3>
                            </div>
                        </div>
                        <div className='bg-white  shadow rounded-3xl p-5 flex flex-col gap-4 items-center space-x-4'>
                            <div className='text-gray-500 dark:text-gray-400'>
                             <History className='size-[35px]' />

                            </div>
                            <div>
                                <h3 className='text-xl font-normal text-secondary'>History</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
