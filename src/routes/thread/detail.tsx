/* eslint-disable @typescript-eslint/no-misused-promises */
import { useGetThreadByIdQuery } from "@/services/api/thread";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { UserAvatar } from "@/components/user-avatar";
import { VoteButton } from "@/components/vote-button";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useCreateCommentMutation } from "@/services/api/comment";
import type { User } from "@/types";

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
    <div className="space-y-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <UserAvatar imgSrc={data.owner.avatar} name={data.owner.name} />
          <div>
            <div className="text-sm font-semibold">{data?.owner.name}</div>
            <div className="text-xs">Posted on {data?.createdAt}</div>
          </div>
        </div>
        <h2 className="text-3xl font-semibold">{data?.title}</h2>
        <span className="p-1 text-sm ring-1 ring-black">{data?.category}</span>
      </div>
      <div>{parse(data?.body ?? "")}</div>
      <section>
        <h3 className="font-semibold">Comments ({data?.comments.length})</h3>
        <ul>
          {data?.comments.map((comment) => {
            return (
              <CommentItem
                key={comment.id}
                content={comment.content}
                downVotes={comment.downVotesBy.length}
                upVotes={comment.upVotesBy.length}
                createdAt={comment.createdAt}
                owner={comment.owner}
              />
            );
          })}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("threadId")} />
          <label htmlFor="contet">Add Comment</label>
          <textarea
            {...register("content", { required: true })}
            id="content"
            rows={7}
            className="w-full resize-y rounded-sm"
          />
          <button className="rounded-sm bg-black p-2 text-white">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default ThreadDetail;

interface CommentItemProps {
  owner: Omit<User, "email">;
  createdAt: string;
  upVotes: number;
  downVotes: number;
  content: string;
}
const CommentItem = ({
  owner,
  createdAt,
  upVotes,
  downVotes,
  content,
}: CommentItemProps): JSX.Element => {
  return (
    <li>
      <div className="flex items-center gap-4">
        <UserAvatar imgSrc={owner.avatar} name={owner.name} />
        <div>
          <h4 className="font-semibold">{owner.name}</h4>
          <span className="text-xs">{createdAt}</span>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <VoteButton upVotes={upVotes} downVotes={downVotes} />
        <div className="text-sm">{parse(content)}</div>
      </div>
    </li>
  );
};
