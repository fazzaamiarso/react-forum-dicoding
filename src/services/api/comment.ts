import type { Comment } from "@/types";
import { baseApi } from "./base";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, { threadId: string; content: string }>({
      query: ({ threadId, content }) => ({
        url: `threads/${threadId}/comments`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (_result, _error, { threadId }) => [{ type: "Thread", id: threadId }],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
