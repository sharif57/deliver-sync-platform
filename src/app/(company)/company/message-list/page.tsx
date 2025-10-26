'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Back from "@/components/ui/icon/back"
import { useAllMessagesQuery } from "@/redux/feature/chartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation"

interface MessageItem {
    id: string
    name: string
    message: string
    time: string
    timestamp: string
    avatar?: string
}

const messages: MessageItem[] = [
    {
        id: "1",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
    {
        id: "2",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
    {
        id: "3",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
    {
        id: "4",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
    {
        id: "5",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
    {
        id: "6",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
    {
        id: "7",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
    {
        id: "8",
        name: "Darlene Steward",
        message: "Pls take a look at the images.",
        time: "18:31",
        timestamp: "IDR 12:45",
    },
]

export default function MessageList() {
    const router = useRouter()
    // const { data: apiMessages, isLoading, isError, error } = useAllMessagesQuery(roomId as string || "", {
    //     pollingInterval: 1000,
    //     refetchOnFocus: true,
    //     refetchOnReconnect: true,
    // });
    return (
        <>
            <title>Message List</title>
            <div className="min-h-screen ">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div onClick={() => router.back()} className="flex cursor-pointer items-center gap-3">
                        <Back />
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-secondary">
                            Message
                        </h1>
                    </div>
                </div>

                {/* Message List */}
                <div className="p-6 rounded-lg space-y-4 bg-white">
                    {messages.map((message) => (
                        <Link
                            href={'/customer/message'}
                            key={message.id}
                            className="bg-featuresBg  rounded-3xl p-4 flex items-center gap-3   hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {/* Avatar */}
                            <Avatar className="w-12 h-12 flex-shrink-0">
                                <AvatarImage src="/images/customer.png" alt={message.name} />
                                <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                                    {message.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>

                            {/* Message Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <div className="">
                                        <h3 className="text-base font-medium text-gray-900 truncate">{message.name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{message.timestamp}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
                                    <span className="text-sm text-gray-500 ml-2 flex-shrink-0">{message.time}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
