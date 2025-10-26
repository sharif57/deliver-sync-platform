/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import PageHeader from "@/components/shareUi/onBack";
// import { Button } from "@/components/ui/button";
// import Location from "@/components/ui/icon/location";
// import Ok from "@/components/ui/icon/ok";
// import PickUp from "@/components/ui/icon/pickUp";
// import Take from "@/components/ui/icon/take";
// import { useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice";
// import { MessageSquareMore, PhoneCall, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import React from "react";

// export default function TrackMyOrder() {

//     const searchParams = useSearchParams();
//     const orderId = searchParams.get("id") || "";
//     console.log(orderId, 'order id=============>');
//     const { data } = useGetCustomerOrderDetailsQuery(orderId);
//     console.log(data, '>>>>>>>>>>>>>>>>>>tarck my order')
//     const orderDetails = data?.data;

//     return (
//         <div className="min-h-screen ">
//             <title>Track My Order</title>
//             {/* Header */}
//             <div className="px-4 py-3 sm:py-4 flex items-center justify-between ">

//                 <PageHeader title="Track Order" />
//                 <button className="text-gray-600 font-normal text-xs sm:text-sm md:text-base hover:text-gray-800">
//                     Cancel Request
//                 </button>
//             </div>

//             {/* Order ID Header */}
//             <div className="mt-4 sm:mt-6 text-center">
//                 <div className="flex items-center justify-center space-x-2">
//                     <span className="text-primary font-medium text-base sm:text-xl md:text-2xl lg:text-3xl">
//                         Track My Order
//                     </span>
//                     <span className="text-secondary font-medium text-base sm:text-xl md:text-2xl lg:text-3xl">
//                         ID: #{orderDetails?.order_id}
//                     </span>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="container mx-auto  px4 sm:px-6 mt-4 sm:mt-6">
//                 <div className="bg-white w-full rounded-t-3xl  shadow-sm overflow-hidden">
//                     {/* Google Maps Iframe */}
//                     <div className="w-full">
// <iframe
//     src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35939.61671883658!2d90.406912!3d23.78270515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1758608180620!5m2!1sen!2sbd"
//     style={{ border: 0, width: "100%", height: "400px", maxHeight: "50vh" }}
//     className="sm:h-[250px] md:h-[300px]"
//     allowFullScreen
//     loading="lazy"
//     referrerPolicy="no-referrer-when-downgrade"
// ></iframe>
//                     </div>

//                     {/* Progress Timeline */}
//                     <div className="space-y-2 p-4 sm:p-6 md:p-8">
//                         <h2 className="text-primary text-xl sm:text-2xl md:text-3xl font-medium text-center mb-4 sm:mb-6">
//                             Order in Progress
//                         </h2>

//                         {/* Order Placed */}
//                         <div className="flex items-start space-x-3 sm:space-x-4">
//                             <div className="flex-shrink-0 w-8 sm:w-10">
//                                 <div className="rounded-full flex items-center justify-center">
//                                     <Ok />
//                                 </div>
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
//                                     Order Placed
//                                 </h3>
//                                 <p className="text-secondary text-sm sm:text-base md:text-lg font-normal">
//                                     Your order has been confirmed
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Connecting Line */}
//                         <div className="flex items-center space-x-3 sm:space-x-4">
//                             <div className="w-8 sm:w-10 flex justify-center">
//                                 <div className="border-t h-8 sm:h-10 md:h-12 ml border-primary border border-dashed"></div>
//                             </div>
//                         </div>

//                         {/* Picked Up */}
//                         <div className="flex items-start space-x-3 sm:space-x-4">
//                             <div className="flex-shrink-0 w-8 sm:w-10">
//                                 <div className="rounded-full flex items-center justify-center">
//                                     <PickUp />
//                                 </div>
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
//                                     Picked Up
//                                 </h3>
//                                 <p className="text-secondary text-sm sm:text-base md:text-lg font-normal">
//                                     Your order is on its way
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Connecting Line */}
//                         <div className="flex items-center space-x-3 sm:space-x-4">
//                             <div className="w-8 sm:w-10 flex justify-center">
//                                 <div className="border-t h-8 sm:h-10 md:h-12 ml- border-secondary border border-dashed"></div>
//                             </div>
//                         </div>

