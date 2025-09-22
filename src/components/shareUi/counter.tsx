import React from 'react'

interface CounterProps {
    title: string;
    count: number;
    icon: React.ReactNode;
}

export default function Counter({ title, count, icon }: CounterProps) {
    return (
        <div className=''>
            <div className='bg-white  shadow rounded-3xl p-5 flex items-center space-x-4'>
                <div className='text-gray-500 dark:text-gray-400'>
                    {icon}
                </div>
                <div>
                    <h3 className='text-xl font-normal text-secondary'>{title}</h3>
                    <p className='text-4xl text-secondary font-semibold'>{count}</p>
                </div>
            </div>
        </div>
    )
}
