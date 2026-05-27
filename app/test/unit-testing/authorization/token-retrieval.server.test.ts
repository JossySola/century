import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { server } from "~/test/mocks/node";
import tokenRetrieval from "~/utils/authorization/token-retrieval";
import { http, HttpResponse } from "msw";

vi.stubEnv("REDDIT_CLIENT_ID", "REDDIT_123");
vi.stubEnv("REDDIT_CLIENT_SECRET", "REDDIT_abc123");

describe("Retrieving the access token", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("returns object with access token", async () => {
        const response = await tokenRetrieval({
            error: undefined,
            code: "code123"
        });
        expect(response).toEqual({
            "access_token": "accessToken123",
            "token_type": "bearer",
            "expires_in": 36000,
            "scope": "read",
            "refresh_token": "refreshToken123"
        });
    });
    test("throws error if an error is passed as an argument", async () => {
        await expect(tokenRetrieval({ error: "access_denied" })).rejects.toThrow();
    });
    test("throws error when the endpoint request fails", async () => {
        server.use(
            http.post('https://www.reddit.com/api/v1/access_token', () => {
                return new HttpResponse(null, { status: 500 })
            })
        );
        await expect(tokenRetrieval({ error: undefined, code: "test123" })).rejects.toThrow();
    });
});