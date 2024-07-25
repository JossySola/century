import { redirect } from "react-router-dom";
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
    const temporal = window.sessionStorage.getItem("query");
    const link = window.sessionStorage.getItem("tempLink");
    if (query) {
        const response = await search(query);
        const elements = redditFilter(response);
        return { elements };
    }
    if (code) {
        if (stateSent && stateReceived) {
            const access = await getAccessToken(stateSent, stateReceived, code);
            if (access) {
                if (temporal !== null) {
                    const response = await search(temporal);
                    const elements = redditFilter(response);
                    window.sessionStorage.removeItem("query");
                    return { elements };
                }
                if (link !== null) {
                    const temp = link;
                    window.sessionStorage.removeItem("tempLink");
                    return redirect(`https://centurytimes.jossysola.com/${temp}/`);
                }
            }
        }
    }

    const url = "https://www.reddit.com/r/worldnews.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, url, error};
}
export async function news() {
    const url = "https://www.reddit.com/r/worldnews.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, url};
}
export async function gaming() {
    const url = "https://www.reddit.com/r/gaming.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, url};
}
export async function space() {
    const url = "https://www.reddit.com/r/space.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, url};
}
export async function sports() {
    const url = "https://www.reddit.com/r/sports.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, url};
}
export async function science() {
    const url = "https://www.reddit.com/r/science.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, url};
}
export async function tech() {
    const url = "https://www.reddit.com/r/technology.json?raw_json=1";
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);
    
    return {elements, url};
}
export async function subreddit({ request }) {
    const currentURL = new URL(request.url);
    const pathname = currentURL.pathname;
    const url = `https://www.reddit.com${pathname}.json?raw_json=1`;
    const feed = await fetchHandler(url);
    const elements = redditFilter(feed);

    return {elements, pathname};
}
export async function post() {
    const access_token = window.localStorage.getItem("access_token");
    const me = await fetch(`https://oauth.reddit.com/api/me.json`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });
    const mejson = await me.json();
    if (mejson.ok) {
        window.sessionStorage.setItem("me", mejson.data.name);
    }
    
    return mejson;
}