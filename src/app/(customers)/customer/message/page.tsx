// "use client"

// import type React from "react"

// import { ArrowLeft, Send } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useState } from "react"
// import Image from "next/image"
// import { useRouter } from "next/navigation"

// interface Message {
//   id: number
//   text: string
//   sender: "driver" | "customer"
//   timestamp: string
// }

// export default function ChatPage() {
//   const router = useRouter();

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
//   ])

//   const [newMessage, setNewMessage] = useState("")

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message: Message = {
//         id: messages.length + 1,
//         text: newMessage,
//         sender: "customer",
//         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       }
//       setMessages([...messages, message])
//       setNewMessage("")
//     }
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSendMessage()
//     }
//   }

//   return (
//     <>
//     <title>Customer Message</title>
//       <div className=" flex flex-col">
//         {/* Header */}
//         <div className=" px-4 py-4 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
//           <div className="flex items-center space-x-3">
//             <div onClick={() => router.back()} className="p-1">
//               <ArrowLeft className="h-5 w-5 text-gray-600" />
//             </div>
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-800 font-medium">MR. Rahim</span>
//               <span className="text-gray-500 font-medium">#12345</span>
//             </div>
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div className="flex-1 rounded-lg overflow-y-auto bg-white px-4 py-4 space-y-4">
//           {messages.map((message) => (
//             <div key={message.id} className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}>
//               <div
//                 className={`flex items-start space-x-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${message.sender === "customer" ? "flex-row-reverse space-x-reverse" : ""}`}
//               >
//                 {/* Avatar */}
//                 {message.sender === "driver" && (
//                   <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
//                     <Image
//                       src="/images/image.png"
//                       width={400}
//                       height={400}
//                       alt="Driver"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}

//                 {message.sender === "customer" && (
//                   <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
//                     <span className="text-white text-sm font-medium">M</span>
//                   </div>
//                 )}

//                 {/* Message Bubble */}
//                 <div
//                   className={`rounded-2xl px-4 py-3 ${message.sender === "customer"
//                       ? "bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-br-md"
//                       : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
//                     }`}
//                 >
//                   <p className="text-sm leading-relaxed">{message.text}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Message Input */}
//         <div className="bg-white mt-8 rounded-lg border-t  border-gray-200 px-4 py-4 flex-shrink-0">
//           <div className="flex items-center space-x-3">
//             <div className="flex-1 relative">
//               <Input
//                 type="text"
//                 placeholder="Perfect! I'll send the reflection"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full bg-gray-50 border-gray-200 rounded-2xl px-4 py-8 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//               />
//             </div>
//             <Button
//               onClick={handleSendMessage}
//               className="w-10 h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0"
//             >
//               <Send className="w-5 h-5 text-white" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  text: string;
  sender: "driver" | "customer";
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi, are you on the way with my truck brake pads order?",
      sender: "customer",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "Hello! Yes, I picked up your order from the warehouse. I'll reach your location in about 25 minutes.",
      sender: "driver",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: "Great! Please handle carefully, these are heavy parts",
      sender: "customer",
      timestamp: "10:33 AM",
    },
    {
      id: 4,
      text: "Don't worry, I've secured the parts in the truck. Do you prefer delivery at the garage entrance or inside the workshop?",
      sender: "driver",
      timestamp: "10:35 AM",
    },
    {
      id: 5,
      text: "At the garage entrance is fine. I'll be waiting there.",
      sender: "customer",
      timestamp: "10:36 AM",
    },
    {
      id: 6,
      text: "I'll call you once I arrive",
      sender: "driver",
      timestamp: "10:37 AM",
    },
    {
      id: 7,
      text: "Thanks, see you soon!",
      sender: "customer",
      timestamp: "10:38 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a message and simulate driver response
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "customer",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate driver response after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: "Got it! I'll update you soon.",
          sender: "driver",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <title>Customer Message</title>
      <div className="flex flex-col container mx-auto ">
        {/* Header */}
        <div className="px-4 sm:px- py-3 sm:py-4 flex items-center justify-between  flex-shrink-0 ">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-secondary font-medium text-sm sm:text-2xl md:text-lg">
                Sharif Mahamud
              </span>
              <span className="text-gray-500 font-medium text-xs sm:text-sm md:text-base">
                #12345
              </span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto  mb-24 h-[300px] rounded-lg bg-white px-4 sm:px-6 py-4 space-y-4">
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
                  <div className="flex-shrink-0 w-8 h-8  sm:w-10 sm:h-10 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center">
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
        <div  className="fixed bottom-0 container  bg-white  rounded-2xl   mx-auto left-0 right-0  px-4  sm:px-6  py-3 sm:py-4 flex-shrink-0 ">
          <div className="  flex items-center space-x-2 sm:space-x-3">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-[#FDF7E9] border-gray-200 rounded-2xl px-3 sm:px-4 py-2 sm:py-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            <Button
              onClick={handleSendMessage}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#EFB639] to-[#C59325] rounded-full flex items-center justify-center p-0 hover:from-[#f0c452] hover:to-[#9b7e41] transition-colors"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}