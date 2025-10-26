/* eslint-disable @typescript-eslint/no-explicit-any */


// "use client"
// import { Card, CardContent } from "@/components/ui/card"
// import Back from "@/components/ui/icon/back"
// import { useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice"
// import { FileText, Building2, Tag, DollarSign, MapPin, Home, PhoneCall, MessageSquareMore } from "lucide-react"
// import { useRouter, useSearchParams } from "next/navigation"



// export default function Processing() {

//     const searchParams = useSearchParams();
//     const orderId = searchParams.get("id") || "";
//     console.log(orderId, 'order id=============>');
//     const { data } = useGetCustomerOrderDetailsQuery(orderId, {
//         pollingInterval: 10000,
//         refetchOnFocus: true,
//         refetchOnReconnect: true,
//     });
//     const orderDetails = data?.data;
//     console.log(data?.data)

//     const router = useRouter()

//     // const handmessage = () => {
//     //     router.push('/customer/message')
//     // }

//     return (
//         <div>
//             <title>Delivered Processing</title>
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//                 <div onClick={() => router.back()} className="flex cursor-pointer items-center gap-3">
//                     <Back />
//                     <h1 className="text-2xl font-medium text-gray-700 ">Delivery History</h1>
//                 </div>
//             </div>

//             <Card className="w-full container mx-auto bg-white shadow-lg">
//                 <CardContent className="p-6">
//                     {/* Order Details Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                         {/* Left Column */}
//                         <div className="space-y-6">
//                             {/* Order ID */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
//                                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                                     <FileText className="w-5 h-5 text-gray-600" />
//                                     <span className="text-gray-800 font-medium">{orderDetails?.order_id}</span>
//                                 </div>
//                             </div>

//                             {/* Product Short Description */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Short Description</label>
//                                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                                     <Tag className="w-5 h-5 text-gray-600" />
//                                     <span className="text-gray-800">{orderDetails?.description}</span>
//                                     <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
//                                 </div>
//                             </div>

//                             {/* Pickup Location */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
//                                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                                     <MapPin className="w-5 h-5 text-gray-600" />
//                                     <span className="text-gray-800">{orderDetails?.pickup_location}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right Column */}
//                         <div className="space-y-6">
//                             {/* Company Name */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
//                                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                                     <Building2 className="w-5 h-5 text-gray-600" />
//                                     <span className="text-gray-800">{orderDetails?.company_name}</span>
//                                 </div>
//                             </div>

//                             {/* Product Amount */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Amount</label>
//                                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                                     <DollarSign className="w-5 h-5 text-gray-600" />
//                                     <span className="text-gray-800">{orderDetails?.product_amount}</span>
//                                     <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
//                                 </div>
//                             </div>

//                             {/* Delivery Location */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
//                                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                                     <Home className="w-5 h-5 text-gray-600" />
//                                     <span className="text-gray-800">{orderDetails?.delivery_location}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Driver Section */}
//                     <div className="  p-4  mb-6">
//                         <hr className="my-4 border-gray-200 border" />

