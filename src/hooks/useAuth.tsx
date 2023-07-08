import { useGetOwnProfileQuery } from "@/services/api/user";
import { useMemo } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
  const { data: user } = useGetOwnProfileQuery();

  const isAuthenticated = user !== undefined;

  return useMemo(() => ({ user, isAuthenticated }), [user, isAuthenticated]);
};
