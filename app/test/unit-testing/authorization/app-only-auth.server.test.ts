import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { server } from "~/test/mocks/node";
import getUserlessAuthorization from "~/utils/authorization/get-userless-auth";

vi.stubEnv("REDDIT_CLIENT_ID", "REDDIT_123");
vi.stubEnv("REDDIT_CLIENT_SECRET", "REDDIT_abc123");

describe("Application Only OAuth", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("requests access token to API endpoint", async () => {
        const response = await getUserlessAuthorization();
        expect(response).toEqual({
            "access_token": "acessToken123",
            "token_type": "bearer",
            "expires_in": 36000,
            "scope": "read",
        });
    });
    test("throws error if request fails", async () => {
        server.use(
            http.post('https://www.reddit.com/api/v1/access_token', () => {
                return new HttpResponse(null, { status: 500 })
            })
        );
        await expect(getUserlessAuthorization()).rejects.toThrow();
    });
});