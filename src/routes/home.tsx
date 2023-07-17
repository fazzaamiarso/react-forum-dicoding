import { useGetAllThreadsQuery } from "@/services/api/thread";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";
import { useState } from "react";
import ThreadItem from "@/components/thread-item";
import { ErrorState, LoadingState } from "@/components/states-ui";

const Home = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const {
    data: { threads, categories },
    isLoading,
    isError,
  } = useGetAllThreadsQuery(undefined, {
    selectFromResult: (result) => {
      const categories = [...new Set(result.data?.map((thread) => thread.category))] ?? [];
      return { ...result, data: { threads: result.data, categories } };
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
        {isLoading && <LoadingState text="Loading threads...s" />}
        {isError && <ErrorState text="Something went wrong while fetching data..." />}
      </div>
    </div>
  );
};

export default Home;