//                         {/* On the Way */}
//                         <div className="flex items-start space-x-3 sm:space-x-4">
//                             <div className="flex-shrink-0 w-8 sm:w-10">
//                                 <div className="rounded-full flex items-center justify-center">
//                                     <Location />
//                                 </div>
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
//                                     On the Way
//                                 </h3>
//                                 <p className="text-secondary text-sm sm:text-base md:text-lg font-normal">
//                                     The driver is heading to you
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Connecting Line */}
//                         <div className="flex items-center space-x-3 sm:space-x-4">
//                             <div className="w-8 sm:w-10 flex justify-center">
//                                 <div className="border-t h-8 sm:h-10 md:h-12  border-secondary border border-dashed"></div>
//                             </div>
//                         </div>

//                         {/* Delivered */}
//                         <div className="flex items-start space-x-3 sm:space-x-4">
//                             <div className="flex-shrink-0 w-8 sm:w-10">
//                                 <div className="rounded-full flex items-center justify-center">
//                                     <Take />
//                                 </div>
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl">
//                                     Delivered
//                                 </h3>
//                                 <p className="text-secondary text-sm sm:test-base md:text-lg font-normal">
//                                     Take your parts
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Driver Profile Section */}
//                     <div className="  p-4 sm:p-6 mb-6">
//                         <hr className="my-4 border-gray-200 border" />

//                         {/* Driver Profile */}
//                         <div className="text-center mb-4 sm:mb-6">
//                             <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 bg-[#C3DEBC] rounded-full flex items-center justify-center p-4">
//                                 <Image
//                                     src="/images/car.png"
//                                     alt="Profile"
//                                     width={400}
//                                     height={400}
//                                     className="object-contain w-full h-full"
//                                     priority
//                                 />
//                             </div>
//                             <div>
//                                 <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl mb-1">
//                                     Abdur Rahim
//                                 </h3>
//                                 <p className="text-secondary font-normal text-sm sm:text-base md:text-lg mb-2">
//                                     Toyota
//                                 </p>
//                                 <div className="flex items-center justify-center space-x-1">
//                                     <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
//                                     <span className="text-gray-800 font-medium text-base sm:text-lg md:text-xl">
//                                         4.9
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-8 max-w-xl mx-auto space-y-4 sm:space-y-0">
//                             <Button onClick={() => window.location.href = "tel:123456789"} className="flex-1 flex items-center justify-center text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white min-h-[56px] sm:min-h-[60px] rounded-lg font-medium">
//                                 <PhoneCall className="size-[22px] mr-2" />
//                                 Call Now
//                             </Button>

//                             <Link href="/customer/message" className="flex-1">
//                                 <Button
//                                     variant="outline"
//                                     className="flex items-center justify-center w-full border-gray-300 text-secondary text-base sm:text-lg md:text-xl min-h-[56px] sm:min-h-[60px] rounded-lg font-medium hover:bg-gray-50 bg-transparent"
//                                 >
//                                     <MessageSquareMore className="size-[22px] mr-2" />
//                                     Message Now
//                                 </Button>
//                             </Link>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { Suspense, useState } from "react";
import { MessageSquareMore, PhoneCall, Star } from "lucide-react";
import PageHeader from "@/components/shareUi/onBack";
import { Button } from "@/components/ui/button";
import Location from "@/components/ui/icon/location";
import Ok from "@/components/ui/icon/ok";
import PickUp from "@/components/ui/icon/pickUp";
import Take from "@/components/ui/icon/take";
import { useCancelOrderMutation, useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Oks from "@/components/ui/icon/oks";
import PickUps from "@/components/ui/icon/pickups";
import Locations from "@/components/ui/icon/locations";
import Takes from "@/components/ui/icon/takes";
import { useCreateRoomMutation } from "@/redux/feature/chartSlice";

import GoogleMapReact from "google-map-react";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? "";

// Enhanced Marker Component for Google Map
interface MarkerProps {
    lat: number;
    lng: number;
    text: string;
    type: "pickup" | "delivery";
}

const Marker = ({ text, type }: MarkerProps) => (
    <div className={`flex flex-col items-center ${type === "pickup" ? "text-blue-600" : "text-green-600"}`}>
        <div className={`relative ${type === "pickup" ? "text-blue-500" : "text-green-500"}`}>
            {/* Custom SVG markers */}
            {type === "pickup" ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
            ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
            )}
        </div>
        <div className={`mt-1 px-2 py-1 rounded-full text-xs font-bold text-white ${type === "pickup" ? "bg-blue-500" : "bg-green-500"
            }`}>
            {text}
        </div>
    </div>
);

