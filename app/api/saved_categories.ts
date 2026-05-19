import { getSession } from "~/sessions.server";
import type { Route } from "./+types/saved_categories";

export async function action({ request }: Route.ActionArgs) {
    try {
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const access_token = session.get("access_token");
        if (!access_token) throw new Error("Access token missing.");
        const req = await fetch("https://oauth.reddit.com/api/saved_categories", {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${access_token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            },
        });
        if (!req.ok) throw new Error(`${req.statusText}`);
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed at /api/saved_categories: ${error.message}`);
    }
}