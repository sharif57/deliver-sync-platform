"use client"
import AuthIcon from '@/components/ui/icon/auth';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Bell } from 'lucide-react';

// Using SVG components for icons, similar to lucide-react
const MenuIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);



const BellIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
);


const AvatarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" width="200" height="200" className={className}>
        <g clipPath="url(#cs_clip_1_flower-1)">
            <mask id="cs_mask_1_flower-1" style={{ maskType: 'alpha' }} width="200" height="186" x="0" y="7" maskUnits="userSpaceOnUse">
                <path fill="#fff" d="M150.005 128.863c66.681 38.481-49.997 105.828-49.997 28.861 0 76.967-116.658 9.62-49.997-28.861-66.681 38.481-66.681-96.207 0-57.727-66.681-38.48 49.997-105.827 49.997-28.86 0-76.967 116.657-9.62 49.997 28.86 66.66-38.48 66.66 96.208 0 57.727z"></path>
            </mask>
            <g mask="url(#cs_mask_1_flower-1)">
                <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                <path fill="url(#paint0_linear_748_4711)" d="M200 0H0v200h200V0z"></path>
                <g filter="url(#filter0_f_748_4711)">
                    <path fill="#FF58E4" d="M130 0H69v113h61V0z"></path>
                    <path fill="#0CE548" fillOpacity="0.35" d="M196 91H82v102h114V91z"></path>
                    <path fill="#FFE500" fillOpacity="0.74" d="M113 80H28v120h85V80z"></path>
                </g>
            </g>
        </g>
        <defs>
            <filter id="filter0_f_748_4711" width="278" height="310" x="-27" y="-55" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                <feGaussianBlur result="effect1_foregroundBlur_748_4711" stdDeviation="27.5"></feGaussianBlur>
            </filter>
            <linearGradient id="paint0_linear_748_4711" x1="186.5" x2="37" y1="37" y2="186.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0E6FFF" stopOpacity="0.51"></stop>
                <stop offset="1" stopColor="#00F0FF" stopOpacity="0.59"></stop>
            </linearGradient>
            <clipPath id="cs_clip_1_flower-1">
                <path fill="#fff" d="M0 0H200V200H0z"></path>
            </clipPath>
        </defs>
        <g style={{ mixBlendMode: 'overlay' }} mask="url(#cs_mask_1_flower-1)">
            <path fill="gray" stroke="transparent" d="M200 0H0v200h200V0z" filter="url(#cs_noise_1_flower-1)"></path>
        </g>
        <defs>
            <filter id="cs_noise_1_flower-1" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
                <feTurbulence baseFrequency="0.6" numOctaves="5" result="out1" seed="4"></feTurbulence>
                <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"></feComposite>
                <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"></feBlend>
            </filter>
        </defs>
    </svg>
);


