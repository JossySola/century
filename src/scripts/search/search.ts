import { v4 as uuidv4 } from "uuid";
import request from "../request";

export default async function search (query: string) {
    const base = "https://oauth.reddit.com/subreddits/search?";
    const access_token: string | null = window.localStorage.getItem("access_token");
    const params = new URLSearchParams({
        after: "",
        before: "",
        count: "0",
        limit: "15",
        q: `${query}`,
        search_query_id: `${uuidv4()}`,
        show: "all",
        show_users: "true",
        sort: "relevance",
        typeahead_active: "None"
    })
    const payload = {
        method: "GET" as "GET",
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
    window.sessionStorage.setItem("query", query);

    const input = document.getElementById("search") as HTMLInputElement;
    input ? input.value = "" : null;

    return request(base + params.toString(), payload);
}