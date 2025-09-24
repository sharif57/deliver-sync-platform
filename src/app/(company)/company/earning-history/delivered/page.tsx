
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Back from "@/components/ui/icon/back"
import Form from "@/components/ui/icon/form"
import To from "@/components/ui/icon/to"
import { FileText, Building2, Tag, DollarSign, MapPin, Home, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface OrderDetailsCardProps {
    orderId?: string
    companyName?: string
    productDescription?: string
    productAmount?: string
    pickupLocation?: string
    deliveryLocation?: string
    driverName?: string
    driverRating?: number
    driverImage?: string
    onCancel?: () => void
    onRequestAgain?: () => void
}

export default function DetailsCard({
    orderId = "#12345",
    companyName = "TruckParts BD",
    productDescription = "Engine Oil",
    productAmount = "$1250",
    pickupLocation = "Gulshan-1",
    deliveryLocation = "Badda -1",
}: OrderDetailsCardProps) {
    const router = useRouter()

    const handmessage = () => {
        router.push('/customer/message')
    }

    return (
        <div>
            <title>Delivered Order</title>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div onClick={() => router.back()} className="flex cursor-pointer items-center gap-3">
                    <Back />
                    <h1 className="text-2xl font-medium text-gray-700 ">Delivery History</h1>
                </div>
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
                                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800 font-medium">{orderId}</span>
                                </div>
                            </div>

                            {/* Product Short Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Short Description</label>
                                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                                    <Tag className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{productDescription}</span>
                                    <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                                </div>
                            </div>

                            {/* Pickup Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                                    <MapPin className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{pickupLocation}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                                    <Building2 className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{companyName}</span>
                                </div>
                            </div>

                            {/* Product Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Amount</label>
                                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                                    <DollarSign className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{productAmount}</span>
                                    <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                                </div>
                            </div>

                            {/* Delivery Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
                                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                                    <Home className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{deliveryLocation}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Driver Section */}
                    <div className="  p-4 sm:p-6 mb-6">
                        <hr className="my-4 border-gray-200 border" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                {/* Driver Profile */}
                                <div className="text-center mb-4 sm:mb-6">
                                    <h1 className="text-3xl font-medium text-secondary mb-2">Driver</h1>
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

                                        <div className="flex flex-col items-center justify-center space-x-1 gap-4">
                                            <div className="flex items-center gap-2">
                                                <p className="text-secondary font-normal text-sm sm:text-base md:text-2xl ">
                                                    Abdur Rahim
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_182_2680)">
                                                            <path d="M24.4374 8.73712C24.3607 8.49929 24.2156 8.28931 24.0204 8.13334C23.8251 7.97738 23.5882 7.88234 23.3393 7.86007L16.4123 7.23103L13.6731 0.819778C13.4711 0.349937 13.0112 0.0458984 12.5001 0.0458984C11.9891 0.0458984 11.5291 0.349984 11.3271 0.820949L8.58796 7.23108L1.6598 7.86007C1.41118 7.88284 1.1747 7.97808 0.979701 8.13399C0.784698 8.2899 0.639741 8.4996 0.562803 8.73712C0.404784 9.22313 0.550709 9.75616 0.935797 10.0922L6.17187 14.6842L4.62786 21.4854C4.51489 21.9855 4.70896 22.5025 5.1239 22.8024C5.34689 22.9635 5.60785 23.0456 5.87097 23.0456C6.09785 23.0456 6.32286 22.9844 6.52489 22.8635L12.5001 19.2923L18.4732 22.8635C18.9102 23.1265 19.4612 23.1025 19.8752 22.8024C20.0779 22.6557 20.233 22.4526 20.3212 22.2185C20.4094 21.9843 20.4268 21.7294 20.3713 21.4854L18.8273 14.6842L24.0633 10.0931C24.2517 9.9286 24.3876 9.71238 24.4541 9.4713C24.5206 9.23023 24.5148 8.97493 24.4374 8.73712Z" fill="#FFC107" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_182_2680">
                                                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                    <span className="text-gray-800 font-medium text-sm sm:text-base md:text-2xl ">4.9</span>
                                                </div>
                                            </div>
                                            <p className="">Toyota</p>
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
                                        onClick={() => window.location.href = "tel:123456789"}
                                        className="flex-1 text-sm sm:text-base md:text-lg bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white py-3 sm:py-6 rounded-lg font-medium hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
                                    >
                                        Call Now
                                    </Button>
                                </div>
                            </div>
                            <div>
                                {/* Driver Profile */}
                                <div className="text-center mb-4 sm:mb-6">
                                    <h1 className="text-3xl font-medium text-secondary mb-2">Customer</h1>
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

                                        <div className="flex flex-col items-center justify-center space-x-1 gap-4">
                                            <div className="flex items-center gap-2">
                                                <p className="text-secondary font-normal text-sm sm:text-base md:text-2xl ">
                                                    Abdur Rahim
                                                </p>
                                              
                                            </div>
                                            <p className="">Toyota</p>
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
                                        onClick={() => window.location.href = "tel:123456789"}
                                        className="flex-1 text-sm sm:text-base md:text-lg bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white py-3 sm:py-6 rounded-lg font-medium hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
                                    >
                                        Call Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
