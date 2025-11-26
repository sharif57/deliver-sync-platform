/* eslint-disable @typescript-eslint/no-explicit-any */


// "use client";

// import type React from "react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Clipboard,
//   Building2,
//   Tag,
//   Scale,
//   DollarSign,
//   MapPin,
//   Home,
// } from "lucide-react";
// import PageHeader from "@/components/shareUi/onBack";
// import { useCreateOrderMutation } from "@/redux/feature/customerSlice";
// import { toast } from "sonner";

// export default function DriverRequestForm() {
//   const [formData, setFormData] = useState({
//     orderId: "454524",
//     customerName: "sds",
//     productDescription: "sd",
//     productWeight: "20",
//     productAmount: "32",
//     pickupLocation: "sdf",
//     deliveryLocation: "sd",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const [createOrder] = useCreateOrderMutation();

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const toastId = toast.loading("Submitting your request...");

//     try {
//       const payload = {
//         order_id: formData.orderId,
//         company_name: formData.customerName,
//         description: formData.productDescription,
//         product_weight: formData.productWeight,
//         product_amount: formData.productAmount,
//         pickup_location: formData.pickupLocation,
//         delivery_location: formData.deliveryLocation,
//       };

//       const res = await createOrder(payload).unwrap();
//       console.log(res?.data, "order response ==========>");

//       toast.success("Driver request submitted successfully!", { id: toastId });
//       router.push(`/customer/driver-confirmation?id=${res?.data?.id}&order_id=${res?.data?.order_id}`);
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Failed to submit driver request.", { id: toastId });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <div>
//       <title>Driver Request</title>
//       {/* Header */}
//       <div className="px-4 py-4 flex items-center justify-between lg:w-2/3">
//         <PageHeader title="" onBack={handleBack} />
//         <div className="space-y-3">
//           <h1 className="lg:text-4xl text-2xl font-medium text-center w-full text-primary">
//             Driver Request
//           </h1>
//           <p className="lg:text-xl font-normal text-center text-gray-600">
//             Fill in the details below to schedule your delivery
//           </p>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="px-4 py-6 bg-white rounded-lg">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Order ID */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Order ID
//             </label>
//             <div className="relative">
//               <Clipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 value={formData.orderId}
//                 placeholder="Enter your order ID"
//                 required
//                 onChange={(e) => handleInputChange("orderId", e.target.value)}
//                 className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
//               />
//             </div>
//           </div>

//           {/* Customer Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Customer Name
//             </label>
//             <div className="relative">
//               <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Enter company name"
//                 required
//                 value={formData.customerName}
//                 onChange={(e) =>
//                   handleInputChange("customerName", e.target.value)
//                 }
//                 className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
//               />
//             </div>
//           </div>

//           {/* Product Short Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Short Description
//             </label>
//             <div className="relative">
//               <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Textarea
//                 placeholder="Write product Description"
//                 required
//                 value={formData.productDescription}
//                 onChange={(e) =>
//                   handleInputChange("productDescription", e.target.value)
//                 }
//                 className="pl-10 pr-16 bg-featuresBg border-orange-100 focus:border-orange-300 focus:ring-orange-200 min-h-[50px] resize-none"
//               />
//               <span className="absolute right-3 top-3 text-xs text-gray-400">
//                 (Optional)
//               </span>
//             </div>
//           </div>

//           {/* Product Weight */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Weight
//             </label>
//             <div className="relative">
//               <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Write here"
//                 type="number"
//                 required
//                 value={formData.productWeight}
//                 onChange={(e) =>
//                   handleInputChange("productWeight", e.target.value)
//                 }
//                 className="pl-10 pr-16 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
//               />
//               <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
//                 (Optional)
//               </span>
//             </div>
//           </div>

//           {/* Product Amount */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Product Amount
//             </label>
//             <div className="relative">
//               <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Write the amount"
//                 type="number"
//                 required
//                 value={formData.productAmount}
//                 onChange={(e) =>
//                   handleInputChange("productAmount", e.target.value)
//                 }
//                 className="pl-10 pr-16 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
//               />
//               <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
//                 (Optional)
//               </span>
//             </div>
//           </div>

//           {/* Pickup Location */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Pickup Location
//             </label>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Enter pickup address"
//                 required
//                 value={formData.pickupLocation}
//                 onChange={(e) =>
//                   handleInputChange("pickupLocation", e.target.value)
//                 }
//                 className="pl-10 bg-featuresBg border-orange-100 focus:border-orange-300 py-5 focus:ring-orange-200"
//               />
//             </div>
//           </div>

