import type { Listing } from "../types";

export default async function search(query: string | undefined, access_token: string | undefined): Promise<Listing | Error> {
    try {
        if (!query) throw new Error("Query is empty");
        if (!access_token) throw new Error("");
        const endpoint = new URL('https://oauth.reddit.com/subreddits/search');

        endpoint.search = new URLSearchParams({
        limit: '15',
        show: 'all',
        show_users: 'true',
        sort: 'relevance',
        typeahead_active: 'None',
        q: query,
        }).toString();

        const request = await fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
                'Content-Type': 'application/json',
            },
        });
        if (!request.ok) throw new Error(`Error at endpoint: ${request.statusText}`);
        const response: Listing = await request.json();
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Error at search: ${error.message}`);
    }
}