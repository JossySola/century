import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { server } from "~/test/mocks/node";
import getMe from "~/utils/querying/get-me";

describe("getMe", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("fetches user's data if signed in", async () => {
        const request = await getMe("access_token");
        expect(request).toEqual({
            name: 'user_name',
            icon_img: 'user_img',
            subreddit: {
                display_name: "user_displayName"
            }
        });
    });
    test("throws error when argument is empty", async () => {
        await expect(getMe("")).rejects.toThrow();
    });
    test("throws error when fetching fails", async () => {
        server.use(
            http.get("https://oauth.reddit.com/api/v1/me", () => {
                return new HttpResponse(null, { status: 500 });
            })
        );
        await expect(getMe("access_token")).rejects.toThrow();
    });
});