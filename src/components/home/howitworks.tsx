import Customer from "../ui/icon/customer"
import Driver from "../ui/icon/driver"
import Company from "../ui/icon/company"
import SectionHeader from "@/lib/heading";

export default function HowItWorks() {

    const steps = [
        {
            title: "Customer",
            description: [
                "Order parts from a connected company",
                "Submit delivery request with order ID",
                "Track delivery live and get notifications"
            ],
            icon: <Customer />
        },
        {
            title: "Driver",
            description: [
                "Accept delivery task from company",
                "Collect parts and follow delivery route",
                "Update delivery status; get paid delivery"
            ],
            icon: <Driver />
        },
        {
            title: "Company",
            description: [
                "Receive customer delivery requests",
                "Assign drivers and monitor progress",
                "Access reports, analytics for all deliveries"
            ],
            icon: <Company />
        }
    ];


    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
             

                <SectionHeader
                    title="How it"
                    highlightedText="Works"
                    description="Order your truck parts, request a delivery, and get them at your doorstep - fast, reliable, and hassle-free"
                />


                {/* Three columns */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            title={step.title}
                            className="bg-heroBg cursor-pointer hover:shadow-lg hover:shadow-heroBg rounded-2xl text-center py-5 border shadow-xl h-[400px]"
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-center mx-auto mb-6">
                                {step.icon}
                            </div>

                            {/* Content */}
                            <div className="bg-white h-[280px] rounded-t-4xl rounded-b-2xl p-8">
                                <h3 className="text-[28px] font-medium text-gray-900 mb-6">
                                    {step.title}
                                </h3>

                                {/* Map description */}
                                <div className="space-y-4 text-left">
                                    {step.description.map((desc, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-[16px] text-secondary font-normal">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Join Now Button */}
                <div className="text-center">
                    <button className="bg-primary  text-white font-semibold px-24 py-4 rounded-lg text-lg transition-colors duration-200">
                        Join Now
                    </button>
                </div>
            </div>
        </section>
    )
}
