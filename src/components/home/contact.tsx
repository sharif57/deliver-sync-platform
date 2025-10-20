// import SectionHeader from '@/lib/heading'
// import React from 'react'
// import EmailIcon from '../ui/icon/emailIcon'
// import { Input } from '../ui/input'
// import { Textarea } from '../ui/textarea'

// export default function Contact() {
//     return (
//         <div id="contact" className='bg-featuresBg py-16'>
//             <SectionHeader title="Contact With Us" highlightedText="" description="Have a question, feedback, or need help? We are ready here to assist you" />
//             <div className='flex justify-between max-w-7xl mx-auto px-4 md:px-6 lg:px-8 items-center gap-6 flex-col md:flex-row'>
//                 <div className=' bg-white p-10 flex justify-center items-center w-[370px]  h-[521px] rounded-r-[70px] border-2 border-[#F6D99A]'>
//                     <EmailIcon />
//                 </div>
//                 <div className='flex-1 md:ml-8'>
//                     <form action="" className=''>
//                         <Input type="name" placeholder='Enter Your Name' className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white text-black
//                 ' />
//                         <Input type="email" placeholder='Enter Your Email' className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white text-black
//                 ' />
//                         <Input type="phone" placeholder='Enter Your Phone' className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white text-black
//                 ' />

//                         <Textarea placeholder="Type your message here." className='w-full mx-auto block mb-4 p-7 text-xl rounded-2xl font-medium bg-white h-[100px] text-black' />
//                     </form>
//                 </div>
//             </div>
//              <div className="text-center mt-8">
//                         <button className="bg-gradient-to-r from-[#EFB639]  to-[#C59325]  text-white font-semibold px-24 py-4 rounded-lg text-lg transition-colors duration-200">
//                             Submit Now
//                         </button>
//                     </div>
//         </div>
//     )
// }
"use client";
import React from "react";
import SectionHeader from "@/lib/heading";
import EmailIcon from "../ui/icon/emailIcon";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]+$/, "Phone must contain only numbers")
        .min(10, "Phone must be at least 10 digits")
        .required("Phone number is required"),
    message: yup.string().required("Message is required"),
});

export default function Contact() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ContactFormData) => {
        console.log("Form Submitted:", data);
        alert("Message sent successfully!");
        reset();
    };

    return (
        <div id="contact" className="bg-featuresBg py-16">
            <SectionHeader
                title="Contact With Us"
                highlightedText=""
                description="Have a question, feedback, or need help? We are ready here to assist you"
            />

            <div className="flex justify-between max-w-7xl mx-auto px-4 md:px-6 lg:px-8 items-center gap-6 flex-col md:flex-row">
                {/* Left side Icon */}
                <div className="bg-white p-10 flex justify-center items-center w-[370px] h-[521px] rounded-r-[70px] border-2 border-[#F6D99A]">
                    <EmailIcon />
                </div>

                {/* Right side Form */}
                <div className="flex-1 md:ml-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        {/* Name */}
                        <Input
                            type="text"
                            placeholder="Enter Your Name"
                            {...register("name")}
                            className="w-full mx-auto block mb-2 p-7 text-xl rounded-2xl font-medium bg-white text-black"
                        />
                        {errors.name && (
                            <p className="text-red-500 mb-3">{errors.name.message}</p>
                        )}

                        {/* Email */}
                        <Input
                            type="email"
                            placeholder="Enter Your Email"
                            {...register("email")}
                            className="w-full mx-auto block mb-2 p-7 text-xl rounded-2xl font-medium bg-white text-black"
                        />
                        {errors.email && (
                            <p className="text-red-500 mb-3">{errors.email.message}</p>
                        )}

                        {/* Phone */}
                        <Input
                            type="tel"
                            placeholder="Enter Your Phone"
                            {...register("phone")}
                            className="w-full mx-auto block mb-2 p-7 text-xl rounded-2xl font-medium bg-white text-black"
                        />
                        {errors.phone && (
                            <p className="text-red-500 mb-3">{errors.phone.message}</p>
                        )}

                        {/* Message */}
                        <Textarea
                            placeholder="Type your message here."
                            {...register("message")}
                            className="w-full mx-auto block mb-2 p-7 text-xl rounded-2xl font-medium bg-white h-[100px] text-black"
                        />
                        {errors.message && (
                            <p className="text-red-500 mb-3">{errors.message.message}</p>
                        )}

                        {/* Submit button */}
                        <div className="text-center mt-8">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-[#EFB639] to-[#C59325] text-white font-semibold px-24 py-4 rounded-lg text-lg transition-colors duration-200 hover:opacity-90"
                            >
                                Submit Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
