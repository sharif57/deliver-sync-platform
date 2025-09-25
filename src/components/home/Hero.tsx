
"use client";
import Image from 'next/image';
import VideoModal from '../video-modal';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <>
      <section id="home" className="bg-secondary " style={{ height: '600px' }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between h-full">
          {/* Text Content */}
          <div className="flex flex-col lg:flex-row  items-center justify-between  py-12 lg:py-20">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl  lg:pr-12 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-5xl font-medium text-white leading-tight mb-6">
                Simplify Your Parts Delivery <span className="text-[#EBAD24]">-Track, Manage, Deliver</span>
              </h1>

              <p className="text-lg sm:text-xl font-normal text-white mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                A smart platform for Customers, Drivers, and Companies to streamline every delivery
              </p>

              <div className="flex mt-20 flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white px-8  text-xl py-6 font-medium rounded-sm hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsVideoModalOpen(true)}
                  className=" text-xl py-6 font-medium text-white   hover:bg-gray-50 px-8  rounded-sm flex items-center gap-2 transition-all duration-200 bg-transparent"
                >
                  Watch Demo
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37267 0 0 5.37258 0 12C0 18.6274 5.37267 24 12 24C18.6273 24 24 18.6274 24 12C24 5.37258 18.6273 0 12 0ZM16.1475 12.6361L10.1475 16.3861C10.0339 16.457 9.90346 16.4962 9.76962 16.4997C9.63578 16.5032 9.50344 16.4708 9.38634 16.4059C9.26926 16.341 9.17168 16.246 9.10374 16.1306C9.0358 16.0153 8.99998 15.8839 9 15.75V8.25C9 7.97719 9.14794 7.72631 9.38634 7.59412C9.50337 7.52897 9.63574 7.49644 9.76963 7.49992C9.90352 7.5034 10.034 7.54276 10.1475 7.61391L16.1475 11.3639C16.3667 11.5012 16.5 11.7415 16.5 12C16.5 12.2585 16.3667 12.4988 16.1475 12.6361Z" fill="#B49246" />
                  </svg>

                </Button>
              </div>
            </div>

          </div>

          {/* Image Content */}
          <div className="relative mt-8 md:mt-0 h-full">
            <div className="overflow-hidden w-[500px] h-[700px] mx-auto relative">
              <div className="absolute left-0 top-0  w-[300px] h-full  z-10"></div>
              <Image
                src="/images/hero.png"
                alt="Smiling delivery driver in truck cab holding packages"
                width={600}
                height={400}
                className="w-full h-auto object-cover  hidden sm:block "
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

    </>
  );
}