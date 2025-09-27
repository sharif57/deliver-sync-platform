

// /* eslint-disable react-hooks/exhaustive-deps */
// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import { CiMenuFries } from 'react-icons/ci';
// import AuthIcon from '../ui/icon/auth';
// import { usePathname } from 'next/navigation';
// import { Button } from '../ui/button';
// import Link from 'next/link';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// export default function ResponsiveNavbar() {
//   const pathname = usePathname();
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [localPath, setLocalPath] = useState('');

//   useEffect(() => {
//     const storedPath = localStorage.getItem('userRole');
//     if (storedPath) {
//       setLocalPath(storedPath);
//     }
//   }, [pathname]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
//         setMobileSidebarOpen(false);
//       }
//     };

//     if (mobileSidebarOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [mobileSidebarOpen]);

//   useEffect(() => {
//     setMobileSidebarOpen(false);
//   }, [pathname]);

//   // Hide navbar on specific routes
//   if (
//     pathname === '/auth/signin' ||
//     pathname === '/auth/signup' ||
//     pathname === '/auth/forgot-pass' ||
//     pathname === '/auth/forgot-otp' ||
//     pathname === '/auth/new-password' ||
//     pathname === '/auth/verify' ||
//     pathname === '/customer'
//   ) {
//     return null;
//   }

//   const items = ['home', 'how-it-works', 'features', 'testimonials', 'contact'];

//   // Handle scrolling to section
//   const handleScrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       setMobileSidebarOpen(false); // Close mobile sidebar after clicking
//     } else {
//       console.warn(`Section with ID "${sectionId}" not found.`);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userRole');
//     // Add any additional logout logic here
//     window.location.href = '/'; // Redirect to home after logout
//   };

//   return (
//     <div className="relative bg-white">
//       <nav className="flex items-center justify-between w-full container mx-auto px-4 py-4 md:px-6 md:py-5">
//         {/* Logo */}
//         <Link href="/" title="DeliverSync">
//           <AuthIcon />
//         </Link>

//         {/* Desktop Nav Links */}
//         <ul className="hidden md:flex items-center gap-6 text-base md:text-lg text-gray-900">
//           {items.map((item, index) => (
//             <div key={index}>
//               <li >
//                 <button
//                   onClick={() => handleScrollToSection(item)}
//                   className={`relative capitalize hover:text-primary transition-colors duration-300 ${pathname === `/${item}` ? 'text-primary font-semibold' : ''
//                     }`}
//                 >
//                   {item.replace('-', ' ')}
//                   <span
//                     className={`absolute bottom-[-2px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
//                       }`}
//                   />
//                 </button>
//               </li>
//             </div>
//           ))}
//         </ul>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-3">
//           {localPath === '' ? (
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="outline"
//                 className="text-gray-900 border border-[#B0B0B0] text-base md:text-lg font-normal px-4 py-2 md:px-8 md:py-6  hover:text-secondary"
//                 asChild
//               >
//                 <Link href="/auth/signin">Log In</Link>
//               </Button>
//               <Button
//                 className="bg-gradient-to-r from-[#EFB639] to-[#C59325] text-base md:text-lg font-normal px-4 py-4 md:px-8 md:py-6 text-white hover:bg-amber-500"
//                 asChild
//               >
//                 <Link href="/auth/signup">Sign Up</Link>
//               </Button>
//             </div>
//           ) : (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Avatar className="size-10 cursor-pointer">
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <Link href="/profile" className="cursor-pointer">
//                   <DropdownMenuItem>Profile</DropdownMenuItem>
//                 </Link>
//                 <Link href={`/${localPath}`} className="cursor-pointer">
//                   <DropdownMenuItem className="capitalize">{localPath}</DropdownMenuItem>
//                 </Link>
//                 <Link href="/change-password" className="cursor-pointer">
//                   <DropdownMenuItem>Change Password</DropdownMenuItem>
//                 </Link>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
//                   Log Out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//           <CiMenuFries
//             className="text-2xl text-gray-900 cursor-pointer md:hidden"
//             onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
//           />
//         </div>

