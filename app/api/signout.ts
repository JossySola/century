'use server'
import { data } from "react-router";
import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/signout";

export async function action({ request }: Route.ActionArgs ) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const token = session.get("access_token");
    if (!token) {
        return { error: "No active session found." };
    }
    const client_id = process.env.REDDIT_CLIENT_ID!;
    const client_secret = process.env.REDDIT_CLIENT_SECRET!;
    const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basicAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
            'User-Agent': 'centurytimes/2.1.0', 
        },
        body: new URLSearchParams({
            token,
            token_type_hint: "access_token",
        })
    }
    const req = await fetch("https://www.reddit.com/api/v1/revoke_token", payload);
    if (!req.ok) {
        return { error: "Failed to revoke token." };
    }
    
    session.unset("access_token");
    session.unset("refresh_token");
    
    // Get userless session
    const req2 = await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': "centurytimes/2.1.0",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "vote identity read submit edit"
        })
    });
    if (!req2.ok) {
        return { error: "Failed to obtain userless token." };
    }
    const res2 = await req2.json();
    session.set("access_token", res2.access_token);
    session.set("access_expires_in", res2.expires_in);
    session.set("access_mode", "userless");    
    return data(
        { message: "Successfully signed out." },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            }
        }
    );
}