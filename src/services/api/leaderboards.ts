import type { User } from "@/types";
import { baseApi } from "./base";

interface Leaderboard {
  user: User;
  score: number;
}
export const leaderboardsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboards: builder.query<Leaderboard[], void>({
      query: () => "leaderboards",
      transformResponse: (rawResult: { data: { leaderboards: Leaderboard[] } }) =>
        rawResult.data.leaderboards,
    }),
  }),
});

export const { useGetLeaderboardsQuery } = leaderboardsApi;
