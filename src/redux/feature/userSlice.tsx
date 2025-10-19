"use client";

import baseApi from "../Api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),



  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation} = userApi;
