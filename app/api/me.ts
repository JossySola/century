'use server'
import { data } from "react-router";
import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/me";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const tokenCookie = session.get("access_token");
    const req = await fetch("https://oauth.reddit.com/api/v1/me", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${tokenCookie}`,
            'User-Agent': 'centurytimes/2.1.0',
        }
    });
    const response = await req.json();
    if (response.name) {
        return data(
            { 
                user: response.name, 
                avatar: response.icon_img || "", 
                displayName: response.subreddit?.display_name || "" },
        );
    }
    return data(
        { user: null, avatar: "" },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
}