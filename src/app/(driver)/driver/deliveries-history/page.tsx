/* eslint-disable @typescript-eslint/no-explicit-any */



"use client";

import { useState } from "react";
import { ChevronRight} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/shareUi/onBack";
import { useGetDriverOrdersQuery } from "@/redux/feature/driverSlice";

interface DeliveryItem {
  id: string;
  orderId: string;
  date: string;
  status: "Processing" | "Delivered" | "Ongoing";
  statusColor: "orange" | "green" | "blue";
  dateObj: Date;
  link?: string;
}

type FilterType = "All" | "Calendar" | "Ongoing" | "Delivered";

export default function DeliverHistory() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const { data, isLoading, isError } = useGetDriverOrdersQuery(undefined);

  // Map API data to DeliveryItem format
  const deliveryData: DeliveryItem[] = data?.data?.map((item: any) => {
    const createdAt = new Date(item.created_at);
    let status: "Processing" | "Delivered" | "Ongoing";
    let statusColor: "orange" | "green" | "blue";

    // Map API status to user-friendly status and color
    switch (item.status.toLowerCase()) {
      case "confirmed":
        status = "Processing";
        statusColor = "orange";
        break;
      case "assigned":
        status = "Ongoing";
        statusColor = "blue";
        break;
      case "delivered": // Assuming "delivered" status exists; adjust if needed
        status = "Delivered";
        statusColor = "green";
        break;
      default:
        status = "Processing";
        statusColor = "orange";
    }

    return {
      id: item.id,
      orderId: item.order_id,
      date: createdAt.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status,
      statusColor,
      dateObj: createdAt,
      link: `/driver/deliveries-history/${item.id}`,
    };
  }) || [];

  // Filter data based on search query and active filter
  const getFilteredData = () => {
    let filtered = deliveryData;

    // Apply status or calendar filter
    switch (activeFilter) {
      case "Ongoing":
        filtered = filtered.filter(
          (item) => item.status === "Processing" || item.status === "Ongoing"
        );
        break;
      case "Delivered":
        filtered = filtered.filter((item) => item.status === "Delivered");
        break;
      case "Calendar":
        if (selectedDate) {
          const selectedDateStr = selectedDate.toDateString();
          filtered = filtered.filter(
            (item) => item.dateObj.toDateString() === selectedDateStr
          );
        }
        break;
      case "All":
      default:
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
      default:
        return "text-gray-500";
    }
  };

  

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen">
      <title>Delivery History</title>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="lg:flex justify-between items-center">
          <PageHeader title="Delivery History" />

          {/* Search and Filter Tabs */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
        

              {/* Filter Tabs */}
              <div className="flex gap-2 sm:gap-4 ">
                {(["All", "Calendar", "Ongoing", "Delivered"] as FilterType[]).map((filter) => (
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
                      className={`py-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 sm:gap-2 rounded-lg ${
                        activeFilter === filter
                          ? "bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                     
                      {filter === "Calendar"
                        ? selectedDate
                          ? selectedDate.toLocaleDateString()
                          : ""
                        : filter}
                    </button>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
            Loading deliveries...
          </div>
        )}
        {isError && (
          <div className="px-4 py-8 text-center text-red-500 text-sm sm:text-base">
            Error fetching deliveries. Please try again.
          </div>
        )}

        {/* Delivery List */}
        {!isLoading && !isError && (
          <div className="bg-white rounded-t-3xl rounded-b-3xl shadow-sm border border-gray-100 overflow-hidden">
            {filteredData.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">No deliveries found for the selected criteria</div>
            ) : (
              filteredData.map((item, index) => (
                <Link
                  href={item.link || `/driver/deliveries-history/${item.id}`}
                  key={item.id}
                  className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 m-2 sm:m-4 bg-heroBg rounded-3xl hover:bg-gray-100 transition-colors ${
                    index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                    <div className="flex items-center gap-2 sm:gap-3">
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
                  <div className="bg-white p-2 rounded-lg">
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}