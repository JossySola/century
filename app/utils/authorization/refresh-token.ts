import type { SuccessfulAuth } from "../types";

export default async function refreshToken(expiration_date: string, refresh_token: string) {
    try {
        if (Date.now() <= parseInt(expiration_date)) throw new Error('The token has not expired.');
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        const encode = Buffer.from(client_id + ':' + client_secret).toString('base64');
        const request = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token,
            }),
        });
        if (!request.ok || request.status !== 200) {
            throw new Error(`Error at refreshToken API endpoint: ${request.statusText}`);
        }
        const response: SuccessfulAuth = await request.json();
        return response;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Error at refreshToken: ${error.message}`);
    }
}