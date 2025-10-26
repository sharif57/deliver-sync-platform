'use client';
import { useGetCustomerOrdersQuery } from '@/redux/feature/customerSlice';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface OrderItem {
  id: string;
  orderId: string;
  date: string;
  title: string;
  status: string;
  link: string;
}

export default function TrackRider() {
  const { data, isLoading, isError } = useGetCustomerOrdersQuery(undefined, {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Map API data to OrderItem format
  const orders: OrderItem[] = data?.data?.map((order: any) => {
    const createdAt = new Date(order.created_at);
    return {
      id: order.id,
      orderId: order.order_id,
      date: createdAt.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      title: order.description || 'Order', // Use description or fallback to 'Order'
      status: order.status.charAt(0).toUpperCase() + order.status.slice(1), // Capitalize status
      link: order.status.toLowerCase() === 'delivered'
        ? `/company/earning-history/delivered/?id=${order.id}`
        : `/company/earning-history/processing/?id=${order.id}`,
    };
  }) || [];

  return (
    <div>
      <div>
        <h1 className="text-2xl font-medium text-secondary mb-4">Track Order / Rider</h1>

        <div className="bg-white rounded-3xl shadow-sm w-full overflow-hidden p-4">
          {isLoading ? (
            <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
              Loading orders...
            </div>
          ) : isError ? (
            <div className="px-4 py-8 text-center text-red-500 text-sm sm:text-base">
              Failed to load orders. Please try again.
            </div>
          ) : orders.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
              No orders found.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2 sm:p-2"
              >
                <Link
                  href={order.link}
                  className="flex items-center w-full justify-between px-2 sm:px-4 py-2 sm:py-3 bg-[#FDF7E9] rounded-lg hover:bg-[#FBE8C6] transition-colors duration-200"
                >
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm md:text-lg font-medium text-gray-900">
                        ID: #{order.orderId}
                      </span>
                      <span className="text-xs sm:text-sm md:text-lg text-[#D69D21]">
                        {order.date} - {order.title} - {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 bg-white p-1 sm:p-2 rounded-lg">
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}