//                         <div className="mt-12">
//                             <div className="flex flex-col sm:flex-row justify-between gap-14">
//                                 <div className="w-full sm:w-1/2">
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h1 className="text-2xl font-medium text-gray-800">
//                                             Customer: Sharif Mahamud
//                                         </h1>
//                                         <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
//                                             <PhoneCall className="w-5 h-5 text-black p-1 rounded-full bg-white" />
//                                             <MessageSquareMore className="w-5 h-5 text-black p-1 rounded-full bg-white" />
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center justify-between mb-4">
//                                         <h1 className="text-2xl font-medium text-gray-800">
//                                             Rider: Mehedi Hasan
//                                         </h1>
//                                         <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
//                                             <PhoneCall className="w-5 h-5 text-black p-1 rounded-full bg-white" />
//                                             <MessageSquareMore className="w-5 h-5 text-black p-1 rounded-full bg-white" />
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <p className="text-[#D69D21] text-[16px] font-normal">ID#{orderDetails?.order_id}</p>
//                                         <p className="text-secondary text-xl font-normal">Weight - {orderDetails?.product_weight} kg</p>
//                                     </div>
//                                     <div className="flex items-center gap-2 mt-4">
//                                         <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M5.12231 12.3126L9.0902 10.9127L13.0581 12.3126L9.0902 4.20508L5.12231 12.3126Z" fill="#D69D21" />
//                                             <path d="M17.5584 8.15969H16.6809C16.5136 4.45376 13.2921 1.23241 9.58628 1.06504V0.1875H8.59378V1.06504C4.88785 1.23238 1.6665 4.45386 1.49913 8.15969H0.621582V9.1522H1.49913C1.6665 12.8581 4.88795 16.0795 8.59378 16.2469V17.1244H9.58628V16.2469C13.2922 16.0795 16.5136 12.858 16.6809 9.1522H17.5585L17.5584 8.15969ZM9.58628 15.2517V14.4084H8.59378V15.2517C5.34142 15.0093 2.73665 12.4046 2.49425 9.15217H3.33752V8.15966H2.49425C2.73662 4.90731 5.34139 2.30254 8.59378 2.06013V2.9034H9.58628V2.06017C12.8386 2.30254 15.4434 4.90731 15.6858 8.15969H14.8425V9.1522H15.6858C15.4434 12.4046 12.8386 15.0093 9.58628 15.2517Z" fill="#D69D21" />
//                                         </svg>

//                                         <p className="text-secondary text-xl font-normal">{orderDetails?.pickup_location}</p>
//                                     </div>
//                                     <div className="flex items-center gap-2 mt-4">
//                                         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M10 0C5.92615 0 2.61194 3.31421 2.61194 7.38809C2.61194 8.72925 3.21342 10.1717 3.23862 10.2325C3.43289 10.6936 3.8162 11.4098 4.0926 11.8296L9.15822 19.505C9.36552 19.8196 9.67235 20 10 20C10.3277 20 10.6345 19.8196 10.8418 19.5054L15.9079 11.8296C16.1847 11.4098 16.5676 10.6936 16.7619 10.2325C16.7871 10.1721 17.3881 8.72968 17.3881 7.38809C17.3881 3.31421 14.0739 0 10 0ZM15.9605 9.89526C15.7871 10.3086 15.4303 10.9748 15.1821 11.3512L10.1161 19.0269C10.0161 19.1786 9.98439 19.1786 9.88443 19.0269L4.81837 11.3512C4.57022 10.9748 4.21342 10.3081 4.04001 9.89483C4.03262 9.87701 3.48113 8.54933 3.48113 7.38809C3.48113 3.79357 6.40551 0.869187 10 0.869187C13.5946 0.869187 16.5189 3.79357 16.5189 7.38809C16.5189 8.55106 15.9661 9.88223 15.9605 9.89526Z" fill="#A95265" />
//                                             <path d="M10.0001 3.47754C7.8432 3.47754 6.08875 5.23243 6.08875 7.38888C6.08875 9.54534 7.8432 11.3002 10.0001 11.3002C12.157 11.3002 13.9114 9.54534 13.9114 7.38888C13.9114 5.23243 12.157 3.47754 10.0001 3.47754ZM10.0001 10.431C8.32299 10.431 6.95793 9.06641 6.95793 7.38888C6.95793 5.71135 8.32299 4.34673 10.0001 4.34673C11.6772 4.34673 13.0422 5.71135 13.0422 7.38888C13.0422 9.06641 11.6772 10.431 10.0001 10.431Z" fill="#A95265" />
//                                         </svg>


//                                         <p className="text-secondary text-xl font-normal">{orderDetails?.delivery_location}</p>
//                                     </div>

//                                 </div>
//                                 <div className="w-full sm:w-1/2">
//                                     <iframe
//                                         src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35939.61671883658!2d90.406912!3d23.78270515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1758608180620!5m2!1sen!2sbd"
//                                         className="w-full h-64 sm:h-60 md:h-72 rounded-lg border-0"
//                                         allowFullScreen
//                                         loading="lazy"
//                                         referrerPolicy="no-referrer-when-downgrade"
//                                     ></iframe>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }
// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import Back from "@/components/ui/icon/back";
// import { useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice";
// import { FileText, Building2, Tag, DollarSign, MapPin, Home, PhoneCall, MessageSquareMore } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import GoogleMapReact from "google-map-react";
// import { useState, useEffect } from "react";

