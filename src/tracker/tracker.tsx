// "use client";
// import React, { useState, useEffect } from "react";

// interface Location {
//     latitude: number | null;
//     longitude: number | null;
// }

// export default function AutoLocationTracker() {
//     const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
//     console.log(location)
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         // Function to get user location
//         const fetchLocation = () => {
//             if (!navigator.geolocation) {
//                 setError("Geolocation is not supported by your browser");
//                 return;
//             }

//             navigator.geolocation.getCurrentPosition(
//                 (position: GeolocationPosition) => {
//                     setLocation({
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                     });
//                     setError(null);
//                 },
//                 (err: GeolocationPositionError) => {
//                     setError(err.message);
//                 }
//             );
//         };

//         // Call it immediately and then every 2 seconds
//         fetchLocation();
//         const interval = setInterval(fetchLocation, 1000); // 2 seconds

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, []);

//     return (
//         <div className="p-6 text-center">
//             <h1 className="text-2xl font-bold mb-4">Automatic Location Tracker</h1>

//             {location.latitude && location.longitude ? (
//                 <div>
//                     <p>Latitude: {location.latitude}</p>
//                     <p>Longitude: {location.longitude}</p>
//                 </div>
//             ) : (
//                 <p>Fetching location...</p>
//             )}

//             {error && <p className="text-red-500 mt-4">{error}</p>}
//         </div>
//     );
// }
// tracker.tsx
"use client";
import { useEffect } from "react";

export default function AutoLocationTracker() {
  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          // Store in localStorage
          const locationData = { latitude, longitude, timestamp: new Date().toISOString() };
          localStorage.setItem("userLocation", JSON.stringify(locationData));

          console.log("Updated Location:", locationData);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };

    // Run immediately
    fetchLocation();

    // Update every 2 seconds
    const interval = setInterval(fetchLocation, 2000);

    return () => clearInterval(interval);
  }, []);

  return null; // This component runs silently in the background
}
