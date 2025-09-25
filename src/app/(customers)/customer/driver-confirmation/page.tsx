// "use client"

// import { ArrowLeft, Phone, MessageCircle, Star, Send, MessageSquareMore, PhoneCall } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import Loading from "@/components/ui/icon/loading"
// import Arrow from "@/components/ui/icon/arrow"
// import Image from "next/image"

// export default function DriverConfirmationPage() {
//     return (
//         <>
//             <title>Driver Confirmation</title>
//             <div className="min-h-screen ">
//                 {/* Header */}
//                 <div className=" px-4 py-4 flex items-center justify-between border-b border-gray-200">
//                     <div className="flex items-center space-x-3">
//                         <Link href="/delivery-request" className="p-1">
//                             <ArrowLeft className="h-5 w-5 text-gray-600" />
//                         </Link>
//                         <div className="flex items-center space-x-2">
//                             <span className="text-gray-800 font-medium">Request a Delivery</span>
//                             <span className="text-green-600 font-semibold">#12345</span>
//                         </div>
//                     </div>
//                     <button className="text-gray-600 text-sm hover:text-gray-800">Cancel Request</button>
//                 </div>

//                 {/* Main Content */}
//                 <div className="px-4 py-8">
//                     <div className="container mx-auto">
//                         {/* Finding Driver Section */}
//                         <div className="text-center mb-8">
//                             <div className="bg-white flex flex-col items-center justify-center rounded-3xl shadow-sm p-6 mb-6">
//                                 <div className=" mb-6">
//                                     <Loading />
//                                 </div>

//                                 <p className="text-secondary text-4xl font-medium mb-6">
//                                     We're <span className="text-primary font-medium">finding</span> a driver for you...
//                                 </p>
//                             </div>

//                             {/* Down Arrow */}
//                             <div className="flex justify-center mb-6">
//                                 <Arrow />
//                             </div>
//                         </div>

//                         {/* Driver Accepted Section */}
//                         <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
//                             <div className="text-center mb-4">
//                                 <p className="text-secondary text-4xl font-medium mb-6">
//                                     Driver <span className="text-primary font-medium">Rahim</span> accept your delivery request
//                                 </p>
//                                 <p className="text-secondary font-normal text-xl mt-1">Arriving in 10 minutes (2.3 Miles)</p>
//                                 <hr className="my-4 border-gray-200 border" />
//                             </div>

//                             {/* Driver Profile */}
//                             <div className="text-center mb-6 ">
//                                 <div className="size-[200px] mx-auto mb-4 bg-[#C3DEBC] rounded-full flex items-center justify-center p-4">
//                                     <Image src="/images/car.png" alt="Profile" width={400} height={400} />
//                                 </div>
//                                 <div className="">
//                                     <h3 className="text-secondary font-medium text-[28px] mb-1">Abdur Rahim</h3>
//                                     <p className="text-secondary font-normal text-xl mb-2">Toyota</p>

//                                     <div className="flex items-center justify-center space-x-1">
//                                         <Star className="size-6 text-yellow-400 fill-current" />
//                                         <span className="text-gray-800 font-medium text-2xl ">4.9</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="lg:flex w-full space-x-8 max-w-2xl mx-auto">
//                                 <Button className="flex-1 text-xl bg-primary text-white py-6 rounded-lg font-medium">
//                                     <PhoneCall className="size-[22px] mr-2" />
//                                     Call Now
//                                 </Button>
//                                 <Button
//                                     variant="outline"
//                                     className="flex-1 border-gray-300 text-secondary text-xl py-6 rounded-lg font-medium hover:bg-gray-50 bg-transparent"
//                                 >
//                                     <MessageSquareMore className="size-[22px] mr-2" />
//                                     Message Now
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>


//                 </div>
//             </div>
//         </>
//     )
// }
"use client";

import { ArrowLeft, PhoneCall, MessageSquareMore, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/icon/loading";
import Arrow from "@/components/ui/icon/arrow";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DriverConfirmationPage() {
  const router = useRouter();
  return (
    <>
      <title>Driver Confirmation</title>
      <div className="min-h-screen ">
        {/* Header */}
        <div className="px-4 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div onClick={() => router.back()} className="p-1 cursor-pointer">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-secondary font-medium text-sm sm:text-2xl">
                Request a Delivery
              </span>
              <span className="text-primary font-semibold text-sm sm:text-base">
                #12345
              </span>
            </div>
          </div>
          <button className="text-gray-600 font-normal text-xs sm:text-2xl hover:text-gray-800">
            Cancel Request
          </button>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 sm:py-8">
          <div className="container mx-auto ">
            {/* Finding Driver Section */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="bg-white flex flex-col items-center justify-center rounded-3xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="mb-4 sm:mb-6 ">
                  <Loading />
                </div>
                <p className="text-secondary text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6">
                  We&lsquo;re{" "}
                  <span className="text-primary font-medium">finding</span> a
                  driver for you...
                </p>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center mb-4 sm:mb-6 mt-10">
                <Arrow />
              </div>
            </div>

            {/* Driver Accepted Section */}
            <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-secondary text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6">
                  Driver{" "}
                  <span className="text-primary font-medium">Rahim</span> accepted
                  your delivery request
                </p>
                <p className="text-secondary font-normal text-base sm:text-lg md:text-xl mt-1">
                  Arriving in 10 minutes (2.3 Miles)
                </p>
                <hr className="my-4 border-gray-200 border" />
              </div>

              {/* Driver Profile */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 bg-[#C3DEBC] rounded-full flex items-center justify-center p-4">
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
                  <h3 className="text-secondary font-medium text-xl sm:text-2xl md:text-[28px] mb-1">
                    Abdur Rahim
                  </h3>
                  <p className="text-secondary font-normal text-base sm:text-lg md:text-xl mb-2">
                    Toyota
                  </p>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                    <span className="text-gray-800 font-medium text-lg sm:text-xl md:text-2xl">
                      4.9
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:space-x-3 md:space-x-4 max-w-xs sm:max-w-md md:max-w-lg mx-auto space-y-3 sm:space-y-0 px-4 sm:px-0">
                <Button
                  onClick={() => window.location.href = "tel:1234567890"}
                  className="flex-1 text-sm sm:text-base md:text-lg bg-primary text-white py-3 sm:py-6 rounded-lg font-medium hover:bg-primary-dark transition-colors w-full"
                >
                  <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
                  Call Now
                </Button>
                <Link href="/customer/message" className="flex-1">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 text-secondary text-sm sm:text-base md:text-lg py-3 sm:py-6 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 bg-transparent transition-colors w-full"
                  >
                    <MessageSquareMore className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
                    Message Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}