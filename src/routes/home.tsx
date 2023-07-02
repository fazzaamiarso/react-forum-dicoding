import parse from "html-react-parser";
import { useGetAllThreadsQuery } from "@/services/api/thread";
import { Link } from "react-router-dom";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { UserAvatar } from "@/components/user-avatar";
import { VoteButton } from "@/components/vote-button";

const Home = (): JSX.Element => {
  const { data } = useGetAllThreadsQuery();
  return (
    <div>
      <ul className="space-y-4">
        {data?.map((thread) => {
          return (
            <li key={thread.id} className="space-y-5 rounded-sm p-4 shadow-sm ring-1 ring-gray-200">
              <div className="mb-4 flex items-center gap-2">
                <UserAvatar imgSrc={thread.owner.avatar} name={thread.owner.name} size="sm" />
                <div className="text-xs">{thread.owner.name}</div>
                <div className="text-xs">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "short",
                  }).format(new Date(thread.createdAt))}
                </div>
              </div>
              <div className="flex w-full gap-4">
                <VoteButton
                  upVotes={thread.upVotesBy.length}
                  downVotes={thread.downVotesBy.length}
                />
                <div className="space-y-4">
                  <h3 className="font-semibold">
                    <Link to={`threads/${thread.id}`} className="line-clamp-2 break-all">
                      {thread.title}
                    </Link>
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
