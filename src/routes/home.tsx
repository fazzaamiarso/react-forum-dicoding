import parse from "html-react-parser";
import { useGetAllThreadsQuery } from "@/api/thread";
import { Link } from "react-router-dom";
import * as Avatar from "@radix-ui/react-avatar";
import { ChatBubbleLeftIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const Home = (): JSX.Element => {
  const { data } = useGetAllThreadsQuery();
  return (
    <div>
      <ul className="space-y-4">
        {data?.map((thread) => {
          return (
            <li key={thread.id} className="space-y-5 rounded-sm p-4 shadow-sm ring-1 ring-gray-200">
              <div className="mb-4 flex items-center gap-2">
                <Avatar.Root>
                  <Avatar.Image
                    src={thread.owner.avatar}
                    alt={thread.owner.name}
                    className="aspect-square w-5 rounded-full"
                  />
                  <Avatar.Fallback>
                    {thread.owner?.name
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word.toUpperCase().charAt(0))
                      .join("")}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="text-xs">{thread.owner.name}</div>
                <div className="text-xs">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                  }).format(new Date(thread.createdAt))}
                </div>
              </div>
              <div className="flex w-full gap-4">
                <div className="flex flex-col items-center">
                  <button>
                    <ChevronUpIcon aria-hidden="true" className="w-4" />
                  </button>
                  <div className="text-sm">
                    {thread.upVotesBy.length - thread.downVotesBy.length}
                  </div>
                  <button>
                    <ChevronDownIcon aria-hidden="true" className="w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">
                    <Link to={`threads/${thread.id}`}>{thread.title}</Link>
                  </h3>
                  <span className="p-1 text-xs ring-1">{thread.category}</span>
                  <div className="line-clamp-6 text-sm">{parse(thread.body)}</div>
                  <div>
                    <div className="flex items-center gap-1 text-sm">
                      <ChatBubbleLeftIcon aria-hidden="true" className="w-4" />
                      {thread.totalComments} comments
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;