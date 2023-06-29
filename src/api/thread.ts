import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://forum-api.dicoding.dev/v1/";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: User[];
  downVotesBy: User[];
  totalComments: number;
}

export const threadApi = createApi({
  reducerPath: "threadApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllThreads: builder.query<Thread[], void>({
      query: () => "threads",
      transformResponse: (rawResult: { data: { threads: Thread[] } }) => {
        return rawResult.data.threads;
      },
    }),
  }),
});

export const { useGetAllThreadsQuery } = threadApi;
