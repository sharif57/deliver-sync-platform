/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PageHeader from '@/components/shareUi/onBack'
import { Button } from '@/components/ui/button'
import Loading from '@/components/ui/icon/loading';
import { useGetCustomerOrderDetailsQuery } from '@/redux/feature/customerSlice';
import { useUpdataOrderStatusMutation } from '@/redux/feature/driverSlice';
import { MessageSquareMore, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react'
import { toast } from 'sonner';

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
const RouteInfo = ({ distance, duration }: { distance?: string; duration?: string }) => (
    <div className="absolute hidden sm:block top-[220px] bg-white p-3 rounded-lg shadow-lg z-10 border">
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

function StartTrip() {
    const params = useSearchParams();
    const id = params.get("id");
    console.log(id)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { data, isLoading, isError } = useGetCustomerOrderDetailsQuery(id as string);
    const orderDetails = data?.data;
    console.log(orderDetails)

    const [updataOrderStatus] = useUpdataOrderStatusMutation();

    const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [mapsInstance, setMapsInstance] = useState<any>(null);

    const handleOnTheWay = async (orderId: string) => {
        console.log(orderId, 'iddd')
        setLoading(true);
        try {
            const res = await updataOrderStatus({ id, data: { status: 'on_the_way' } }).unwrap();
            console.log('Delivery request accepted successfully', res);
            toast.success(res?.message || 'Delivery request accepted successfully');
            router.push(`/driver/deliver_parcel?id=${id}`);
            setLoading(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to accept delivery request');
            console.error('Error accepting delivery request:', error);
            setLoading(false);
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
            distance: `${distance} Miles`,
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
        return <div className="flex items-center justify-center h-screen"><Loading /></div>;
    }
    if (isError) {
        return <div className="flex items-center justify-center h-screen">data not found</div>;
    }

    return (
        <div>
            <title>Start Trip</title>
            <div>
                <PageHeader title="Active Delivery" />
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <div className="flex flex-col sm:flex-row justify-between gap-14">
                        <div className="w-full sm:w-1/2">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-medium text-gray-800">
                                    Customer: {orderDetails?.customer_details?.name}
                                </h1>
                                <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
                                    <PhoneCall onClick={() => window.open(`https://wa.me/${orderDetails?.customer_details?.phone_number}`)} className="w-5 cursor-pointer h-5 text-black p-1 rounded-full bg-white" />
                                    <MessageSquareMore className="w-5 h-5 text-black p-1 rounded-full bg-white" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[#D69D21] text-[16px] font-normal">ID#{orderDetails?.order_id}</p>
                                <p className="text-secondary text-xl font-normal">weight:  {orderDetails?.product_weight}kg</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.12231 12.3126L9.0902 10.9127L13.0581 12.3126L9.0902 4.20508L5.12231 12.3126Z" fill="#D69D21" />
                                    <path d="M17.5584 8.15969H16.6809C16.5136 4.45376 13.2921 1.23241 9.58628 1.06504V0.1875H8.59378V1.06504C4.88785 1.23238 1.6665 4.45386 1.49913 8.15969H0.621582V9.1522H1.49913C1.6665 12.8581 4.88795 16.0795 8.59378 16.2469V17.1244H9.58628V16.2469C13.2922 16.0795 16.5136 12.858 16.6809 9.1522H17.5585L17.5584 8.15969ZM9.58628 15.2517V14.4084H8.59378V15.2517C5.34142 15.0093 2.73665 12.4046 2.49425 9.15217H3.33752V8.15966H2.49425C2.73662 4.90731 5.34139 2.30254 8.59378 2.06013V2.9034H9.58628V2.06017C12.8386 2.30254 15.4434 4.90731 15.6858 8.15969H14.8425V9.1522H15.6858C15.4434 12.4046 12.8386 15.0093 9.58628 15.2517Z" fill="#D69D21" />
                                </svg>

                                <p className="text-secondary text-xl font-normal">{orderDetails?.pickup_location}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0C5.92615 0 2.61194 3.31421 2.61194 7.38809C2.61194 8.72925 3.21342 10.1717 3.23862 10.2325C3.43289 10.6936 3.8162 11.4098 4.0926 11.8296L9.15822 19.505C9.36552 19.8196 9.67235 20 10 20C10.3277 20 10.6345 19.8196 10.8418 19.5054L15.9079 11.8296C16.1847 11.4098 16.5676 10.6936 16.7619 10.2325C16.7871 10.1721 17.3881 8.72968 17.3881 7.38809C17.3881 3.31421 14.0739 0 10 0ZM15.9605 9.89526C15.7871 10.3086 15.4303 10.9748 15.1821 11.3512L10.1161 19.0269C10.0161 19.1786 9.98439 19.1786 9.88443 19.0269L4.81837 11.3512C4.57022 10.9748 4.21342 10.3081 4.04001 9.89483C4.03262 9.87701 3.48113 8.54933 3.48113 7.38809C3.48113 3.79357 6.40551 0.869187 10 0.869187C13.5946 0.869187 16.5189 3.79357 16.5189 7.38809C16.5189 8.55106 15.9661 9.88223 15.9605 9.89526Z" fill="#A95265" />
                                    <path d="M10.0001 3.47754C7.8432 3.47754 6.08875 5.23243 6.08875 7.38888C6.08875 9.54534 7.8432 11.3002 10.0001 11.3002C12.157 11.3002 13.9114 9.54534 13.9114 7.38888C13.9114 5.23243 12.157 3.47754 10.0001 3.47754ZM10.0001 10.431C8.32299 10.431 6.95793 9.06641 6.95793 7.38888C6.95793 5.71135 8.32299 4.34673 10.0001 4.34673C11.6772 4.34673 13.0422 5.71135 13.0422 7.38888C13.0422 9.06641 11.6772 10.431 10.0001 10.431Z" fill="#A95265" />
                                </svg>


                                <p className="text-secondary text-xl font-normal">{orderDetails?.delivery_location}</p>
                            </div>
                            <div className=" flex  items-center lg:w-1/2 mt-8">
                                <div className="lg:flex  gap-4 w-full max-w-sm space-y-6">
                                    <div className="flex-1">
                                        <Link href={'/driver/deliver_parcel'} >
                                            <Button
                                                onClick={() => handleOnTheWay(orderDetails?._id)}
                                                disabled={loading}
                                                className="w-full text-base px-18 cursor-pointer bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white py-6 rounded-lg font-medium hover:bg-primary/90 transition"
                                                aria-label="Decline request"
                                            >
                                                {loading ? 'Start Trip ...' : 'Start Trip'}
                                            </Button>
                                        </Link>
                                    </div>
                                    <Button
                                        // onClick={() => window.open("tel:+1234567890")}
                                        onClick={() => window.open(`https://wa.me/${orderDetails?.customer_details?.phone_number}`)}
                                        variant="outline"
                                        className="w-full flex-1 cursor-pointer border border-gray-300 px-14 text-secondary text-base py-6 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 transition"
                                        aria-label="Accept request"
                                    >
                                        Call to company
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">

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
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function Trip() {
    return (
        <Suspense fallback={<div><Loading /></div>} >
            <StartTrip />
        </Suspense>
    )
}