/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

// "use client";

// import { useState, useEffect, useRef } from "react";
// import {  Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import PageHeader from "@/components/shareUi/onBack";
// import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
// import { useSearchParams } from "next/navigation";

// interface Message {
//   id: number;
//   text: string;
//   sender: "driver" | "customer";
//   timestamp: string;
// }

// export default function ChatPage() {
//   const serachParams = useSearchParams();
//   const id = serachParams.get("id");
//   const roomId = serachParams.get("room_id");
//   console.log(id, roomId)


//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const {data}= useAllMessagesQuery(roomId as string || "");
//   console.log(data, '=======????')

//   const [sendMessage] = useSendMessageMutation();

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 1,
//       text: "Hi, are you on the way with my truck brake pads order?",
//       sender: "customer",
//       timestamp: "10:30 AM",
//     },
//     {
//       id: 2,
//       text: "Hello! Yes, I picked up your order from the warehouse. I'll reach your location in about 25 minutes.",
//       sender: "driver",
//       timestamp: "10:32 AM",
//     },
//     {
//       id: 3,
//       text: "Great! Please handle carefully, these are heavy parts",
//       sender: "customer",
//       timestamp: "10:33 AM",
//     },
//     {
//       id: 4,
//       text: "Don't worry, I've secured the parts in the truck. Do you prefer delivery at the garage entrance or inside the workshop?",
//       sender: "driver",
//       timestamp: "10:35 AM",
//     },
//     {
//       id: 5,
//       text: "At the garage entrance is fine. I'll be waiting there.",
//       sender: "customer",
//       timestamp: "10:36 AM",
//     },
//     {
//       id: 6,
//       text: "I'll call you once I arrive",
//       sender: "driver",
//       timestamp: "10:37 AM",
//     },
//     {
//       id: 7,
//       text: "Thanks, see you soon!",
//       sender: "customer",
//       timestamp: "10:38 AM",
//     },
//   ]);

//   const [newMessage, setNewMessage] = useState("");

//   // Scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle sending a message and simulate driver response
//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message: Message = {
//         id: messages.length + 1,
//         text: newMessage,
//         sender: "customer",
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       setMessages([...messages, message]);
//       setNewMessage("");

//       // Simulate driver response after 2 seconds
//       setTimeout(() => {
//         const response: Message = {
//           id: messages.length + 2,
//           text: "Got it! I'll update you soon.",
//           sender: "driver",
//           timestamp: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         };
//         setMessages((prev) => [...prev, response]);
//       }, 2000);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   return (
//     <>
//       <title>Customer Message</title>
//       <div className="flex flex-col container mx-auto pt-8">

//         <PageHeader title="Sharif Mahamud"  />

//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto  mb-24 h-[300px] rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${
//                   message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
//                 }`}
//               >
//                 {/* Avatar */}
//                 {message.sender === "driver" && (
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
//                     <Image
//                       src="/images/image.png"
//                       width={400}
//                       height={400}
//                       alt="Driver"
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                 )}

//                 {message.sender === "customer" && (
//                   <div className="flex-shrink-0 w-8 h-8  sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs sm:text-sm font-medium">M</span>
//                   </div>
//                 )}

//                 {/* Message Bubble */}
//                 <div
//                   className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
//                     message.sender === "customer"
//                       ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                       : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
//                   }`}
//                 >
//                   <p className="text-xs sm:text-sm md:text-base leading-relaxed">{message.text}</p>
//                   <p className="text-xs text-secondary mt-1">{message.timestamp}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Fixed Message Input */}
//         <div  className="fixed bottom-0 container  bg-white  rounded-2xl   mx-auto left-0 right-0  px-4  sm:px-6  py-3 sm:py-4 flex-shrink-0 ">
//           <div className="  flex items-center space-x-2 sm:space-x-3">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//             />
//             <Button
//               onClick={handleSendMessage}
//               className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
//             >
//               <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useState, useEffect, useRef, Suspense, use } from "react";
// import { Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import PageHeader from "@/components/shareUi/onBack";
// import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
// import { useSearchParams } from "next/navigation";
// import Loading from "@/components/ui/icon/loading";

// interface Message {
//   id: number;
//   text: string;
//   sender: "driver" | "customer";
//   timestamp: string;
// }

