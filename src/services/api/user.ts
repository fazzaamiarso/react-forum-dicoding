import { type RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, setUser } from "../authSlice";

const BASE_URL = "https://forum-api.dicoding.dev/v1/";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "users",
      transformResponse: (rawResult: { data: { users: User[] } }) => {
        return rawResult.data.users;
      },
    }),
    getOwnProfile: builder.query<User, void>({
      queryFn: async (_args, { getState, dispatch }, _options, baseQuery) => {
        const token = (getState() as RootState).auth.token;
        if (token === null)
          return {
            error: {
              error: "Internal server error!",
              status: 403,
              data: "Token must be provided",
            },
          };

        const res = await baseQuery({
          url: "users/me",
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = (res.data as { data: { user: User } }).data.user;

        dispatch(setUser({ user }));

        return { data: user };
      },
    }),
    register: builder.mutation<User, Omit<User, "id" | "avatar"> & { password: string }>({
      query: (userData) => ({ url: "register", method: "POST", body: userData }),
    }),
    login: builder.mutation<string, { email: string; password: string }>({
      queryFn: async (credentials, { dispatch }, _options, baseQuery) => {
        const res = await baseQuery({
          url: "login",
          method: "POST",
          body: credentials,
        });

        const token = (res.data as { data: { token: string } }).data.token;

        dispatch(setToken({ token }));

        return { data: token };
      },
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
