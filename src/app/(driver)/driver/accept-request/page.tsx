'use client';
import { MessageSquareMore, PhoneCall } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shareUi/onBack";

export default function AcceptRequest() {
    
    return (
        <div className="  ">
            <title>Accept Request</title>
            <div className=" mx-auto">
               
                <PageHeader title="Active Delivery" />
                
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <div className="flex flex-col sm:flex-row justify-between gap-14">
                        <div className="w-full sm:w-1/2">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-medium text-gray-800">
                                    Customer: Sharif Mahamud
                                </h1>
                                <div className="bg-gradient-to-r from-[#EFB639] to-[#C59325] flex items-center gap-4 rounded-lg p-2 px-4">
                                    <PhoneCall className="w-5 h-5 text-black p-1 rounded-full bg-white" />
                                    <MessageSquareMore className="w-5 h-5 text-black p-1 rounded-full bg-white" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[#D69D21] text-[16px] font-normal">ID#12345</p>
                                <p className="text-secondary text-xl font-normal">Package: Truck Alternator - 15kg</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.12231 12.3126L9.0902 10.9127L13.0581 12.3126L9.0902 4.20508L5.12231 12.3126Z" fill="#D69D21" />
                                    <path d="M17.5584 8.15969H16.6809C16.5136 4.45376 13.2921 1.23241 9.58628 1.06504V0.1875H8.59378V1.06504C4.88785 1.23238 1.6665 4.45386 1.49913 8.15969H0.621582V9.1522H1.49913C1.6665 12.8581 4.88795 16.0795 8.59378 16.2469V17.1244H9.58628V16.2469C13.2922 16.0795 16.5136 12.858 16.6809 9.1522H17.5585L17.5584 8.15969ZM9.58628 15.2517V14.4084H8.59378V15.2517C5.34142 15.0093 2.73665 12.4046 2.49425 9.15217H3.33752V8.15966H2.49425C2.73662 4.90731 5.34139 2.30254 8.59378 2.06013V2.9034H9.58628V2.06017C12.8386 2.30254 15.4434 4.90731 15.6858 8.15969H14.8425V9.1522H15.6858C15.4434 12.4046 12.8386 15.0093 9.58628 15.2517Z" fill="#D69D21" />
                                </svg>

                                <p className="text-secondary text-xl font-normal">Badd -1</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0C5.92615 0 2.61194 3.31421 2.61194 7.38809C2.61194 8.72925 3.21342 10.1717 3.23862 10.2325C3.43289 10.6936 3.8162 11.4098 4.0926 11.8296L9.15822 19.505C9.36552 19.8196 9.67235 20 10 20C10.3277 20 10.6345 19.8196 10.8418 19.5054L15.9079 11.8296C16.1847 11.4098 16.5676 10.6936 16.7619 10.2325C16.7871 10.1721 17.3881 8.72968 17.3881 7.38809C17.3881 3.31421 14.0739 0 10 0ZM15.9605 9.89526C15.7871 10.3086 15.4303 10.9748 15.1821 11.3512L10.1161 19.0269C10.0161 19.1786 9.98439 19.1786 9.88443 19.0269L4.81837 11.3512C4.57022 10.9748 4.21342 10.3081 4.04001 9.89483C4.03262 9.87701 3.48113 8.54933 3.48113 7.38809C3.48113 3.79357 6.40551 0.869187 10 0.869187C13.5946 0.869187 16.5189 3.79357 16.5189 7.38809C16.5189 8.55106 15.9661 9.88223 15.9605 9.89526Z" fill="#A95265" />
                                    <path d="M10.0001 3.47754C7.8432 3.47754 6.08875 5.23243 6.08875 7.38888C6.08875 9.54534 7.8432 11.3002 10.0001 11.3002C12.157 11.3002 13.9114 9.54534 13.9114 7.38888C13.9114 5.23243 12.157 3.47754 10.0001 3.47754ZM10.0001 10.431C8.32299 10.431 6.95793 9.06641 6.95793 7.38888C6.95793 5.71135 8.32299 4.34673 10.0001 4.34673C11.6772 4.34673 13.0422 5.71135 13.0422 7.38888C13.0422 9.06641 11.6772 10.431 10.0001 10.431Z" fill="#A95265" />
                                </svg>


                                <p className="text-secondary text-xl font-normal">Gulshan -1</p>
                            </div>
                            <div className=" flex  items-center w-1/2 mt-8">
                                <div className="flex  gap-4 w-full max-w-sm">
                                    <Button
                                        className="w-full text-base px-14 bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white py-6 rounded-lg font-medium hover:bg-primary/90 transition"
                                        aria-label="Decline request"
                                    >
                                        Picked Parcel
                                    </Button>
                                    <Button
                                        onClick={() => window.open("tel:+1234567890")}
                                        variant="outline"
                                        className="w-full border-2 border-gray-300 px-14 text-secondary text-base py-5 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 transition"
                                        aria-label="Accept request"
                                    >
                                        Call to company
                                    </Button>


                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35939.61671883658!2d90.406912!3d23.78270515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sbd!4v1758608180620!5m2!1sen!2sbd"
                                className="w-full h-64 sm:h-60 md:h-72 rounded-lg border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}   