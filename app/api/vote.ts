'use server'
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/vote";

export async function action({ request, params }: Route.ActionArgs) {
    try {
        if (!params.id) throw new Error("Missing id")
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const access_token = session.get("access_token");
        if (!access_token) throw new Error("Unauthorized");
        const formData = await request.formData();
        const dir = String(formData.get("dir") ?? "");
        const req = await fetch("https://oauth.reddit.com/api/vote", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            },
            body: new URLSearchParams({
                id: params.id,
                dir,
            })
        });
        if (!req.ok) {
            if (req.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("Reddit endpoint fetch failed");
            }
        };
        return true;
    } catch (error: any) {
        console.log(error.message);
        if (error.message.includes("Unauthorized")) {
            return { error: "You must sign in to Reddit in order to upvote" };
        } else {
            return { error: "Unable to register vote" };
        }
    }
}