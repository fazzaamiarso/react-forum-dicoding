/* eslint-disable @typescript-eslint/no-misused-promises */
import { useGetThreadByIdQuery } from "@/services/api/thread";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { UserAvatar } from "@/components/user-avatar";
import { VoteButton } from "@/components/vote-button";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useCreateCommentMutation, useUpdateVoteCommentMutation } from "@/services/api/comment";
import type { Comment } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "@/utils/date-formatter";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import * as Separator from "@radix-ui/react-separator";

interface FormData {
  content: string;
  threadId: string;
}

const ThreadDetail = (): JSX.Element => {
  const { threadId } = useParams();
  if (threadId === undefined) throw Error("threadId can't be undefined!");

  const { data } = useGetThreadByIdQuery(threadId, { skip: threadId === null });
  const [createComment] = useCreateCommentMutation();
  const { register, handleSubmit, resetField } = useForm<FormData>({ defaultValues: { threadId } });

  if (data === undefined) return <div></div>; // TODO: Replace this with proper loading

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await createComment(data);
    resetField("content");
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <input type="hidden" {...register("threadId")} />
          <label htmlFor="contet">Add Comment</label>
          <textarea
            {...register("content", { required: true })}
            id="content"
            rows={5}
            className="w-full resize-y rounded-sm border-zinc-300 bg-zinc-100"
          />
          <button className="rounded-sm bg-violet-600 p-2 text-sm text-white transition-colors hover:bg-violet-500">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default ThreadDetail;

interface CommentItemProps extends Comment {
  threadId: string;
}
const CommentItem = ({
  id,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  content,
  threadId,
}: CommentItemProps): JSX.Element => {
  const { user } = useAuth();
  const [updateVote] = useUpdateVoteCommentMutation();

  const hasUpvoted = user?.id === undefined ? false : upVotesBy.includes(user.id);
  const hasDownvoted = user?.id === undefined ? false : downVotesBy.includes(user.id);

  return (
    <li className="space-y-4">
      <div className="flex items-center gap-4">
        <UserAvatar imgSrc={owner.avatar} name={owner.name} size="sm" />
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-violet-600">{owner.name}</h4>
          <span className="text-xs">{dayjs(createdAt).fromNow()}</span>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <VoteButton
          hasUpvoted={hasUpvoted}
          hasDownvoted={hasDownvoted}
          upVotes={upVotesBy.length}
          downVotes={downVotesBy.length}
          updateVote={async (type) => {
            await updateVote({ threadId, type, commentId: id });
          }}
        />
        <div className="">{parse(content)}</div>
      </div>
      <Separator.Root className="h-px w-full bg-zinc-200" />
    </li>
  );
};
