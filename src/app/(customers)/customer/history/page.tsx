/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useState } from "react";
// import { ChevronRight, Calendar, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import PageHeader from "@/components/shareUi/onBack";
// import { useGetCustomerOrdersQuery } from "@/redux/feature/customerSlice";

// interface DeliveryItem {
//   id: string;
//   orderId: string;
//   date: string;
//   status: "Processing" | "Delivered" | "Ongoing";
//   statusColor: "orange" | "green" | "blue";
//   dateObj: Date;
//   link?: string;
// }

// const deliveryData: DeliveryItem[] = [
//   {
//     id: "1",
//     orderId: "12345",
//     date: "14 May 2019",
//     status: "Processing",
//     statusColor: "orange",
//     dateObj: new Date("2019-05-14"),
//   },
//   {
//     id: "2",
//     orderId: "12345",
//     date: "14 May 2019",
//     status: "Processing",
//     statusColor: "orange",
//     dateObj: new Date("2019-05-14"),
//   },
//   {
//     id: "3",
//     orderId: "12345",
//     date: "15 May 2019",
//     status: "Processing",
//     statusColor: "orange",
//     dateObj: new Date("2019-05-15"),
//   },
//   {
//     id: "4",
//     orderId: "12345",
//     date: "16 May 2019",
//     status: "Processing",
//     statusColor: "orange",
//     dateObj: new Date("2019-05-16"),
//   },
//   {
//     id: "5",
//     orderId: "12346",
//     date: "15 May 2019",
//     status: "Delivered",
//     statusColor: "green",
//     link: "/customer/history/delivered",
//     dateObj: new Date("2019-05-15"),
//   },
//   {
//     id: "6",
//     orderId: "12347",
//     date: "16 May 2019",
//     status: "Ongoing",
//     statusColor: "blue",
//     dateObj: new Date("2019-05-16"),
//   },
//   {
//     id: "7",
//     orderId: "12348",
//     date: "17 May 2019",
//     status: "Delivered",
//     statusColor: "green",
//     link: "/customer/history/delivered",
//     dateObj: new Date("2019-05-17"),
//   },
//   {
//     id: "8",
//     orderId: "12349",
//     date: "18 May 2019",
//     status: "Ongoing",
//     statusColor: "blue",
//     dateObj: new Date("2019-05-18"),
//   },
// ];

// type FilterType = "All" | "Calendar" | "Ongoing" | "Delivered";

// export default function DeliveryHistory() {
//   const [activeFilter, setActiveFilter] = useState<FilterType>("All");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const {data} = useGetCustomerOrdersQuery(undefined);
//   console.log(data?.data,'history=========>')

//   const getFilteredData = () => {
//     let filtered = deliveryData;

//     switch (activeFilter) {
//       case "Ongoing":
//         filtered = deliveryData.filter(
//           (item) => item.status === "Processing" || item.status === "Ongoing",
//         );
//         break;
//       case "Delivered":
//         filtered = deliveryData.filter((item) => item.status === "Delivered");
//         break;
//       case "Calendar":
//         if (selectedDate) {
//           const selectedDateStr = selectedDate.toDateString();
//           filtered = deliveryData.filter(
//             (item) => item.dateObj.toDateString() === selectedDateStr,
//           );
//         }
//         break;
//       case "All":
//       default:
//         filtered = deliveryData;
//         break;
//     }

//     return filtered;
//   };

//   const getStatusColor = (color: string) => {
//     switch (color) {
//       case "orange":
//         return "text-orange-500";
//       case "green":
//         return "text-green-500";
//       case "blue":
//         return "text-blue-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const renderCalendar = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();

//     const firstDay = new Date(currentYear, currentMonth, 1);
//     const lastDay = new Date(currentYear, currentMonth + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days = [];

//     // Empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(<div key={`empty-${i}`} className="w-8 h-8 sm:w-10 sm:h-10"></div>);
//     }

