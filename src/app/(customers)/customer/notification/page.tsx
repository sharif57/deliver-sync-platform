"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2 } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  orderId: string
  status: string
  timestamp: string
  statusType: "in-progress" | "delivered" | "placed"
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    orderId: "ID#12345",
    status: "Driver on the way",
    timestamp: "2h ago",
    statusType: "in-progress",
  },
  {
    id: "2",
    orderId: "ID#12345",
    status: "Delivered",
    timestamp: "2h ago",
    statusType: "delivered",
  },
  {
    id: "3",
    orderId: "ID#12345",
    status: "Order Placed",
    timestamp: "2h ago",
    statusType: "placed",
  },
  {
    id: "4",
    orderId: "ID#12345",
    status: "Delivered",
    timestamp: "2h ago",
    statusType: "delivered",
  },
  {
    id: "5",
    orderId: "ID#12345",
    status: "Delivered",
    timestamp: "2h ago",
    statusType: "delivered",
  },
  {
    id: "6",
    orderId: "ID#12345",
    status: "Order Placed",
    timestamp: "2h ago",
    statusType: "placed",
  },
  {
    id: "7",
    orderId: "ID#12345",
    status: "Order Placed",
    timestamp: "2h ago",
    statusType: "placed",
  },
]



export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  return (
    <>
    <title>Notification</title>
      <div className="w-full  rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Notification</h2>
        </div>

        {/* Notification List */}
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="px-6 py-4 flex cursor-pointer items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">

                <div>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>

                {/* Notification Content */}
                <div className="flex-1">
                  <div className="text-gray-900 font-medium text-sm">
                    {notification.orderId} - {notification.status}
                  </div>
                  <div className="text-green-600 text-sm mt-1">{notification.timestamp}</div>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteNotification(notification.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                aria-label="Delete notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