// // Google Maps API Key
// const GOOGLE_API_KEY = "AIzaSyDEOhUOUDVMYiBOHqEtCnyrztCrlOqZ6bo";

// // Simple Marker Component for Google Map
// interface MarkerProps {
//   lat: number;
//   lng: number;
//   text: string;
// }

// const Marker = ({ text }: MarkerProps) => (
//   <div className="bg-red-500 text-white rounded-full p-2 text-xs font-bold">
//     {text}
//   </div>
// );

// export default function Processing() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("id") || "";
//   console.log(orderId, "order id=============>");
//   const { data } = useGetCustomerOrderDetailsQuery(orderId, {
//     pollingInterval: 10000,
//     refetchOnFocus: true,
//     refetchOnReconnect: true,
//   });
//   const orderDetails = data?.data;
//   console.log(data?.data);

//   const router = useRouter();
//   const [mapInstance, setMapInstance] = useState<any>(null);
//   const [mapsInstance, setMapsInstance] = useState<any>(null);

//   // Initialize Google Maps API and adjust map bounds
//   const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
//     setMapInstance(map);
//     setMapsInstance(maps);

//     // Adjust map to fit both pickup and delivery locations
//     if (
//       orderDetails?.pickup_location_lat &&
//       orderDetails?.pickup_location_long &&
//       orderDetails?.delivery_location_lat &&
//       orderDetails?.delivery_location_long
//     ) {
//       const bounds = new maps.LatLngBounds();
//       bounds.extend(
//         new maps.LatLng(
//           parseFloat(orderDetails.pickup_location_lat),
//           parseFloat(orderDetails.pickup_location_long)
//         )
//       );
//       bounds.extend(
//         new maps.LatLng(
//           parseFloat(orderDetails.delivery_location_lat),
//           parseFloat(orderDetails.delivery_location_long)
//         )
//       );
//       map.fitBounds(bounds);
//     }
//   };

//   // Draw polyline between pickup and delivery locations
//   useEffect(() => {
//     if (
//       !mapInstance ||
//       !mapsInstance ||
//       !orderDetails?.pickup_location_lat ||
//       !orderDetails?.pickup_location_long ||
//       !orderDetails?.delivery_location_lat ||
//       !orderDetails?.delivery_location_long
//     )
//       return;

//     const polyline = new mapsInstance.Polyline({
//       path: [
//         {
//           lat: parseFloat(orderDetails.pickup_location_lat),
//           lng: parseFloat(orderDetails.pickup_location_long),
//         },
//         {
//           lat: parseFloat(orderDetails.delivery_location_lat),
//           lng: parseFloat(orderDetails.delivery_location_long),
//         },
//       ],
//       geodesic: true,
//       strokeColor: "#FF0000",
//       strokeOpacity: 1.0,
//       strokeWeight: 2,
//     });

//     polyline.setMap(mapInstance);

//     // Cleanup polyline on component unmount
//     return () => {
//       polyline.setMap(null);
//     };
//   }, [
//     mapInstance,
//     mapsInstance,
//     orderDetails?.pickup_location_lat,
//     orderDetails?.pickup_location_long,
//     orderDetails?.delivery_location_lat,
//     orderDetails?.delivery_location_long,
//   ]);

//   return (
//     <div>
//       <title>Delivered Processing</title>
//       <div className="flex items-center justify-between mb-4 sm:mb-6">
//         <div onClick={() => router.back()} className="flex cursor-pointer items-center gap-3">
//           <Back />
//           <h1 className="text-2xl font-medium text-gray-700">Delivery History</h1>
//         </div>
//       </div>

//       <Card className="w-full container mx-auto bg-white shadow-lg">
//         <CardContent className="p-6">
//           {/* Order Details Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//             {/* Left Column */}
//             <div className="space-y-6">
//               {/* Order ID */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
//                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                   <FileText className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-800 font-medium">{orderDetails?.order_id}</span>
//                 </div>
//               </div>

//               {/* Product Short Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Short Description</label>
//                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                   <Tag className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-800">{orderDetails?.description}</span>
//                   <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
//                 </div>
//               </div>

