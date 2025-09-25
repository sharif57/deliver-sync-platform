import { Button } from "@/components/ui/button"

export function DeliverySignup() {
  return (
    <div className=" bg-white flex items-center justify-center px-4 py-8 mb-8">
      <div className="w-full   space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-4xl font-medium text-secondary leading-tight text-balance">
            Ready to Streamline Your Deliveries?
          </h1>
          <p className="text-muted-foreground text-base sm:text-xl leading-relaxed text-pretty">
            Sign up today and experience seamless tracking and <br /> management
          </p>
        </div>

        {/* Buttons Section */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <Button
            className="w-full h-14  font-medium bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white rounded-xl text-xl transition-colors duration-200"
            size="lg"
          >
            Sign Up as Customer
          </Button>

          <Button
            className="w-full h-14  font-medium bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white rounded-xl text-xl transition-colors duration-200"
            size="lg"
          >
            Join as Driver
          </Button>

          <Button
            className="w-full h-14  font-medium bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white rounded-xl text-xl transition-colors duration-200"
            size="lg"
          >
            Register Your Company
          </Button>
        </div>
      </div>
    </div>
  )
}
