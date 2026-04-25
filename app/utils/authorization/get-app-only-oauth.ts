import type { OnlyAppAuthResponse } from "../types";

export default async function getAppOnlyOAuthorization() {
    try {
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        // Encode both env variables into base64
        const encode = Buffer.from(client_id + ':' + client_secret).toString('base64');
        // Request access token using 'Application Only OAuth' flow
        const req = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)'
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
            })
        });
        if (!req.ok) {
            throw new Error(`Error at access_token endpoint. ${req.statusText}`)
        }
        const response: OnlyAppAuthResponse = await req.json();
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
    }
}