// interface ApiMessage {
//   id: number;
//   room: number;
//   sender: number;
//   content: string;
//   images: string | null;
//   is_seen: boolean;
//   timestamp: string;
// }

//  function ChatPage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const roomId = searchParams.get("room_id");
//   console.log(id, roomId);
//   const [token, setToken] = useState<string | null>(null);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [newMessage, setNewMessage] = useState("");

//   // Fetch messages
//   const { data: apiMessages, isLoading, error, refetch } = useAllMessagesQuery(roomId || "");
//   const [sendMessage] = useSendMessageMutation();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       setToken(token);
//     }
//   }, []);
//   console.log(token)

//   // Map API messages to UI messages
//   const messages: Message[] = apiMessages
//     ? apiMessages.map((msg: ApiMessage) => ({
//       id: msg.id,
//       text: msg.content,
//       sender: msg.sender === 1 ? "customer" : "driver", // Adjust based on your API's sender IDs
//       timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     }))
//     : [];

//   // Scroll to the latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (newMessage.trim() && roomId) {
//       try {
//         await sendMessage({ id: roomId, data: { content: newMessage } }).unwrap();
//         setNewMessage("");
//         refetch();
//       } catch (err) {
//         console.error("Failed to send message:", err);
//       }
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

//   return (
//     <>
//       <title>Customer Message</title>
//       <div className="flex flex-col container mx-auto pt-8 min-h-screen">
//           <PageHeader title="Sharif Mahamud" />


//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto mb-24 rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
//           {isLoading && <p className="text-center text-gray-500">Loading messages...</p>}
//           {error && <p className="text-center text-red-500">Error loading messages</p>}
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
//                   }`}
//               >
//                 {/* Avatar */}
//                 {message.sender === "driver" && (
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
//                     <Image
//                       src="/images/image.png"
//                       width={400}
//                       height={400}
//                       alt="Driver"
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                 )}
//                 {message.sender === "customer" && (
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs sm:text-sm font-medium">M</span>
//                   </div>
//                 )}

//                 {/* Message Bubble */}
//                 <div
//                   className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${message.sender === "customer"
//                       ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                       : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
//                     }`}
//                 >
//                   <p className="text-xs sm:text-sm md:text-base leading-relaxed">{message.text}</p>
//                   <p className="text-xs text-secondary mt-1">{message.timestamp}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Fixed Message Input */}
//         <div className="fixed bottom-0 container bg-white rounded-2xl mx-auto left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className=" flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//             />
//             <Button
//               onClick={handleSendMessage}
//               className=" w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
//               disabled={isLoading || !newMessage.trim()}
//             >
//               <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default function Message(){
//     return (
//         <Suspense fallback={<div><Loading /></div>} >
//             <ChatPage />
//         </Suspense>
//     )
// }


// "use client";

// import { useState, useEffect, useRef, Suspense } from "react";
// import { Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import PageHeader from "@/components/shareUi/onBack";
// import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
// import { useSearchParams } from "next/navigation";
// import Loading from "@/components/ui/icon/loading";
// import { useUserProfileQuery } from "@/redux/feature/userSlice";

// interface Message {
//   id: number;
//   text: string;
//   sender: "driver" | "customer";
//   timestamp: string;
// }

// interface ApiMessage {
//   id: number;
//   room: number;
//   sender: number;
//   content: string;
//   images: string | null;
//   is_seen: boolean;
//   timestamp: string;
// }

// function ChatPage() {
//   const searchParams = useSearchParams();
//   const roomId = searchParams.get("room_id");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");



//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const {data: user} = useUserProfileQuery(undefined);
//   console.log(user?.data?.id)

//   const { data: apiMessages, isLoading, refetch } = useAllMessagesQuery(roomId || "", {
//          pollingInterval: 1000,      
//         refetchOnFocus: true,        
//         refetchOnReconnect: true
//   });

//   console.log(apiMessages)


//   // Send message mutation
//   const [sendMessage] = useSendMessageMutation();



//   // Map API messages to UI messages
//   useEffect(() => {
//     if (apiMessages) {
//       const mappedMessages: Message[] = apiMessages.map((msg: ApiMessage) => ({
//         id: msg.id,
//         text: msg.content,
//         sender: msg.sender === 1 ? "customer" : "driver",
//         timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       }));
//       setMessages((prev) => {
//         const merged = [...prev];
//         mappedMessages.forEach((newMsg) => {
//           if (!merged.some((msg) => msg.id === newMsg.id)) {
//             merged.push(newMsg);
//           }
//         });
//         return merged;
//       });
//     }
//   }, [apiMessages]);