//     // Days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentYear, currentMonth, day);
//       const isSelected =
//         selectedDate && date.toDateString() === selectedDate.toDateString();
//       const hasDelivery = deliveryData.some(
//         (item) => item.dateObj.toDateString() === date.toDateString(),
//       );

//       days.push(
//         <button
//           key={day}
//           onClick={() => {
//             setSelectedDate(date);
//             setActiveFilter("Calendar");
//             setShowCalendar(false);
//           }}
//           className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-full flex items-center justify-center transition-colors ${isSelected
//               ? "bg-orange-500 text-white"
//               : hasDelivery
//                 ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
//                 : "hover:bg-gray-100 text-gray-700"
//             }`}
//         >
//           {day}
//         </button>,
//       );
//     }

//     return (
//       <div className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-64 sm:w-72 md:w-80">
//         <div className="flex items-center justify-between mb-3 sm:mb-4">
//           <h3 className="font-medium text-gray-900 text-sm sm:text-base">
//             {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
//           </h3>
//           <button
//             onClick={() => setShowCalendar(false)}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//             <div
//               key={day}
//               className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium text-gray-500 flex items-center justify-center"
//             >
//               {day}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 gap-1">{days}</div>

//         {selectedDate && (
//           <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
//             <button
//               onClick={() => {
//                 setSelectedDate(null);
//                 setActiveFilter("All");
//                 setShowCalendar(false);
//               }}
//               className="text-xs sm:text-sm text-orange-600 hover:text-orange-700"
//             >
//               Clear selection
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const filteredData = getFilteredData();
//   const router = useRouter();

//   return (
//     <div className="min-h-screen ">
//       <title>Delivery History</title>
//       <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
//         <div className="lg:flex justify-between items-center">

//           <PageHeader title="Delivery History" onBack={() => router.back()} />

//           {/* Filter Tabs */}
//           <div className="mb-4 sm:mb-6">
//             <div className="flex gap-2 sm:gap-4 ">
//               {(["All", "Calendar", "Ongoing", "Delivered"] as FilterType[]).map((filter) => (
//                 <div key={filter} className="relative flex-shrink-0">
//                   <button
//                     onClick={() => {
//                       if (filter === "Calendar") {
//                         setShowCalendar(!showCalendar);
//                       } else {
//                         setActiveFilter(filter);
//                         setShowCalendar(false);
//                       }
//                     }}
//                     className={`py-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 sm:gap-2 rounded-lg ${activeFilter === filter
//                         ? " bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white"
//                         : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                       }`}
//                   >
//                     {filter === "Calendar" && (
//                       <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
//                     )}
//                     {filter === "Calendar"
//                       ? selectedDate
//                         ? selectedDate.toLocaleDateString()
//                         : "Calendar"
//                       : filter}
//                   </button>

//                   {filter === "Calendar" && showCalendar && renderCalendar()}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Delivery List */}
//         <div className="bg-white rounded-t-3xl rounded-b-3xl shadow-sm border border-gray-100 overflow-hidden">
//           {filteredData.length === 0 ? (
//             <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
//               No deliveries found for the selected criteria
//             </div>
//           ) : (
//             filteredData.map((item, index) => (
//               <Link
//                 href={item.link || "/customer/track-my-order"}
//                 key={item.id}
//                 className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 m-2 sm:m-4 bg-heroBg rounded-3xl hover:bg-gray-100 transition-colors ${index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
//                   }`}
//               >
//                 <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">
//                       ID: {item.orderId}
//                     </span>
//                     <span className="text-xs sm:text-sm text-gray-500">{item.date}</span>
//                   </div>
//                   <span
//                     className={`text-xs sm:text-sm md:text-base font-medium ${getStatusColor(
//                       item.statusColor,
//                     )}`}
//                   >
//                     {item.status}
//                   </span>
//                 </div>
//                 <div className="bg-white p-2 rounded-lg">
//                   <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
//                 </div>
//               </Link>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }  

// "use client";

