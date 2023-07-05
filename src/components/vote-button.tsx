/* eslint-disable @typescript-eslint/no-misused-promises */
import type { VoteType } from "@/types";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

interface Props {
  upVotes: number;
  downVotes: number;
  updateVote: (type: VoteType) => Promise<void>;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}
export const VoteButton = ({
  upVotes,
  downVotes,
  updateVote,
  hasDownvoted,
  hasUpvoted,
}: Props): JSX.Element => {
  const iconDimension = 28;
  const onUpvote = async (): Promise<void> => {
    if (hasUpvoted) {
      await updateVote("neutral-vote");
      return;
    }
    await updateVote("up-vote");
  };

  const onDownvote = async (): Promise<void> => {
    if (hasDownvoted) {
      await updateVote("neutral-vote");
      return;
    }
    await updateVote("down-vote");
  };
  return (
    <div className="flex flex-col items-center">
      <button onClick={onUpvote} className={clsx(hasUpvoted ? "text-violet-600" : "text-zinc-700")}>
        <TriangleUpIcon aria-hidden="true" width={iconDimension} height={iconDimension} />
      </button>
      <div className="">{upVotes - downVotes}</div>
      <button
        onClick={onDownvote}
        className={clsx(hasDownvoted ? "text-violet-600" : "text-zinc-700")}
      >
        <TriangleDownIcon aria-hidden="true" width={iconDimension} height={iconDimension} />
      </button>
    </div>
  );
};