//         {/* Mobile Sidebar */}
//         <aside
//           ref={sidebarRef}
//           className={`fixed top-0 right-0 h-full w-64 bg-gray-100 dark:bg-slate-700 p-6 transition-transform duration-300 ease-in-out md:hidden z-50 ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
//             }`}
//         >
//           <div className="flex justify-end">
//             <button
//               className="text-2xl text-gray-900"
//               onClick={() => setMobileSidebarOpen(false)}
//             >
//               &times;
//             </button>
//           </div>
//           <ul className="flex flex-col gap-4 mt-6 text-base text-gray-900">
//             {items.map((item, index) => (
//               <li key={index}>
//                 <button
//                   onClick={() => handleScrollToSection(item)}
//                   className={`relative capitalize hover:text-amber-500 transition-colors duration-300 ${pathname === `/${item}` ? 'text-amber-500 font-semibold' : ''
//                     }`}
//                 >
//                   {item.replace('-', ' ')}
//                   <span
//                     className={`absolute bottom-[-2px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
//                       }`}
//                   />
//                 </button>
//               </li>
//             ))}
//             {/* <li className="capitalize cursor-pointer">{localPath}</li> */}
//           </ul>
//         </aside>

//         {/* Overlay for mobile sidebar */}
//         {mobileSidebarOpen && (
//           <div
//             className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 z-40 md:hidden"
//             onClick={() => setMobileSidebarOpen(false)}
//           />
//         )}
//       </nav>
//     </div>
//   );
// }

/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import AuthIcon from '../ui/icon/auth';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ResponsiveNavbar() {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [localPath, setLocalPath] = useState('');

  useEffect(() => {
    const storedPath = localStorage.getItem('userRole');
    if (storedPath) {
      setLocalPath(storedPath);
    }
  }, [pathname]);

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

  // Hide navbar on specific routes
  if (
    pathname === '/auth/signin' ||
    pathname === '/auth/signup' ||
    pathname === '/auth/forgot-pass' ||
    pathname === '/auth/forgot-otp' ||
    pathname === '/auth/new-password' ||
    pathname === '/auth/verify' ||
    pathname === '/customer'
  ) {
    return null;
  }

  const items = ['home', 'how-it-works', 'features', 'testimonials', 'contact'];

  // Handle scrolling to section
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
      setMobileSidebarOpen(false); // Close mobile sidebar after clicking
    } else {
      console.warn(`Section with ID "${sectionId}" not found.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    window.location.href = '/'; // Redirect to home after logout
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="flex items-center justify-between container mx-auto px-4 py-4 md:px-6 md:py-5">
        {/* Logo */}
        <Link href="/" title="DeliverSync">
          <AuthIcon />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-base md:text-lg text-gray-900">
          {items.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleScrollToSection(item)}
                className={`relative capitalize hover:text-primary transition-colors duration-300 ${
                  pathname === `/${item}` ? 'text-primary font-semibold' : ''
                }`}
              >
                {item.replace('-', ' ')}
                <span
                  className={`absolute bottom-[-2px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                    pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {localPath === '' ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="text-gray-900 border border-[#B0B0B0] text-base md:text-lg font-normal px-4 py-2 md:px-8 md:py-6 hover:text-secondary"
                asChild
              >
                <Link href="/auth/signin">Log In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-[#EFB639] to-[#C59325] text-base md:text-lg font-normal px-4 py-4 md:px-8 md:py-6 text-white hover:bg-amber-500"
                asChild
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-10 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" className="cursor-pointer">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={`/${localPath}`} className="cursor-pointer">
                  <DropdownMenuItem className="capitalize">{localPath}</DropdownMenuItem>
                </Link>
                <Link href="/change-password" className="cursor-pointer">
                  <DropdownMenuItem>Change Password</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <CiMenuFries
            className="text-2xl text-gray-900 cursor-pointer md:hidden"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          />
        </div>

        {/* Mobile Sidebar */}
        <aside
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-gray-100 dark:bg-slate-700 p-6 transition-transform duration-300 ease-in-out md:hidden z-50 ${
            mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end">
            <button
              className="text-2xl text-gray-900"
              onClick={() => setMobileSidebarOpen(false)}
            >
              &times;
            </button>
          </div>
          <ul className="flex flex-col gap-4 mt-6 text-base text-gray-900">
            {items.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleScrollToSection(item)}
                  className={`relative capitalize hover:text-amber-500 transition-colors duration-300 ${
                    pathname === `/${item}` ? 'text-amber-500 font-semibold' : ''
                  }`}
                >
                  {item.replace('-', ' ')}
                  <span
                    className={`absolute bottom-[-2px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                      pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Overlay for mobile sidebar */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </nav>
    </div>
  );
}