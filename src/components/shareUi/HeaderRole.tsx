/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import AuthIcon from '@/components/ui/icon/auth';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import Cart from '../ui/icon/cart';
import { useGetAllNotificationQuery } from '@/redux/feature/notificationSlice';
import { useUpdateProfileMutation, useUserProfileQuery } from '@/redux/feature/userSlice';
import { logout } from '@/service/authService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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




const HeaderRole = ({ mode, useSwitch }: { mode: string; useSwitch?: boolean }) => {

    const router = useRouter();
    const { data } = useGetAllNotificationQuery(undefined);
    const { data: profile, refetch } = useUserProfileQuery(undefined);

    const [updateProfile] = useUpdateProfileMutation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [, setIsFeaturesOpen] = useState(false);
    const [isAvatarOpen, setIsAvatarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const featuresDropdownRef = useRef<HTMLDivElement>(null);
    const avatarDropdownRef = useRef<HTMLDivElement>(null);
    const notificationsDropdownRef = useRef<HTMLDivElement>(null);

    const handleSwitchChange = async (checked: boolean) => {
        try {
            const res = await updateProfile({
                id: profile?.data?.id,
                data: { is_online: checked },
            }).unwrap();

            toast.success(`You are now ${checked ? "Online 🟢" : "Offline 🔴"}`);
            await refetch();
            console.log("Status updated:", res);
        } catch (error: any) {
            console.error("Failed to update status:", error);
            toast.error(error?.data?.is_online?.[0] || "Failed to update your status");
        }
    };



    const handleLogut = async () => {
        try {
            const res = await logout();
            toast.success("Logout successfully!");
            localStorage.clear();
            router.push('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }


    const avatarDropdownLinks = [
        { href: "/profile", label: "Profile" },
        { href: "/", label: "Home" },
        // { href: , label: "Logout" },
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

    const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL || '';

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

                                {useSwitch ? (
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="airplane-mode-desktop"
                                            checked={profile?.data?.is_online === true}
                                            onCheckedChange={handleSwitchChange}
                                            className="w-10 h-6 bg-gray-300 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none"
                                        >
                                            <span className="block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-4" />
                                        </Switch>
                                        <Label htmlFor="airplane-mode-desktop" className="text-sm font-medium text-gray-700">
                                            {profile?.data?.is_online === true ? "Online" : "Offline"}
                                        </Label>
                                    </div>
                                ) : (
                                    <div className="text-sm font-medium text-gray-700">
                                        {/* {mode === "online" ? "Online" : "Offline"} */}
                                    </div>
                                )}



                                <button
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                    className="relative p-2 cursor-pointer rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                                >
                                    <BellIcon className="w-7 h-7" />

                                    {/* Notification count badge */}
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-white dark:bg-gray-900 text-primary text-xs font-medium">
                                        {data?.unread_count}
                                    </span>
                                </button>


                                <Link
                                    href={
                                        profile?.data?.role === "company"
                                            ? "/company/wallet"
                                            : profile?.data?.role === "driver"
                                                ? "/driver/wallet"
                                                : "/customer/wallet"
                                    }
                                    className="cursor-pointer"
                                    title="Cart"
                                >
                                    <Cart />
                                </Link>

                            </div>
                            {/* </Link> */}
                            <div className={`absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 ${isNotificationsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                <div className="p-3 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</p>
                                    <Link href="/notification" className="text-xs text-blue-500 hover:underline">View all</Link>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700">
                                    {
                                        data?.data?.slice(0, 2).map((item: any) => (
                                            <a key={item.id} href="#" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <p className="font-medium">{item?.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{item?.message}</p>
                                            </a>

                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Avatar Dropdown */}
                        <div className="relative hidden sm:block" ref={avatarDropdownRef}>

                            <button onClick={() => setIsAvatarOpen(!isAvatarOpen)} className="flex items-center gap-2 focus:outline-none">
                                {/* <AvatarIcon className="h-9 w-9" /> */}
                                <img src={`${IMAGE}${profile?.data?.image}`} alt="avatar" className="w-9 h-9 rounded-full" />
                            </button>

                            <div className={`absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-opacity duration-300 ${isAvatarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                {avatarDropdownLinks.map((item) => (
                                    <a key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                        {item.label}
                                    </a>
                                ))}

                                <button onClick={handleLogut} className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                    LogOut
                                </button>
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
                                        {/* <AvatarIcon className="h-10 w-10" /> */}
                                        <img src={`${IMAGE}${profile?.data?.image}`} alt="avatar" className="w-9 h-9 rounded-full" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">{profile?.data?.name}</div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{profile?.data?.email}</div>
                                    </div>
                                </div>
                                <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                                    <span className="sr-only">View notifications</span>
                                    <Link href={"/notification"}>
                                        <BellIcon className="h-6 w-6" />
                                    </Link>

                                </button>
                            </div>
                            <div className='mt-3 ml-3'>
                                {useSwitch ? (
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="airplane-mode-mobile"
                                            checked={profile?.data?.is_online === true}
                                            onCheckedChange={handleSwitchChange}
                                            className="w-10 h-6 bg-gray-300 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none"
                                        >
                                            <span className="block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out data-[state=checked]:translate-x-4" />
                                        </Switch>
                                        <Label htmlFor="airplane-mode-mobile" className="text-sm font-medium text-gray-700">
                                            {profile?.data?.is_online === true ? "Online" : "Offline"}
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
                                <button onClick={handleLogut} className="block px-4 w-full py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                    LogOut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderRole;