import SectionHeader from '@/lib/heading'
import React from 'react'
import OrderIcon from '../ui/icon/order'
import ClockIcon from '../ui/icon/clock'
import ToolsIcon from '../ui/icon/tools'
import ChartIcon from '../ui/icon/chart'
import BellIcon from '../ui/icon/bell'
import Shield from '../ui/icon/Shield'

export default function Features() {

    const features = [
        {
            icon: <OrderIcon />,
            title: "Easy Order Placement",
            description: "Customers can quickly submit delivery requests using the order number",
        },
        {
            icon: <ClockIcon />,
            title: "Real-Time Tracking",
            description: "Customers and companies can track orders live with location",
        },
        {
            icon: <ToolsIcon />,
            title: "Driver Tools",
            description: "Drivers get assigned jobs, see optimized routes, update status",
        },
        {
            icon: <ChartIcon />,
            title: "Company Dashboard",
            description: "Companies manage all their deliveries, check driver activities",
        },
        {
            icon: <BellIcon />,
            title: "Notifications & Alerts",
            description: "Customers, drivers, and companies receive instant notifications",
        },
        {
            icon: <Shield />,
            title: "Secure Payments",
            description: "Companies manage payments while drivers after completing jobs",
        },
    ]

    return (
        <div className=" mx-auto px-4 bg-featuresBg py-16">
            <SectionHeader title="Key" highlightedText="Features" description="From order placement to successful delivery - everything managed in one smart platform" />
            <section className="py-16 px-4">
                <div className=" max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                title={feature.title}
                                  className={`bg-white p-8 cursor-pointer text-center shadow-xl hover:shadow-md transition-shadow duration-300 ${index % 2 === 1 ? 'rounded-2xl' : 'rounded-full'
                                    }`}
                            > 
                                <div className=" flex items-center justify-center mx-auto mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-medium text-secondary mb-4 text-balance">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-pretty">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <button className="bg-primary  text-white font-semibold px-24 py-4 rounded-lg text-lg transition-colors duration-200">
                            Watch Demo
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
