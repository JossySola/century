import { getSession } from "~/sessions.server";
import type { Route } from "./+types/comments";

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const permalink = request.url;
        const searchChar = permalink.indexOf('/r/');
        const endpoint = permalink.slice(searchChar, permalink.length);

        const access_token = session.get("access_token");
        
        const req = await fetch(`https://oauth.reddit.com${endpoint}.json`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            }
        })
        return await req.json();
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Error at comments loader: ", error.message);
    }
}