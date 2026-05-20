import { getSession } from "~/sessions.server";
import type { Route } from "./+types/comment";

export async function action({ request, params }: Route.ActionArgs) {
    try {
        if (!params.id) throw new Error("Missing id");
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const access_token = session.get("access_token");
        if (!access_token) throw new Error("Unauthorized");
        const form = await request.formData();
        const text = String(form.get("text") ?? "");
        if (!text) throw new Error("Empty input");
        const req = await fetch("https://oauth.reddit.com/api/comment", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            },
            body: new URLSearchParams({
                api_type: "json",
                return_rtjson: "true",
                text,
                thing_id: params.id,
            })
        });
        if (!req.ok) throw new Error(`${req.statusText}`);
        const data = await req.json();
        const errors = data?.json?.errors ?? [];
        if (errors.length > 0) {
            return { error: "Reddit rejected the comment", details: errors };
        }
        return { comment: { kind: "t1", data } };
    } catch (error: any) {
        console.error(`Failed at /api/comment: ${error.message}`);
        if (error.message.includes("Unauthorized")) {
            return { error: "You must sign in to Reddit first" }
        } else if (error.message.includes("Empty input")) {
            return { error: "The comment input cannot be empty" }
        } else {
            return { error: "Unable to post comment" }
        }
    }
}