//           {/* Delivery Location */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Delivery Location
//             </label>
//             <div className="relative">
//               <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Enter Delivery address"
//                 required
//                 value={formData.deliveryLocation}
//                 onChange={(e) =>
//                   handleInputChange("deliveryLocation", e.target.value)
//                 }
//                 className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="pt-4">
//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r text-xl from-[#EFB639] to-[#C59325] py-6 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
//             >
//               {isLoading ? "Submitting..." : "Request a Driver"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clipboard,
  Building2,
  Tag,
  Scale,
  DollarSign,
  MapPin,
  Home,
} from "lucide-react";
import GoogleMapReact from "google-map-react";
import PageHeader from "@/components/shareUi/onBack";
import { useCreateOrderMutation } from "@/redux/feature/customerSlice";
import { toast } from "sonner";

// Google Maps API Key
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

// Simple Marker Component for Google Map
const Marker = ({ text, lat, lng }: { text: string; lat?: number; lng?: number }) => (
  <div className="bg-red-500 text-white rounded-full p-2 text-xs font-bold">
    {text}
  </div>
);

export default function DriverRequestForm() {
  const [formData, setFormData] = useState({
    orderId: "",
    customerName: "",
    productDescription: "",
    productWeight: "",
    productAmount: "",
    pickupLocation: "",
    pickupLocationLat: null as number | null,
    pickupLocationLong: null as number | null,
    deliveryLocation: "",
    deliveryLocationLat: null as number | null,
    deliveryLocationLong: null as number | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [mapsInstance, setMapsInstance] = useState<any>(null);
  const [activeMap, setActiveMap] = useState<"pickup" | "delivery" | null>(null);

  const pickupInputRef = useRef<HTMLInputElement>(null);
  const deliveryInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [createOrder] = useCreateOrderMutation();

  // Handle input changes for text fields
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Initialize Google Maps Places Autocomplete
  useEffect(() => {
    if (!mapsInstance || !pickupInputRef.current || !deliveryInputRef.current) return;

    const pickupAutocomplete = new mapsInstance.places.Autocomplete(pickupInputRef.current, {
      types: ["address"],
      // componentRestrictions: { country: "bd" }, // Restrict to Bangladesh
    });
    const deliveryAutocomplete = new mapsInstance.places.Autocomplete(deliveryInputRef.current, {
      types: ["address"],
      // componentRestrictions: { country: "bd" },
    });

    pickupAutocomplete.addListener("place_changed", () => {
      const place = pickupAutocomplete.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          pickupLocation: place.formatted_address || "",
          pickupLocationLat: place.geometry.location.lat(),
          pickupLocationLong: place.geometry.location.lng(),
        }));
      } else {
        toast.error("Please select a valid pickup address from the suggestions.");
      }
    });

    deliveryAutocomplete.addListener("place_changed", () => {
      const place = deliveryAutocomplete.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          deliveryLocation: place.formatted_address || "",
          deliveryLocationLat: place.geometry.location.lat(),
          deliveryLocationLong: place.geometry.location.lng(),
        }));
      } else {
        toast.error("Please select a valid delivery address from the suggestions.");
      }
    });
  }, [mapsInstance]);

  // Handle map click to set coordinates
  const handleMapClick = ({ lat, lng }: { lat: number; lng: number }) => {
    if (!activeMap || !mapsInstance) return;

    const geocoder = new mapsInstance.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results: any, status: string) => {
      if (status === "OK" && results[0]) {
        setFormData((prev) => ({
          ...prev,
          [`${activeMap}Location`]: results[0].formatted_address,
          [`${activeMap}LocationLat`]: lat,
          [`${activeMap}LocationLong`]: lng,
        }));
      } else {
        toast.error("Could not retrieve address for this location.");
      }
    });
  };

  // Draw polyline between pickup and delivery locations
  useEffect(() => {
    if (!mapInstance || !mapsInstance || !formData.pickupLocationLat || !formData.pickupLocationLong || !formData.deliveryLocationLat || !formData.deliveryLocationLong) return;

    const polyline = new mapsInstance.Polyline({
      path: [
        { lat: formData.pickupLocationLat, lng: formData.pickupLocationLong },
        { lat: formData.deliveryLocationLat, lng: formData.deliveryLocationLong },
      ],
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(mapInstance);

    // Cleanup polyline on component unmount or when coordinates change
    return () => {
      polyline.setMap(null);
    };
  }, [mapInstance, mapsInstance, formData.pickupLocationLat, formData.pickupLocationLong, formData.deliveryLocationLat, formData.deliveryLocationLong]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pickupLocationLat || !formData.pickupLocationLong || !formData.deliveryLocationLat || !formData.deliveryLocationLong) {
      toast.error("Please select valid pickup and delivery locations with coordinates.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        order_id: formData.orderId,
        company_name: formData.customerName,
        description: formData.productDescription,
        product_weight: formData.productWeight,
        product_amount: formData.productAmount,
        pickup_location: formData.pickupLocation,
        pickup_location_lat: formData.pickupLocationLat,
        pickup_location_long: formData.pickupLocationLong,
        delivery_location: formData.deliveryLocation,
        delivery_location_lat: formData.deliveryLocationLat,
        delivery_location_long: formData.deliveryLocationLong,
      };

      const res = await createOrder(payload).unwrap();
      console.log(res?.data, "order response ==========>");

      toast.success(res?.data?.message || "Driver request submitted successfully!");
      router.push(`/customer/driver-confirmation?id=${res?.data?.id}&order_id=${res?.data?.order_id}`);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to submit driver request.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Initialize Google Maps API
  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setMapInstance(map);
    setMapsInstance(maps);
  };

  // Calculate map center dynamically
  const getMapCenter = () => {
    if (formData.pickupLocationLat && formData.pickupLocationLong) {
      return { lat: formData.pickupLocationLat, lng: formData.pickupLocationLong };
    }
    if (formData.deliveryLocationLat && formData.deliveryLocationLong) {
      return { lat: formData.deliveryLocationLat, lng: formData.deliveryLocationLong };
    }
    return { lat: 23.8103, lng: 90.4125 }; // Default to Dhaka, Bangladesh
  };

  return (
    <div>
      <title>Company Request</title>
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between lg:w-2/3">
        <PageHeader title="" onBack={handleBack} />
        <div className="space-y-3">
          <h1 className="lg:text-4xl text-2xl font-medium text-center w-full text-primary">
            Driver Request
          </h1>
          <p className="lg:text-xl font-normal text-center text-gray-600">
            Fill in the details below to schedule your delivery
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6 bg-white rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order ID
            </label>
            <div className="relative">
              <Clipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={formData.orderId}
                placeholder="Enter your order ID"
                required
                onChange={(e) => handleInputChange("orderId", e.target.value)}
                className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter company name"
                required
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Product Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Short Description
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                placeholder="Write product description"
                required
                value={formData.productDescription}
                onChange={(e) => handleInputChange("productDescription", e.target.value)}
                className="pl-10 pr-16 bg-featuresBg border-orange-100 focus:border-orange-300 focus:ring-orange-200 min-h-[50px] resize-none"
              />
              <span className="absolute right-3 top-3 text-xs text-gray-400">
                (Optional)
              </span>
            </div>
          </div>

          {/* Product Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Weight
            </label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Write here"
                type="number"
                required
                value={formData.productWeight}
                onChange={(e) => handleInputChange("productWeight", e.target.value)}
                className="pl-10 pr-16 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                (Optional)
              </span>
            </div>
          </div>

          {/* Product Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Write the amount"
                type="number"
                required
                value={formData.productAmount}
                onChange={(e) => handleInputChange("productAmount", e.target.value)}
                className="pl-10 pr-16 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                (Optional)
              </span>
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter pickup address"
                required
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                ref={pickupInputRef}
                className="pl-10 bg-featuresBg border-orange-100 focus:border-orange-300 py-5 focus:ring-orange-200"
              />
            </div>
            {/* <Button
              type="button"
              onClick={() => setActiveMap("pickup")}
              className="mt-2 bg-blue-500 text-white"
            >
              Select Pickup on Map
            </Button> */}
          </div>

          {/* Delivery Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Location
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter delivery address"
                required
                value={formData.deliveryLocation}
                onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                ref={deliveryInputRef}
                className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
            {/* <Button
              type="button"
              onClick={() => setActiveMap("delivery")}
              className="mt-2 bg-blue-500 text-white"
            >
              Select Delivery on Map
            </Button> */}
          </div>

          {/* Google Map */}
          <div className="mt-4" style={{ height: "400px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: GOOGLE_API_KEY || "",
                libraries: ["places"], // Include Places API
              }}
              defaultCenter={getMapCenter()}
              defaultZoom={12}
              onClick={handleMapClick}
              onGoogleApiLoaded={handleApiLoaded}
              yesIWantToUseGoogleMapApiInternals
            >
              {formData.pickupLocationLat !== null && formData.pickupLocationLong !== null && (
                <Marker
                  lat={formData.pickupLocationLat}
                  lng={formData.pickupLocationLong}
                  text="Pickup"
                />
              )}
              {formData.deliveryLocationLat !== null && formData.deliveryLocationLong !== null && (
                <Marker
                  lat={formData.deliveryLocationLat}
                  lng={formData.deliveryLocationLong}
                  text="Delivery"
                />
              )}
            </GoogleMapReact>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r text-xl from-[#EFB639] to-[#C59325] py-6 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
            >
              {isLoading ? "Submitting..." : "Request a Driver"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}