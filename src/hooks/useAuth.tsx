import { useGetOwnProfileQuery } from "@/services/api/user";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAuth = () => {
  const { data: user } = useGetOwnProfileQuery();

  return { user };
};
