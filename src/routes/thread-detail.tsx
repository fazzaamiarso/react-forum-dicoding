import { useGetThreadByIdQuery } from "@/api/thread";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import * as Avatar from "@radix-ui/react-avatar";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const ThreadDetail = (): JSX.Element => {
  const { threadId } = useParams();
  if (threadId === undefined) throw Error("threadId can't be undefined!");

  const { data } = useGetThreadByIdQuery(threadId, { skip: threadId === null });

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Avatar.Root>
            <Avatar.Image
              src={data?.owner.avatar}
              alt={data?.owner.name}
              className="aspect-square w-8 rounded-full"
            />
            <Avatar.Fallback>
              {data?.owner?.name
                .split(" ")
                .slice(0, 2)
                .map((word) => word.toUpperCase().charAt(0))
                .join("")}
            </Avatar.Fallback>
          </Avatar.Root>
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
              <li>
                <h4 className="font-semibold">{comment.owner.name}</h4>
                <span className="text-xs">{comment.createdAt}</span>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <button>
                      <ChevronUpIcon aria-hidden="true" className="w-4" />
                    </button>
                    <div className="text-sm">
                      {comment.upVotesBy.length - comment.downVotesBy.length}
                    </div>
                    <button>
                      <ChevronDownIcon aria-hidden="true" className="w-4" />
                    </button>
                  </div>
                  <div className="text-sm">{parse(comment.content)}</div>
                </div>
              </li>
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
