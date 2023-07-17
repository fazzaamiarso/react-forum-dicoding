export const FORUM_API_BASE_URL = "https://forum-api.dicoding.dev/v1/";

export const forumAPI = (path: string): string => {
  return new URL(path, FORUM_API_BASE_URL).toString();
};
