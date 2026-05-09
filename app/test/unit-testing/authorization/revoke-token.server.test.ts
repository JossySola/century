import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { server } from "~/test/mocks/node";
import revokeToken from "~/utils/authorization/revoke-token";
import { http, HttpResponse } from "msw";

vi.stubEnv("REDDIT_CLIENT_ID", "REDDIT_123");
vi.stubEnv("REDDIT_CLIENT_SECRET", "REDDIT_abc123");

describe("Manually Revoke Token", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("returns true after revoking token", async () => {
        const result = await revokeToken("toke_to_revoke");
        expect(result).toBe(true);
    });
    test("throws error if token is missing", async () => {
        await expect(revokeToken("")).rejects.toThrow();
    });
    test("throws error if fetch request fails", async () => {
        server.use(
            http.post('https://www.reddit.com/api/v1/revoke_token', () => {
                return new HttpResponse(null, { status: 500 })
            })
        );
        await expect(revokeToken("")).rejects.toThrow();
    });
});