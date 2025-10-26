"use client";

import baseApi from "../Api/baseApi";

export const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        privacyGet: builder.query({
            query: () => ({
                url: "/settings/privacy_policies/",
                method: "GET",
            }),
            providesTags: ["Setting"],
        })

    }),
});

export const { usePrivacyGetQuery } = settingApi;
