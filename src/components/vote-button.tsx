/* eslint-disable @typescript-eslint/no-misused-promises */
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

interface Props {
  upVotes: number;
  downVotes: number;
  neutralizeVote: () => Promise<void>;
  upVote: () => Promise<void>;
  downVote: () => Promise<void>;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}
export const VoteButton = ({
  upVotes,
  downVotes,
  upVote,
  downVote,
  neutralizeVote,
  hasDownvoted,
  hasUpvoted,
}: Props): JSX.Element => {
  const onUpvote = async (): Promise<void> => {
    if (hasUpvoted) {
      await neutralizeVote();
      return;
    }
    await upVote();
  };

  const onDownvote = async (): Promise<void> => {
    if (hasDownvoted) {
      await neutralizeVote();
      return;
    }
    await downVote();
  };
  return (
    <div className="flex flex-col items-center">
      <button onClick={onUpvote} className={clsx(hasUpvoted && "text-red-600")}>
        <TriangleUpIcon aria-hidden="true" width={32} />
      </button>
      <div className="text-sm">{upVotes - downVotes}</div>
      <button onClick={onDownvote} className={clsx(hasDownvoted && "text-red-600")}>
        <TriangleDownIcon aria-hidden="true" width={32} />
      </button>
    </div>
  );
};
