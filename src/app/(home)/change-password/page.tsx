"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChangePassword() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password change logic here
    console.log("Password change submitted:", formData)
  }

  return (
    <div className=" flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Change Password</h1>
          <p className="text-gray-600 text-sm">Enter your current password and choose a new one</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password Input */}
          <div className="relative">
            <Input
              type={showPasswords.current ? "text" : "password"}
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange("currentPassword", e.target.value)}
              className="w-full h-12 px-0 pr-10 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* New Password Input */}
          <div className="relative">
            <Input
              type={showPasswords.new ? "text" : "password"}
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full h-12 px-0 pr-10 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              type={showPasswords.confirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="w-full h-12 px-0 pr-10 border-0 border-b border-gray-300 rounded-none bg-transparent placeholder:text-gray-500 focus:border-amber-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

       

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-medium bg-gradient-to-r from-[#EFB639] to-[#C59325] hover:bg-amber-500 text-white rounded-xl transition-colors duration-200"
              size="lg"
            >
              Update Password
            </Button>
          </div>

          {/* Cancel Button */}
          <div>
            <Button
              onClick={() => router.back()}
              type="button"
              variant="outline"
              className="w-full h-12 text-gray-600 border-gray-300 hover:bg-gray-50 rounded-xl transition-colors duration-200 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
