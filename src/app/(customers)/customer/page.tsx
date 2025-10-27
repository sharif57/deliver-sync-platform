/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Counter from '@/components/shareUi/counter'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Calculator from '@/components/ui/icon/calcutor';
import Complete from '@/components/ui/icon/complete';
import Time from '@/components/ui/icon/time';
import { timeAgo } from '@/lib/timeAgo';
import { useDashboardQuery } from '@/redux/feature/commonSlice';
import { useGetAllNotificationQuery } from '@/redux/feature/notificationSlice';
import { Clock, LocationEdit, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


export default function CustomerDashboard() {
    const { data: dashboardData } = useDashboardQuery(undefined);
    // console.log(dashboardData?.data, '=============>')
    const dashboard = dashboardData?.data

    const { data: notifications } = useGetAllNotificationQuery(undefined);

    const counters = [
        { title: "Today's Order", count: dashboard?.todays_order || 0, icon: <Calculator /> },
        { title: "Pending Order", count: dashboard?.total_pending_order || 0, icon: <Time /> },
        { title: "Completed Order", count: dashboard?.total_completed_order || 0, icon: <Complete /> },
    ];
    return (
        <>
            <title>Customer Dashboard</title>
            <div className=' space-y-6 '>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4  '>
                    {counters.map((counter, index) => (
                        <Counter key={index} title={counter.title} count={counter.count} icon={counter.icon} />
                    ))}
                </div>

                <section className="  ">
                    <div className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                            {/* Request Delivery Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                                    <Plus className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-medium text-secondary  mb-3">Request Delivery</h3>
                                <p className="text-secondary mb-8  leading-relaxed">Create a new delivery request for truck parts</p>
                                <Link href={"/customer/request"}>
                                    <Button className=" text-white bg-gradient-to-r from-[#EFB639] to-[#C59325] px-8 py-3 rounded font-medium transition-colors">
                                        Create New Request
                                    </Button>
                                </Link>
                            </div>

                            {/* History Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-medium text-secondary mb-3">History</h3>
                                <p className="text-secondary mb-8 leading-relaxed">View past orders and delivery records</p>
                                <Link href={"/customer/history"}><Button className=" text-white bg-gradient-to-r from-[#EFB639] to-[#C59325] px-8 py-3 rounded font-medium transition-colors">
                                    View History
                                </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl mt-6 p-8 shadow-sm border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                                <LocationEdit className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-medium text-secondary mb-3">Track My Orders</h3>
                            <p className="text-secondary mb-8 leading-relaxed">Monitor real-time delivery status and location</p>
                            <Link href={"/customer/history"}>
                                <Button className=" text-white bg-gradient-to-r from-[#EFB639] to-[#C59325] px-8 py-3 rounded font-medium transition-colors">
                                    Track Order’s
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                    <div>
                        <h2 className="text-2xl font-medium text-secondary mb-4">Recent Activities</h2>
                        <div className="h-px bg-gray-200 mb-6"></div>
                    </div>


                    <div className="space-y-4">
                        {notifications?.data?.map((activity: any) => (
                            <div key={activity.id} className="flex items-start gap-3 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
                                <div>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>


                                <div className="flex-1 min-w-0">
                                    <p className="text-xl font-medium text-secondary">
                                        Order Id#{activity.data?.order_id} - {activity?.message}
                                    </p>
                                    <p className="text-[16px] text-[#545454] mt-1">{timeAgo(activity?.created_at)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
