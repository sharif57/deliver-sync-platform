/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { PhoneCall, MessageSquareMore, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/icon/loading";
import Arrow from "@/components/ui/icon/arrow";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/shareUi/onBack";
import { useCancelOrderMutation, useConfirmDeliveryMutation, useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice";
import { toast } from "sonner";
import { Suspense, useEffect } from "react";
import { useCreateRoomMutation } from "@/redux/feature/chartSlice";

function DriverConfirmationPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const id = searchParams.get('id');
  console.log(id, orderId, '======')

  const [cancelOrder] = useCancelOrderMutation();
  const [confirmDelivery] = useConfirmDeliveryMutation();
  const { data } = useGetCustomerOrderDetailsQuery(id || '', {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const orderDetails = data?.data;
  console.log(orderDetails)

  const [createRoom] = useCreateRoomMutation();



  const handleCreateRoom = async () => {
    try {
      const res = await createRoom({ user2: orderDetails?.assign_driver_details?.id }).unwrap();
      console.log("Room created successfully", res);
      toast.success(res?.message || "Room created successfully");
      router.push(`/message?id=${orderDetails.id}&room_id=${res?.room_id}`);
    } catch (error: any) {
      toast.error(error?.data?.error || "Failed to create room");
      console.error("Error creating room:", error);
    }
  }

  const handleCancelOrder = async () => {
    try {
      const res = await cancelOrder(id).unwrap();
      console.log('Order cancelled successfully', res);
      toast.success(res?.message || 'Order cancelled successfully');
      router.back();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to cancel order');
      console.error('Error cancelling order:', error);
    }
  };

  const handleConfirmDelivery = async () => {
    try {
      const res = await confirmDelivery(id).unwrap();
      console.log('Order confirmed successfully', res);
      toast.success(res?.message || 'Order confirmed successfully');
      // router.back();              
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to confirm order');
      console.error('Error confirming order:', error);
    }
  };

  useEffect(() => {
    if (orderDetails?.status === "delivered") {
      router.push("/customer");
    }
  }, [orderDetails?.status, router]);

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <>
      <title>Driver Confirmation</title>
      <div className="min-h-screen ">
        {/* Header */}


        <div className="px-4 py-3 sm:py-4 flex items-center  justify-between border-b border-gray-200">
          <PageHeader
            title={
              <>
                Request a Delivery <span className="text-[#EAAC24] font-semibold">#{orderId}</span>
              </>
            }
          />

          <button onClick={handleCancelOrder} className="text-gray-600 font-normal text-xs sm:text-xl hover:text-gray-800">
            Cancel Request
          </button>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 sm:py-8">
          <div className="container mx-auto ">
            <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 mb-6">
              <p className="text-6xl font-medium text-[#EAAC24] text-center">$ {orderDetails?.delivery_fee || 0}</p>
              <div className="lg:w-1/4 mx-auto mt-10">
                <button
                  onClick={handleConfirmDelivery}
                  className=" text-sm sm:text-base md:text-lg bg-primary text-white py-3 sm:py-  rounded-lg font-medium hover:bg-primary-dark transition-colors w-full"
                  disabled={data?.data?.status === 'confirmed'}
                >
                  Confirm
                </button>
              </div>
            </div>
            {
              data?.data?.status === 'confirmed' && (
                <> <div className="flex justify-center mb-6 mt-8">
                  <Arrow />
                </div>
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


                  </div>
                </>
              )
            }

            {/* Driver Accepted Section */}
            {
              data?.data?.status === 'assigned' && (
                <>
                  {/* Down Arrow */}
                  <div className="flex justify-center mb-4 sm:mb-6 mt-10">
                    <Arrow />
                  </div>
                  <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 mb-6">
                    <div className="text-center mb-4">
                      <p className="text-secondary text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6">
                        Driver{" "}
                        <span className="text-primary font-medium">{orderDetails?.assign_driver_details?.name}</span> accepted
                        your delivery request
                      </p>
                      <p className="text-secondary font-normal text-base sm:text-lg md:text-xl mt-1">
                        Arriving in {orderDetails?.estimated_time_minutes} minutes ({orderDetails?.distance_km} km)
                      </p>
                      <hr className="my-4 border-gray-200 border" />
                    </div>

                    {/* Driver Profile */}
                    <div className="text-center mb-4 sm:mb-6">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4  rounded-full flex items-center justify-center p-4">
                        <Image
                          src={IMAGE + orderDetails?.assign_driver_details?.image}
                          alt="Profile"
                          width={400}
                          height={400}
                          className="object-contain w-full h-full border rounded-full"
                          priority
                        />
                      </div>
                      <div>
                        <h3 className="text-secondary font-medium text-xl sm:text-2xl md:text-[28px] mb-1">

                        </h3>
                        <p className="text-secondary font-normal text-base sm:text-lg md:text-xl mb-2">
                          {orderDetails?.assign_driver_details?.vehicle}
                        </p>
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                          <span className="text-gray-800 font-medium text-lg sm:text-xl md:text-2xl">
                            {orderDetails?.assign_driver_details?.total_ratings || '0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:space-x-3 md:space-x-4 max-w-xs sm:max-w-md md:max-w-lg mx-auto space-y-3 sm:space-y-0 px-4 sm:px-0">
                      <Button
                        onClick={() => window.location.href = `tel:${orderDetails?.assign_driver_details?.phone_number}`}
                        className="flex-1 text-sm sm:text-base md:text-lg bg-primary text-white py-3 sm:py-6 rounded-lg font-medium hover:bg-primary-dark transition-colors w-full"
                      >
                        <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
                        Call Now
                      </Button>
                      {/* <Link href="/customer/message" className="flex-1"> */}
                      <Button
                        onClick={handleCreateRoom}
                        variant="outline"
                        className="flex-1 border-2 border-gray-300 text-secondary text-sm sm:text-base md:text-lg py-3 sm:py-6 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 bg-transparent transition-colors w-full"
                      >
                        <MessageSquareMore className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
                        Message Now
                      </Button>
                      {/* </Link> */}
                    </div>
                  </div>
                </>
              )
            }
          </div>


        </div>


      </div>
    </>
  );
}

export default function Pages() {
  return <Suspense fallback={<Loading />}><DriverConfirmationPage /></Suspense>;
}