//               {/* Pickup Location */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
//                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                   <MapPin className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-800">{orderDetails?.pickup_location}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               {/* Company Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
//                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                   <Building2 className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-800">{orderDetails?.company_name}</span>
//                 </div>
//               </div>

//               {/* Product Amount */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Amount</label>
//                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                   <DollarSign className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-800">{orderDetails?.product_amount}</span>
//                   <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
//                 </div>
//               </div>

//               {/* Delivery Location */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
//                 <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
//                   <Home className="w-5 h-5 text-gray-600" />
//                   <span className="text-gray-800">{orderDetails?.delivery_location}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Driver Section */}
//           <div className="p-4 mb-6">
//             <hr className="my-4 border-gray-200 border" />

//             <div className="mt-12">
//               <div className="flex flex-col sm:flex-row justify-between gap-14">
//                 <div className="w-full sm:w-1/2">
//                   <div className="flex items-center justify-between mb-4">
//                     <h1 className="text-2xl font-medium text-gray-800">
//                       Customer: {orderDetails?.customer_details?.name || "Sharif Mahamud"}
//                     </h1>
//                     <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
//                       <PhoneCall className="w-5 h-5 text-black p-1 rounded-full bg-white" />
//                       <MessageSquareMore
//                         className="w-5 h-5 text-black p-1 rounded-full bg-white"
//                         onClick={() => router.push("/customer/message")}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex items-center justify-between mb-4">
//                     <h1 className="text-2xl font-medium text-gray-800">
//                       Rider: {orderDetails?.assign_driver_details?.name || "Mehedi Hasan"}
//                     </h1>
//                     <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
//                       <PhoneCall className="w-5 h-5 text-black p-1 rounded-full bg-white" />
//                       <MessageSquareMore
//                         className="w-5 h-5 text-black p-1 rounded-full bg-white"
//                         onClick={() => router.push("/customer/message")}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <p className="text-[#D69D21] text-[16px] font-normal">ID#{orderDetails?.order_id}</p>
//                     <p className="text-secondary text-xl font-normal">Weight - {orderDetails?.product_weight} kg</p>
//                   </div>
//                   <div className="flex items-center gap-2 mt-4">
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 18 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M5.12231 12.3126L9.0902 10.9127L13.0581 12.3126L9.0902 4.20508L5.12231 12.3126Z"
//                         fill="#D69D21"
//                       />
//                       <path
//                         d="M17.5584 8.15969H16.6809C16.5136 4.45376 13.2921 1.23241 9.58628 1.06504V0.1875H8.59378V1.06504C4.88785 1.23238 1.6665 4.45386 1.49913 8.15969H0.621582V9.1522H1.49913C1.6665 12.8581 4.88795 16.0795 8.59378 16.2469V17.1244H9.58628V16.2469C13.2922 16.0795 16.5136 12.858 16.6809 9.1522H17.5585L17.5584 8.15969ZM9.58628 15.2517V14.4084H8.59378V15.2517C5.34142 15.0093 2.73665 12.4046 2.49425 9.15217H3.33752V8.15966H2.49425C2.73662 4.90731 5.34139 2.30254 8.59378 2.06013V2.9034H9.58628V2.06017C12.8386 2.30254 15.4434 4.90731 15.6858 8.15969H14.8425V9.1522H15.6858C15.4434 12.4046 12.8386 15.0093 9.58628 15.2517Z"
//                         fill="#D69D21"
//                       />
//                     </svg>
//                     <p className="text-secondary text-xl font-normal">{orderDetails?.pickup_location}</p>
//                   </div>
//                   <div className="flex items-center gap-2 mt-4">
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M10 0C5.92615 0 2.61194 3.31421 2.61194 7.38809C2.61194 8.72925 3.21342 10.1717 3.23862 10.2325C3.43289 10.6936 3.8162 11.4098 4.0926 11.8296L9.15822 19.505C9.36552 19.8196 9.67235 20 10 20C10.3277 20 10.6345 19.8196 10.8418 19.5054L15.9079 11.8296C16.1847 11.4098 16.5676 10.6936 16.7619 10.2325C16.7871 10.1721 17.3881 8.72968 17.3881 7.38809C17.3881 3.31421 14.0739 0 10 0ZM15.9605 9.89526C15.7871 10.3086 15.4303 10.9748 15.1821 11.3512L10.1161 19.0269C10.0161 19.1786 9.98439 19.1786 9.88443 19.0269L4.81837 11.3512C4.57022 10.9748 4.21342 10.3081 4.04001 9.89483C4.03262 9.87701 3.48113 8.54933 3.48113 7.38809C3.48113 3.79357 6.40551 0.869187 10 0.869187C13.5946 0.869187 16.5189 3.79357 16.5189 7.38809C16.5189 8.55106 15.9661 9.88223 15.9605 9.89526Z"
//                         fill="#A95265"
//                       />
//                       <path
//                         d="M10.0001 3.47754C7.8432 3.47754 6.08875 5.23243 6.08875 7.38888C6.08875 9.54534 7.8432 11.3002 10.0001 11.3002C12.157 11.3002 13.9114 9.54534 13.9114 7.38888C13.9114 5.23243 12.157 3.47754 10.0001 3.47754ZM10.0001 10.431C8.32299 10.431 6.95793 9.06641 6.95793 7.38888C6.95793 5.71135 8.32299 4.34673 10.0001 4.34673C11.6772 4.34673 13.0422 5.71135 13.0422 7.38888C13.0422 9.06641 11.6772 10.431 10.0001 10.431Z"
//                         fill="#A95265"
//                       />
//                     </svg>
//                     <p className="text-secondary text-xl font-normal">{orderDetails?.delivery_location}</p>
//                   </div>
//                 </div>
//                 <div className="w-full sm:w-1/2">
//                   {orderDetails?.pickup_location_lat &&
//                     orderDetails?.pickup_location_long &&
//                     orderDetails?.delivery_location_lat &&
//                     orderDetails?.delivery_location_long ? (
//                     <div style={{ height: "300px", width: "100%" }}>
//                       <GoogleMapReact
//                         bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
//                         defaultCenter={{
//                           lat: parseFloat(orderDetails.pickup_location_lat),
//                           lng: parseFloat(orderDetails.pickup_location_long),
//                         }}
//                         defaultZoom={12}
//                         onGoogleApiLoaded={handleApiLoaded}
//                         yesIWantToUseGoogleMapApiInternals
//                       >
//                         <Marker
//                           lat={parseFloat(orderDetails.pickup_location_lat)}
//                           lng={parseFloat(orderDetails.pickup_location_long)}
//                           text="Pickup"
//                         />
//                         <Marker
//                           lat={parseFloat(orderDetails.delivery_location_lat)}
//                           lng={parseFloat(orderDetails.delivery_location_long)}
//                           text="Delivery"
//                         />
//                       </GoogleMapReact>
//                     </div>
//                   ) : (
//                     <p className="text-red-500 text-center">Location coordinates are not available.</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { Card, CardContent } from "@/components/ui/card";
import Back from "@/components/ui/icon/back";
import { useGetCustomerOrderDetailsQuery } from "@/redux/feature/customerSlice";
import { FileText, Building2, Tag, DollarSign, MapPin, Home, PhoneCall, MessageSquareMore } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleMapReact from "google-map-react";
import { useState, useEffect, Suspense } from "react";
import Loading from "@/components/ui/icon/loading";

