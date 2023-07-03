import { baseApi } from "./base";
import type { User } from "@/types";

export const userApi = baseApi.injectEndpoints({
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
