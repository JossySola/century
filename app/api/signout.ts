import { getSession } from "~/sessions.server";
import { redirect } from "react-router";
import type { Route } from "./+types/signout";

export async function action({ request }: Route.ActionArgs) {
    try {
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const token = session.get("access_token");
        if (!token) throw new Error("Access token missing");
        const req = await fetch("https://www.reddit.com/api/v1/revoke_token", {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            },
            body: new URLSearchParams({
                token,
                token_type_hint: "access_token",
            }),
        });
        if (!req.ok) throw new Error(`${req.statusText}`);
        redirect("/");
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed at /signout: ${error.message}`);
    }
}