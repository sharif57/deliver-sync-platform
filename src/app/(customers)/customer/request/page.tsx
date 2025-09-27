"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clipboard, Building2, Tag, Scale, DollarSign, MapPin, Home
 } from "lucide-react"
import PageHeader from "@/components/shareUi/onBack"

export default function DriverRequestForm() {
  const [formData, setFormData] = useState({
    orderId: "eg: #12345",
    customerName: "",
    productDescription: "",
    productWeight: "",
    productAmount: "",
    pickupLocation: "",
    deliveryLocation: "",
  })

  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Driver request submitted:", formData)
    router.push("/driver-confirmation")
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="">
        <title>Driver Request</title>
      {/* Header */}
      <div className=" px-4 py-4 flex items-center justify-between lg:w-2/3">
        {/* <button onClick={handleBack} className="mr-4">
          <Back />
        </button> */}
        <PageHeader title=""  onBack={handleBack} />
        <div className="space-y-3">
          <h1 className="lg:text-4xl text-2xl font-medium text-center w-full text-primary">Driver Request</h1>
          <p className="lg:text-xl font-normal text-center text-gray-600">Fill in the details below to schedule your delivery</p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6 bg-white rounded-lg ">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
            <div className="relative">
              <Clipboard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={formData.orderId}
                onChange={(e) => handleInputChange("orderId", e.target.value)}
                className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter company name"
                value={formData.customerName}
                onChange={(e) => handleInputChange("customerName", e.target.value)}
                className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Product Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Short Description</label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                placeholder="Write product Description"
                value={formData.productDescription}
                onChange={(e) => handleInputChange("productDescription", e.target.value)}
                className="pl-10 pr-16 bg-featuresBg border-orange-100 focus:border-orange-300 focus:ring-orange-200 min-h-[50px] resize-none"
              />
              <span className="absolute right-3 top-3 text-xs text-gray-400">(Optional)</span>
            </div>
          </div>

          {/* Product Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Weight</label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Write here"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Write the amount"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter pickup address"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                className="pl-10 bg-featuresBg border-orange-100 focus:border-orange-300 py-5 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Delivery Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter Delivery address"
                value={formData.deliveryLocation}
                onChange={(e) => handleInputChange("deliveryLocation", e.target.value)}
                className="pl-10 bg-featuresBg border-orange-100 py-5 focus:border-orange-300 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r text-xl from-[#EFB639] to-[#C59325] py-6 text-white  rounded-lg font-medium transition-colors"
            >
              Request a Driver
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