// import { useState } from "react";
// import { ChevronRight, Calendar, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import PageHeader from "@/components/shareUi/onBack";
// import { useGetCustomerOrdersQuery } from "@/redux/feature/customerSlice";

// interface DeliveryItem {
//   id: string;
//   orderId: string;
//   date: string;
//   status: "Processing" | "Delivered" | "Ongoing" | "Cancelled";
//   statusColor: "orange" | "green" | "blue" | "red";
//   dateObj: Date;
//   link?: string;
//   apiStatus: string;
//   customerImage: string;
//   driverImage?: string;
// }

// type FilterType = "All" | "Calendar" | "Ongoing" | "Delivered" | "Cancelled";

// export default function DeliveryHistory() {
//   const [activeFilter, setActiveFilter] = useState<FilterType>("All");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const { data, isLoading, isError } = useGetCustomerOrdersQuery(undefined);
//   console.log(data?.data, "history=========>");

//   // Map API data to DeliveryItem format
//   const deliveryData: DeliveryItem[] = data?.data?.map((order: any) => {
//     const createdAt = new Date(order.created_at);
//     let status: DeliveryItem["status"];
//     let statusColor: DeliveryItem["statusColor"];

//     switch (order.status.toLowerCase()) {
//       case "confirmed":
//         status = "Delivered";
//         statusColor = "green";
//         break;
//       case "assigned":
//         status = "Ongoing";
//         statusColor = "blue";
//         break;
//       case "cancelled":
//         status = "Cancelled";
//         statusColor = "red";
//         break;
//       case "pending":
//       case "draft":
//       default:
//         status = "Processing";
//         statusColor = "orange";
//         break;
//     }

//     return {
//       id: order.id,
//       orderId: order.order_id,
//       date: createdAt.toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }),
//       status,
//       statusColor,
//       dateObj: createdAt,
//       link: status === "Delivered" ? "/customer/history/delivered" : "/customer/track-my-order",
//       apiStatus: order.status,
//       customerImage: `http://10.10.12.49:8000${order.customer_details.image}`,
//       driverImage: order.assign_driver_details?.image
//         ? `http://10.10.12.49:8000${order.assign_driver_details.image}`
//         : undefined,
//     };
//   }) || [];

//   const getFilteredData = () => {
//     let filtered = deliveryData;

//     switch (activeFilter) {
//       case "Ongoing":
//         filtered = deliveryData.filter(
//           (item) => item.status === "Processing" || item.status === "Ongoing"
//         );
//         break;
//       case "Delivered":
//         filtered = deliveryData.filter((item) => item.status === "Delivered");
//         break;
//       case "Cancelled":
//         filtered = deliveryData.filter((item) => item.status === "Cancelled");
//         break;
//       case "Calendar":
//         if (selectedDate) {
//           const selectedDateStr = selectedDate.toDateString();
//           filtered = deliveryData.filter(
//             (item) => item.dateObj.toDateString() === selectedDateStr
//           );
//         }
//         break;
//       case "All":
//       default:
//         filtered = deliveryData;
//         break;
//     }

//     return filtered;
//   };

//   const getStatusColor = (color: string) => {
//     switch (color) {
//       case "orange":
//         return "text-orange-500";
//       case "green":
//         return "text-green-500";
//       case "blue":
//         return "text-blue-500";
//       case "red":
//         return "text-red-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const handleConfirmDelivery = async (orderId: string) => {
//     try {
//       console.log(`Confirming delivery for order ${orderId}`);
//       // Replace with your API call to confirm delivery
//       // Example: await confirmDeliveryAPI(orderId);
//     } catch (error) {
//       console.error("Error confirming delivery:", error);
//     }
//   };

//   const renderCalendar = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();

//     const firstDay = new Date(currentYear, currentMonth, 1);
//     const lastDay = new Date(currentYear, currentMonth + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days = [];

//     // Empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(<div key={`empty-${i}`} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"></div>);
//     }

