import parse from "html-react-parser";
import { useGetAllThreadsQuery, useUpdateVoteThreadMutation } from "@/services/api/thread";
import { Link } from "react-router-dom";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { UserAvatar } from "@/components/user-avatar";
import { VoteButton } from "@/components/vote-button";
import type { ThreadWithOwner } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";
import { useState } from "react";
import dayjs from "@/utils/date-formatter";

const Home = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { threads, categories } = useGetAllThreadsQuery(undefined, {
    selectFromResult: (result) => {
      const categories = result.data?.map((thread) => thread.category) ?? [];
      return { threads: result.data, categories };
    },
  });

  const threadsByCategory =
    selectedCategory === ""
      ? threads
      : threads?.filter((thread) => thread.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-3 text-xl">Categories</h2>
        <ToggleGroup.Root
          type="single"
          className="flex items-center gap-2"
          onValueChange={setSelectedCategory}
          value={selectedCategory}
        >
          {categories.map((category) => {
            return (
              <ToggleGroup.Item
                key={category}
                value={category}
                className={clsx(
                  "rounded-full p-1 px-3 text-sm ring-1 ring-zinc-300 transition-colors",
                  "data-[state='on']:bg-violet-700 data-[state='on']:text-white",
                  "hover:bg-violet-200"
                )}
              >
                {category}
              </ToggleGroup.Item>
            );
          })}
        </ToggleGroup.Root>
      </div>
      <div>
        <h2 className="mb-3 text-xl">Threads</h2>
        <ul className="space-y-4">
          {threadsByCategory?.map((thread) => {
            return <ThreadItem key={thread.id} {...thread} />;
          })}
        </ul>
      </div>
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
    <li className="space-y-5 rounded-sm bg-zinc-50 p-4 shadow-sm ring-1 ring-gray-200">
      <div className="mb-4 flex items-center gap-2">
        <UserAvatar imgSrc={owner.avatar} name={owner.name} size="sm" />
        <div className="text-xs font-semibold text-violet-600">{owner.name}</div>
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
              to={`threads/${id}`}
              className="line-clamp-2 break-all transition-colors hover:text-violet-500"
            >
              {title}
            </Link>
          </h3>
          <span className="px-1 text-xs">#{category}</span>
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
