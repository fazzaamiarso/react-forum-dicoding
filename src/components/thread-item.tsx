import { useAuth } from "@/hooks/useAuth";
import { useUpdateVoteThreadMutation } from "@/services/api/thread";
import type { ThreadWithOwner } from "@/types";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { UserAvatar } from "./user-avatar";
import { VoteButton } from "./vote-button";
import parse from "html-react-parser";
import dayjs from "@/utils/date-formatter";

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
    <li
      data-testid="thread-item"
      className="space-y-5 rounded-sm bg-zinc-50 p-4 shadow-sm ring-1 ring-gray-200"
    >
      <div className="mb-4 flex items-center gap-2">
        <UserAvatar imgSrc={owner?.avatar} name={owner?.name} size="sm" />
        <div className="text-xs font-semibold text-violet-600">{owner?.name}</div>
        <div className="text-xs">{dayjs(createdAt).fromNow()}</div>
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
          <h3 className="text-lg font-semibold">
            <Link
              data-testid="thread-link"
              to={`threads/${id}`}
              className="line-clamp-2 break-all transition-colors hover:text-violet-500"
            >
              {title}
            </Link>
          </h3>
          <span data-testid="thread-category" className="px-1 text-xs">
            #{category}
          </span>
          <div className="line-clamp-6 text-sm">{parse(body)}</div>
          <div>
            <div className="flex items-center gap-1 text-sm ">
              <ChatBubbleLeftIcon aria-hidden="true" className="w-4 text-zinc-500" />
              {totalComments} comments
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ThreadItem;
