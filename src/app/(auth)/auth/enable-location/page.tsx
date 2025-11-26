// "use client";

// import { Button } from "@/components/ui/button";
// import AuthIcon from "@/components/ui/icon/auth";
// import CurrentLocation from "@/components/ui/icon/current-location";
// import { uselocationProfileMutation } from "@/redux/feature/userSlice";
// import { ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect, use } from "react";

// export default function CurrentLocations() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState(null);

//   const [locationProfile] = uselocationProfileMutation();

//   useEffect(() => {
//     const local = localStorage.getItem("userLocation");
//     if (local) {
//       setLocation(JSON.parse(local));
//     }
//   }, []);
//   console.log(location)

//   const handleEnableLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;

//         // ✅ Save location data in localStorage
//         const locationData = {
//           latitude,
//           longitude,
//           timestamp: new Date().toISOString(),
//         };
//         localStorage.setItem("userLocation", JSON.stringify(locationData));

//         // ✅ Redirect to home after success
//         router.push("/");
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         alert("Please allow location access to continue.");

//         // ❌ Redirect to error page
//         // router.push("/location-error");
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   // Optional: If user already allowed location, skip this screen
//   useEffect(() => {
//     const savedLocation = localStorage.getItem("userLocation");
//     if (savedLocation) {
//       router.push("/");
//     }
//   }, [router]);

//   return (
//     <div className="p-4 container mx-auto">
//       <div onClick={() => router.back()} className="flex items-center gap-4">
//         <ArrowLeft className="cursor-pointer w-6 h-6" />
//         <AuthIcon />
//       </div>

//       <div className="flex items-center justify-center gap-14 mt-10">
//         <CurrentLocation />
//         <div className="space-y-16">
//           <div>
//             <h1 className="text-5xl font-semibold text-primary">
//               Enable Location
//             </h1>
//             <p className="text-2xl font-normal text-[#D69D21]">
//               Please turn on your location to continue
//             </p>
//           </div>
//           <div>
//             <Button
//               onClick={handleEnableLocation}
//               disabled={loading}
//               className="mt-6 bg-primary text-white hover:bg-primary/80 px-10 py-5 w-full cursor-pointer rounded-lg text-lg font-medium"
//             >
//               {loading ? "Detecting..." : "Enable Location"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { Button } from "@/components/ui/button";
// import AuthIcon from "@/components/ui/icon/auth";
// import CurrentLocation from "@/components/ui/icon/current-location";
// import { useLocationProfileMutation } from "@/redux/feature/userSlice";
// import { ArrowLeft } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { toast } from "sonner"; // Assuming sonner is available

// export default function CurrentLocations() {
//   const searchParams = useSearchParams();
//   const userId = searchParams.get("id");
//   // console.log(userId);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [watchId, setWatchId] = useState<number | null>(null);
//   const [locationProfile] = useLocationProfileMutation();

//   useEffect(() => {
//     // Check for existing location and redirect if present
//     const savedLocation = localStorage.getItem("userLocation");
//     if (savedLocation) {
//       setLocation(JSON.parse(savedLocation));
//       router.push("/");
//     }
//   }, [router]);

//   useEffect(() => {
//     // Start watching location
//     if (navigator.geolocation) {
//       const id = navigator.geolocation.watchPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           const locationData = {
//             latitude,
//             longitude,
//             timestamp: new Date().toISOString(), 
//           };
//           setLocation(locationData);
//           localStorage.setItem("userLocation", JSON.stringify(locationData));
//           console.log("Location updated:", locationData);

//           // Delay API call by 2 seconds
//           setTimeout(async () => {
//             try {
//               const formData = new FormData();
//               formData.append("latitude", locationData.latitude.toString());
//               formData.append("longitude", locationData.longitude.toString());
//               formData.append("timestamp", locationData.timestamp);

//               const response = await locationProfile(formData).unwrap();
//               console.log("Profile updated:", response);
//               toast.success(response?.message || "Profile updated successfully");
//               localStorage.setItem("userLocation", JSON.stringify(locationData));
//               router.push("/");
//             } catch (error: any) {
//               console.error("Error updating profile:", error);
//               toast.error(error?.data?.message || "Failed to update profile");
//             }
//           }, 2000); // 2-second delay
//         },
//         (error) => {
//           console.error("Error watching location:", error);
//           alert("Please allow location access to continue.");
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 2000, // Update every 2 seconds
//           maximumAge: 0,
//         }
//       );
//       setWatchId(id);
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }

//     // Cleanup watcher on unmount
//     return () => {
//       if (watchId !== null) {
//         navigator.geolocation.clearWatch(watchId);
//       }
//     };
//   }, [watchId, locationProfile, userId]);

