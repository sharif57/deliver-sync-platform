/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// // import SectionHeader from '@/lib/heading'
// // import React from 'react'

// // export default function Users() {
// //   return (
// //     <div>
// // <SectionHeader title="User" highlightedText="Say" description="Order your truck parts, request a delivery, and get them at your doorstep - fast, reliable, and hassle-free" />

// //     </div>
// //   )
// // }
// "use client";
// import SectionHeader from "@/lib/heading";
// import React, { useState, useRef, useEffect } from "react";
// import Rating from "../ui/icon/ratting";

// const classNames = (
//     ...classes: (string | boolean | undefined | null)[]
// ): string => {
//     return classes.filter(Boolean).join(" ");
// };

// interface Person {
//     name: string;
//     title: string;
//     img: string;
//     description?: string;
// }

// const persons: Person[] = [
//     {
//         name: "Aria Rossi",
//         title: "Lead Architect",
//         img: "https://i.pinimg.com/736x/d6/8a/12/d68a121e960094f99ad8acd37505fb7d.jpg",
//         description: "TruckTrack made our deliveries faster and more transparent!",
//     },
//     {
//         name: "Leo Carter",
//         title: "Creative Director",
//         img: "https://i.pinimg.com/736x/21/16/f7/2116f71f9d51d875e44d809f074ff079.jpg",
//         description: "TruckTrack made our deliveries faster and more transparent!",

//     },
//     {
//         name: "Mia Chen",
//         title: "Senior Developer",
//         img: "https://i.pinimg.com/1200x/fe/c2/0d/fec20d2958059b8463bffb138d4eaac6.jpg",
//         description: "TruckTrack made our deliveries faster and more transparent!",

//     },
//     {
//         name: "Kai Tanaka",
//         title: "UX/UI Designer",
//         img: "https://i.pinimg.com/736x/84/dc/62/84dc62de850a34a9d420c97f3a2d58f4.jpg",
//     },
//     {
//         name: "Zoe Williams",
//         title: "Project Manager",
//         img: "https://i.pinimg.com/1200x/be/c3/7e/bec37e2c43e703f922f887db2578ce2e.jpg",
//     },
//     {
//         name: "Ethan Hunt",
//         title: "Marketing Head",
//         img: "https://i.pinimg.com/736x/47/dd/47/47dd47b0d66c2fa641e03e370bcb5433.jpg",
//     },
//     {
//         name: "Chloe Garcia",
//         title: "Data Scientist",
//         img: "https://i.pinimg.com/736x/05/01/bc/0501bcd327d9df915e83154bbf9456e3.jpg",
//     },
//     {
//         name: "Noah King",
//         title: "Brand Strategist",
//         img: "https://i.pinimg.com/736x/c1/46/be/c146bebffca026d2c4fa76cc85aac917.jpg",
//     },
//     {
//         name: "Ava Martinez",
//         title: "Content Creator",
//         img: "https://i.pinimg.com/736x/91/7a/51/917a51df0d444def3cade8d626305a67.jpg",
//     },
//     {
//         name: "Ava Martinez",
//         title: "Content Creator",
//         img: "https://i.pinimg.com/736x/91/7a/51/917a51df0d444def3cade8d626305a67.jpg",
//     },

// ];

// function Users() {
//     const [activeItem, setActiveItem] = useState(Math.floor(persons.length / 2));
//     const wrapperRef = useRef<HTMLUListElement>(null);
//     const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         if (!wrapperRef.current) return;
//         if (timeoutRef.current) {
//             clearTimeout(timeoutRef.current);
//         }

//         wrapperRef.current.style.setProperty(
//             "--transition",
//             "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
//         );

//         timeoutRef.current = setTimeout(() => {
//             wrapperRef.current?.style.removeProperty("--transition");
//         }, 900);

//         return () => {
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current);
//             }
//         };
//     }, [activeItem]);

//     return (
//         <div className="w-full ">
// <SectionHeader title="User" highlightedText="Say" description="Order your truck parts, request a delivery, and get them at your doorstep - fast, reliable, and hassle-free" />
//             <div className="w-full container mx-auto p-4 sm:p-6 md:p-8">
//                 <ul
//                     ref={wrapperRef}
//                     className="flex w-full flex-col gap-2 md:h-[640px] md:flex-row md:gap-[1.5%]"
//                 >
//                     {persons.map((person, index) => (
//                         <li
//                             onClick={() => setActiveItem(index)}
//                             aria-current={activeItem === index}
//                             className={classNames(
//                                 "relative group cursor-pointer transition-all duration-500 ease-in-out",
//                                 "md:w-[8%]",
//                                 "md:[&[aria-current='true']]:w-[48%]",
//                                 "md:[transition:width_var(--transition,300ms_ease_in)]"
//                             )}
//                             key={person.name}
//                         >
//                             <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:z-10 transform-gpu">

//                                 <img
//                                     className={classNames(
//                                         "absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-500 ease-in-out",
//                                         activeItem === index
//                                             ? "scale-105 grayscale-0"
//                                             : "scale-100 grayscale"
//                                     )}
//                                     src={person.img}
//                                     alt={person.name}
//                                     width="590"
//                                     height="640"
//                                 />
//                                 <div
//                                     className={classNames(
//                                         "absolute inset-0 transition-opacity duration-500",
//                                         activeItem === index ? "opacity-100" : "opacity-0",
//                                         "bg-gradient-to-t from-black/70 via-black/30 to-transparent",
//                                         "md:absolute"
//                                     )}
//                                 />
//                                 <div
//                                     className={classNames(
//                                         "absolute bottom-0 left-0 text-center w-full p-6 text-white transition-[transform,opacity] duration-700 ease-in-out md:p-8",
//                                         activeItem === index
//                                             ? "translate-y-0 opacity-100"
//                                             : "translate-y-8 opacity-0"
//                                     )}

