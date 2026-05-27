import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { server } from "~/test/mocks/node";
import refreshToken from "~/utils/authorization/refresh-token";

vi.stubEnv("REDDIT_CLIENT_ID", "REDDIT_123");
vi.stubEnv("REDDIT_CLIENT_SECRET", "REDDIT_abc123");

describe("Refresh token", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("gets new access token when the expiration date has been reached", async () => {
        const response = await refreshToken("1776835374117", "refresh_token");
        expect(response).toEqual({
            "access_token": "accessToken123",
            "token_type": "bearer",
            "expires_in": 36000,
            "scope": "read",
            "refresh_token": "refreshToken123"
        });
    });
    test("throws error if request fails", async () => {
        server.use(
            http.post('https://www.reddit.com/api/v1/access_token', () => {
                return new HttpResponse(null, { status: 500 })
            })
        );
        await expect(refreshToken("1776835374117", "refresh_token")).rejects.toThrow();
    });
});