//   const handleEnableLocation = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const locationData = {
//           latitude,
//           longitude,
//           timestamp: new Date().toISOString(),
//         };
//         localStorage.setItem("userLocation", JSON.stringify(locationData));

//         try {
//           const formData = new FormData();
//           formData.append("latitude", locationData.latitude.toString());
//           formData.append("longitude", locationData.longitude.toString());
//           formData.append("timestamp", locationData.timestamp);

//           // Append a default image
//           const imageFile = await fetch("/images/default.jpg").then((res) =>
//             res.blob()
//           );
//           formData.append("image", imageFile, "default.jpg");

//           const response = await locationProfile(formData).unwrap();
//           console.log("Profile updated:", response);
//           toast.success(response?.message || "Profile updated successfully");
//           router.push("/");
//         } catch (error: any) {
//           console.error("Error updating profile:", error);
//           toast.error(error?.data?.message || "Failed to update profile");
//         } finally {
//           setLoading(false);
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         alert("Please allow location access to continue.");
//         setLoading(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   return (
//     <div className="p-4 container mx-auto">
//       <div onClick={() => router.back()} className="flex items-center gap-4">
//         <ArrowLeft className="cursor-pointer w-6 h-6" />
//         <AuthIcon />
//       </div>

//       <div className="flex items-center justify-center gap-14 mt-10">
//         <CurrentLocation />
//         <div className="space-y-16">
//           <div>
//             <h1 className="text-5xl font-semibold text-primary">Enable Location</h1>
//             <p className="text-2xl font-normal text-[#D69D21]">
//               Please turn on your location to continue
//             </p>
//           </div>
//           <div>
//             <Button
//               onClick={handleEnableLocation}
//               disabled={loading}
//               className="mt-6 bg-primary text-white hover:bg-primary/80 px-10 py-5 w-full cursor-pointer rounded-lg text-lg font-medium"
//             >
//               {loading ? "Detecting..." : "Enable Location"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import AuthIcon from "@/components/ui/icon/auth";
// import CurrentLocation from "@/components/ui/icon/current-location";
// import { useLocationProfileMutation } from "@/redux/feature/userSlice";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { toast } from "sonner";

// export default function CurrentLocations() {

//   const router = useRouter();
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     const userRole = localStorage.getItem("userRole");
//     if (userRole) {
//       setRole(userRole);
//     }
//   }, []);

//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState<{
//     latitude: number;
//     longitude: number;
//     timestamp: string;
//   } | null>(null);

//   const [watchId, setWatchId] = useState<number | null>(null);
//   const [locationProfile] = useLocationProfileMutation();

//   // ✅ Check for saved location once at mount
//   useEffect(() => {
//     const savedLocation = localStorage.getItem("userLocation");
//     if (savedLocation) {
//       // Already has location → no need to re-detect
//       // router.push(`/${role}`);
//       <Link href={`/${role}`}></Link>;
//     }
//   }, [router]);

//   // ✅ Start watching user location
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     const id = navigator.geolocation.watchPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const locationData = {
//           latitude,
//           longitude,
//           timestamp: new Date().toISOString(),
//         };

//         setLocation(locationData);
//         localStorage.setItem("userLocation", JSON.stringify(locationData));
//         console.log("Location updated:", locationData);

//         // ✅ Only call API once after location updates
//         try {
//           const formData = new FormData();
//           formData.append("location_latitude", latitude.toString());
//           formData.append("location_longitude", longitude.toString());
//           formData.append("timestamp", locationData.timestamp);

//           const response = await locationProfile(formData).unwrap();
//           toast.success(response?.message || "Profile updated successfully");
//           localStorage.setItem("userLocation", JSON.stringify(locationData));

//           // ✅ Redirect after successful update
//           setTimeout(() => {
//             // router.push(`/${role}`);
//             <Link href={`/${role}`}></Link>;
//           }, 1000);
//         } catch (error: any) {
//           console.error("Error updating profile:", error);
//           toast.error(error?.data?.message || "Failed to update profile");
//         }
//       },
//       (error) => {
//         console.error("Error watching location:", error);
//         alert("Please allow location access to continue.");
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );

//     setWatchId(id);

//     // ✅ Cleanup when unmounted
//     return () => {
//       if (id) navigator.geolocation.clearWatch(id);
//     };
//   }, [locationProfile, router]);

//   // ✅ Manual location enable button
//   const handleEnableLocation = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by your browser.");
//       return;
//     }

//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const locationData = {
//           latitude,
//           longitude,
//           timestamp: new Date().toISOString(),
//         };
//         localStorage.setItem("userLocation", JSON.stringify(locationData));

//         try {
//           const formData = new FormData();
//           formData.append("location_latitude", latitude.toString());
//           formData.append("location_longitude", longitude.toString());
//           formData.append("timestamp", locationData.timestamp);

