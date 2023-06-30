import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://forum-api.dicoding.dev/v1/";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  owner: Omit<User, "email">;
  upVotesBy: string[];
  downVotesBy: string[];
}

interface ThreadBase {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
}

interface Thread extends ThreadBase {
  totalComments: number;
  ownerId: string;
}

interface ThreadDetail extends ThreadBase {
  owner: Omit<User, "email">;
  comments: Comment[];
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
    getThreadById: builder.query<ThreadDetail, string>({
      query: (threadId) => `threads/${threadId}`,
      transformResponse: (rawResult: { data: { detailThread: ThreadDetail } }) => {
        return rawResult.data.detailThread;
      },
    }),
  }),
});

export const { useGetAllThreadsQuery, useGetThreadByIdQuery } = threadApi;
