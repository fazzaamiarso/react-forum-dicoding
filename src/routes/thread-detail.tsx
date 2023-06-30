import { useGetThreadByIdQuery } from "@/api/thread";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { UserAvatar } from "@/components/user-avatar";
import { VoteButton } from "@/components/vote-button";

const ThreadDetail = (): JSX.Element => {
  const { threadId } = useParams();
  if (threadId === undefined) throw Error("threadId can't be undefined!");

  const { data } = useGetThreadByIdQuery(threadId, { skip: threadId === null });

  if (data === undefined) return <div></div>; // TODO: Replace this with proper loading

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
      <p>{parse(data?.body ?? "")}</p>
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
                name={comment.owner.name}
              />
            );
          })}
        </ul>
        <form onSubmit={() => ""}>
          <label htmlFor="comment">Add Comment</label>
          <textarea name="comment" id="comment" rows={7} className="w-full resize-y rounded-sm" />
          <button className="rounded-sm bg-black p-2 text-white">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default ThreadDetail;

interface CommentItemProps {
  name: string;
  createdAt: string;
  upVotes: number;
  downVotes: number;
  content: string;
}
const CommentItem = ({
  name,
  createdAt,
  upVotes,
  downVotes,
  content,
}: CommentItemProps): JSX.Element => {
  return (
    <li>
      <h4 className="font-semibold">{name}</h4>
      <span className="text-xs">{createdAt}</span>
      <div className="flex items-start gap-4">
        <VoteButton upVotes={upVotes} downVotes={downVotes} />
        <div className="text-sm">{parse(content)}</div>
      </div>
    </li>
  );
};
