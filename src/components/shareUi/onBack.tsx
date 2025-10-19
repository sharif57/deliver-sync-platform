'use client';   
import React from "react";
import Back from "../ui/icon/back";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
    title?: string;
    onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title = "Page Title", onBack }) => {
    const router = useRouter();


    return (
        <div className="flex items-center cursor-pointer justify-between mb-4 sm:mb-6">
            <div
                onClick={onBack ? onBack : () => router.back()}
                className="flex items-center gap-3">
                <Back />
                <h1 className="text-xl sm:text-2xl md:text-2xl font-medium text-secondary">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default PageHeader;
