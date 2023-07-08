import { userApi } from "./user";
import { baseApi } from "./base";
import type { ThreadWithOwner, Thread, User, ThreadDetail, VoteType } from "@/types";

interface CreateThreadInput {
  title: string;
  body: string;
  category?: string;
}

export const threadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllThreads: builder.query<ThreadWithOwner[], void>({
      providesTags: (result) =>
        result !== undefined
          ? [
              ...result.map(({ id }) => ({ type: "Thread" as const, id })),
              { type: "Thread", id: "LIST" },
            ]
          : [{ type: "Thread", id: "LIST" }],
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
          const owner = usersData.find((user) => thread.ownerId === user.id) as User;
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
      providesTags: (_result, _error, id) => [{ type: "Thread", id }],
    }),
    createThread: builder.mutation<Thread, CreateThreadInput>({
      query: ({ title, body, category }) => ({
        url: "threads",
        method: "POST",
        body: { title, body, category },
      }),
      invalidatesTags: [{ type: "Thread", id: "LIST" }],
    }),
    updateVoteThread: builder.mutation<void, { threadId: string; type: VoteType }>({
      query: ({ threadId, type }) => ({
        url: `threads/${threadId}/${type}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Thread", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllThreadsQuery,
  useGetThreadByIdQuery,
  useCreateThreadMutation,
  useUpdateVoteThreadMutation,
} = threadApi;
