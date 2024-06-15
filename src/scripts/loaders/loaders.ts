import redditFilter from "../redditFilter/redditFilter";
import fetchHandler from "../../cache/hook";

export async function news() {
    const url = "https://www.reddit.com/r/worldnews.json?raw_json=1";
    const feed = await fetchHandler(url);
    const articles = redditFilter(feed);
    
    return {articles, url};
}