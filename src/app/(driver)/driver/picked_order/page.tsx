// import React from 'react'

// export default function DeliverTheParcel() {
//   return (
//     <div>

//     </div>
//   )
// }
"use client"

import PageHeader from "@/components/shareUi/onBack"
import Car from "@/components/ui/icon/car"
import House from "@/components/ui/icon/house"
import Loading from "@/components/ui/icon/loading"
import { useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

 function ActiveDeliveryPage() {

    const params = useSearchParams();
    const id = params.get("id");
    console.log(id)
    const router = useRouter();
    const { data, isLoading, isError } = useGetCustomerOrderDetailsQuery(id as string);
    const orderDetails = data?.data;
    console.log(orderDetails)

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen"><Loading /></div>;
    }
    if (isError) {
        return <div className="flex items-center justify-center h-screen">data not found</div>;
    }

    return (
        <div className=" ">
            <PageHeader title="Active Delivery" />

            <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
                    <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                        <div className="mb-6">
                            <div className="flex items-start gap-4">
                                <Car />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">Pickup Location</h3>
                                    <p className="text-gray-600 text-sm">{orderDetails?.pickup_location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <div className="flex items-start gap-4">
                                <House />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">Drop-off Location</h3>
                                    <p className="text-gray-600 text-sm">{orderDetails?.delivery_location}</p>
                                </div>
                            </div>
                        </div>
                        {/* Divider */}
                        <div className="h-px bg-gray-200 my-6" />
                        <div className="space-y-4">
                            
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Weight:</span>
                                <span className="font-semibold text-gray-800">{orderDetails?.product_weight} KG</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Distance:</span>
                                <span className="font-semibold text-gray-800">12 KM</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Delivery Fee:</span>
                                <span className="font-semibold text-gray-800">${orderDetails?.delivery_fee}</span>
                            </div>
                        </div>
                    </div>
                    {/* Right Section - Earnings */}
                    <div className="p-6 sm:p-8 flex flex-col items-center justify-center ">
                        <h2 className="text-xl sm:text-3xl font-medium text-gray-800 mb-8 text-center">
                            You Earn From This Trip
                        </h2>

                        <div className=" flex items-center justify-center mb-8">
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="text-5xl sm:text-6xl font-medium text-yellow-500">${orderDetails?.delivery_fee}</span>
                            </div>
                        </div>

                        <button onClick={() => router.push("/driver")} className="w-full sm:w-auto px-8 py-3  bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white font-medium rounded-lg transition-colors">
                            Take New Delivery
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ActiveDelivery (){
    return (
        <Suspense fallback={<div><Loading /></div>} >
            <ActiveDeliveryPage />
        </Suspense>
    )
}