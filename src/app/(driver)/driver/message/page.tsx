/* eslint-disable @next/next/no-img-element */
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

// export default function ChatPage() {
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

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import PageHeader from "@/components/shareUi/onBack";
// import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
// import { useSearchParams } from "next/navigation";
// import { format } from "date-fns";

// interface ApiMessage {
//     id: number;
//     room: number;
//     sender: number;
//     content: string;
//     images: string | null;
//     is_seen: boolean;
//     timestamp: string;
// }

// interface Message {
//     id: number;
//     text: string;
//     sender: "driver" | "customer";
//     timestamp: string;
// }

// export default function ChatPage() {
//     const searchParams = useSearchParams();
//     const id = searchParams.get("id"); // User ID
//     const roomId = searchParams.get("room_id");

//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const [newMessage, setNewMessage] = useState("");

//     // Fetch messages with polling
//     const { data: apiMessages, isLoading, isError, error } = useAllMessagesQuery(roomId as string || "", {
//         pollingInterval: 1000,
//         refetchOnFocus: true,
//         refetchOnReconnect: true,
//     });

//     console.log(apiMessages)

//     const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

//     // Map API messages to frontend format
//     const messages: Message[] = apiMessages
//         ? apiMessages.map((msg: ApiMessage) => ({
//             id: msg.id,
//             text: msg.content,
//             sender: msg.sender.toString() === id ? "driver" : "customer", // Map sender ID to role
//             timestamp: format(new Date(msg.timestamp), "h:mm a"), // Format ISO to "12:07 PM"
//         }))
//         : [];

//     // Scroll to the latest message
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     // Handle sending a message
//     const handleSendMessage = async () => {
//         if (newMessage.trim() && roomId) {
//             try {
//                 await sendMessage({
//                     id: roomId,
//                     data: { content: newMessage },
//                 }).unwrap();
//                 setNewMessage("");
//             } catch (err: any) {
//                 console.error("Failed to send message:", {
//                     status: err.status,
//                     data: err.data,
//                     message: err.message,
//                 });
//             }
//         }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === "Enter" && !isSending) {
//             handleSendMessage();
//         }
//     };

//     return (
//         <>
//             <title>Customer Message</title>
//             <div className="flex flex-col container mx-auto pt-8">
//                 <PageHeader title="Sharif Mahamud" />

//                 {/* Messages Container */}
//                 <div className="flex-1 overflow-y-auto mb-24 h-[300px] rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
//                     {isLoading && <p className="text-center text-gray-500">Loading messages...</p>}
//                     {isError && (
//                         <p className="text-center text-red-500">
//                             Error loading messages: {error?.data?.error || error?.message || "Unknown error"}
//                         </p>
//                     )}
//                     {messages.map((message) => (
//                         <div
//                             key={message.id}
//                             className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
//                         >
//                             <div
//                                 className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
//                                     }`}
//                             >
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
//                                     <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                                         <span className="text-white text-xs sm:text-sm font-medium">M</span>
//                                     </div>
//                                 )}
//                                 <div
//                                     className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${message.sender === "customer"
//                                             ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                                             : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
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
//                 <div className="fixed bottom-0 container bg-white rounded-2xl mx-auto left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                         <Input
//                             type="text"
//                             placeholder="Type your message..."
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                             disabled={isSending}
//                             className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                         />
//                         <Button
//                             onClick={handleSendMessage}
//                             disabled={isSending || !newMessage.trim()}
//                             className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors disabled:opacity-50"
//                         >
//                             <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import PageHeader from "@/components/shareUi/onBack";
// import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
// import { useSearchParams } from "next/navigation";
// import { format } from "date-fns";
// import { enUS } from "date-fns/locale";

// interface ApiMessage {
//     id: number;
//     room: number;
//     sender: number;
//     content: string;
//     images: string | null;
//     is_seen: boolean;
//     timestamp: string;
// }

