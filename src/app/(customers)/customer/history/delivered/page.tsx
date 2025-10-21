
"use client"
import PageHeader from "@/components/shareUi/onBack"
import { Card, CardContent } from "@/components/ui/card"
import { useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice"
import { FileText, Building2, Tag, DollarSign, MapPin, Home, Star } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"



export default function OrderDetailsCard() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id") || "";
    console.log(orderId, 'order id=============>');
    const {data} = useGetCustomerOrderDetailsQuery(orderId);
    console.log(data, '>>>>>>>>>>>>>>>>>>')
    const orderDetails = data?.data;
    const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;
    return (
        <div>
            <title>Delivered Order</title>
            <div className="px- py-3 sm:py-4 flex items-center justify-between ">

                <PageHeader title="Delivery History" />

            </div>
            <Card className="w-full container mx-auto bg-white shadow-lg">
                <CardContent className="p-6">
                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Order ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800 font-medium">{orderId}</span>
                                </div>
                            </div>

                            {/* Product Short Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Short Description</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <Tag className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{orderDetails?.description}</span>
                                    <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                                </div>
                            </div>

                            {/* Pickup Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <MapPin className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{orderDetails?.pickup_location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <Building2 className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{orderDetails?.company_name}</span>
                                </div>
                            </div>

                            {/* Product Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Amount</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <DollarSign className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{orderDetails?.product_amount}</span>
                                    <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                                </div>
                            </div>

                            {/* Delivery Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <Home className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{orderDetails?.delivery_location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Driver Section */}
                    <div className="  p-4 sm:p-6 mb-6">
                        <hr className="my-4 border-gray-200 border" />

                        {/* Driver Profile */}
                        <div className="text-center mb-4 sm:mb-6">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4  rounded-full flex items-center justify-center p-4">
                                {orderDetails?.assign_driver_details?.image &&    <Image
                                    src={`${IMAGE}${orderDetails?.assign_driver_details?.image}` || ''}
                                    alt="Profile"
                                    width={400}
                                    height={400}
                                    className="object-contain w-full h-full border rounded-full"
                                    priority
                                />}
                            </div>
                            <div>
                                <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl mb-1">
                                    {orderDetails?.assign_driver_details?.name}
                                </h3>
                                <p className="text-secondary font-normal text-sm sm:text-base md:text-lg mb-2">
                                    {orderDetails?.assign_driver_details?.vehicle}
                                </p>
                                <div className="flex items-center justify-center space-x-1">
                                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                                    <span className="text-gray-800 font-medium text-base sm:text-lg md:text-xl">
                                        {orderDetails?.assign_driver_details?.average_rating || '0'} ({orderDetails?.assign_driver_details?.total_ratings} Reviews)
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