// Google Maps API Key
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
  <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg z-10 border">
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

function Processing() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "";
  console.log(orderId, "order id=============>");
  const { data, isLoading } = useGetCustomerOrderDetailsQuery(orderId, {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const orderDetails = data?.data;
  console.log(data?.data);

  const router = useRouter();
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [mapsInstance, setMapsInstance] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);

  // Initialize Google Maps API and adjust map bounds
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
    }
  };

  // Calculate route and draw polyline between pickup and delivery locations
  useEffect(() => {
    if (
      !mapInstance ||
      !mapsInstance ||
      !orderDetails?.pickup_location_lat ||
      !orderDetails?.pickup_location_long ||
      !orderDetails?.delivery_location_lat ||
      !orderDetails?.delivery_location_long
    )
      return;

    const directionsService = new mapsInstance.DirectionsService();
    const directionsRenderer = new mapsInstance.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "#4F46E5",
        strokeOpacity: 0.8,
        strokeWeight: 6,
      },
      suppressMarkers: true, // We'll use our custom markers
    });

    directionsRenderer.setMap(mapInstance);

    const request = {
      origin: {
        lat: parseFloat(orderDetails.pickup_location_lat),
        lng: parseFloat(orderDetails.pickup_location_long),
      },
      destination: {
        lat: parseFloat(orderDetails.delivery_location_lat),
        lng: parseFloat(orderDetails.delivery_location_long),
      },
      travelMode: mapsInstance.TravelMode.DRIVING,
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === mapsInstance.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);

        // Extract route information
        const route = result.routes[0].legs[0];
        setRouteInfo({
          distance: route.distance.text,
          duration: route.duration.text,
        });

        // Adjust map to show the entire route with padding
        const bounds = new mapsInstance.LatLngBounds();
        result.routes[0].legs.forEach((leg: any) => {
          bounds.extend(leg.start_location);
          bounds.extend(leg.end_location);
        });
        mapInstance.fitBounds(bounds, { padding: 60 });
      } else {
        // Fallback to simple polyline if directions service fails
        console.error("Directions request failed:", status);
        drawFallbackPolyline();
      }
    });

    // Fallback function for simple polyline
    const drawFallbackPolyline = () => {
      const polyline = new mapsInstance.Polyline({
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
        strokeOpacity: 0.8,
        strokeWeight: 4,
        strokeDashArray: [5, 5], // Dashed line for fallback
      });

      polyline.setMap(mapInstance);
    };

    // Cleanup on component unmount
    return () => {
      directionsRenderer.setMap(null);
    };
  }, [
    mapInstance,
    mapsInstance,
    orderDetails?.pickup_location_lat,
    orderDetails?.pickup_location_long,
    orderDetails?.delivery_location_lat,
    orderDetails?.delivery_location_long,
  ]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  }
  return (
    <div>
      <title>Delivered Processing</title>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div onClick={() => router.back()} className="flex cursor-pointer items-center gap-3">
          <Back />
          <h1 className="text-2xl font-medium text-gray-700">Delivery History</h1>
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
                  <span className="text-gray-800 font-medium">{orderDetails?.order_id}</span>
                </div>
              </div>

              {/* Product Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Short Description</label>
                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">{orderDetails?.description}</span>
                  <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                </div>
              </div>

              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
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
                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">{orderDetails?.company_name}</span>
                </div>
              </div>

              {/* Product Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Amount</label>
                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">{orderDetails?.product_amount}</span>
                  <span className="text-xs text-gray-500 ml-auto">(Optional)</span>
                </div>
              </div>

              {/* Delivery Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
                <div className="flex items-center gap-3 p-3 bg-[#FDF7E9] rounded-lg">
                  <Home className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-800">{orderDetails?.delivery_location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Section */}
          <div className="p-4 mb-6">
            <hr className="my-4 border-gray-200 border" />

            <div className="mt-12">
              <div className="flex flex-col sm:flex-row justify-between gap-14">
                <div className="w-full sm:w-1/2">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-medium text-gray-800">
                      Customer: {orderDetails?.customer_details?.name || ""}
                    </h1>
                    <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
                      <PhoneCall className="w-5 h-5 text-black p-1 rounded-full bg-white" />
                      <MessageSquareMore
                        className="w-5 h-5 text-black p-1 rounded-full bg-white"
                        onClick={() => router.push("/customer/message")}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    {orderDetails?.assign_driver_details?.name ? (
                      <h1 className="text-2xl font-medium text-gray-800">
                        Rider: {orderDetails?.assign_driver_details?.name || ""}
                      </h1>
                    ) : (
                      <h1 className="text-2xl font-medium text-red-300 ">
                        Rider don't assign
                      </h1>

                    )}
                    <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
                      <PhoneCall className="w-5 h-5 text-black p-1 rounded-full bg-white" />
                      <MessageSquareMore
                        className="w-5 h-5 text-black p-1 rounded-full bg-white"
                        onClick={() => router.push("/customer/message")}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[#D69D21] text-[16px] font-normal">ID#{orderDetails?.order_id}</p>
                    <p className="text-secondary text-xl font-normal">Weight - {orderDetails?.product_weight} kg</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.12231 12.3126L9.0902 10.9127L13.0581 12.3126L9.0902 4.20508L5.12231 12.3126Z"
                        fill="#D69D21"
                      />
                      <path
                        d="M17.5584 8.15969H16.6809C16.5136 4.45376 13.2921 1.23241 9.58628 1.06504V0.1875H8.59378V1.06504C4.88785 1.23238 1.6665 4.45386 1.49913 8.15969H0.621582V9.1522H1.49913C1.6665 12.8581 4.88795 16.0795 8.59378 16.2469V17.1244H9.58628V16.2469C13.2922 16.0795 16.5136 12.858 16.6809 9.1522H17.5585L17.5584 8.15969ZM9.58628 15.2517V14.4084H8.59378V15.2517C5.34142 15.0093 2.73665 12.4046 2.49425 9.15217H3.33752V8.15966H2.49425C2.73662 4.90731 5.34139 2.30254 8.59378 2.06013V2.9034H9.58628V2.06017C12.8386 2.30254 15.4434 4.90731 15.6858 8.15969H14.8425V9.1522H15.6858C15.4434 12.4046 12.8386 15.0093 9.58628 15.2517Z"
                        fill="#D69D21"
                      />
                    </svg>
                    <p className="text-secondary text-xl font-normal">{orderDetails?.pickup_location}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C5.92615 0 2.61194 3.31421 2.61194 7.38809C2.61194 8.72925 3.21342 10.1717 3.23862 10.2325C3.43289 10.6936 3.8162 11.4098 4.0926 11.8296L9.15822 19.505C9.36552 19.8196 9.67235 20 10 20C10.3277 20 10.6345 19.8196 10.8418 19.5054L15.9079 11.8296C16.1847 11.4098 16.5676 10.6936 16.7619 10.2325C16.7871 10.1721 17.3881 8.72968 17.3881 7.38809C17.3881 3.31421 14.0739 0 10 0ZM15.9605 9.89526C15.7871 10.3086 15.4303 10.9748 15.1821 11.3512L10.1161 19.0269C10.0161 19.1786 9.98439 19.1786 9.88443 19.0269L4.81837 11.3512C4.57022 10.9748 4.21342 10.3081 4.04001 9.89483C4.03262 9.87701 3.48113 8.54933 3.48113 7.38809C3.48113 3.79357 6.40551 0.869187 10 0.869187C13.5946 0.869187 16.5189 3.79357 16.5189 7.38809C16.5189 8.55106 15.9661 9.88223 15.9605 9.89526Z"
                        fill="#A95265"
                      />
                      <path
                        d="M10.0001 3.47754C7.8432 3.47754 6.08875 5.23243 6.08875 7.38888C6.08875 9.54534 7.8432 11.3002 10.0001 11.3002C12.157 11.3002 13.9114 9.54534 13.9114 7.38888C13.9114 5.23243 12.157 3.47754 10.0001 3.47754ZM10.0001 10.431C8.32299 10.431 6.95793 9.06641 6.95793 7.38888C6.95793 5.71135 8.32299 4.34673 10.0001 4.34673C11.6772 4.34673 13.0422 5.71135 13.0422 7.38888C13.0422 9.06641 11.6772 10.431 10.0001 10.431Z"
                        fill="#A95265"
                      />
                    </svg>
                    <p className="text-secondary text-xl font-normal">{orderDetails?.delivery_location}</p>
                  </div>

                  {/* Route Information */}
                  {/* {routeInfo && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Route Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Distance:</span>
                          <span className="text-sm font-medium text-gray-800">{routeInfo.distance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Est. Time:</span>
                          <span className="text-sm font-medium text-gray-800">{routeInfo.duration}</span>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
                <div className="w-full sm:w-1/2 relative">
                  {orderDetails?.pickup_location_lat &&
                    orderDetails?.pickup_location_long &&
                    orderDetails?.delivery_location_lat &&
                    orderDetails?.delivery_location_long ? (
                    <div style={{ height: "400px", width: "100%" }} className="rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
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
        </CardContent>
      </Card>
    </div>
  );
}

export default function Process() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loading /></div>}>
      <Processing />
    </Suspense>
  )
}