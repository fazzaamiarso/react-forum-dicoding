import parse from "html-react-parser";
import { useGetAllThreadsQuery, useUpdateVoteThreadMutation } from "@/services/api/thread";
import { Link } from "react-router-dom";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { UserAvatar } from "@/components/user-avatar";
import { VoteButton } from "@/components/vote-button";
import type { ThreadWithOwner } from "@/types";
import { useAuth } from "@/hooks/useAuth";

const Home = (): JSX.Element => {
  const { data } = useGetAllThreadsQuery(undefined, {});
  return (
    <div>
      <ul className="space-y-4">
        {data?.map((thread) => {
          return <ThreadItem key={thread.id} {...thread} />;
        })}
      </ul>
    </div>
  );
};

export default Home;

const ThreadItem = ({
  id,
  owner,
  category,
  createdAt,
  title,
  body,
  totalComments,
  upVotesBy,
  downVotesBy,
}: ThreadWithOwner): JSX.Element => {
  const { user } = useAuth();
  const [updateVote] = useUpdateVoteThreadMutation();

  const hasUpvoted = user?.id === undefined ? false : upVotesBy.includes(user.id);
  const hasDownvoted = user?.id === undefined ? false : downVotesBy.includes(user.id);

  return (
    <li className="space-y-5 rounded-sm p-4 shadow-sm ring-1 ring-gray-200">
      <div className="mb-4 flex items-center gap-2">
        <UserAvatar imgSrc={owner.avatar} name={owner.name} size="sm" />
        <div className="text-xs">{owner.name}</div>
        <div className="text-xs">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
          }).format(new Date(createdAt))}
        </div>
      </div>
      <div className="flex w-full gap-4">
        <VoteButton
          upVotes={upVotesBy.length}
          downVotes={downVotesBy.length}
          hasUpvoted={hasUpvoted}
          hasDownvoted={hasDownvoted}
          updateVote={async (type) => {
            await updateVote({ threadId: id, type });
          }}
        />
        <div className="space-y-4">
          <h3 className="font-semibold">
            <Link to={`threads/${id}`} className="line-clamp-2 break-all">
              {title}
            </Link>
          </h3>
          <span className="p-1 text-xs ring-1">{category}</span>
          <div className="line-clamp-6 text-sm">{parse(body)}</div>
          <div>
            <div className="flex items-center gap-1 text-sm">
              <ChatBubbleLeftIcon aria-hidden="true" className="w-4" />
              {totalComments} comments
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
