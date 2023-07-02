import { type RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://forum-api.dicoding.dev/v1/";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token !== null) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "users",
      transformResponse: (rawResult: { data: { users: User[] } }) => {
        return rawResult.data.users;
      },
    }),
    getOwnProfile: builder.query<User, void>({
      query: () => "users/me",
      transformResponse: (rawResult: { data: { user: User } }) => {
        return rawResult.data.user;
      },
    }),
    register: builder.mutation<User, Omit<User, "id" | "avatar"> & { password: string }>({
      query: (userData) => ({ url: "register", method: "POST", body: userData }),
      transformResponse: (rawResult: { data: { user: User } }) => {
        return rawResult.data.user;
      },
    }),
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (rawResult: { data: { token: string } }) => ({
        token: rawResult.data.token,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetOwnProfileQuery, useLoginMutation, useRegisterMutation } =
  userApi;