//     // Days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentYear, currentMonth, day);
//       const isSelected =
//         selectedDate && date.toDateString() === selectedDate.toDateString();
//       const hasDelivery = deliveryData.some(
//         (item) => item.dateObj.toDateString() === date.toDateString()
//       );

//       days.push(
//         <button
//           key={day}
//           onClick={() => {
//             setSelectedDate(date);
//             setActiveFilter("Calendar");
//             setShowCalendar(false);
//           }}
//           className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-xs sm:text-sm rounded-full flex items-center justify-center transition-colors ${isSelected
//               ? "bg-orange-500 text-white"
//               : hasDelivery
//                 ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
//                 : "hover:bg-gray-100 text-gray-700"
//             }`}
//         >
//           {day}
//         </button>
//       );
//     }

//     return (
//       <div className="absolute top-full right-0 sm:left-0 mt-2  border border-gray-200 rounded-lg shadow-lg p-3 sm:p-4 z-50 w-56 sm:w-64 md:w-72 lg:w-80 ">
//         <div className="flex items-center justify-between mb-2 sm:mb-3">
//           <h3 className="font-medium text-gray-900 text-xs sm:text-sm md:text-base">
//             {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
//           </h3>
//           <button
//             onClick={() => setShowCalendar(false)}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <X className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//             <div
//               key={day}
//               className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 flex items-center justify-center"
//             >
//               {day}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 gap-1 sm:gap-2">{days}</div>

//         {selectedDate && (
//           <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
//             <button
//               onClick={() => {
//                 setSelectedDate(null);
//                 setActiveFilter("All");
//                 setShowCalendar(false);
//               }}
//               className="text-[10px] sm:text-xs md:text-sm text-orange-600 hover:text-orange-700"
//             >
//               Clear selection
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const filteredData = getFilteredData();
//   const router = useRouter();

//   return (
//     <div className="min-h-screen ">
//       <title>Delivery History</title>
//       <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 ">
//         <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
//           <PageHeader title="Delivery History" onBack={() => router.back()} />

//           {/* Filter Tabs */}
//           <div className="mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
//             <div className="flex gap-2 sm:gap-3 min-w-max">
//               {(["All", "Calendar", "Ongoing", "Delivered", "Cancelled"] as FilterType[]).map(
//                 (filter) => (
//                   <div key={filter} className="relative flex-shrink-0">
//                     <button
//                       onClick={() => {
//                         if (filter === "Calendar") {
//                           setShowCalendar(!showCalendar);
//                         } else {
//                           setActiveFilter(filter);
//                           setShowCalendar(false);
//                         }
//                       }}
//                       className={`py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap transition-colors flex items-center gap-1 sm:gap-2 rounded-lg ${activeFilter === filter
//                           ? "bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white"
//                           : "border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                         }`}
//                     >
//                       {filter === "Calendar" && (
//                         <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
//                       )}
//                       {filter === "Calendar"
//                         ? selectedDate
//                           ? selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })
//                           : "Calendar"
//                         : filter}
//                     </button>

