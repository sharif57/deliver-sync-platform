'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import AuthIcon from '../ui/icon/auth';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function ResponsiveNavbar() {
    const pathname = usePathname();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setMobileSidebarOpen(false);
            }
        };

        if (mobileSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileSidebarOpen]);

    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [pathname]);

    if (
        pathname === '/auth/signin' ||
        pathname === '/auth/signup' ||
        pathname === '/auth/forgot-pass' ||
        pathname === '/auth/forgot-otp' ||
        pathname === '/auth/new-password' ||
        pathname === '/auth/verify'
    ) {
        return null;
    }

    const items = ['home', 'how-it-works', 'features', 'testimonials', 'contact'];

    return (
        <div className="relative bg-background">
            <nav className="flex items-center justify-between w-full  container mx-auto px-4 py-4 md:px-6 md:py-5">
                {/* Logo */}
                <Link href="/">
                    <AuthIcon />
                </Link>

                {/* Desktop Nav Links */}
                <ul className="hidden md:flex items-center gap-6 text-base md:text-lg text-secondary">
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={`/${item}`}
                                className={`relative capitalize hover:text-primary transition-colors duration-300 ${pathname === `/${item}` ? 'text-primary font-semibold' : ''
                                    }`}
                            >
                                {item.replace('-', ' ')}
                                <span
                                    className={`absolute bottom-[-2px] left-0 h-[2px] bg-primary transition-all duration-300 ${pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="text-secondary text-base md:text-lg font-normal px-4 py-2 md:px-6 md:py-3 hover:bg-primary hover:text-background"
                        asChild
                    >
                        <Link href="/auth/signin">Log In</Link>
                    </Button>
                    <Button
                        className="bg-primary text-base md:text-lg font-normal px-4 py-4 md:px-6 md:py-3 text-background"
                        asChild
                    >
                        <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                    <CiMenuFries
                        className="text-2xl text-secondary cursor-pointer md:hidden"
                        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                    />
                </div>

                {/* Mobile Sidebar */}
                <aside
                    ref={sidebarRef}
                    className={`fixed top-0 right-0 h-full w-64 bg-background dark:bg-slate-700 p-6 transition-transform duration-300 ease-in-out md:hidden z-50 ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex justify-end">
                        <button
                            className="text-2xl text-secondary"
                            onClick={() => setMobileSidebarOpen(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <ul className="flex flex-col gap-4 mt-6 text-base text-secondary">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={`/${item}`}
                                    className={`relative capitalize hover:text-primary transition-colors duration-300 ${pathname === `/${item}` ? 'text-primary font-semibold' : ''
                                        }`}
                                    onClick={() => setMobileSidebarOpen(false)}
                                >
                                    {item.replace('-', ' ')}
                                    <span
                                        className={`absolute bottom-[-2px] left-0 h-[2px] bg-primary transition-all duration-300 ${pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Overlay for mobile sidebar */}
                {mobileSidebarOpen && (
                    <div
                        className="fixed inset-0  backdrop-blur-2xl bg-opacity-50 z-40 md:hidden"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                )}
            </nav>
        </div>
    );
}