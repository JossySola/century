import { type Access } from "../sessions.server";
import { userContext } from "../context";
import { type unstable_RouterContext } from "react-router";

type Context = {
    set: (context: unstable_RouterContext, object: Access) => void,
    get: () => Access,
}
let userlessToken: Access = {
    "access_token": "",
    "token_type": "bearer",
    "expires_in": 0,
    "scope": "*",
    "mode": "AOO",
};
export const authMiddleware = async (
    { request, context }: { request: Request, context: Context },
    next: () => Promise<Response>
) => {
    const access_token = request.headers.get("access_token");

    if (!access_token) {
        const client_id = process.env.VITE_CLIENT_ID;
        const client_secret = process.env.VITE_CLIENT_SECRET;
        if (client_id && client_secret) {
            const encrypted = Buffer.from(client_id + ':' + client_secret).toString('base64');
            const request = await fetch("https://www.reddit.com/api/v1/access_token", {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encrypted}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    scope: "*",
                }),
            });
            userlessToken = await request.json();
            context.set(userContext, userlessToken);
        }
    } else {
        return next();
    }
}