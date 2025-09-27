/* eslint-disable @next/next/no-img-element */

import React from "react";

// react icons
import {FaArrowLeftLong} from "react-icons/fa6";
import "./globals.css";
import Link from "next/link";


const Page404 = () => {

    return (
        <div className=" h-screen px-10 w-full flex items-center flex-col justify-center py-20  bg-[#00543A]">
            <img src="https://i.ibb.co/LvLq6d3/Group-29.png" alt="illustration"
                 className="w-full lg:w-[400px]"/>
            <p className="text-[#fff] text-[1.2rem] w-full lg:w-[55%] text-center">Oops it seems you follow
                backlink</p>

            <Link href="/"
                className="py-3 px-6 sm:px-8 rounded-full bg-[#fff] text-black mt-4 flex items-center gap-[10px]">
                <FaArrowLeftLong/> Back to home
            </Link>
        </div>
    );
};

export default Page404;
                    