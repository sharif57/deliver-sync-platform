"use client"
import type React from "react"
interface TimelineItem {
    id: string
    title: string
    company: string
    date: string
    description: string
}

interface TimelineProps {
    data?: TimelineItem[]
    className?: string
}

const Card = ({ children}: { children: React.ReactNode; className?: string }) => (
    <div
        // className={`rounded-2xl bg-white p-12 text-sm leading-7 text-gray-700 shadow-lg shadow-black/5 dark:bg-gray-950 dark:text-gray-300 dark:shadow-white/5 ${className}`}
    >
        {children}
    </div>
)



const defaultTimelineData: TimelineItem[] = [
    {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        date: "2023 - Present",
        description: "Led development team, implemented CI/CD pipelines, reduced deployment time by 60%.",
    },
    {
        id: "2",
        title: "Full Stack Developer",
        company: "StartupXYZ",
        date: "2021 - 2023",
        description:
            "Developed client projects using modern web technologies and collaborated with cross-functional teams.",
    },
    {
        id: "3",
        title: "E-Commerce Platform",
        company: "Personal Project",
        date: "2022",
        description: "Built complete e-commerce solution with 99.9% uptime handling 10k+ daily transactions.",
    },
    {
        id: "4",
        title: "Computer Science Degree",
        company: "University of Technology",
        date: "2017 - 2021",
        description: "Bachelor of Science, Magna Cum Laude with 3.8 GPA, focus on software engineering.",
    },
]

export default function Map({ data = defaultTimelineData }: TimelineProps) {
    return (
        <div

        >
            <div className="col-start-3 row-start-3 flex container mx-auto flex-col bg-gray-100 p-2 dark:bg-white/10">
                <Card>


                    <div className="space-y-10">
                        {data.map((item, index) => (
                            <div key={item.id} className="relative group transition-all duration-300 hover:translate-x-1">
                                {index !== data.length - 1 && (
                                    <div className="absolute left-3 top-8 h-full w-0.5 bg-gradient-to-b from-black via-gray-400 to-white opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                                )}
                                <div className="flex gap-6">
                                    <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 mt-1 shadow-md group-hover:scale-110 transition-transform duration-300">
                                        <div className="h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
                                    </div>
                                    <div className="flex-1 space-y-3 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-lg text-gray-950 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors duration-300">
                                                {item.title}
                                            </h3>
                                          
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:bg-gray-50 dark:group-hover:bg-gray-800/30 rounded-lg p-3 -m-3 transition-all duration-300">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

        </div>
    )
}
