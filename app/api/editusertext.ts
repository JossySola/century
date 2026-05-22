import { getSession } from "~/sessions.server";
import type { Route } from "./+types/editusertext";

export async function action({ request, params }: Route.ActionArgs) {
    try {
        if (!params.id) throw new Error("Missing id");
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const access_token = session.get("access_token");
        if (!access_token) throw new Error("Access token missing.");
        const formData = await request.formData();
        const text = String(formData.get("text") ?? "");
        if (!text) throw new Error("Text is empty");
        const req = await fetch("https://oauth.reddit.com/api/editusertext", {
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
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed at /api/editusertext: ${error.message}`);
    }
}