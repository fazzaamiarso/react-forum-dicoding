/* eslint-disable @typescript-eslint/no-misused-promises */
import { useGetThreadByIdQuery } from "@/services/api/thread";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { UserAvatar } from "@/components/user-avatar";
import dayjs from "@/utils/date-formatter";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import * as Separator from "@radix-ui/react-separator";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import NotFound from "../404";
import CommentItem from "@/components/thread-detail/comment-item";
import CommentForm from "@/components/thread-detail/comment-form";
import { useCreateCommentMutation } from "@/services/api/comment";

export interface CommentMutationInput {
  content: string;
  threadId: string;
}

const ThreadDetail = (): JSX.Element => {
  const { threadId } = useParams();
  if (threadId === undefined) throw Error("threadId not found");

  const [createComment] = useCreateCommentMutation();
  const { data } = useGetThreadByIdQuery(threadId ?? skipToken);

  if (data === undefined) return <NotFound />;

  const onAddComment = async (data: CommentMutationInput): Promise<void> => {
    await createComment(data);
  };

  return (
    <div className="my-12 space-y-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <UserAvatar imgSrc={data.owner.avatar} name={data.owner.name} />
          <div>
            <div className="text-sm font-semibold">{data?.owner.name}</div>
            <div className="text-xs text-zinc-500">
              Posted on {dayjs(data?.createdAt).format("dddd, DD MMMM YYYY")}
            </div>
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-semibold">{data?.title}</h2>
        <span className="rounded-full p-1 px-2 text-sm text-zinc-600 ring-1 ring-violet-400">
          {data?.category}
        </span>
      </div>
      <div>{parse(data?.body ?? "")}</div>
      <Separator.Root className="h-px w-full bg-zinc-200" />
      <section className="space-y-8">
        <h3 className="mb-4 font-semibold">Comments ({data?.comments.length})</h3>
        {data?.comments.length === 0 && (
          <div className="flex h-32 w-full flex-col items-center justify-center gap-2 text-zinc-700">
            <FaceFrownIcon aria-hidden="true" className="w-8" />
            <h4>There are no comments yet!</h4>
          </div>
        )}
        <ul className="space-y-4">
          {data?.comments.map((comment) => {
            return (
              <CommentItem
                key={comment.id}
                id={comment.id}
                content={comment.content}
                downVotesBy={comment.downVotesBy}
                upVotesBy={comment.upVotesBy}
                createdAt={comment.createdAt}
                owner={comment.owner}
                threadId={threadId}
              />
            );
          })}
        </ul>
        <CommentForm threadId={threadId} onSubmit={onAddComment} />
      </section>
    </div>
  );
};

export default ThreadDetail;


