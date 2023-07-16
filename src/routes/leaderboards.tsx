/* eslint-disable @typescript-eslint/no-misused-promises */
import * as Separator from "@radix-ui/react-separator";
import { useGetLeaderboardsQuery } from "@/services/api/leaderboards";
import clsx from "clsx";
import { UserAvatar } from "@/components/user-avatar";
import dayjs from "@/utils/date-formatter";
import { ErrorState, LoadingState } from "@/components/states-ui";

const standingsStyleMap = new Map([
  [1, "bg-[#FFD700] font-semibold"],
  [2, "bg-[#C0C0C0] font-semibold"],
  [3, "bg-[#CD7F32] font-semibold"],
]);

const Leaderboard = (): JSX.Element => {
  const { data, refetch, fulfilledTimeStamp, isLoading, isFetching, isError } = useGetLeaderboardsQuery();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Leaderboards</h2>
          <span className="text-xs">Last updated: {dayjs.tz(fulfilledTimeStamp, "Asia/Jakarta").toString()}</span>
        </div>
        <button className="rounded-sm p-1 text-sm ring-1 ring-black" onClick={refetch}>
          Refresh
        </button>
      </div>
      <ul>
        {isError && <ErrorState text="Something went wrong when fetching your data! Please try again by refreshing!" />}
        {(isLoading || isFetching) && <LoadingState text="Loading leaderboards..." />}
        {!isFetching &&
          data?.map((ranker, idx) => {
            const standings = idx + 1;
            return (
              <li key={ranker.user.id} className="mb-4 space-y-4" data-testid="leaderboard-item">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div
                      className={clsx(
                        "flex aspect-square w-8 items-center justify-center rounded-full",
                        standingsStyleMap.get(standings)
                      )}
                    >
                      {standings}
                    </div>
                    <Separator.Root
                      className="bg-gray-300 data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-px"
                      orientation="vertical"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <UserAvatar imgSrc={ranker.user.avatar} name={ranker.user.name} />
                    <h3 data-testid="leaderboard-item-name" className="text-sm font-normal sm:text-base">
                      {ranker.user.name}
                    </h3>
                  </div>
                  <div className="ml-auto text-sm sm:text-base">{ranker.score}</div>
                </div>
                <Separator.Root className="h-px w-full bg-gray-200" />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Leaderboard;
