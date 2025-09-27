// import React from 'react'

// export default function DeliverHistory() {
//   return (
//     <div>
      
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { ChevronRight, Calendar, X } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/shareUi/onBack";

interface DeliveryItem {
  id: string;
  orderId: string;
  date: string;
  status: "Processing" | "Delivered" | "Ongoing";
  statusColor: "orange" | "green" | "blue";
  dateObj: Date;
  link?: string;
}

const deliveryData: DeliveryItem[] = [
  {
    id: "1",
    orderId: "12345",
    date: "14 May 2019",
    status: "Processing",
    statusColor: "orange",
    dateObj: new Date("2019-05-14"),
  },
  {
    id: "2",
    orderId: "12345",
    date: "14 May 2019",
    status: "Processing",
    statusColor: "orange",
    dateObj: new Date("2019-05-14"),
  },
  {
    id: "3",
    orderId: "12345",
    date: "15 May 2019",
    status: "Processing",
    statusColor: "orange",
    dateObj: new Date("2019-05-15"),
  },
  {
    id: "4",
    orderId: "12345",
    date: "16 May 2019",
    status: "Processing",
    statusColor: "orange",
    dateObj: new Date("2019-05-16"),
  },
  {
    id: "5",
    orderId: "12346",
    date: "15 May 2019",
    status: "Delivered",
    statusColor: "green",
    // link: "/customer/history/delivered",
    dateObj: new Date("2019-05-15"),
  },
  {
    id: "6",
    orderId: "12347",
    date: "16 May 2019",
    status: "Ongoing",
    statusColor: "blue",
    dateObj: new Date("2019-05-16"),
  },
  {
    id: "7",
    orderId: "12348",
    date: "17 May 2019",
    status: "Delivered",
    statusColor: "green",
    // link: "/customer/history/delivered",
    dateObj: new Date("2019-05-17"),
  },
  {
    id: "8",
    orderId: "12349",
    date: "18 May 2019",
    status: "Ongoing",
    statusColor: "blue",
    dateObj: new Date("2019-05-18"),
  },
];

type FilterType = "All" | "Calendar" | "Ongoing" | "Delivered";

export default function DeliverHistory() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const getFilteredData = () => {
    let filtered = deliveryData;

    switch (activeFilter) {
      case "Ongoing":
        filtered = deliveryData.filter(
          (item) => item.status === "Processing" || item.status === "Ongoing",
        );
        break;
      case "Delivered":
        filtered = deliveryData.filter((item) => item.status === "Delivered");
        break;
      case "Calendar":
        if (selectedDate) {
          const selectedDateStr = selectedDate.toDateString();
          filtered = deliveryData.filter(
            (item) => item.dateObj.toDateString() === selectedDateStr,
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
      default:
        return "text-gray-500";
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8 sm:w-10 sm:h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const hasDelivery = deliveryData.some(
        (item) => item.dateObj.toDateString() === date.toDateString(),
      );

      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDate(date);
            setActiveFilter("Calendar");
            setShowCalendar(false);
          }}
          className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-full flex items-center justify-center transition-colors ${isSelected
              ? "bg-orange-500 text-white"
              : hasDelivery
                ? "bg-orange-100 text-orange-600 hover:bg-orange-200"
                : "hover:bg-gray-100 text-gray-700"
            }`}
        >
          {day}
        </button>,
      );
    }

    return (
      <div className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 w-64 sm:w-72 md:w-80">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="font-medium text-gray-900 text-sm sm:text-base">
            {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <button
            onClick={() => setShowCalendar(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm font-medium text-gray-500 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>

        {selectedDate && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setSelectedDate(null);
                setActiveFilter("All");
                setShowCalendar(false);
              }}
              className="text-xs sm:text-sm text-orange-600 hover:text-orange-700"
            >
              Clear selection
            </button>
          </div>
        )}
      </div>
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen ">
      <title>Delivery History</title>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="lg:flex justify-between items-center">
          {/* Header */}
          {/* <div className="flex items-center cursor-pointer justify-between mb-4 sm:mb-6">
            <div onClick={() => router.back()} className="flex items-center gap-3">
                <Back />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary">
                Delivery History
              </h1>
            </div>
          </div> */}
          <PageHeader title="Delivery History" />

          {/* Filter Tabs */}
          <div className="mb-4 sm:mb-6">
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
                    className={`py-2 px-3 sm:px-4 md:px-6 text-xs sm:text-sm md:text-base font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 sm:gap-2 rounded-lg ${activeFilter === filter
                        ? " bg-gradient-to-r from-[#E0B351] to-[#8B6E31] text-white"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {filter === "Calendar" && (
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    {filter === "Calendar"
                      ? selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Calendar"
                      : filter}
                  </button>

                  {filter === "Calendar" && showCalendar && renderCalendar()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery List */}
        <div className="bg-white rounded-t-3xl rounded-b-3xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredData.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
              No deliveries found for the selected criteria
            </div>
          ) : (
            filteredData.map((item, index) => (
              <Link
                href={`/driver/deliveries-history/${item.id}`}
                key={item.id}
                className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 m-2 sm:m-4 bg-heroBg rounded-3xl hover:bg-gray-100 transition-colors ${index !== filteredData.length - 1 ? "border-b border-gray-100" : ""
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
                      item.statusColor,
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
      </div>
    </div>
  );
}