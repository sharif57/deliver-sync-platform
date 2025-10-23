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
      query: ({ data, id }) => ({
        // /auth/profile/1/update/
        url: `/auth/profile/${id}/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    locationProfile: builder.mutation({
      query: (data) => ({
        // /auth/profile/1/update/
        // /auth/profile/update/
        url: `/auth/profile/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    })



  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation, useLocationProfileMutation } = userApi;
