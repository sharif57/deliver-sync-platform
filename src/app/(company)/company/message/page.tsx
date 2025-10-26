/* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import PageHeader from "@/components/shareUi/onBack";
// import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
// import { useSearchParams } from "next/navigation";

// interface Message {
//     id: number;
//     text: string;
//     sender: "driver" | "customer";
//     timestamp: string;
// }

// export default function CompanyMessage() {
//     const serachParams = useSearchParams();
//     const id = serachParams.get("id");
//     const roomId = serachParams.get("room_id");
//     console.log(id, roomId)

//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const { data } = useAllMessagesQuery(roomId as string || "", {
//         pollingInterval: 1000,
//         refetchOnFocus: true,
//         refetchOnReconnect: true
//     });
//     console.log(data, '=======????')

//     const [sendMessage] = useSendMessageMutation();

//     const [messages, setMessages] = useState<Message[]>([]);

//     const [newMessage, setNewMessage] = useState("");

//     // Scroll to the latest message
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     // Handle sending a message and simulate driver response
//     const handleSendMessage = () => {
//         if (newMessage.trim()) {
//             const message: Message = {
//                 id: messages.length + 1,
//                 text: newMessage,
//                 sender: "customer",
//                 timestamp: new Date().toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                 }),
//             };
//             setMessages([...messages, message]);
//             setNewMessage("");

//             // Simulate driver response after 2 seconds
//             setTimeout(() => {
//                 const response: Message = {
//                     id: messages.length + 2,
//                     text: "Got it! I'll update you soon.",
//                     sender: "driver",
//                     timestamp: new Date().toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                     }),
//                 };
//                 setMessages((prev) => [...prev, response]);
//             }, 2000);
//         }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === "Enter") {
//             handleSendMessage();
//         }
//     };

//     return (
//         <>
//             <title>Customer Message</title>
//             <div className="flex flex-col container mx-auto pt-8">

//                 <PageHeader title="Sharif Mahamud" />

//                 {/* Messages Container */}
//                 <div className="flex-1 overflow-y-auto  mb-24 h-[300px] rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
//                     {messages.map((message) => (
//                         <div
//                             key={message.id}
//                             className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
//                         >
//                             <div
//                                 className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
//                                     }`}
//                             >
//                                 {/* Avatar */}
//                                 {message.sender === "driver" && (
//                                     <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
//                                         <Image
//                                             src="/images/image.png"
//                                             width={400}
//                                             height={400}
//                                             alt="Driver"
//                                             className="w-full h-full object-cover"
//                                             loading="lazy"
//                                         />
//                                     </div>
//                                 )}

//                                 {message.sender === "customer" && (
//                                     <div className="flex-shrink-0 w-8 h-8  sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                                         <span className="text-white text-xs sm:text-sm font-medium">M</span>
//                                     </div>
//                                 )}

//                                 {/* Message Bubble */}
//                                 <div
//                                     className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${message.sender === "customer"
//                                         ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                                         : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
//                                         }`}
//                                 >
//                                     <p className="text-xs sm:text-sm md:text-base leading-relaxed">{message.text}</p>
//                                     <p className="text-xs text-secondary mt-1">{message.timestamp}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 {/* Fixed Message Input */}
//                 <div className="fixed bottom-0 container  bg-white  rounded-2xl   mx-auto left-0 right-0  px-4  sm:px-6  py-3 sm:py-4 flex-shrink-0 ">
//                     <div className="  flex items-center space-x-2 sm:space-x-3">
//                         <Input
//                             type="text"
//                             placeholder="Type your message..."
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                             className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                         />
//                         <Button
//                             onClick={handleSendMessage}
//                             className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
//                         >
//                             <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PageHeader from "@/components/shareUi/onBack";
import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useUserProfileQuery } from "@/redux/feature/userSlice";

interface ApiMessage {
    id: number;
    room: number;
    sender: number;
    content: string;
    images: string | null;
    is_seen: boolean;
    timestamp: string;
}

interface Message {
    id: number;
    text: string;
    sender: "driver" | "customer";
    timestamp: string;
}

export default function CompanyMessage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // User ID
    const roomId = searchParams.get("room_id");

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState("");
    const {data:userProfile}= useUserProfileQuery(undefined);
    console.log(userProfile?.data?.id  , 'profile')

    const { data: apiMessages, isLoading, isError, error } = useAllMessagesQuery(roomId as string || "", {
        pollingInterval: 1000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    console.log(apiMessages)

    const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

    const messages: Message[] = apiMessages
        ? apiMessages.map((msg: ApiMessage) => ({
            id: msg.id,
            text: msg.content,
            sender: msg.sender.toString() === id ? "company" : "customer",
            timestamp: format(new Date(msg.timestamp), "h:mm a"),
        }))
        : [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle sending a message
    const handleSendMessage = async () => {
        if (newMessage.trim() && roomId) {
            try {
                await sendMessage({
                    id: roomId,
                    data: { content: newMessage },
                }).unwrap();
                setNewMessage("");
            } catch (err: any) {
                console.error("Failed to send message:", {
                    status: err.status,
                    data: err.data,
                    message: err.message,
                });
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isSending) {
            handleSendMessage();
        }
    };

    return (
        <>
            <title>Customer Message</title>
            <div className="flex flex-col container mx-auto pt-8">
                <PageHeader title="Sharif Mahamud" />

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto mb-24 h-[300px] rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
                    {isLoading && <p className="text-center text-gray-500">Loading messages...</p>}
                    {isError && (
                        <p className="text-center text-red-500">
                            Error loading messages: {error?.data?.error || error?.message || "Unknown error"}
                        </p>
                    )}
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
                                    }`}
                            >
                                {message.sender === "driver" && (
                                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                                        <Image
                                            src="/images/image.png"
                                            width={400}
                                            height={400}
                                            alt="Driver"
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                {message.sender === "customer" && (
                                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs sm:text-sm font-medium">M</span>
                                    </div>
                                )}
                                <div
                                    className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${message.sender === "customer"
                                            ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
                                            : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
                                        }`}
                                >
                                    <p className="text-xs sm:text-sm md:text-base leading-relaxed">{message.text}</p>
                                    <p className="text-xs text-secondary mt-1">{message.timestamp}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Fixed Message Input */}
                <div className="fixed bottom-0 container bg-white rounded-2xl mx-auto left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isSending}
                            className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={isSending || !newMessage.trim()}
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors disabled:opacity-50"
                        >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}