//           // Add a default image if needed
//           const imageFile = await fetch("/images/default.jpg").then((res) =>
//             res.blob()
//           );
//           formData.append("image", imageFile, "default.jpg");

//           const response = await locationProfile(formData).unwrap();
//           toast.success(response?.message || "Profile updated successfully");

//           // ✅ Redirect after update
//           setTimeout(() => {
//             // router.push(`/${role}`);
//                         <Link href={`/${role}`}></Link>;
//           }, 1000);
//         } catch (error: any) {
//           console.error("Error updating profile:", error);
//           toast.error(error?.data?.message || "Failed to update profile");
//         } finally {
//           setLoading(false);
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         alert("Please allow location access to continue.");
//         setLoading(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 0,
//       }
//     );
//   };

//   return (
//     <div className="p-4 container mx-auto">
//       <div onClick={() => router.back()} className="flex items-center gap-4">
//         <ArrowLeft className="cursor-pointer w-6 h-6" />
//         <AuthIcon />
//       </div>

//       <div className="flex items-center justify-center gap-14 mt-10">
//         <CurrentLocation />
//         <div className="space-y-16">
//           <div>
//             <h1 className="text-5xl font-semibold text-primary">
//               Enable Location
//             </h1>
//             <p className="text-2xl font-normal text-[#D69D21]">
//               Please turn on your location to continue
//             </p>
//           </div>
//           <div>
//             <Button
//               onClick={handleEnableLocation}
//               disabled={loading}
//               className="mt-6 bg-primary text-white hover:bg-primary/80 px-10 py-5 w-full cursor-pointer rounded-lg text-lg font-medium"
//             >
//               {loading ? "Detecting..." : "Enable Location"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import AuthIcon from "@/components/ui/icon/auth";
import CurrentLocation from "@/components/ui/icon/current-location";
import { useLocationProfileMutation } from "@/redux/feature/userSlice";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CurrentLocations() {
  const router = useRouter();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    timestamp: string;
  } | null>(null);

  const [watchId, setWatchId] = useState<number | null>(null);
  const [locationProfile] = useLocationProfileMutation();

  // ✅ Load role
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) setRole(userRole);
  }, []);

  // 🔥 Auto redirect if location already exists
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");

    if (savedLocation && role) {
      router.push(`/${role}`);
    }
  }, [role, router]);

  // 🔥 Start watching location
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const locationData = {
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        };

        setLocation(locationData);
        localStorage.setItem("userLocation", JSON.stringify(locationData));

        try {
          const formData = new FormData();
          formData.append("location_latitude", latitude.toString());
          formData.append("location_longitude", longitude.toString());
          formData.append("timestamp", locationData.timestamp);

          const response = await locationProfile(formData).unwrap();
          toast.success(response?.message || "Profile updated");

          // 🔥 Redirect after success
          if (role) {
            setTimeout(() => {
              router.push(`/${role}`);
            }, 500);
          }
        } catch (error: any) {
          toast.error(error?.data?.message || "Failed to update profile");
        }
      },
      () => alert("Please allow location access to continue."),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    setWatchId(id);

    return () => {
      if (id) navigator.geolocation.clearWatch(id);
    };
  }, [locationProfile, role, router]);

  // 🔥 Manual one-time location detection
  const handleEnableLocation = async () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const locationData = {
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        };

        localStorage.setItem("userLocation", JSON.stringify(locationData));

        try {
          const formData = new FormData();
          formData.append("location_latitude", latitude.toString());
          formData.append("location_longitude", longitude.toString());
          formData.append("timestamp", locationData.timestamp);

          const imageFile = await fetch("/images/default.jpg").then((res) =>
            res.blob()
          );
          formData.append("image", imageFile, "default.jpg");

          const response = await locationProfile(formData).unwrap();
          toast.success(response?.message || "Profile updated");

          if (role) {
            setTimeout(() => {
              router.push(`/${role}`);
            }, 500);
          }
        } catch (error: any) {
          toast.error(error?.data?.message || "Failed to update profile");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Please allow location access.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="p-4 container mx-auto">
      <div onClick={() => router.back()} className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer w-6 h-6" />
        <AuthIcon />
      </div>

      <div className="flex items-center justify-center gap-14 mt-10">
        <CurrentLocation />
        <div className="space-y-16">
          <div>
            <h1 className="text-5xl font-semibold text-primary">
              Enable Location
            </h1>
            <p className="text-2xl font-normal text-[#D69D21]">
              Please turn on your location to continue
            </p>
          </div>

          <Button
            onClick={handleEnableLocation}
            disabled={loading}
            className="mt-6 bg-primary text-white hover:bg-primary/80 px-10 py-5 w-full cursor-pointer rounded-lg text-lg font-medium"
          >
            {loading ? "Detecting..." : "Enable Location"}
          </Button>
        </div>
      </div>
    </div>
  );
}