//   // Scroll to the latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !roomId) return;

//     try {

//       // Send via REST API for persistence
//       await sendMessage({ id: roomId, data: { content: newMessage } }).unwrap();
//       setNewMessage("");
//       refetch();
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;

//   return (
//     <>
//       <title>Customer Message</title>
//       <div className="flex flex-col container mx-auto pt-8 min-h-screen">
//         <PageHeader title="Sharif Mahamud" />


//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto mb-24 rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
//           {isLoading && <p className="text-center text-gray-500">Loading messages...</p>}
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${
//                   message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""
//                 }`}
//               >
//                 {/* Avatar */}
//                 {message.sender === "driver" && (
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
//                     <img
//                       // src={IMAGE ? `${IMAGE}/images/image.png` : "/images/image.png"}
//                       src={"/images/image.png"}
//                       // width={400}
//                       // height={400}
//                       alt="Driver"
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </div>
//                 )}
//                 {message.sender === "customer" && (
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs sm:text-sm font-medium">M</span>
//                   </div>
//                 )}

//                 <div
//                   className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
//                     message.sender === "customer"
//                       ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                       : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
//                   }`}
//                 >
//                   <p className="text-xs sm:text-sm md:text-base leading-relaxed">{message.text}</p>
//                   <p className="text-xs text-secondary mt-1">{message.timestamp}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Fixed Message Input */}
//         <div className="fixed bottom-0 container bg-white rounded-2xl mx-auto left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//             />
//             <Button
//               onClick={handleSendMessage}
//               className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
//               disabled={isLoading || !newMessage.trim()}
//             >
//               <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default function Message() {
//   return (
//     <Suspense fallback={<div><Loading /></div>}>
//       <ChatPage />
//     </Suspense>
//   );
// }

// "use client";

// import { useState, useEffect, useRef, Suspense } from "react";
// import { Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import PageHeader from "@/components/shareUi/onBack";
// import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
// import { useUserProfileQuery } from "@/redux/feature/userSlice";
// import { useSearchParams } from "next/navigation";
// import Loading from "@/components/ui/icon/loading";

// interface Message {
//   id: number;
//   text: string;
//   sender: "driver" | "customer" | "company";
//   timestamp: string;
// }

// interface ApiMessage {
//   id: number;
//   room: number;
//   sender: number;
//   role: "driver" | "customer" | "company";
//   content: string;
//   images: string | null;
//   is_seen: boolean;
//   timestamp: string;
// }

// function ChatPage() {
//   const searchParams = useSearchParams();
//   const roomId = searchParams.get("room_id");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const { data: user, isLoading: userLoading } = useUserProfileQuery(undefined);
//   const currentUserId = user?.data?.id; 
//   const currentUserRole = user?.data?.role; 

//   const { data: apiMessages, isLoading, refetch } = useAllMessagesQuery(roomId || "", {
//     pollingInterval: 1000,
//     refetchOnFocus: true,
//     refetchOnReconnect: true,
//   });
//   console.log(apiMessages)

//   const [sendMessage] = useSendMessageMutation();


//   useEffect(() => {
//     if (apiMessages) {
//       const mappedMessages: Message[] = apiMessages.map((msg: ApiMessage) => ({
//         id: msg.id,
//         text: msg.content,
//         sender: msg.role,
//         timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       }));
//       setMessages((prev) => {
//         const merged = [...prev];
//         mappedMessages.forEach((newMsg) => {
//           if (!merged.some((msg) => msg.id === newMsg.id)) {
//             merged.push(newMsg);
//           }
//         });
//         return merged;
//       });
//     }
//   }, [apiMessages]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !roomId || !currentUserId) return;

//     try {
//       await sendMessage({
//         id: roomId,
//         data: { content: newMessage, role: currentUserRole },
//       }).unwrap();
//       setNewMessage("");
//       refetch();
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

//   return (
//     <>
//       <title>Chat</title>
//       <div className="flex flex-col container mx-auto pt-8 min-h-screen">
//         <PageHeader title={user?.data?.name || "Chat"} />

//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto mb-24 rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
//           {isLoading || userLoading ? (
//             <p className="text-center text-gray-500">Loading messages...</p>
//           ) : (
//             messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${
//                   message.sender === currentUserRole ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${
//                     message.sender === currentUserRole ? "flex-row-reverse space-x-reverse" : ""
//                   }`}
//                 >
//                   {/* Avatar */}
//                   {message.sender !== currentUserRole && (
//                     <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
//                       <img
//                         src={
//                           message.sender === "driver" || message.sender === "company"
//                             ? "/images/default-avatar.png"
//                             : `${IMAGE_URL}${user?.data?.image}`
//                         }
//                         alt={message.sender}
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                     </div>
//                   )}
//                   {message.sender === currentUserRole && (
//                     <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs sm:text-sm font-medium">
//                         {user?.data?.name?.[0] || "U"}
//                       </span>
//                     </div>
//                   )}

//                   <div
//                     className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
//                       message.sender === currentUserRole
//                         ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                         : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
//                     }`}
//                   >
//                     <p className="text-xs sm:text-sm md:text-base leading-relaxed">{message.text}</p>
//                     <p className="text-xs text-secondary mt-1">{message.timestamp}</p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Fixed Message Input */}
//         <div className="fixed bottom-0 container bg-white rounded-2xl mx-auto left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             <Input
//               type="text"
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//             />
//             <Button
//               onClick={handleSendMessage}
//               className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
//               disabled={isLoading || userLoading || !newMessage.trim()}
//             >
//               <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default function Message() {
//   return (
//     <Suspense fallback={<div><Loading /></div>}>
//       <ChatPage />
//     </Suspense>
//   );
// }

"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/shareUi/onBack";
import { useAllMessagesQuery, useSendMessageMutation } from "@/redux/feature/chartSlice";
import { useUserProfileQuery } from "@/redux/feature/userSlice";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/ui/icon/loading";

interface Message {
  id: number;
  text: string;
  sender: "driver" | "customer" | "company";
  user_image: string | null;
  timestamp: string;
}

interface ApiMessage {
  id: number;
  room: number;
  sender: number;
  role: "driver" | "customer" | "company";
  user_image: string | null;
  content: string;
  images: string | null;
  is_seen: boolean;
  timestamp: string;
}

function ChatPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("room_id");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: user, isLoading: userLoading } = useUserProfileQuery(undefined);
  const currentUserId = user?.data?.id;
  const currentUserRole = user?.data?.role;

  const { data: apiMessages, isLoading, refetch } = useAllMessagesQuery(roomId || "", {
    pollingInterval: 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [sendMessage] = useSendMessageMutation();


  useEffect(() => {
    if (apiMessages) {
      const mappedMessages: Message[] = apiMessages.map((msg: ApiMessage) => ({
        id: msg.id,
        text: msg.content,
        sender: msg.role,
        user_image: msg.user_image,
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !roomId || !currentUserId) return;

    try {
      await sendMessage({
        id: roomId,
        data: { content: newMessage, role: currentUserRole },
      }).unwrap();
      setNewMessage("");
      refetch();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:8000";

  return (
    <>
      <title>Chat</title>
      <div className="bg-[#efefef]">
        <div className="flex flex-col container mx-auto pt-8 min-h-screen">
          <PageHeader title={user?.data?.name || "Chat"} />

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-28 h-[200px] rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
            {isLoading || userLoading ? (
              <p className="text-center text-gray-500">Loading messages...</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === currentUserRole ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`flex items-start gap-2 space-x-2 sm:space-x-3 max-w-[70%] sm:max-w-[60%] md:max-w-[50%] ${message.sender === currentUserRole ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                      <img
                        src={
                          message.user_image
                            ? `${IMAGE_URL}${message.user_image}`
                            : "/images/default-avatar.png"
                        }
                        alt={message.sender}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div
                      className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${message.sender === currentUserRole
                        ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
                        : "bg-[#E6EEF780] text-gray-800 rounded-bl-md border border-gray-200"
                        }`}
                    >
                      <p className="text-xs sm:text-sm md:text-base leading-relaxed">{message.text}</p>
                      <p className="text-xs text-secondary mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed Message Input */}
          <div className="fixed bottom-0 container  bg-white rounded-2xl mx-auto left-0 right-0 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <Button
                onClick={handleSendMessage}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
                disabled={isLoading || userLoading || !newMessage.trim()}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </Button>
            </div>
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