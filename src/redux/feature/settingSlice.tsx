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
        }),

        aboutUsGet: builder.query({
            query: () => ({
                url: "/settings/about_us/",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),

        tramsGet: builder.query({
            query: () => ({
                url: "/settings/terms_conditions/",
                method: "GET",
            }),
            providesTags: ["Setting"],
        }),

    }),
});

export const { usePrivacyGetQuery , useAboutUsGetQuery, useTramsGetQuery } = settingApi;
