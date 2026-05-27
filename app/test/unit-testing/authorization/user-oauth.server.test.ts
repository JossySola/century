import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { server } from "~/test/mocks/node";
import getUserOAuth from "~/utils/authorization/get-user-oauth";
import * as zod from "zod/v4";

vi.stubEnv("REDDIT_CLIENT_ID", "client_id");

describe("User OAuth", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("returns URL to authorize app", async () => {
        const result = await getUserOAuth("state_123");
        const isUrl = zod.httpUrl().safeParse(result.toString());
        expect(isUrl.success).toBe(true);
    });
    test("throws error if state is empty", async () => {
        await expect(getUserOAuth("")).rejects.toThrow();
    });
});