"use client";

import baseApi from "../Api/baseApi";

export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        dashboard: builder.query({
            query: () => ({
                url: "/common/dashboard/",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
        }),

    }),
});

export const { useDashboardQuery } = commonApi;
