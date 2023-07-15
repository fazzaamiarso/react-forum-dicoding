import { forumAPI } from "@/utils/test/test-utils";
import { rest } from "msw";

const fakeUser = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
};

export const handlers = [
  rest.get(forumAPI("users/me"), async (_req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ data: { user: fakeUser } }));
  }),
  rest.get(forumAPI("users"), async (_req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ data: { users: [] } }));
  }),
];