//                     {filter === "Calendar" && showCalendar && renderCalendar()}
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Delivery List */}
//         <div className="bg-white rounded-t-3xl rounded-b-3xl shadow-sm border border-gray-100 overflow-hidden">
//           {isLoading ? (
//             <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
//               Loading deliveries...
//             </div>
//           ) : isError ? (
//             <div className="px-4 py-8 text-center text-red-500 text-sm sm:text-base">
//               Failed to load deliveries. Please try again.
//             </div>
//           ) : filteredData.length === 0 ? (
//             <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
//               No deliveries found for the selected criteria
//             </div>
//           ) : (
//             filteredData.map((item, index) => (
//               <div
//                 key={item.id}
//                 className={`flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 m-2 sm:m-3 md:m-4 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors ${index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
//                   }`}
//               >
//                 <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-5">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <Image
//                       src={item.customerImage}
//                       alt="Customer"
//                       width={32}
//                       height={32}
//                       className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
//                     />
//                     <div className="flex flex-col">
//                       <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">
//                         ID: {item.orderId}
//                       </span>
//                       <span className="text-xs sm:text-sm text-gray-500">{item.date}</span>
//                     </div>
//                     <span
//                       className={`text-xs sm:text-sm md:text-base font-medium ${getStatusColor(
//                         item.statusColor
//                       )}`}
//                     >
//                       {item.status}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
//                   {item.apiStatus !== "cancelled" && (
//                     <button
//                       onClick={() => handleConfirmDelivery(item.id)}
//                       className="text-xs sm:text-sm md:text-base bg-primary text-white py-2 px-4 sm:px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors w-24 sm:w-28 md:w-32"
//                       disabled={item.apiStatus === "confirmed"}
//                     >
//                       {item.apiStatus === "confirmed" ? "Confirmed" : "Confirm"}
//                     </button>
//                   )}
//                   <Link href={item.link || "/customer/track-my-order"} className="bg-white p-1.5 sm:p-2 rounded-lg">
//                     <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
//                   </Link>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { ChevronRight, Calendar, X } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import PageHeader from "@/components/shareUi/onBack";
// import { useGetCustomerOrdersQuery } from "@/redux/feature/customerSlice";

// interface DeliveryItem {
//   id: string;
//   orderId: string;
//   date: string;
//   status: "Processing" | "Delivered" | "Ongoing" | "Cancelled";
//   statusColor: "orange" | "green" | "blue" | "red";
//   dateObj: Date;
//   link?: string;
//   apiStatus: string; // Original API status
//   customerImage: string;
//   driverImage?: string;
// }

// type FilterType = "All" | "Calendar" | "Ongoing" | "Delivered" | "Cancelled";

// export default function DeliveryHistory() {
//   const [activeFilter, setActiveFilter] = useState<FilterType>("All");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [showCalendar, setShowCalendar] = useState(false);

//   const { data, isLoading, isError } = useGetCustomerOrdersQuery(undefined);
//   console.log(data?.data, "history=========>");

//   // Map API data to DeliveryItem format
//   const deliveryData: DeliveryItem[] = data?.data?.map((order: any) => {
//     const createdAt = new Date(order.created_at);
//     let status: DeliveryItem["status"];
//     let statusColor: DeliveryItem["statusColor"];

//     switch (order.status.toLowerCase()) {
//       case "confirmed":
//         status = "Delivered";
//         statusColor = "green";
//         break;
//       case "assigned":
//         status = "Ongoing";
//         statusColor = "blue";
//         break;
//       case "cancelled":
//         status = "Cancelled";
//         statusColor = "red";
//         break;
//       case "pending":
//       case "draft":
//       default:
//         status = "Processing";
//         statusColor = "orange";
//         break;
//     }

//     return {
//       id: order.id,
//       orderId: order.order_id,
//       date: createdAt.toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }),
//       status,
//       statusColor,
//       dateObj: createdAt,
//       link: status === "Delivered" ? "/customer/history/delivered" : "/customer/track-my-order",
//       apiStatus: order.status,
//       customerImage: `${process.env.NEXT_PUBLIC_API_URL}${order.customer_details.image}`,
//       driverImage: order.assign_driver_details?.image
//         ? `${process.env.NEXT_PUBLIC_API_URL}${order.assign_driver_details.image}`
//         : undefined,
//     };
//   }) || [];

//   const getFilteredData = () => {
//     let filtered = deliveryData;

//     switch (activeFilter) {
//       case "Ongoing":
//         filtered = deliveryData.filter(
//           (item) => item.status === "Processing" || item.status === "Ongoing"
//         );
//         break;
//       case "Delivered":
//         filtered = deliveryData.filter((item) => item.status === "Delivered");
//         break;
//       case "Cancelled":
//         filtered = deliveryData.filter((item) => item.status === "Cancelled");
//         break;
//       case "Calendar":
//         if (selectedDate) {
//           const selectedDateStr = selectedDate.toDateString();
//           filtered = deliveryData.filter(
//             (item) => item.dateObj.toDateString() === selectedDateStr
//           );
//         }
//         break;
//       case "All":
//       default:
//         filtered = deliveryData;
//         break;
//     }

