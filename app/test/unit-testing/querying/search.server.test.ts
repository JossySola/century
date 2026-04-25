import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { server } from "~/test/mocks/node";
import search from "~/utils/querying/search";

describe("Search", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("returns a listing", async () => {
        const result = await search("test", "access-token-123");
        expect(result).toEqual({
            listing: "Listing",
        });
    });
    test("throws error when the query is empty", async () => {
        await expect(search("", "access-token-123")).rejects.toThrow();
    });
    test("throws when an access token is not provided", async () => {
        await expect(search("test", undefined)).rejects.toThrow();
    });
    test("throws error when fetch fails", async () => {
        server.use(
            http.get('https://oauth.reddit.com/subreddits/search', ({ request }) => {
            const url = new URL(request.url);

            expect(url.searchParams.get('q')).toBe('test');

            return new HttpResponse(null, { status: 500 });
            })
        );
        await expect(search("test", "access-token-123")).rejects.toThrow();
    });
});