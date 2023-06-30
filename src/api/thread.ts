import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./user";

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

interface ThreadWithOwner extends Thread {
  owner: User;
}

interface ThreadDetail extends ThreadBase {
  owner: Omit<User, "email">;
  comments: Comment[];
}

export const threadApi = createApi({
  reducerPath: "threadApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllThreads: builder.query<ThreadWithOwner[], void>({
      queryFn: async (_args, api, _options, baseQuery) => {
        const threadsPromise = await baseQuery("threads");
        const usersPromise = await api.dispatch(userApi.endpoints.getAllUsers.initiate());

        const [threadsRes, usersRes] = await Promise.all([threadsPromise, usersPromise]);

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (threadsRes.error ?? usersRes.error) {
          return {
            error: {
              status: 500,
              statusText: "Internal Server Error",
              data: "Something went wrong!",
            },
          };
        }
        const threadData = (threadsRes.data as { data: { threads: Thread[] } }).data.threads;
        const usersData = usersRes.data ?? [];

        const threadsWithUser = threadData.map((thread) => {
          const owner = usersData.find((user) => thread.ownerId === user.id) as User; // TODO: Fix this later
          return {
            ...thread,
            owner,
          } satisfies ThreadWithOwner;
        });

        return { data: threadsWithUser };
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
