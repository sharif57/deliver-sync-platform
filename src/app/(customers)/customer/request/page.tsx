// import React from 'react'

// export default function RequestDelivery() {
//   return (
//     <div>

//     </div>
//   )
// }
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clipboard, Building2, Tag, Scale, DollarSign, MapPin, Home } from "lucide-react"

export default function DeliveryRequestForm() {
    const [formData, setFormData] = useState({
        orderId: "eg: #12345",
        companyName: "",
        productDescription: "",
        productWeight: "",
        productAmount: "",
        pickupLocation: "",
        deliveryLocation: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
    }

    return (
        <>
        <title>Delivery Request</title>
            <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-semibold text-green-600 mb-2">Delivery Request</h1>
                        <p className="text-gray-600 text-sm">Fill in the details below to schedule your delivery</p>
                    </div>

                    <div className="  p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Order ID */}
                            <div className="space-y-2">
                                <Label htmlFor="orderId" className="text-sm font-medium text-gray-700">
                                    Order ID
                                </Label>
                                <div className="relative">
                                    <Clipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="orderId"
                                        value={formData.orderId}
                                        onChange={(e) => handleInputChange("orderId", e.target.value)}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Company Name */}
                            <div className="space-y-2">
                                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                                    Company Name
                                </Label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="companyName"
                                        placeholder="Enter company name"
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Product Short Description */}
                            <div className="space-y-2">
                                <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">
                                    Product Short Description
                                </Label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Textarea
                                        id="productDescription"
                                        placeholder="Write product Description"
                                        value={formData.productDescription}
                                        onChange={(e) => handleInputChange("productDescription", e.target.value)}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[80px] resize-none"
                                    />
                                    <span className="absolute right-3 top-3 text-xs text-gray-400">(Optional)</span>
                                </div>
                            </div>

                            {/* Product Weight */}
                            <div className="space-y-2">
                                <Label htmlFor="productWeight" className="text-sm font-medium text-gray-700">
                                    Product Weight
                                </Label>
                                <div className="relative">
                                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="productWeight"
                                        placeholder="Write here"
                                        value={formData.productWeight}
                                        onChange={(e) => handleInputChange("productWeight", e.target.value)}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                        (Optional)
                                    </span>
                                </div>
                            </div>

                            {/* Product Amount */}
                            <div className="space-y-2">
                                <Label htmlFor="productAmount" className="text-sm font-medium text-gray-700">
                                    Product Amount
                                </Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="productAmount"
                                        placeholder="Write the amount"
                                        value={formData.productAmount}
                                        onChange={(e) => handleInputChange("productAmount", e.target.value)}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                                        (Optional)
                                    </span>
                                </div>
                            </div>

                            {/* Pickup Location */}
                            <div className="space-y-2">
                                <Label htmlFor="pickupLocation" className="text-sm font-medium text-gray-700">
                                    Pickup Location
                                </Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="pickupLocation"
                                        placeholder="Enter pickup address"
                                        value={formData.pickupLocation}
                                        onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Delivery Location */}
                            <div className="space-y-2">
                                <Label htmlFor="deliveryLocation" className="text-sm font-medium text-gray-700">
                                    Delivery Location
                                </Label>
                                <div className="relative">
                                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        id="deliveryLocation"
                                        placeholder="Enter Delivery address"
                                        value={formData.deliveryLocation}
                                        onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                                        className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-primary  text-white py-6 rounded-lg font-medium transition-colors"
                            >
                                Request a Driver
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
