"use client"

import {  useTramsGetQuery } from "@/redux/feature/settingSlice"

export default function PrivacyPolicy() {
  const { data } = useTramsGetQuery(undefined);
 
  return (
    <div className="">

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">{data?.data[0]?.title}</h2>
            <p className="text-gray-600">Last updated: {new Date(data?.data[0]?.updated_on).toLocaleDateString()}</p>
          </div>

          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: data?.data[0]?.content || "",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  )
}
