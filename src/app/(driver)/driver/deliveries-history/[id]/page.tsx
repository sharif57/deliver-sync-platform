
"use client"
import PageHeader from "@/components/shareUi/onBack"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Form from "@/components/ui/icon/form"
import Loading from "@/components/ui/icon/loading"
import To from "@/components/ui/icon/to"
import { useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice"
import { FileText, Building2, Tag, DollarSign, MapPin, Home } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"



export default function OrderDetailsCard() {

    const params = useParams();
    const { id } = params;
    console.log("Order ID from URL:", id);
    const router = useRouter()

    const { data, isLoading } = useGetCustomerOrderDetailsQuery(id as string)
    console.log("Order Details Data:", data);
    const orderDetails = data?.data;

    const handmessage = () => {
        router.push(`/customer/message?id=${orderDetails?.customer_details?.id}`)
    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen"><Loading /></div>;
    }

    const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

    return (
        <div>
            <title>Delivered Order</title>

            <PageHeader title="Delivered History" />

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
                                    <span className="text-gray-800 font-medium">{orderDetails?.order_id}</span>
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Customer || Company Name</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <Building2 className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{orderDetails?.customer_details?.name}</span>
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
                            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 bg-[#C3DEBC] rounded-full flex items-center justify-center p-4">
                                {orderDetails?.customer_details?.image && (
                                    <Image
                                        src={`${IMAGE}${orderDetails?.customer_details?.image}`}
                                        alt="Profile"
                                        width={400}
                                        height={400}
                                        className="object-contain w-full h-full"
                                        priority
                                    />
                                )}
                            </div>
                            <div>

                                <div className="flex items-center justify-center space-x-1 gap-6">
                                    <div className="flex items-center gap-2">
                                        <To />
                                        <p className="text-secondary font-normal text-sm sm:text-base md:text-lg ">
                                            {orderDetails?.pickup_location}
                                        </p>
                                    </div>
                                    <p className="">to</p>
                                    <div className="flex items-center justify-center space-x-1">
                                        <div className="flex items-center gap-2">
                                            <Form />
                                            <p className="text-secondary font-normal text-sm sm:text-base md:text-lg ">
                                                {orderDetails?.delivery_location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row sm:space-x-3 md:space-x-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto space-y-3 sm:space-y-0 px-4 sm:px-0">
                            <Button
                                onClick={handmessage}
                                variant="outline"
                                className="flex-1 border-2 border-gray-300 text-secondary text-sm sm:text-base md:text-lg py-3 sm:py-6 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 bg-transparent transition-colors"
                            >
                                Message Now
                            </Button>
                            <Button
                                onClick={() => window.location.href = `tel:${orderDetails?.customer_details?.phone_number}`}
                                className="flex-1 text-sm sm:text-base md:text-lg bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white py-3 sm:py-6 rounded-lg font-medium hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
                            >
                                Call Now
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
