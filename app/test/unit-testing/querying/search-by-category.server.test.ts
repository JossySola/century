import { http, HttpResponse } from "msw";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { server } from "~/test/mocks/node";
import searchByCategory from "~/utils/querying/search-by-category";

describe("Search By Category", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    test("returns JSON object", async () => {
        const request = await searchByCategory("test", "access_token_123");
        expect(request).toEqual({
            listing: ""
        });
    });
    test("throws error if fetch fails", async () => {
        server.use(
            http.get("https://oauth.reddit.com/r/test.json", () => {
                return new HttpResponse(null, { status: 500 });
            })
        );
        await expect(searchByCategory("test", "access_token_123")).rejects.toThrow();
    });
});