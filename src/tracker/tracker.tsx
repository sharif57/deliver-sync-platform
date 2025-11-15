/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useEffect } from "react";
// import { useLocationProfileMutation } from "@/redux/feature/userSlice";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner"; // Assuming sonner is available

// export default function AutoLocationTracker() {
//   const router = useRouter();
//   const [locationProfile] = useLocationProfileMutation();

//   useEffect(() => {
//     // Check for existing location and redirect if present
//     const savedLocation = localStorage.getItem("userLocation");
//     if (savedLocation) {
//       router.push("/");
//     }

//     // Start watching location
//     if (!navigator.geolocation) {
//       console.error("Geolocation is not supported by your browser.");
//       return;
//     }

//     const id = navigator.geolocation.watchPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const locationData = {
//           latitude,
//           longitude,
//           timestamp: new Date().toISOString(), // e.g., "2025-10-22T15:02:00Z"
//         };
//         localStorage.setItem("userLocation", JSON.stringify(locationData));
//         console.log("Location updated:", locationData);

//         // Delay API call by 2 seconds
//         setTimeout(async () => {
//           try {
//             const formData = new FormData();
//             formData.append("latitude", locationData.latitude.toString());
//             formData.append("longitude", locationData.longitude.toString());
//             formData.append("timestamp", locationData.timestamp);

        
//             const response = await locationProfile(formData).unwrap();

//             const locationData = {
//               latitude: response?.data?.location_latitude,
//               longitude: response?.data?.location_longitude,
//               timestamp: new Date().toISOString(),
//             };

//             localStorage.setItem("userLocation", JSON.stringify(locationData));

//             console.log(response)
//             localStorage.removeItem("userLocation",);
//             console.log("Profile updated:", response);
//             toast.success(response?.message || "Profile updated successfully");
//           } catch (error: any) {
//             console.error("Error updating profile:", error);
//             toast.error(error?.data?.message || "Failed to update profile");
//           }
//         }, 1000); // 2-second delay after location update
//       },
//       (error) => {
//         console.error("Error watching location:", error);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 2000, // Update every 2 seconds
//         maximumAge: 0,
//       }
//     );

//     // Cleanup watcher on unmount
//     return () => {
//       if (id) {
//         navigator.geolocation.clearWatch(id);
//       }
//     };
//   }, [locationProfile, router]);

//   return null; // No UI since it's fully automatic
// }

"use client";

import { useEffect, useRef } from "react";
import { useLocationProfileMutation } from "@/redux/feature/userSlice";
import { toast } from "sonner";

export default function AutoLocationTracker() {
  const [locationProfile] = useLocationProfileMutation();
  const isUpdating = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      // toast.error("Geolocation is not supported by your browser.");
      return;
    }

    // Function to fetch and update location
    const updateLocation = async () => {
      if (isUpdating.current) return; // prevent overlapping updates
      isUpdating.current = true;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const locationData = {
            latitude,
            longitude,
            timestamp: new Date().toISOString(),
          };

          // console.log("📍 Updated Location:", locationData);
          localStorage.setItem("userLocation", JSON.stringify(locationData));

          try {
            const formData = new FormData();
            formData.append("location_latitude", latitude.toString());
            formData.append("location_longitude", longitude.toString());
            formData.append("timestamp", locationData.timestamp);

            const response = await locationProfile(formData).unwrap();
            // console.log("✅ Location sent to API:", response);

            // Save returned coordinates (if backend modifies them)
            if (
              response?.data?.location_latitude &&
              response?.data?.location_longitude
            ) {
              const updatedLocation = {
                latitude: response.data.location_latitude,
                longitude: response.data.location_longitude,
                timestamp: new Date().toISOString(),
              };
              localStorage.setItem(
                "userLocation",
                JSON.stringify(updatedLocation)
              );
            }

            // toast.success(response?.message || "Location updated successfully");
          } catch (error: any) {
            console.error("❌ API Error:", error);
            // toast.error(error?.data?.message || "Failed to update location");
          } finally {
            // Unlock update after delay
            setTimeout(() => {
              isUpdating.current = false;
            }, 1800000);
          }
        },
        (error) => {
          console.error("⚠️ Geolocation error:", error);
          // toast.error("Please allow location access to continue.");
          isUpdating.current = false;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    };

    // Run once immediately and then every 10 seconds
    updateLocation();
    intervalRef.current = setInterval(updateLocation, 10000);

    console.log("📡 Auto location tracking started...");

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      console.log("🧹 Auto location tracking stopped.");
    };
  }, [locationProfile]);

  return null; // Background tracker — no UI
}
