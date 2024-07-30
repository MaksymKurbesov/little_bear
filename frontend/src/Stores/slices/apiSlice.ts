// src/apiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import firestoreBaseQuery from "../../firestoreBaseQuery.ts";
import { getDoc } from "firebase/firestore";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: firestoreBaseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
      query: (userId) => ({ url: `users/${userId}`, method: "GET" }),
      async transformResponse(response: any) {
        if (response.referrals) {
          const referralPromises = response.referrals.map(async (ref: any) => {
            const docSnap = await getDoc(ref);
            return docSnap.data();
          });

          response.referrals = await Promise.all(referralPromises);
        }
        return response;
      },
    }),
    addUser: builder.mutation<any, Partial<any>>({
      query: (user) => ({
        url: "users",
        method: "POST",
        data: user,
      }),
    }),
    updateUser: builder.mutation<any, { userId: string; data: Partial<any> }>({
      query: ({ userId, data }) => ({
        url: `users/${userId}`,
        method: "PUT",
        data,
      }),
    }),
    // Add other endpoints as needed
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetUserQuery, useAddUserMutation, useUpdateUserMutation } =
  apiSlice;
