/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { ChevronRight } from "lucide-react";
import PageHeader from "@/components/shareUi/onBack";
import { useEarningHistoryQuery } from "@/redux/feature/driverSlice";



export default function DeliveryHistory() {

  const { data, isLoading, isError } = useEarningHistoryQuery(undefined);

  // Safely extract data array
  const earningHistory = data?.data || [];

  // Helper: format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading earning history...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load earning history
      </div>
    );
  }


  return (
    <div className="min-h-screen ">
      <title>Earning History</title>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="lg:flex justify-between items-center">
          {/* Header */}
          {/* <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div onClick={() => router.back()} className="flex cursor-pointer items-center gap-3">
              <Back />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary">
                Earning History
              </h1>
            </div>
          </div> */}
          <PageHeader title="Earning History" />


        </div>

        {/* Delivery List */}
        <div className="bg-white p-4 rounded-lg">
          <div className="  overflow-hidden">
            {/* Delivery List */}
            <div className="bg-[#FDF7E9] rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {earningHistory.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
                  No deliveries found
                </div>
              ) : (
                earningHistory.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between cursor-pointer px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <span className="text-sm sm:text-base font-medium text-gray-900">
                          Delivery ID: {item.delivery}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {formatDate(item.created_at)}
                        </span>
                      </div>

                      <span className="text-xs sm:text-sm md:text-base font-semibold text-primary bg-white p-2 rounded-lg">
                        Earned: ${item.amount}
                      </span>
                    </div>

                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}