//     return filtered;
//   };

//   const getStatusColor = (color: string) => {
//     switch (color) {
//       case "orange":
//         return "text-orange-500";
//       case "green":
//         return "text-green-500";
//       case "blue":
//         return "text-blue-500";
//       case "red":
//         return "text-red-500";
//       default:
//         return "text-gray-500";
//     }
//   };

//   const handleConfirmDelivery = async (orderId: string) => {
//     try {
//       // Replace with your API call to confirm delivery
//       console.log(`Confirming delivery for order ${orderId}`);
//       // Example: await confirmDeliveryAPI(orderId);
//     } catch (error) {
//       console.error("Error confirming delivery:", error);
//     }
//   };

//   const renderCalendar = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();

//     const firstDay = new Date(currentYear, currentMonth, 1);
//     const lastDay = new Date(currentYear, currentMonth + 1, 0);
//     const daysInMonth = lastDay.getDate();
//     const startingDayOfWeek = firstDay.getDay();

//     const days = [];

//     // Empty cells for days before the first day of the month
//     for (let i = 0; i < startingDayOfWeek; i++) {
//       days.push(<div key={`empty-${i}`} className="w-8 h-8 sm:w-10 sm:h-10"></div>);
//     }

//     // Days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const date = new Date(currentYear, currentMonth, day);
//       const isSelected =
//         selectedDate && date.toDateString() === selectedDate.toDateString();
//       const hasDelivery = deliveryData.some(
//         (item) => item.dateObj.toDateString() === date.toDateString()
//       );

//       days.push(
//         <button
//           key={day}
//           onClick={() => {
//             setSelectedDate(date);
//             setActiveFilter("Calendar");
//             setShowCalendar(false);
//           }}
//           className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-full flex items-center justify-center transition-colors ${
//             isSelected
//               ? "bg-orange-500 text-white"
//               : hasDelivery
//               ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
//               : "hover:bg-gray-100 text-gray-700"
//           }`}
//         >
//           {day}
//         </button>
//       );
//     }

//     return (
//       <div className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-64 sm:w-72 md:w-80">
//         <div className="flex items-center justify-between mb-3 sm:mb-4">
//           <h3 className="font-medium text-gray-900 text-sm sm:text-base">
//             {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
//           </h3>
//           <button
//             onClick={() => setShowCalendar(false)}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="grid grid-cols-7 gap-1 mb-2">
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
//             <div
//               key={day}
//               className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium text-gray-500 flex items-center justify-center"
//             >
//               {day}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-7 gap-1">{days}</div>

//         {selectedDate && (
//           <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
//             <button
//               onClick={() => {
//                 setSelectedDate(null);
//                 setActiveFilter("All");
//                 setShowCalendar(false);
//               }}
//               className="text-xs sm:text-sm text-orange-600 hover:text-orange-700"
//             >
//               Clear selection
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const filteredData = getFilteredData();
//   const router = useRouter();

//   return (
//     <div className="min-h-screen">
//       <title>Delivery History</title>
//       <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
//         <div className="lg:flex justify-between items-center">
//           <PageHeader title="Delivery History" onBack={() => router.back()} />

//           {/* Filter Tabs */}
//           <div className="mb-4 sm:mb-6">
//             <div className="flex gap-2 sm:gap-4">
//               {(["All", "Calendar", "Ongoing", "Delivered", "Cancelled"] as FilterType[]).map(
//                 (filter) => (
//                   <div key={filter} className="relative flex-shrink-0">
//                     <button
//                       onClick={() => {
//                         if (filter === "Calendar") {
//                           setShowCalendar(!showCalendar);
//                         } else {
//                           setActiveFilter(filter);
//                           setShowCalendar(false);
//                         }
//                       }}
//                       className={`py-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 sm:gap-2 rounded-lg ${
//                         activeFilter === filter
//                           ? "bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white"
//                           : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//                       }`}
//                     >
//                       {filter === "Calendar" && (
//                         <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
//                       )}
//                       {filter === "Calendar"
//                         ? selectedDate
//                           ? selectedDate.toLocaleDateString()
//                           : "Calendar"
//                         : filter}
//                     </button>

