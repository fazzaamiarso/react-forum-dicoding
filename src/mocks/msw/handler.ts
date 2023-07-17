import { forumAPI } from "@/utils/constants";
import { rest } from "msw";
import { createUser } from "../mock-data";

export const handlers = [
  rest.get(forumAPI("users/me"), async (_req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ data: { user: createUser() } }));
  }),
  rest.get(forumAPI("users"), async (_req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ data: { users: [] } }));
  }),
];
