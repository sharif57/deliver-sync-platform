import SectionHeader from '@/lib/heading'
import React from 'react'
import EmailIcon from '../ui/icon/emailIcon'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export default function Contact() {
    return (
        <div id="contact" className='bg-featuresBg py-16'>
            <SectionHeader title="Contact With Us" highlightedText="" description="Have a question, feedback, or need help? We are ready here to assist you" />
            <div className='flex justify-between max-w-7xl mx-auto px-4 md:px-6 lg:px-8 items-center gap-6 flex-col md:flex-row'>
                <div className=' bg-white p-10 flex justify-center items-center w-[370px]  h-[521px] rounded-r-[70px] border-2 border-[#F6D99A]'>
                    <EmailIcon />
                </div>
                <div className='flex-1 md:ml-8'>
                    <form action="" className=''>
                        <Input type="name" placeholder='Enter Your Email' className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white text-black
                ' />
                        <Input type="name" placeholder='Enter Your Email' className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white text-black
                ' />
                        <Input type="name" placeholder='Enter Your Email' className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white text-black
                ' />
                        <Input type="name" placeholder='Enter Your Email' className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white text-black
                ' />
                        <Textarea placeholder="Type your message here." className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white h-[100px] text-black' />
                    </form>
                </div>
            </div>
             <div className="text-center mt-8">
                        <button className="bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white font-semibold px-24 py-4 rounded-lg text-lg transition-colors duration-200">
                            Submit Now
                        </button>
                    </div>
        </div>
    )
}
