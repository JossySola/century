import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { server } from "~/test/mocks/node";
import upvoteAction from "~/utils/actions/upvote";

describe("upvoteAction", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("returns void if successful", async () => {
        const result = await upvoteAction("access_token", "t3_id", "1");
        expect(result).toBe(true);
    });
    test("throws if an argument is missing", async () => {
        await expect(() => upvoteAction("access_token", "", "1")).rejects.toThrow('Failed at upvoteAction: Argument missing');
    });
    test("throws when endpoint fetch fails", async () => {
        server.use(
            http.post('https://oauth.reddit.com/api/vote', () => {
                return new HttpResponse(null, { status: 500 })
            })
        );
        await expect(() => upvoteAction("access_token", "t3_id", "1")).rejects.toThrow('Failed at upvoteAction: Reddit endpoint fetch failed');
    });
});