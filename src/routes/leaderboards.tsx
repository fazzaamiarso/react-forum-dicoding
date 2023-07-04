import { useGetLeaderboardsQuery } from "@/services/api/leaderboards";
import clsx from "clsx";

const standingsColorsMap = new Map([
  [1, "bg-yellow-500"],
  [2, "bg-gray-500"],
  [3, "bg-orange-500"],
]);

const Leaderboard = (): JSX.Element => {
  const { data } = useGetLeaderboardsQuery();
  return (
    <div>
      <h2>Leaderboards</h2>
      <ul className="space-y-4">
        {data?.map((ranker, idx) => {
          const standings = idx + 1;
          return (
            <li key={ranker.user.id} className="flex items-center gap-4">
              <div className={clsx("w-max p-2", standingsColorsMap.get(standings))}>
                {standings}
              </div>
              <h3>{ranker.user.name}</h3>
              <div className="ml-auto">{ranker.score}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
