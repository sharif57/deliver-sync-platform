// import { ArrowLeft } from "lucide-react"
// import Link from "next/link"
// import OrderDetailsCard from "@/components/order-details-card"

// export default function OrderDetailsPage() {
//   const handleCancel = () => {
//     console.log("Order cancelled")
//     // Add cancel logic here
//   }

//   const handleRequestAgain = () => {
//     console.log("Request again clicked")
//     // Add request again logic here
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center gap-4">
//               <Link href="/history" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </Link>
//               <h1 className="text-lg font-semibold text-gray-800">Order Details</h1>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="py-8 px-4 sm:px-6 lg:px-8">
//         <OrderDetailsCard onCancel={handleCancel} onRequestAgain={handleRequestAgain} />
//       </div>
//     </div>
//   )
// }
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Building2, Tag, DollarSign, MapPin, Home, Star, PhoneCall, MessageSquareMore, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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

export default function OrderDetailsCard({
    orderId = "#12345",
    companyName = "TruckParts BD",
    productDescription = "Engine Oil",
    productAmount = "$1250",
    pickupLocation = "Gulshan-1",
    deliveryLocation = "Badda -1",
}: OrderDetailsCardProps) {
    const router = useRouter()
    return (
        <div>
            <title>Delivered Order</title>
            <div className="px- py-3 sm:py-4 flex items-center justify-between ">
                           <div className="flex items-center space-x-2 sm:space-x-3">
                               <div onClick={() => router.back()} className="p-1 cursor-pointer">
                                   <ArrowLeft className="h-5 w-5 text-gray-600" />
                               </div>
                               <div className="flex items-center space-x-2">
                                   <span className="text-secondary font-medium text-sm sm:text-base md:text-lg">
                                       Delivery History
                                   </span>
                               </div>
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
                                    <span className="text-gray-800">{productDescription}</span>
                                    <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                                </div>
                            </div>

                            {/* Pickup Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
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
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <Building2 className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{companyName}</span>
                                </div>
                            </div>

                            {/* Product Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Amount</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <DollarSign className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{productAmount}</span>
                                    <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                                </div>
                            </div>

                            {/* Delivery Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
                                <div className="flex items-center gap-3 p-3 bg-featuresBg rounded-lg">
                                    <Home className="w-5 h-5 text-gray-600" />
                                    <span className="text-gray-800">{deliveryLocation}</span>
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
                        <div className="flex flex-col sm:flex-row sm:space-x-3 md:space-x-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto space-y-3 sm:space-y-0 px-4 sm:px-0">
                            <Button
                                variant="outline"
                                className="flex-1 border-2 border-gray-300 text-secondary text-sm sm:text-base md:text-lg py- sm:py-6 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 bg-transparent transition-colors"
                            >
                                Cancel
                            </Button>
                            <Link href="/customer/driver-confirmation" className="flex-1">
                                <Button
                                    className="flex-1 text-sm sm:text-base md:text-lg bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white py-3 sm:py-6 rounded-lg font-medium hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors w-full"
                                >
                                    Request Again   
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
