import type { Comment, VoteType } from "@/types";
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
    updateVoteComment: builder.mutation<
      void,
      { threadId: string; type: VoteType; commentId: string }
    >({
      query: ({ threadId, type, commentId }) => ({
        url: `threads/${threadId}/comments/${commentId}/${type}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { threadId }) => [{ type: "Thread", id: threadId }],
    }),
  }),
});

export const { useCreateCommentMutation, useUpdateVoteCommentMutation } = commentApi;