// interface Message {
//     id: number;
//     text: string;
//     sender: "driver" | "customer";
//     timestamp: string;
// }

// export default function ChatPage() {
//     const searchParams = useSearchParams();
//     const id = searchParams.get("id"); // User ID
//     const roomId = searchParams.get("room_id");

//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const [newMessage, setNewMessage] = useState("");

//     // Fetch messages with polling
//     const { data: apiMessages, isLoading, isError, error } = useAllMessagesQuery(roomId as string || "", {
//         pollingInterval: 1000,
//         refetchOnFocus: true,
//         refetchOnReconnect: true,
//     });

//     console.log(apiMessages)

//     const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

//     // Map API messages to frontend format
//     const messages: Message[] = apiMessages
//         ? apiMessages.map((msg: ApiMessage) => ({
//             id: msg.id,
//             text: msg.content,
//             sender: msg.sender.toString() === id ? "customer" : "driver", // Customer if sender matches id
//             timestamp: format(new Date(msg.timestamp), "h:mm a", { locale: enUS }), // Format to "12:07 PM"
//         }))
//         : [];

//     // Scroll to the latest message
//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     // Handle sending a message
//     const handleSendMessage = async () => {
//         if (newMessage.trim() && roomId) {
//             try {
//                 await sendMessage({
//                     id: roomId,
//                     data: { content: newMessage },
//                 }).unwrap();
//                 setNewMessage("");
//             } catch (err: any) {
//                 console.error("Failed to send message:", {
//                     status: err.status,
//                     data: err.data,
//                     message: err.message,
//                 });
//             }
//         }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === "Enter" && !isSending) {
//             handleSendMessage();
//         }
//     };

//     return (
//         <>
//             <title>Customer Message</title>
//             <div className="flex flex-col container mx-auto pt-8">
//                 <PageHeader title="Sharif Mahamud" />

//                 {/* Messages Container */}
//                 <div className="flex-1 overflow-y-auto mb-24 h-[300px] rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
//                     {isLoading && <p className="text-center text-gray-500">Loading messages...</p>}
//                     {isError && (
//                         <p className="text-center text-red-500">
//                             Error loading messages: {error?.data?.error || error?.message || "Unknown error"}
//                         </p>
//                     )}
//                     {messages.map((message) => (
//                         <div
//                             key={message.id}
//                             className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
//                         >
//                             <div
//                                 className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
//                                     }`}
//                             >
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
//                                     <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                                         <span className="text-white text-xs sm:text-sm font-medium">M</span>
//                                     </div>
//                                 )}
//                                 <div
//                                     className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${message.sender === "customer"
//                                             ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                                             : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
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
//                 <div className="fixed bottom-0 container bg-white rounded-2xl mx-auto left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                         <Input
//                             type="text"
//                             placeholder="Type your message..."
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                             disabled={isSending}
//                             className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                         />
//                         <Button
//                             onClick={handleSendMessage}
//                             disabled={isSending || !newMessage.trim()}
//                             className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors disabled:opacity-50"
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

import { useState, useEffect, useRef, Suspense } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PageHeader from "@/components/shareUi/onBack";
import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/ui/icon/loading";

interface Message {
  id: number;
  text: string;
  sender: "driver" | "customer";
  timestamp: string;
}

interface ApiMessage {
  id: number;
  room: number;
  sender: number;
  content: string;
  images: string | null;
  is_seen: boolean;
  timestamp: string;
}

interface WebSocketMessage {
  sender: number;
  message: string;
  timestamp?: string;
  id?: number;
}

function ChatPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room_id");
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = useRef(1000); // Start with 1 second

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial messages via REST API
  const { data: apiMessages, isLoading, error, refetch } = useAllMessagesQuery(roomId || "", {
         pollingInterval: 1000,      
        refetchOnFocus: true,        
        refetchOnReconnect: true
  });

  // Send message mutation
  const [sendMessage] = useSendMessageMutation();

  // Get token from localStorage on mount
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setToken(accessToken);
    } else {
      setConnectionError("Authentication token not found. Please log in.");
    }
  }, []);

  // Initialize and manage WebSocket connection
  useEffect(() => {
    if (!token || !roomId) return;

    const connectWebSocket = () => {
      const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/chat/${roomId}/?token=${token}`;
      const websocket = new WebSocket(wsUrl);

      websocket.onopen = () => {
        setIsWsConnected(true);
        setConnectionError(null);
        reconnectAttempts.current = 0; // Reset reconnect attempts
        reconnectInterval.current = 1000; // Reset interval
      };

      websocket.onmessage = (event) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        const newMsg: Message = {
          id: data.id || Date.now(), // Fallback ID if not provided
          text: data.message,
          sender: data.sender === 1 ? "customer" : "driver",
          timestamp: data.timestamp
            ? new Date(data.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => {
          if (prev.some((msg) => msg.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
      };

      websocket.onclose = () => {
        setIsWsConnected(false);
        if (reconnectAttempts.current < maxReconnectAttempts) {
          setTimeout(() => {
            reconnectAttempts.current += 1;
            reconnectInterval.current = Math.min(reconnectInterval.current * 2, 30000); // Exponential backoff, max 30s
            connectWebSocket();
          }, reconnectInterval.current);
        } else {
          setConnectionError("Failed to connect to chat server after multiple attempts.");
        }
      };

      websocket.onerror = () => {
        setIsWsConnected(false);
        setConnectionError("Error connecting to chat server.");
      };

      setWs(websocket);
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [token, roomId]);

  // Map API messages to UI messages
  useEffect(() => {
    if (apiMessages) {
      const mappedMessages: Message[] = apiMessages.map((msg: ApiMessage) => ({
        id: msg.id,
        text: msg.content,
        sender: msg.sender === 1 ? "driver" : "customer",
        timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages((prev) => {
        const merged = [...prev];
        mappedMessages.forEach((newMsg) => {
          if (!merged.some((msg) => msg.id === newMsg.id)) {
            merged.push(newMsg);
          }
        });
        return merged;
      });
    }
  }, [apiMessages]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !roomId || !token) return;

    try {
      // Send via WebSocket if connected
      if (ws && isWsConnected) {
        const messageData: WebSocketMessage = {
          sender: 1, // Assuming customer is sender ID 1
          message: newMessage,
          timestamp: new Date().toISOString(),
        };
        ws.send(JSON.stringify(messageData));
      }

      // Send via REST API for persistence
      await sendMessage({ id: roomId, data: { content: newMessage } }).unwrap();
      setNewMessage("");
      refetch();
    } catch (err) {
      setConnectionError("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <>
      <title>Customer Message</title>
      <div className="flex flex-col container mx-auto pt-8 min-h-screen">
        <PageHeader title="Sharif Mahamud" />

        {/* Connection Status */}
        {/* {connectionError && (
          <p className="text-center text-red-500 mb-4">{connectionError}</p>
        )} */}
        {!isWsConnected && !connectionError && (
          <p className="text-center text-yellow-500 mb-4">
            Connecting to chat server...
          </p>
        )}

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-24 rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
          {isLoading && <p className="text-center text-gray-500">Loading messages...</p>}
          {error && <p className="text-center text-red-500">Error loading messages</p>}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${
                  message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                {message.sender === "driver" && (
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                    <img
                    //   src={IMAGE ? `${IMAGE}/images/image.png` : "/images/image.png"}
                      src={"/images/image.png"}
                      // width={400}
                      // height={400}
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

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
                    message.sender === "customer"
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
              className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              disabled={!isWsConnected && !token}
            />
            <Button
              onClick={handleSendMessage}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
              disabled={isLoading || !newMessage.trim()  || !token}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Message() {
  return (
    <Suspense fallback={<div><Loading /></div>}>
      <ChatPage />
    </Suspense>
  );
}