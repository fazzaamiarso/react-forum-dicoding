import { type RootState } from "@/store";
import { FORUM_API_BASE_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  tagTypes: ["Thread"],
  baseQuery: fetchBaseQuery({
    baseUrl: FORUM_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token !== null) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
