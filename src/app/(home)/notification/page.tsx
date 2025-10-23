// "use client"

// import PageHeader from "@/components/shareUi/onBack"
// import { useAllReadNotificationMutation, useGetAllNotificationQuery, useSingleReadNotificationMutation } from "@/redux/feature/notificationSlice"
// import { useState } from "react"

// interface Notification {
//   id: string
//   orderId: string
//   title: string
//   message: string
//   created_at: string
//   statusType: "in-progress" | "delivered" | "placed"
// }

// const initialNotifications: Notification[] = [
//   {
//     id: "1",
//     orderId: "ID#12345",
//     status: "Driver on the way",
//     timestamp: "2h ago",
//     statusType: "in-progress",
//   },
//   {
//     id: "2",
//     orderId: "ID#12345",
//     status: "Delivered",
//     timestamp: "2h ago",
//     statusType: "delivered",
//   },
//   {
//     id: "3",
//     orderId: "ID#12345",
//     status: "Order Placed",
//     timestamp: "2h ago",
//     statusType: "placed",
//   },
//   {
//     id: "4",
//     orderId: "ID#12345",
//     status: "Delivered",
//     timestamp: "2h ago",
//     statusType: "delivered",
//   },
//   {
//     id: "5",
//     orderId: "ID#12345",
//     status: "Delivered",
//     timestamp: "2h ago",
//     statusType: "delivered",
//   },
//   {
//     id: "6",
//     orderId: "ID#12345",
//     status: "Order Placed",
//     timestamp: "2h ago",
//     statusType: "placed",
//   },
//   {
//     id: "7",
//     orderId: "ID#12345",
//     status: "Order Placed",
//     timestamp: "2h ago",
//     statusType: "placed",
//   },
// ]



// export default function NotificationPanel() {
//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
//   const [allReadNotification] = useAllReadNotificationMutation();
//   const [singleReadNotification] = useSingleReadNotificationMutation();

//   const { data } = useGetAllNotificationQuery(undefined);
//   console.log(data?.data)


//   const deleteNotification = (id: string) => {
//     setNotifications(notifications.filter((notification) => notification.id !== id))
//   }

//   return (
//     <>
//       <title>Notification</title>
//       <div className="w-full  container mx-auto pt-10 px-4  overflow-hidden">
//         {/* Header */}
//         {/* <div className="flex items-center justify-between mb-4 sm:mb-6">
//           <div onClick={() => router.back()} className="flex cursor-pointer items-center gap-3">
//             <Back />
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary">
//               Notification
//             </h1>
//           </div>
//         </div> */}

//         <PageHeader title="Notification" />


//         {/* Notification List */}
//         <div className="divide-y divide-gray-200 space-y-2 bg-white p-4 rounded-2xl">
//           {data?.data?.map((notification: Notification) => (
//             <div
//               key={notification.id}
//               className="px-6 py-4 flex cursor-pointer rounded-lg items-center justify-between bg-featuresBg  hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex items-center space-x-4">


//                 {/* Notification Content */}
//                 <div className="flex-1">
//                   <div className="text-gray-900 font-medium text-sm">
//                     #{notification.id} - {notification.title}
//                   </div>
//                   <p>{notification?.message}</p>
//                   <div className="text-primary text-sm mt-1"> Date :  {new Date(notification.created_at).toLocaleString()}
//                   </div>
//                 </div>
//               </div>

//               {/* Delete Button */}
//               <button
//                 onClick={() => deleteNotification(notification.id)}
//                 className="p-2 text-red-500 hover:text-red-700 bg-white  hover:bg-red-50 rounded-md transition-colors"
//                 aria-label="Delete notification"
//               >
//                 Read
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }
"use client";

import PageHeader from "@/components/shareUi/onBack";
import {
  useAllReadNotificationMutation,
  useGetAllNotificationQuery,
  useSingleReadNotificationMutation,
} from "@/redux/feature/notificationSlice";
import { useState } from "react";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function NotificationPanel() {
  const { data, refetch, isLoading } = useGetAllNotificationQuery(undefined);
  const [allReadNotification] = useAllReadNotificationMutation();
  const [singleReadNotification] = useSingleReadNotificationMutation();

  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [markAllLoading, setMarkAllLoading] = useState(false);

  const notifications: Notification[] = data?.data || [];

  // ✅ Mark single notification as read
  const handleMarkAsRead = async (id: number) => {
    try {
      setLoadingId(id);
      const res = await singleReadNotification(id).unwrap();
      toast.success(res?.message || "Marked as read");
      await refetch();
    } catch (error: any) {
      console.error("❌ Failed to mark as read:", error);
      toast.error(error?.data?.message || "Failed to mark as read");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      setMarkAllLoading(true);
      const res = await allReadNotification(undefined).unwrap();
      toast.success(res?.message || "All marked as read");
      await refetch();
    } catch (error: any) {
      console.error("❌ Failed to mark all as read:", error);
      toast.error(error?.data?.message || "Failed to mark all as read");
    } finally {
      setMarkAllLoading(false);
    }
  };

  return (
    <>
      <title>Notification</title>
      <div className="w-full container mx-auto pt-10 px-4 overflow-hidden">
        <PageHeader title="Notification" />

        {/* Header Actions */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-gray-700 font-medium">
            Unread: {data?.unread_count || 0}
          </p>

          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={markAllLoading}
              className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
            >
              {markAllLoading ? "Marking..." : "Mark All as Read"}
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="divide-y space-y-4 divide-gray-200 bg-white p-4 rounded-2xl shadow-sm">
          {isLoading ? (
            <p className="text-center text-gray-500 py-6">Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No notifications found.
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-6 py-4 flex  items-center justify-between rounded-lg transition-colors ${
                  notification.is_read
                    ? "bg-gray-50"
                    : "bg-yellow-50 border-l-4 border-yellow-400"
                }`}
              >
                <div className="flex-1">
                  <div className="text-gray-900 font-medium text-sm">
                    #{notification.id} - {notification.title}
                  </div>
                  <p className="text-gray-700 text-sm">{notification.message}</p>

                  <div className="text-primary text-xs mt-1">
                    {new Date(notification.created_at).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>

                {/* Action Button */}
                {!notification.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    disabled={loadingId === notification.id}
                    className="ml-4 px-3 py-2 text-xs text-white bg-primary rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    {loadingId === notification.id ? "Reading..." : "Mark Read"}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