//                     {filter === "Calendar" && showCalendar && renderCalendar()}
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Delivery List */}
//         <div className="bg-white rounded-t-3xl rounded-b-3xl shadow-sm border border-gray-100 overflow-hidden">
//           {isLoading ? (
//             <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
//               Loading deliveries...
//             </div>
//           ) : isError ? (
//             <div className="px-4 py-8 text-center text-red-500 text-sm sm:text-base">
//               Failed to load deliveries. Please try again.
//             </div>
//           ) : filteredData.length === 0 ? (
//             <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
//               No deliveries found for the selected criteria
//             </div>
//           ) : (
//             filteredData.map((item, index) => (
//               <div
//                 key={item.id}
//                 className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 m-2 sm:m-4 bg-heroBg rounded-3xl hover:bg-gray-100 transition-colors ${
//                   index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
//                 }`}
//               >
//                 <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     {/* <Image
//                       src={item.customerImage}
//                       alt="Customer"
//                       width={40}
//                       height={40}
//                       className="rounded-full"
//                     /> */}
//                     {/* {item.driverImage && (
//                       <Image
//                         src={item.driverImage}
//                         alt="Driver"
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                     )} */}
//                     <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">
//                       ID: {item.orderId}
//                     </span>
//                     <span className="text-xs sm:text-sm text-gray-500">{item.date}</span>
//                   </div>
//                   <span
//                     className={`text-xs sm:text-sm md:text-base font-medium ${getStatusColor(
//                       item.statusColor
//                     )}`}
//                   >
//                     {item.status}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-6">
//                   {item.apiStatus !== "cancelled" && (
//                     <button
//                       onClick={() => handleConfirmDelivery(item.id)}
//                       className="text-sm sm:text-base md:text-lg bg-gradient-to-r  from-[#E0B351] to-[#8B6E31] text-white py-2 px-8  rounded-lg font-normal hover:bg-primary-dark transition-colors w-full "
//                       disabled={item.apiStatus === "confirmed"}
//                     >
//                       {item.apiStatus === "confirmed" ? "Already Confirmed" : "Confirm"}
//                     </button>
//                   )}
//                   <Link href={`/customer/history/delivered/?id=${item.id}` || `/customer/track-my-order/?id=${item.id}`} className="bg-white py-3 px-4 rounded-lg">
//                     <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
//                   </Link>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ChevronRight, Calendar, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shareUi/onBack";
import { useGetCustomerOrdersQuery } from "@/redux/feature/customerSlice";

interface DeliveryItem {
  id: string;
  orderId: string;
  date: string;
  status: "Processing" | "Delivered" | "Ongoing" | "Cancelled";
  statusColor: "orange" | "green" | "blue" | "red";
  dateObj: Date;
  link?: string;
  apiStatus: string;
  customerImage: string;
  driverImage?: string;
}

type FilterType = "All" | "Calendar" | "Ongoing" | "Delivered" | "Cancelled";

