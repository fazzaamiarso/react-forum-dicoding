import { afterAll, afterEach, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "./handler";

export const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

//  Close server after all tests
afterAll(() => {
  server.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();
});
