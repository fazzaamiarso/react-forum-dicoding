import { rest } from "msw";

const BASE_URL = "https://forum-api.dicoding.dev/v1/";

const fakeUser = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
};

export const handlers = [
  rest.get(`${BASE_URL}users/me`, async (_req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ data: { user: fakeUser } }));
  }),
];
