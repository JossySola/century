import { getSession } from "~/sessions.server";
import type { Route } from "./+types/subreddit.$";
import type { Listing } from "~/utils/types";

export async function loader({ request, params }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const tokenCookie = session.get("access_token");
    
    const req = await fetch(new URL(`${params["*"]}.json`, "https://www.reddit.com").toString(), {
        method: "GET",
        headers: {
            'Authorization': `Basic ${tokenCookie}`,
            'Content-Type': 'application/json',
            'User-Agent': 'centurytimes/2.0',
        },
    });
    if (req.status !== 200) {
        console.error(req.statusText);
        console.error(req.status);
        return [];
    }
    const data: Array<Listing> = await req.json();
    
    return data;
}