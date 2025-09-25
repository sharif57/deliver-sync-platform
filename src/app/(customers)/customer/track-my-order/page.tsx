
"use client";

import { Button } from "@/components/ui/button";
import Location from "@/components/ui/icon/location";
import Ok from "@/components/ui/icon/ok";
import PickUp from "@/components/ui/icon/pickUp";
import Take from "@/components/ui/icon/take";
import { ArrowLeft, MessageSquareMore, PhoneCall, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function TrackMyOrder() {
    const router = useRouter();

    return (
        <div className="min-h-screen ">
            <title>Track My Order</title>
            {/* Header */}
            <div className="px-4 py-3 sm:py-4 flex items-center justify-between ">
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <div onClick={() => router.back()} className="p-1 cursor-pointer">
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-secondary font-medium text-sm sm:text-base md:text-lg">
                            Track Order
                        </span>
                    </div>
                </div>
                <button className="text-gray-600 font-normal text-xs sm:text-sm md:text-base hover:text-gray-800">
                    Cancel Request
                </button>
            </div>

            {/* Order ID Header */}
            <div className="mt-4 sm:mt-6 text-center">
                <div className="flex items-center justify-center space-x-2">
                    <span className="text-primary font-medium text-base sm:text-xl md:text-2xl lg:text-3xl">
                        Track My Order
                    </span>
                    <span className="text-secondary font-medium text-base sm:text-xl md:text-2xl lg:text-3xl">
                        ID: #12345
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto  px4 sm:px-6 mt-4 sm:mt-6">
                <div className="bg-white w-full rounded-t-3xl  shadow-sm overflow-hidden">
                    {/* Google Maps Iframe */}
                    <div className="w-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35939.61671883658!2d90.406912!3d23.78270515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1758608180620!5m2!1sen!2sbd"
                            style={{ border: 0, width: "100%", height: "400px", maxHeight: "50vh" }}
                            className="sm:h-[250px] md:h-[300px]"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    {/* Progress Timeline */}
                    <div className="space-y-2 p-4 sm:p-6 md:p-8">
                        <h2 className="text-primary text-xl sm:text-2xl md:text-3xl font-medium text-center mb-4 sm:mb-6">
                            Order in Progress
                        </h2>

                        {/* Order Placed */}
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0 w-8 sm:w-10">
                                <div className="rounded-full flex items-center justify-center">
                                    <Ok />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
                                    Order Placed
                                </h3>
                                <p className="text-secondary text-sm sm:text-base md:text-lg font-normal">
                                    Your order has been confirmed
                                </p>
                            </div>
                        </div>

                        {/* Connecting Line */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-8 sm:w-10 flex justify-center">
                                <div className="border-t h-8 sm:h-10 md:h-12 ml border-primary border border-dashed"></div>
                            </div>
                        </div>

                        {/* Picked Up */}
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0 w-8 sm:w-10">
                                <div className="rounded-full flex items-center justify-center">
                                    <PickUp />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
                                    Picked Up
                                </h3>
                                <p className="text-secondary text-sm sm:text-base md:text-lg font-normal">
                                    Your order is on its way
                                </p>
                            </div>
                        </div>

                        {/* Connecting Line */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-8 sm:w-10 flex justify-center">
                                <div className="border-t h-8 sm:h-10 md:h-12 ml- border-secondary border border-dashed"></div>
                            </div>
                        </div>

                        {/* On the Way */}
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0 w-8 sm:w-10">
                                <div className="rounded-full flex items-center justify-center">
                                    <Location />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
                                    On the Way
                                </h3>
                                <p className="text-secondary text-sm sm:text-base md:text-lg font-normal">
                                    The driver is heading to you
                                </p>
                            </div>
                        </div>

                        {/* Connecting Line */}
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-8 sm:w-10 flex justify-center">
                                <div className="border-t h-8 sm:h-10 md:h-12  border-secondary border border-dashed"></div>
                            </div>
                        </div>

                        {/* Delivered */}
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0 w-8 sm:w-10">
                                <div className="rounded-full flex items-center justify-center">
                                    <Take />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
                                    Delivered
                                </h3>
                                <p className="text-secondary text-sm sm:test-base md:text-lg font-normal">
                                    Take your parts
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Driver Profile Section */}
                    <div className="  p-4 sm:p-6 mb-6">
                        <hr className="my-4 border-gray-200 border" />

                        {/* Driver Profile */}
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 bg-[#C3DEBC] rounded-full flex items-center justify-center p-4">
                                <Image
                                    src="/images/car.png"
                                    alt="Profile"
                                    width={400}
                                    height={400}
                                    className="object-contain w-full h-full"
                                    priority
                                />
                            </div>
                            <div>
                                <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl mb-1">
                                    Abdur Rahim
                                </h3>
                                <p className="text-secondary font-normal text-sm sm:text-base md:text-lg mb-2">
                                    Toyota
                                </p>
                                <div className="flex items-center justify-center space-x-1">
                                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                                    <span className="text-gray-800 font-medium text-base sm:text-lg md:text-xl">
                                        4.9
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-8 max-w-xl mx-auto space-y-4 sm:space-y-0">
                            <Button onClick={() => window.location.href = "tel:123456789"} className="flex-1 flex items-center justify-center text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white min-h-[56px] sm:min-h-[60px] rounded-lg font-medium">
                                <PhoneCall className="size-[22px] mr-2" />
                                Call Now
                            </Button>

                            <Link href="/customer/message" className="flex-1">
                                <Button
                                    variant="outline"
                                    className="flex items-center justify-center w-full border-gray-300 text-secondary text-base sm:text-lg md:text-xl min-h-[56px] sm:min-h-[60px] rounded-lg font-medium hover:bg-gray-50 bg-transparent"
                                >
                                    <MessageSquareMore className="size-[22px] mr-2" />
                                    Message Now
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}