// Route Info Component
const RouteInfo = ({ distance, duration }: { distance?: string; duration?: string }) => (
    <div className="absolute top-[300px] bg-white p-3 rounded-lg shadow-lg z-10 border">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">Pickup Location</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Delivery Location</span>
        </div>
        {distance && duration && (
            <div className="mt-2 pt-2 border-t">
                <div className="flex justify-between text-xs">
                    <span>Distance:</span>
                    <span className="font-medium">{distance}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span>Estimated Time:</span>
                    <span className="font-medium">{duration}</span>
                </div>
            </div>
        )}
    </div>
);

function TrackMyOrder() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id") || "";
    console.log(orderId, "order id=============>");
    const { data, isLoading, isError, refetch } = useGetCustomerOrderDetailsQuery(orderId);
    console.log(data, ">>>>>>>>>>>>>>>>>>track my order");
    const orderDetails = data?.data;

    const router = useRouter();
    const [isCancelling, setIsCancelling] = useState(false);
    const [cancelOrder] = useCancelOrderMutation();

    const [createRoom] = useCreateRoomMutation();

    const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [mapsInstance, setMapsInstance] = useState<any>(null);

    // Map API statuses to timeline steps
    const getTimelineStatus = (status: string) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return ["Order Placed", "Picked Up", "On the Way", "Delivered"];
            case "on_the_way":
                return ["Order Placed", "Picked Up", "On the Way"];
            case "picked_up":
            case "assigned":
            case "confirmed":
                return ["Order Placed", "Picked Up"];
            case "pending":
                return ["Order Placed"];
            case "cancelled":
            default:
                return [];
        }
    };

    const timelineSteps = getTimelineStatus(orderDetails?.status);

    // Cancel order API call
    const handleCancelOrder = async () => {
        if (["confirmed", "delivered", "cancelled"].includes(orderDetails?.status.toLowerCase())) return;
        setIsCancelling(true);
        try {
            const res = await cancelOrder(orderId).unwrap();
            console.log("Order cancelled successfully", res);
            toast.success(res?.message || "Order cancelled successfully");
            router.back();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to cancel order");
            console.error("Error cancelling order:", error);
        } finally {
            setIsCancelling(false);
        }
    };

    const handleCreateRoom = async (id: any) => {
        try {
            const res = await createRoom({ user2: orderDetails?.assign_driver }).unwrap();
            console.log("Room created successfully", res);
            toast.success(res?.message || "Room created successfully");
            router.push(`/message?id=${orderDetails.id}&room_id=${res?.room_id}`);
        } catch (error: any) {
            toast.error(error?.data?.error || "Failed to create room");
            console.error("Error creating room:", error);
        }
    }


    const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
        setMapInstance(map);
        setMapsInstance(maps);

        // Adjust map to fit both pickup and delivery locations
        if (
            orderDetails?.pickup_location_lat &&
            orderDetails?.pickup_location_long &&
            orderDetails?.delivery_location_lat &&
            orderDetails?.delivery_location_long
        ) {
            const bounds = new maps.LatLngBounds();
            bounds.extend(
                new maps.LatLng(
                    parseFloat(orderDetails.pickup_location_lat),
                    parseFloat(orderDetails.pickup_location_long)
                )
            );
            bounds.extend(
                new maps.LatLng(
                    parseFloat(orderDetails.delivery_location_lat),
                    parseFloat(orderDetails.delivery_location_long)
                )
            );
            map.fitBounds(bounds, { padding: 50 });

            // Calculate route and draw polyline
            calculateRoute(map, maps);
        }
    };

    const calculateRoute = (map: any, maps: any) => {
        if (!maps.DirectionsService || !maps.DirectionsRenderer) return;

        const directionsService = new maps.DirectionsService();
        const directionsRenderer = new maps.DirectionsRenderer({
            map: map,
            polylineOptions: {
                strokeColor: "#4F46E5",
                strokeOpacity: 0.8,
                strokeWeight: 6,
            },
            suppressMarkers: true,
        });

        const request = {
            origin: {
                lat: parseFloat(orderDetails.pickup_location_lat),
                lng: parseFloat(orderDetails.pickup_location_long),
            },
            destination: {
                lat: parseFloat(orderDetails.delivery_location_lat),
                lng: parseFloat(orderDetails.delivery_location_long),
            },
            travelMode: maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result: any, status: any) => {
            if (status === maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);

                // Extract route information
                const route = result.routes[0].legs[0];
                setRouteInfo({
                    distance: route.distance?.text || "Calculating...",
                    duration: route.duration?.text || "Calculating...",
                });

                // Adjust map bounds to show entire route
                const bounds = new maps.LatLngBounds();
                result.routes[0].legs.forEach((leg: any) => {
                    bounds.extend(leg.start_location);
                    bounds.extend(leg.end_location);
                });
                map.fitBounds(bounds, { padding: 60 });
            } else {
                console.error("Directions request failed:", status);
                // Fallback to simple polyline
                drawFallbackPolyline(map, maps);
            }
        });
    };

    const drawFallbackPolyline = (map: any, maps: any) => {
        const polyline = new maps.Polyline({
            path: [
                {
                    lat: parseFloat(orderDetails.pickup_location_lat),
                    lng: parseFloat(orderDetails.pickup_location_long),
                },
                {
                    lat: parseFloat(orderDetails.delivery_location_lat),
                    lng: parseFloat(orderDetails.delivery_location_long),
                },
            ],
            geodesic: true,
            strokeColor: "#4F46E5",
            strokeOpacity: 0.6,
            strokeWeight: 4,
            strokeDashArray: [5, 5],
        });

        polyline.setMap(map);

        // Calculate straight line distance
        const distance = calculateDistance(
            parseFloat(orderDetails.pickup_location_lat),
            parseFloat(orderDetails.pickup_location_long),
            parseFloat(orderDetails.delivery_location_lat),
            parseFloat(orderDetails.delivery_location_long)
        );

        setRouteInfo({
            distance: `${distance} km`,
            duration: "Route not available",
        });
    };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): string => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance.toFixed(1);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-sm sm:text-base">Loading order details...</p>
            </div>
        );
    }

    if (isError || !orderDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-sm sm:text-base">Failed to load order details. Please try again.</p>
            </div>
        );
    }

    const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

    return (
        <div className="min-h-screen ">
            <title>Track My Order</title>
            {/* Header */}
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between container mx-auto">
                <PageHeader title="Track Order" />
                <button
                    onClick={handleCancelOrder}
                    disabled={["confirmed", "delivered", "cancelled"].includes(orderDetails.status.toLowerCase()) || isCancelling}
                    className={`text-xs mb-4 sm:mb-6 sm:text-sm md:text-base font-medium ${["confirmed", "delivered", "cancelled"].includes(orderDetails.status.toLowerCase()) || isCancelling
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:text-gray-800"
                        }`}
                >
                    {isCancelling ? "Cancelling..." : "Cancel Request"}
                </button>
            </div>

            {/* Order ID Header */}
            <div className="mt-4 sm:mt-6 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                    <span className="text-primary font-medium text-base sm:text-xl md:text-2xl lg:text-3xl">
                        Track My Order
                    </span>
                    <span className="text-secondary font-medium text-base sm:text-xl md:text-2xl lg:text-3xl">
                        ID: #{orderDetails.order_id}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-4 sm:mt-6 ">
                <div className="bg-white w-full rounded-t-3xl shadow-sm overflow-hidden">
                    {/* Google Maps Iframe */}
                    <div className="w-full">
                        {/* <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35939.61671883658!2d90.406912!3d23.78270515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1758608180620!5m2!1sen!2sbd"
                            style={{ border: 0, width: "100%", height: "400px", maxHeight: "50vh" }}
                            className="sm:h-[250px] md:h-[300px]"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe> */}
                        <div className="bg-gray-100 rounded- overflow-hidden  border-2 border-gray-200">

                            {orderDetails?.pickup_location_lat &&
                                orderDetails?.pickup_location_long &&
                                orderDetails?.delivery_location_lat &&
                                orderDetails?.delivery_location_long ? (
                                <div style={{ height: "400px", width: "100%" }} className="rounded-lg overflow-hidden">
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                                        defaultCenter={{
                                            lat: parseFloat(orderDetails.pickup_location_lat),
                                            lng: parseFloat(orderDetails.pickup_location_long),
                                        }}
                                        defaultZoom={12}
                                        onGoogleApiLoaded={handleApiLoaded}
                                        yesIWantToUseGoogleMapApiInternals
                                        options={{
                                            styles: [
                                                {
                                                    featureType: "all",
                                                    elementType: "geometry",
                                                    stylers: [{ color: "#f5f5f5" }],
                                                },
                                                {
                                                    featureType: "all",
                                                    elementType: "labels.text.fill",
                                                    stylers: [{ color: "#666666" }],
                                                },
                                                {
                                                    featureType: "road",
                                                    elementType: "geometry",
                                                    stylers: [{ color: "#ffffff" }],
                                                },
                                            ],
                                        }}
                                    >
                                        <Marker
                                            lat={parseFloat(orderDetails.pickup_location_lat)}
                                            lng={parseFloat(orderDetails.pickup_location_long)}
                                            text="Pickup"
                                            type="pickup"
                                        />
                                        <Marker
                                            lat={parseFloat(orderDetails.delivery_location_lat)}
                                            lng={parseFloat(orderDetails.delivery_location_long)}
                                            text="Delivery"
                                            type="delivery"
                                        />
                                    </GoogleMapReact>
                                    <RouteInfo
                                        distance={routeInfo?.distance}
                                        duration={routeInfo?.duration}
                                    />
                                </div>
                            ) : (
                                <div className="h-400 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                                    <p className="text-red-500 text-center p-4">
                                        Location coordinates are not available.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Progress Timeline */}
                    {orderDetails.status.toLowerCase() === "cancelled" ? (
                        <div className="p-4 sm:p-6 md:p-8 text-center">
                            <h2 className="text-red-500 text-xl sm:text-2xl md:text-3xl font-medium mb-4 sm:mb-6">
                                Order Cancelled
                            </h2>
                            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
                                This order has been cancelled.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2 p-4 sm:p-6 md:p-8">
                            <h2 className="text-primary text-xl sm:text-2xl md:text-3xl font-medium text-center mb-4 sm:mb-6">
                                Order in Progress
                            </h2>

                            {/* Order Placed */}
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="flex-shrink-0 w-8 sm:w-10">
                                    <div
                                        className={`rounded-full flex items-center justify-center ${timelineSteps.includes("Order Placed")
                                            ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {timelineSteps.includes("Order Placed") ? <Ok /> : <Oks aria-label="Order Placed" />}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className={`font-medium text-lg sm:text-xl md:text-2xl ${timelineSteps.includes("Order Placed") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        Order Placed
                                    </h3>
                                    <p
                                        className={`text-sm sm:text-base md:text-lg font-normal ${timelineSteps.includes("Order Placed") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        Your order has been confirmed
                                    </p>
                                </div>
                            </div>

                            {/* Connecting Line */}
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className="w-8 sm:w-10 flex justify-center">
                                    <div
                                        className={`border-t h-8 sm:h-10 md:h-12 border border-dashed ${timelineSteps.includes("Picked Up")
                                            ? "border-[#EFB639]"
                                            : "border-gray-200"
                                            }`}
                                    ></div>
                                </div>
                            </div>

                            {/* Picked Up */}
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="flex-shrink-0 w-8 sm:w-10">
                                    <div
                                        className={`rounded-full flex items-center justify-center ${timelineSteps.includes("Picked Up")
                                            ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {timelineSteps.includes("Picked Up") ? (<PickUp />) : <PickUps aria-label="Picked Up" />}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className={`font-medium text-lg sm:text-xl md:text-2xl ${timelineSteps.includes("Picked Up") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        Picked Up
                                    </h3>
                                    <p
                                        className={`text-sm sm:text-base md:text-lg font-normal ${timelineSteps.includes("Picked Up") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        Your order is on its way
                                    </p>
                                </div>
                            </div>

                            {/* Connecting Line */}
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className="w-8 sm:w-10 flex justify-center">
                                    <div
                                        className={`border-t h-8 sm:h-10 md:h-12 border border-dashed ${timelineSteps.includes("On the Way")
                                            ? "border-[#EFB639]"
                                            : "border-gray-200"
                                            }`}
                                    ></div>
                                </div>
                            </div>

                            {/* On the Way */}
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="flex-shrink-0 w-8 sm:w-10">
                                    <div
                                        className={`rounded-full flex items-center justify-center ${timelineSteps.includes("On the Way")
                                            ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {/* {timelineSteps.includes("On the Way") ? <Location /> : <Locations aria-label="On the Way" />} */}
                                        <Location aria-label="On the Way" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className={`font-medium text-lg sm:text-xl md:text-2xl ${timelineSteps.includes("On the Way") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        On the Way
                                    </h3>
                                    <p
                                        className={`text-sm sm:text-base md:text-lg font-normal ${timelineSteps.includes("On the Way") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        The driver is heading to you
                                    </p>
                                </div>
                            </div>

                            {/* Connecting Line */}
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <div className="w-8 sm:w-10 flex justify-center">
                                    <div
                                        className={`border-t h-8 sm:h-10 md:h-12 border border-dashed ${timelineSteps.includes("Delivered")
                                            ? "border-[#EFB639]"
                                            : "border-gray-200"
                                            }`}
                                    ></div>
                                </div>
                            </div>

                            {/* Delivered */}
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="flex-shrink-0 w-8 sm:w-10">
                                    <div
                                        className={`rounded-full flex items-center justify-center ${timelineSteps.includes("Delivered")
                                            ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {/* {timelineSteps.includes("confirmed") ? <Take /> : <Takes aria-label="Delivered" />} */}
                                        <Take aria-label="Delivered" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className={`font-medium text-lg sm:text-xl md:text-2xl ${timelineSteps.includes("Delivered") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        Delivered
                                    </h3>
                                    <p
                                        className={`text-sm sm:text-base md:text-lg font-normal ${timelineSteps.includes("Delivered") ? "text-secondary" : "text-gray-400"
                                            }`}
                                    >
                                        Take your parts
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Driver Profile Section */}
                    {orderDetails.assign_driver_details && orderDetails.status.toLowerCase() !== "cancelled" && (
                        <div className="p-4 sm:p-6 mb-6">
                            <hr className="my-4 border-gray-200 border" />

                            {/* Driver Profile */}
                            <div className="text-center mb-4 sm:mb-6">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-4 bg-[#C3DEBC] rounded-full flex items-center justify-center p-3 sm:p-4">
                                    {
                                        orderDetails.assign_driver_details.vehicle_image && (
                                            <Image
                                                // src={
                                                //     orderDetails.assign_driver_details.image
                                                //         ? `${process.env.NEXT_PUBLIC_API_URL}${orderDetails.assign_driver_details.image}`
                                                //         : "/images/car.png"
                                                // }
                                                src={`${IMAGE}${orderDetails?.assign_driver_details?.image}`}
                                                alt="Driver Profile"
                                                width={128}
                                                height={128}
                                                className="object-contain w-full h-full rounded-full"
                                                priority
                                            />
                                        )
                                    }
                                </div>
                                <div>
                                    <h3 className="text-secondary font-medium text-lg sm:text-xl md:text-2xl mb-1">
                                        {orderDetails.assign_driver_details.name || "Unknown Driver"}
                                    </h3>
                                    <p className="text-secondary font-normal text-sm sm:text-base md:text-lg mb-2">
                                        {orderDetails.assign_driver_details.vehicle || "Unknown Vehicle"}
                                    </p>
                                    <div className="flex items-center justify-center space-x-1">
                                        <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 fill-current" />
                                        <span className="text-gray-800 font-medium text-sm sm:text-base md:text-lg">
                                            {orderDetails.assign_driver_details.rating || "0"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row sm:space-x-4 md:space-x-6 max-w-md mx-auto space-y-3 sm:space-y-0 w-full">
                                <Button
                                    onClick={() =>
                                        window.location.href = `tel:${orderDetails?.assign_driver_details?.phone_number || "123456789"}`
                                    }
                                    className="flex-1 flex items-center justify-center text-sm sm:text-base md:text-lg 
      bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white 
      min-h-[48px] sm:min-h-[52px] rounded-lg font-medium 
      hover:bg-gradient-to-r hover:from-[#d4a847] hover:to-[#7a5d29] 
      w-full"
                                >
                                    <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Call Now
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => handleCreateRoom(orderDetails?.id)}
                                    className="flex-1 flex items-center justify-center text-sm sm:text-base md:text-lg 
      border border-gray-300 text-secondary min-h-[48px] sm:min-h-[52px] 
      rounded-lg font-medium hover:bg-gray-50 bg-transparent 
      w-full"
                                >
                                    <MessageSquareMore className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                    Message Now
                                </Button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TrackMyOrder />
        </Suspense>
    );
}