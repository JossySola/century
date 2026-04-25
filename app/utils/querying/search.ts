import type { Listing } from "../types";

export default async function search(query: string, access_token: string) {
    try {
        if (!query) throw new Error("Query is empty");
        
        const endpoint = new URL('https://oauth.reddit.com/subreddits/search');
        const params = new URLSearchParams(endpoint.search);
        params.append("limit", '15');
        params.append("show", 'all');
        params.append("show_users", 'true');
        params.append("sort", 'relevance');
        params.append("typeahead_active", 'None');
        params.append("q", `${query.toString()}`);
        endpoint.search = params.toString();

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