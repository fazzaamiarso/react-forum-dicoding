import { useAuth } from "@/hooks/useAuth";
import { useUpdateVoteCommentMutation } from "@/services/api/comment";
import type { Comment } from "@/types";
import dayjs from "dayjs";
import { UserAvatar } from "../user-avatar";
import { VoteButton } from "../vote-button";
import parse from "html-react-parser";
import * as Separator from "@radix-ui/react-separator";

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
    <li data-testid="comment-item" className="space-y-4">
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
export default CommentItem;