// --- Main Header Component ---
const HeaderRole = ({ mode, useSwitch }: { mode: string; useSwitch?: boolean }) => {
    // State for the main mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State for desktop dropdowns
    const [, setIsFeaturesOpen] = useState(false);
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    // Refs to detect outside clicks
    const featuresDropdownRef = useRef<HTMLDivElement>(null);
    const avatarDropdownRef = useRef<HTMLDivElement>(null);
    const notificationsDropdownRef = useRef<HTMLDivElement>(null);
    const [isOnline, setIsOnline] = useState(mode === "online");
    const [, setCurrentTime] = useState(new Date());

    // Simulate dynamic status (e.g., go offline after 30 seconds if online)
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOnline) {
            timer = setTimeout(() => {
                setIsOnline(false);
            }, 30000); // 30 seconds timeout
        }
        return () => clearTimeout(timer); // Cleanup timer on unmount or state change
    }, [isOnline]);

    // Update current time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer); // Cleanup interval on unmount
    }, []);

    const toggleOnline = () => {
        setIsOnline((prev) => !prev);
    };




    const avatarDropdownLinks = [
        { href: "/profile", label: "Profile" },
        { href: "/", label: "Home" },
        { href: "#", label: "Logout" },
    ];

    // Effect to handle clicks outside of dropdowns
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (featuresDropdownRef.current && !featuresDropdownRef.current.contains(event.target as Node)) {
                setIsFeaturesOpen(false);
            }
            if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(event.target as Node)) {
                setIsAvatarOpen(false);
            }
            if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <header className="bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky py-4 top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo and Desktop Navigation */}
                    <Link href="/" className="flex items-center gap-10">
                        <AuthIcon />
                    </Link>


                    {/* Right side: Icons and Mobile Menu Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Notification Dropdown */}
                        <div className="relative hidden  sm:block" ref={notificationsDropdownRef}>
                            <div className="flex items-center space-x-2">
                                {/* <div className="flex items-center space-x-2">
                                    <Switch
                                        id="airplane-mode"
                                        checked={isOnline}
                                        onCheckedChange={toggleOnline} 
                                        />
                                    <Label htmlFor="airplane-mode">{isOnline ? "Online" : "Offline"}</Label>
                                </div> */}
                                {useSwitch ? (
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="airplane-mode"
                                            checked={isOnline}
                                            onCheckedChange={toggleOnline}
                                            className="w-10 h-6 bg-gray-300 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none  "
                                        >
                                            <span className="block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-4" />
                                        </Switch>
                                        <Label htmlFor="airplane-mode" className="text-sm font-medium text-gray-700">
                                            {isOnline ? "Online" : "Offline"}
                                        </Label>
                                    </div>
                                ) : (
                                    <div className="text-sm font-medium text-gray-700">
                                        {/* {mode === "online" ? "Online" : "Offline"} */}
                                    </div>
                                )}

                                {/* <Link href={"/customer/notification"}> */}
                                {/* <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" />
                                </button> */}
                                <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_112_52)">
                                            <path d="M13.3333 32C10.5774 32 8.33325 29.7573 8.33325 27C8.33325 26.448 8.78125 26 9.33325 26C9.88525 26 10.3333 26.448 10.3333 27C10.3333 28.6548 11.6799 30 13.3333 30C14.9866 30 16.3333 28.6548 16.3333 27C16.3333 26.448 16.7813 26 17.3333 26C17.8853 26 18.3333 26.448 18.3333 27C18.3333 29.7573 16.0894 32 13.3333 32Z" fill="#333333" />
                                            <path d="M24.3333 28.0002H2.33325C1.04663 28.0002 4.43121e-07 26.9536 4.43121e-07 25.667C-0.000207289 25.33 0.0726251 24.9969 0.213483 24.6908C0.35434 24.3846 0.559876 24.1126 0.815938 23.8935C0.849375 23.8642 0.885313 23.8376 0.922625 23.8135C2.87988 22.1055 4 19.6482 4 17.0535V13.3335C4 8.99097 6.94263 5.26291 11.156 4.26684C11.6946 4.14278 12.2334 4.47216 12.3601 5.01097C12.4866 5.54834 12.1533 6.08691 11.6174 6.21359C8.30931 6.99484 6 9.92284 6 13.3335V17.0535C6 20.2749 4.58788 23.323 2.12938 25.4147C2.10938 25.4309 2.09206 25.4455 2.07056 25.4602C2.02424 25.5191 1.99935 25.592 2 25.667C2 25.8481 2.15213 26.0002 2.33325 26.0002H24.3333C24.5146 26.0002 24.6667 25.8481 24.6667 25.667C24.6667 25.5735 24.6321 25.5056 24.5947 25.4602C24.5747 25.4455 24.5559 25.4309 24.5374 25.4148C23.3427 24.3962 22.3999 23.167 21.7361 21.7602C21.4988 21.2615 21.7119 20.6655 22.2119 20.4282C22.3306 20.3719 22.4592 20.3396 22.5904 20.3331C22.7216 20.3266 22.8528 20.3461 22.9765 20.3904C23.1001 20.4347 23.2138 20.5031 23.311 20.5915C23.4082 20.6799 23.4869 20.7866 23.5427 20.9055C24.0706 22.0202 24.8106 22.999 25.7466 23.8176C25.7812 23.8415 25.8174 23.867 25.8479 23.8935C26.1048 24.112 26.3112 24.3838 26.4526 24.6901C26.594 24.9963 26.6671 25.3297 26.6667 25.667C26.6667 26.9536 25.6201 28.0002 24.3333 28.0002Z" fill="#333333" />
                                            <path d="M23.3332 17.3333C18.5547 17.3333 14.6667 13.4453 14.6667 8.66675C14.6667 3.88794 18.5547 0 23.3332 0C28.1121 0 32 3.88794 32 8.66675C32 13.4453 28.1121 17.3333 23.3332 17.3333ZM23.3332 2C19.6572 2 16.6667 4.99075 16.6667 8.66675C16.6667 12.3428 19.6572 15.3333 23.3332 15.3333C27.0092 15.3333 30 12.3428 30 8.66675C30 4.99075 27.0092 2 23.3332 2Z" fill="#D69D21" />
                                            <path d="M23.6667 12.6665C23.1147 12.6665 22.6667 12.2185 22.6667 11.6665V7.33301H22C21.448 7.33301 21 6.88501 21 6.33301C21 5.78101 21.448 5.33301 22 5.33301H23.6667C24.2188 5.33301 24.6667 5.78101 24.6667 6.33301V11.6665C24.6667 12.2185 24.2188 12.6665 23.6667 12.6665Z" fill="#D69D21" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_112_52">
                                                <rect width="32" height="32" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>


                                    {/* <span className="absolute -top-1 -right-0 w-5 h-5 border-primary border text-primary  text-xs font-normal rounded-full flex items-center justify-center">
                                        5
                                    </span> */}
                                </button>
                            </div>
                            {/* </Link> */}
                            <div className={`absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 ${isNotificationsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <div className="p-3 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</p>
                                    <Link href="/customer/notification" className="text-xs text-blue-500 hover:underline">View all</Link>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700">
                                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <p className="font-medium">New message</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">You have a new message from Jane Doe.</p>
                                    </a>
                                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <p className="font-medium">Server update</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Server #1 will be updated at 3:00 AM.</p>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Dropdown */}
                        <div className="relative hidden sm:block" ref={avatarDropdownRef}>

                            <button onClick={() => setIsAvatarOpen(!isAvatarOpen)} className="flex items-center gap-2 focus:outline-none">
                                <AvatarIcon className="h-9 w-9" />
                            </button>

                            <div className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 ${isAvatarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                {avatarDropdownLinks.map((item) => (
                                    <a key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800" id="mobile-menu">
                    <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">

                        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                            <div className="flex items-center justify-between px-3">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <AvatarIcon className="h-10 w-10" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">Tom Cook</div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">tom@example.com</div>
                                    </div>
                                </div>
                                <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                                    <span className="sr-only">View notifications</span>
                                    <Link href={"/customer/notification"}>
                                        <BellIcon className="h-6 w-6" />
                                    </Link>

                                </button>
                            </div>
                            <div className='mt-3 ml-3'>
                                {useSwitch ? (
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="airplane-mode"
                                            checked={isOnline}
                                            onCheckedChange={toggleOnline}
                                            className="w-10 h-6 bg-gray-300 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none  "
                                        >
                                            <span className="block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-4" />
                                        </Switch>
                                        <Label htmlFor="airplane-mode" className="text-sm font-medium text-gray-700">
                                            {isOnline ? "Online" : "Offline"}
                                        </Label>
                                    </div>
                                ) : (
                                    <div className="text-sm font-medium text-gray-700">
                                        {/* {mode === "online" ? "Online" : "Offline"} */}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 space-y-1">
                                {avatarDropdownLinks.map(item => (
                                    <a key={item.label} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderRole;