'use client';
import PageHeader from '@/components/shareUi/onBack'
import { useUserProfileQuery } from '@/redux/feature/userSlice'
import React from 'react'

export default function Wallet() {

    const {data} = useUserProfileQuery(undefined)
    console.log(data?.data)
    return (
        <div>
            <title>Wallet</title>
            <PageHeader title="Wallet" />
            <div>
                <div className='bg-white p-10 rounded-lg  flex flex-col items-center gap-4'>
                    <p className='text-[#012F64] text-5xl font-semibold text-center'>{data?.data?.account_balance}$</p>
                </div>
                <div className='bg-[#F9E6BB] p-6 mt-8 rounded-lg'>
                    <h2 className='text-lg font-medium  mb-4'>Amount</h2>
                    <input defaultValue={50} type="number" className='border rounded-lg border-[#e5eaf2] bg-white dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-2 w-full py-3 focus:border-primary transition-colors duration-300 text-base' />
                </div> 
                <div className='w-1/3 mx-auto'>
                    <button className='bg-primary w-full mt-6 text-white py-3 rounded-full font-medium hover:bg-primary/90 cursor-pointer transition-colors duration-300'>Process</button>
                </div>
            </div>
        </div>
    )
}