//                                 >
//                                     <div className="mb-4 flex justify-center">
//                                         <Rating />
//                                     </div>

//                                     <p className="text-sm font-light uppercase tracking-widest text-gray-200 md:text-base">
//                                         {person.title}
//                                     </p>
//                                     <p
//                                         className="text-2xl font-bold tracking-tight md:text-5xl"
//                                         style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
//                                     >
//                                         {person.name}
//                                     </p>
//                                     {person.description && (
//                                         <p className="mt-2 text-sm font-light text-gray-300">
//                                             {person.description}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Users;
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import SectionHeader from "@/lib/heading";
import Rating from "../ui/icon/ratting";

interface CardData {
    id: number;
    imageUrl: string;
    title: string;
    description?: string;
}

interface IconProps {
    className?: string;
}


interface CardProps {
    card: CardData;
    index: number;
    activeIndex: number;
    totalCards: number;
}


const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);



const cardData: CardData[] = [
    {
        id: 1,
        imageUrl:
            "/images/man.jpg",
        title: "Crimson Forest",
        description: "TruckTrack made our deliveries faster and more transparent!",
    },
    {
        id: 2,
        imageUrl:
            "/images/image.png",
        title: "Misty Mountains",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
    {
        id: 3,
        imageUrl:
            "/images/man.jpg",
        title: "Floating Islands",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
    {
        id: 4,
        imageUrl:
            "/images/image.png",

        title: "Crystal Cave",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
    {
        id: 5,
        imageUrl:
            "/images/image1.png",
        title: "Sunset Peaks",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
    {
        id: 6,
        imageUrl:
            "/images/image.png",
        title: "Night Sky",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
    {
        id: 7,
        imageUrl:
            "/images/man.jpg",
        title: "Ancient Ruins",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
    {
        id: 8,
        imageUrl:
            "/images/image.png",
        title: "Magical Tree",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
    {
        id: 9,
        imageUrl:
            "/images/image1.png",
        title: "Celestial Waters",
        description: "TruckTrack made our deliveries faster and more transparent!",

    },
];

export default function Users() {
    const [activeIndex, setActiveIndex] = useState(
        Math.floor(cardData.length / 2)
    );
    const [isPaused, setIsPaused] = useState(false);
    const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const autoplayDelay = 3000;

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % cardData.length);
    };

    useEffect(() => {
        if (!isPaused) {
            autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
        }
        return () => {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
            }
        };
    }, [isPaused, activeIndex]);

    const changeSlide = (newIndex: number) => {
        const newSafeIndex = (newIndex + cardData.length) % cardData.length;
        setActiveIndex(newSafeIndex);
        if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
        }
        if (!isPaused) {
            autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
        }
    };

    const onDragEnd = (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ) => {
        const dragThreshold = 75;
        const dragOffset = info.offset.x;
        if (dragOffset > dragThreshold) {
            changeSlide(activeIndex - 1);
        } else if (dragOffset < -dragThreshold) {
            changeSlide(activeIndex + 1);
        }
    };

    return (
        <>
            <SectionHeader title="User" highlightedText="Say" description="Order your truck parts, request a delivery, and get them at your doorstep - fast, reliable, and hassle-free" />
            <section className="w-full flex-col items-center justify-center  overflow-hidden">
                <div
                    className="w-full max-w-6xl mx-auto p-4"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative flex w-full flex-col rounded-3xl border border-white/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 pt-6 md:p-6">


                        <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden ">
                            <motion.div
                                className="w-full h-full flex items-center justify-center"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={onDragEnd}
                            >
                                {cardData.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        card={card}
                                        index={index}
                                        activeIndex={activeIndex}
                                        totalCards={cardData.length}
                                    />
                                ))}
                            </motion.div>
                        </div>

                        <div className="flex items-center justify-center gap-6 mt-6">
                            <button
                                onClick={() => changeSlide(activeIndex - 1)}
                                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                            >
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>

                            <div className="flex items-center justify-center gap-2">
                                {cardData.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => changeSlide(index)}
                                        className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${activeIndex === index
                                            ? "w-6 bg-pink-400"
                                            : "w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => changeSlide(activeIndex + 1)}
                                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
                            >
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function Card({ card, index, activeIndex, totalCards }: CardProps) {
    let offset = index - activeIndex;
    if (offset > totalCards / 2) {
        offset -= totalCards;
    } else if (offset < -totalCards / 2) {
        offset += totalCards;
    }

    const isVisible = Math.abs(offset) <= 1;

    const animate = {
        x: `${offset * 50}%`,
        scale: offset === 0 ? 1 : 0.8,
        zIndex: totalCards - Math.abs(offset),
        opacity: isVisible ? 1 : 0,
        transition: { type: "spring" as const, stiffness: 260, damping: 30 },
    };

    return (
        <motion.div
            className="absolute w-1/2 md:w-1/2 h-[100%]"
            style={{
                transformStyle: "preserve-3d",
            }}
            animate={animate}
            initial={false}
        >
            <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden bg-gray-200 dark:bg-neutral-800">
                <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover pointer-events-none"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                            "https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing";
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="mb-2 flex justify-center">
                        <Rating />
                    </div>
                    <h4 className="text-white text-lg font-semibold text-center">{card.title}</h4>
                    <p className="text-white mt-2 text-center mb-4">{card.description}</p>
                </div>
            </div>
        </motion.div>
    );
}
