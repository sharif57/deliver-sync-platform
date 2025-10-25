/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
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

  const { data, isLoading, isError } = useGetCustomerOrdersQuery(undefined, {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  // Map API data to DeliveryItem format
const deliveryData: DeliveryItem[] = data?.data?.map((order: any) => {
  const createdAt = new Date(order.created_at);
  let status: DeliveryItem["status"];
  let statusColor: DeliveryItem["statusColor"];

  switch (order.status.toLowerCase()) {
    case "delivered":
      status = "Delivered";
      statusColor = "green";
      break;
    case "assigned":
    case "picked_up":
    case "on_the_way":
      status = "Ongoing";
      statusColor = "blue";
      break;
    case "cancelled":
      status = "Cancelled";
      statusColor = "red";
      break;
    case "pending":
    case "draft":
    case "confirmed":
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
    link: order.status.toLowerCase() === "delivered"
      ? `/company/earning-history/delivered/?id=${order.id}`
      : `/company/earning-history/processing/?id=${order.id}`,
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
              {(["All", "Ongoing", "Delivered", "Cancelled"] as FilterType[]).map(
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
                      className={`py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap transition-colors flex items-center gap-1 sm:gap-2 rounded-lg ${activeFilter === filter
                          ? "bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white"
                          : "border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        }`}
                    >

                      {filter === "Calendar"
                        ? selectedDate
                          ? selectedDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })
                          : ""
                        : filter}
                    </button>

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
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 md:px-6 py-3 sm:py-4 m-2 sm:m-3 md:m-4 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors ${index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
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