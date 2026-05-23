import { destroySession, getSession } from "~/sessions.server";
import { redirect } from "react-router";
import type { Route } from "./+types/signout";

export async function action({ request }: Route.ActionArgs) {
    try {
        const session = await getSession(
            request.headers.get("Cookie")
        );
        const accessToken = session.get("access_token");
        const refreshToken = session.get("refresh_token");
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        const encode = Buffer.from(client_id + ':' + client_secret).toString('base64');

        if (accessToken && client_id && client_secret) {
            const req = await fetch("https://www.reddit.com/api/v1/revoke_token", {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${encode}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
                },
                body: new URLSearchParams({
                    token: accessToken,
                    token_type_hint: "access_token",
                }),
            });
            if (!req.ok) console.error(`Access token revoke failed: ${req.statusText}`);
        }

        if (refreshToken && client_id && client_secret) {
            const req = await fetch("https://www.reddit.com/api/v1/revoke_token", {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${encode}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
                },
                body: new URLSearchParams({
                    token: refreshToken,
                    token_type_hint: "refresh_token",
                }),
            });
            if (!req.ok) console.error(`Refresh token revoke failed: ${req.statusText}`);
        }

        return redirect("/", {
            headers: {
                "Set-Cookie": await destroySession(session),
            }
        });
    } catch (error: any) {
        console.error(error.message);
        throw new Error(`Failed at /signout: ${error.message}`);
    }
}
