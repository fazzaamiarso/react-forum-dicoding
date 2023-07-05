/* eslint-disable @typescript-eslint/no-misused-promises */
import * as Separator from "@radix-ui/react-separator";
import { useGetLeaderboardsQuery } from "@/services/api/leaderboards";
import clsx from "clsx";

const standingsColorsMap = new Map([
  [1, "bg-[#FFD700] font-semibold"],
  [2, "bg-[#C0C0C0] font-semibold"],
  [3, "bg-[#CD7F32] font-semibold"],
]);

const Leaderboard = (): JSX.Element => {
  const { data, refetch, fulfilledTimeStamp } = useGetLeaderboardsQuery();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Leaderboards</h2>
          <span className="text-xs">
            Last updated: {new Date(fulfilledTimeStamp ?? Date.now()).toUTCString()}
          </span>
        </div>
        <button className="rounded-sm p-1 text-sm ring-1 ring-black" onClick={refetch}>
          Refresh
        </button>
      </div>
      <ul>
        {data?.map((ranker, idx) => {
          const standings = idx + 1;
          return (
            <li key={ranker.user.id} className="mb-4 space-y-4">
              <div className="flex items-center gap-8">
                <div
                  className={clsx(
                    "flex aspect-square w-8 items-center justify-center rounded-full",
                    standingsColorsMap.get(standings)
                  )}
                >
                  {standings}
                </div>
                <h3 className="font-normal">{ranker.user.name}</h3>
                <div className="ml-auto">{ranker.score}</div>
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
