

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
// import { useUserProfileQuery } from '@/redux/feature/userSlice';

// export default function ResponsiveNavbar() {
//   const pathname = usePathname();
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement>(null);
//   const [localPath, setLocalPath] = useState('');

//   const {data} = useUserProfileQuery(undefined);
//   console.log(data?.data, 'profile data');
//   const profile = data?.data;

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
//       const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
//       const elementPosition = element.getBoundingClientRect().top + window.scrollY;
//       window.scrollTo({
//         top: elementPosition - navbarHeight,
//         behavior: 'smooth',
//       });
//       setMobileSidebarOpen(false); // Close mobile sidebar after clicking
//     } else {
//       console.warn(`Section with ID "${sectionId}" not found.`);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userRole');
//     window.location.href = '/'; // Redirect to home after logout
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//       <nav className="flex items-center justify-between container mx-auto px-4 py-4 md:px-6 md:py-5">
//         {/* Logo */}
//         <Link href="/" title="DeliverSync">
//           <AuthIcon />
//         </Link>

//         {/* Desktop Nav Links */}
//         <ul className="hidden md:flex items-center gap-6 text-base md:text-lg text-gray-900">
//           {items.map((item, index) => (
//             <li key={index} title={item.replace('-', ' ')}>
//               <button
//                 onClick={() => handleScrollToSection(item)}
//                 className={`relative capitalize hover:text-primary transition-colors duration-300 ${pathname === `/${item}` ? 'text-primary font-semibold' : ''
//                   }`}
//               >
//                 {item.replace('-', ' ')}
//                 <span
//                   className={`absolute bottom-[-2px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
//                     }`}
//                 />
//               </button>
//             </li>
//           ))}
//         </ul>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-3">
//           {profile === 'customer' || profile === 'driver' || profile === 'company' ? (
//             <div className="flex items-center gap-3">
//               <Button
//                 title="Log In"
//                 variant="outline"
//                 className="text-gray-900 border border-[#B0B0B0] text-base md:text-lg font-normal px-4 py-2 md:px-8 md:py-6 hover:text-secondary"
//                 asChild
//               >
//                 <Link href="/auth/signin">Log In</Link>
//               </Button>
//               <Button
//                 title="Sign Up"
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
//                 <Link href={`/${profile?.role}`} className="cursor-pointer">
//                   <DropdownMenuItem className="capitalize">{profile?.role}</DropdownMenuItem>
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
//           </ul>
//         </aside>

//         {/* Overlay for mobile sidebar */}
//         {mobileSidebarOpen && (
//           <div
//             className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-40 md:hidden"
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
import { useUserProfileQuery } from '@/redux/feature/userSlice';
import { logout } from '@/service/authService';

export default function ResponsiveNavbar() {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [localRole, setLocalRole] = useState<string | null>(null);

  // Fetch user profile data using RTK Query
  const { data, isLoading, isError } = useUserProfileQuery(undefined);
  const profile = data?.data;
  console.log(profile)

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL || '';

  // Sync local storage with user role
  useEffect(() => {
    if (profile?.role) {
      localStorage.setItem('userRole', profile.role);
      setLocalRole(profile.role);
    } else {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        setLocalRole(storedRole);
      }
    }
  }, [profile]);

  // Handle click outside to close mobile sidebar
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

  // Close mobile sidebar on route change
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
      setMobileSidebarOpen(false);
    } else {
      console.warn(`Section with ID "${sectionId}" not found.`);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('accessToken');
    await logout();
    setLocalRole(null);
    window.location.href = '/'; 
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
            <li key={index} title={item.replace('-', ' ')}>
              <button
                onClick={() => handleScrollToSection(item)}
                className={`relative capitalize hover:text-primary transition-colors duration-300 ${pathname === `/${item}` ? 'text-primary font-semibold' : ''
                  }`}
              >
                {item.replace('-', ' ')}
                <span
                  className={`absolute bottom-[-2px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Action Buttons or Profile Dropdown */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="flex items-center gap-3">
              {/* Log In Skeleton */}
              <div className="h-[48px] md:h-[54px] w-[100px] md:w-[130px] rounded-md bg-gray-200 animate-pulse"></div>

              {/* Sign Up Skeleton */}
              <div className="h-[48px] md:h-[54px] w-[100px] md:w-[130px] rounded-md bg-gray-200 animate-pulse"></div>
            </div>

          ) : isError || !profile ? (
            // Show Log In and Sign Up buttons for unauthenticated users
            <div className="flex items-center gap-3">
              <Button
                title="Log In"
                variant="outline"
                className="text-gray-900 border border-[#B0B0B0] text-base md:text-lg font-normal px-4 py-2 md:px-8 md:py-6 hover:text-secondary"
                asChild
              >
                <Link href="/auth/signin">Log In</Link>
              </Button>
              <Button
                title="Sign Up"
                className="bg-gradient-to-r from-[#EFB639] to-[#C59325] text-base md:text-lg font-normal px-4 py-4 md:px-8 md:py-6 text-white hover:bg-amber-500"
                asChild
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            // Show profile dropdown for authenticated users
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-10 cursor-pointer">
                  <AvatarImage src={IMAGE + profile.image || 'https://github.com/shadcn.png'} />
                  <AvatarFallback>{profile.name ? profile.name[0].toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{profile.name || 'My Account'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" className="cursor-pointer">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={`/${profile.role}`} className="cursor-pointer">
                  <DropdownMenuItem className="capitalize">{profile.role}</DropdownMenuItem>
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
          className={`fixed top-0 right-0 h-full w-64 bg-gray-100 dark:bg-slate-700 p-6 transition-transform duration-300 ease-in-out md:hidden z-50 ${mobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
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
                  className={`relative capitalize hover:text-amber-500 transition-colors duration-300 ${pathname === `/${item}` ? 'text-amber-500 font-semibold' : ''
                    }`}
                >
                  {item.replace('-', ' ')}
                  <span
                    className={`absolute bottom-[-2px] left-0 h-[2px] bg-amber-500 transition-all duration-300 ${pathname === `/${item}` ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </button>
              </li>
            ))}
            {profile && (
              <>
                <li>
                  <Link href="/profile" className="capitalize hover:text-amber-500">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href={`/${profile.role}`} className="capitalize hover:text-amber-500">
                    {profile.role}
                  </Link>
                </li>
                <li>
                  <Link href="/change-password" className="capitalize hover:text-amber-500">
                    Change Password
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 capitalize hover:text-red-600"
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}
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