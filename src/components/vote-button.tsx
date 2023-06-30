import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";

interface Props {
  upVotes: number;
  downVotes: number;
}
export const VoteButton = ({ upVotes, downVotes }: Props): JSX.Element => {
  return (
    <div className="flex flex-col items-center">
      <button>
        <TriangleUpIcon aria-hidden="true" width={32} />
      </button>
      <div className="text-sm">{upVotes - downVotes}</div>
      <button>
        <TriangleDownIcon aria-hidden="true" width={32} />
      </button>
    </div>
  );
};
