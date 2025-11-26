// 'use client';
// import { Button } from "@/components/ui/button"
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export function DeliverySignup() {
//   const [role, setRole] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const userRole = localStorage.getItem("userRole");
//     if (userRole) {
//       setRole(userRole);
//     }
//   }, []);

//   const handleStart = () => {
//     if (role === "driver") {
//       router.push("/driver");
//     } else if (role === "company") {
//       router.push("/company");
//     } else if (role === "customer") {
//       router.push("/customer");
//     } else {
//       router.push("/auth/signin"); // fallback if no role found
//     }
//   };

//   return (
//     <div className=" bg-white flex items-center justify-center px-4 py-8 mb-8">
//       <div className="w-full   space-y-8">
//         {/* Header Section */}
//         <div className="text-center space-y-4">
//           <h1 className="text-2xl sm:text-4xl font-medium text-secondary leading-tight text-balance">
//             Ready to Streamline Your Deliveries?
//           </h1>
//           <p className="text-muted-foreground text-base sm:text-xl leading-relaxed text-pretty">
//             Sign up today and experience seamless tracking and <br /> management
//           </p>
//         </div>

//         {/* Buttons Section */}
//         <div className="space-y-4 max-w-4xl mx-auto">
//           <Button
//             className="w-full h-14  font-medium bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white rounded-xl text-xl transition-colors duration-200"
//             size="lg"
//           >
//             Sign Up as Customer
//           </Button>

//           <Button
//             className="w-full h-14  font-medium bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white rounded-xl text-xl transition-colors duration-200"
//             size="lg"
//           >
//             Join as Driver
//           </Button>

//           <Button
//             className="w-full h-14  font-medium bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white rounded-xl text-xl transition-colors duration-200"
//             size="lg"
//           >
//             Register Your Company
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function DeliverySignup() {
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const handleSignUp = (selectedRole: string) => {
    // Save role
    localStorage.setItem("userRole", selectedRole);

    // Navigate role-wise
    if (selectedRole === "customer") {
      router.push("/auth/signup");
    } else if (selectedRole === "driver") {
      router.push("/auth/signup");
    } else if (selectedRole === "company") {
      router.push("/auth/signup");
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-4 py-8 mb-8">
      <div className="w-full space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-4xl font-medium text-secondary leading-tight">
            Ready to Streamline Your Deliveries?
          </h1>
          <p className="text-muted-foreground text-base sm:text-xl leading-relaxed">
            Sign up today and experience seamless tracking and <br /> management
          </p>
        </div>

        {/* Buttons Section */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <Button
            onClick={() => handleSignUp("customer")}
            className="w-full h-14 font-medium bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-xl text-xl transition-colors duration-200"
            size="lg"
          >
            Sign Up as Customer
          </Button>

          <Button
            onClick={() => handleSignUp("driver")}
            className="w-full h-14 font-medium bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-xl text-xl transition-colors duration-200"
            size="lg"
          >
            Join as Driver
          </Button>

          <Button
            onClick={() => handleSignUp("company")}
            className="w-full h-14 font-medium bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white rounded-xl text-xl transition-colors duration-200"
            size="lg"
          >
            Register Your Company
          </Button>
        </div>
      </div>
    </div>
  );
}
