"use client";

import baseApi from "../Api/baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order/delivery/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),

    // order/delivery/customer/
    getCustomerOrders: builder.query({
      query: () => ({
        url: "/order/delivery/customer/",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/delivery/cancel/${orderId}/`,
        method: "POST",
      }),
      invalidatesTags: ["Customer"],
    }),



  }),
});

export const { useCreateOrderMutation, useGetCustomerOrdersQuery, useCancelOrderMutation } = customerApi;
