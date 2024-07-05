import redditFilter from "../redditFilter/redditFilter";
import fetchHandler from "../../cache/hook";
import getAccessToken from "../access/access";
import search from "../search/search";

export async function index({request}) {
    const pathname = new URL(request.url);
    const query = pathname.searchParams.get("search");
    const code = pathname.searchParams.get("code");
    const error = pathname.searchParams.get("error");
    const stateSent = window.localStorage.getItem("state");
    const stateReceived = pathname.searchParams.get("state");
    const temporal = window.localStorage.getItem("query");
    
    if (query) {
        const response = await search(query);
        const elements = redditFilter(response);
        return { elements };
    }
    if (code) {
        if (stateSent && stateReceived) {
            window.localStorage.setItem("access_token", code);
            if (temporal !== undefined && temporal !== null) {
                const access = await getAccessToken(stateSent, stateReceived, code);
                if (access) {
                    const response = await search(temporal);
                    const elements = redditFilter(response);
                    return { elements };
                }
            }
        }
    }

    const url = "https://www.reddit.com/r/worldnews.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, error};
}
export async function news() {
    const url = "https://www.reddit.com/r/worldnews.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements};
}
export async function gaming() {
    const url = "https://www.reddit.com/r/gaming.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements};
}
export async function space() {
    const url = "https://www.reddit.com/r/space.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements};
}
export async function sports() {
    const url = "https://www.reddit.com/r/sports.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements};
}
export async function science() {
    const url = "https://www.reddit.com/r/science.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements};
}
export async function tech() {
    const url = "https://www.reddit.com/r/technology.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements};
}
export async function subreddit({ request }) {
    const currentURL = new URL(request.url);
    const pathname = currentURL.pathname;
    const url = `https://www.reddit.com${pathname}.json?raw.json=1`;
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, pathname};
}