export default function DeliveryHistory() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const { data, isLoading, isError } = useGetCustomerOrdersQuery(undefined);
  console.log(data?.data, "history=========>");

  const deliveryData: DeliveryItem[] = data?.data?.map((order: any) => {
    const createdAt = new Date(order.created_at);
    let status: DeliveryItem["status"];
    let statusColor: DeliveryItem["statusColor"];

    switch (order.status.toLowerCase()) {
      case "confirmed":
        status = "Delivered";
        statusColor = "green";
        break;
      case "assigned":
        status = "Ongoing";
        statusColor = "blue";
        break;
      case "cancelled":
        status = "Cancelled";
        statusColor = "red";
        break;
      case "pending":
      case "draft":
      default:
        status = "Processing";
        statusColor = "orange";
        break;
    }

    return {
      id: order.id,
      orderId: order.order_id,
      date: createdAt.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status,
      statusColor,
      dateObj: createdAt,
      link: order.status === "assigned" 
        ? `/customer/history/delivered/?id=${order.id}` 
        : `/customer/track-my-order/?id=${order.id}`,
      apiStatus: order.status,
    };
  }) || [];

  const getFilteredData = () => {
    let filtered = deliveryData;

    switch (activeFilter) {
      case "Ongoing":
        filtered = deliveryData.filter(
          (item) => item.status === "Processing" || item.status === "Ongoing"
        );
        break;
      case "Delivered":
        filtered = deliveryData.filter((item) => item.status === "Delivered");
        break;
      case "Cancelled":
        filtered = deliveryData.filter((item) => item.status === "Cancelled");
        break;
      case "Calendar":
        if (selectedDate) {
          const selectedDateStr = selectedDate.toDateString();
          filtered = deliveryData.filter(
            (item) => item.dateObj.toDateString() === selectedDateStr
          );
        }
        break;
      case "All":
      default:
        filtered = deliveryData;
        break;
    }

    return filtered;
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case "orange":
        return "text-orange-500";
      case "green":
        return "text-green-500";
      case "blue":
        return "text-blue-500";
      case "red":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };





  const filteredData = getFilteredData();
  const router = useRouter();

  return (
    <div className="min-h-screen ">
      <title>Delivery History</title>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 ">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <PageHeader title="Delivery History" onBack={() => router.back()} />

          {/* Filter Tabs */}
          <div className="mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 sm:gap-3 min-w-max">
              {(["All", "Calendar", "Ongoing", "Delivered", "Cancelled"] as FilterType[]).map(
                (filter) => (
                  <div key={filter} className="relative flex-shrink-0">
                    <button
                      onClick={() => {
                        if (filter === "Calendar") {
                          setShowCalendar(!showCalendar);
                        } else {
                          setActiveFilter(filter);
                          setShowCalendar(false);
                        }
                      }}
                      className={`py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap transition-colors flex items-center gap-1 sm:gap-2 rounded-lg ${
                        activeFilter === filter
                          ? "bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white"
                          : "border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {/* {filter === "" && (
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                      )} */}
                      {filter === "Calendar"
                        ? selectedDate
                          ? selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })
                          : ""
                        : filter}
                    </button>

                    {filter === "Calendar" && showCalendar}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Delivery List */}
        <div className="bg-white rounded-t-3xl rounded-b-3xl shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
              Loading deliveries...
            </div>
          ) : isError ? (
            <div className="px-4 py-8 text-center text-red-500 text-sm sm:text-base">
              Failed to load deliveries. Please try again.
            </div>
          ) : filteredData.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
              No deliveries found for the selected criteria
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 m-2 sm:m-3 md:m-4 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors ${
                  index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">
                        ID: {item.orderId}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">{item.date}</span>
                    </div>
                    <span
                      className={`text-xs sm:text-sm md:text-base font-medium ${getStatusColor(
                        item.statusColor
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                  {/* {item.apiStatus !== "cancelled" && (
                    <button
                      onClick={() => handleConfirmDelivery(item.id)}
                      className="text-xs sm:text-sm md:text-base bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white py-2 px-4 sm:px-6 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#d4a847] hover:to-[#7a5d29] transition-colors w-24 sm:w-28 md:w-32"
                      disabled={item.apiStatus === "confirmed"}
                    >
                      {item.apiStatus === "confirmed" ? "Already Confirmed" : "Confirm"}
                    </button>
                  )} */}
                  <Link
                    href={item.link ?? `/customer/track-my-order/?id=${item.id}`}
                    className="bg-white p-1.5 sm:p-2 rounded-lg"
                    aria-label="View order details"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}