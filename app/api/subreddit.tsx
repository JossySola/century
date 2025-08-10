import { getSession } from "~/sessions.server";
import type { Route } from "./+types/subreddit";

export async function loader({ request, params }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const tokenCookie = session.get("access_token");
    
    const req = await fetch(`https://www.reddit.com${params["*"]}.json`, {
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
        throw new Error("Failed at fetching subreddit's comments");
    }
    const response = await req.json();
    return response;
    
}
