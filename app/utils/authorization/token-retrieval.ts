import type { SuccessfulAuthResponse, TokenResponse } from "../types";

export default async function tokenRetrieval({ error, code }: TokenResponse): Promise<SuccessfulAuthResponse | Error> {
    try {
        if (error) throw new Error(`${error}`);
        if (code) {
            const client_id = process.env.REDDIT_CLIENT_ID;
            const client_secret = process.env.REDDIT_CLIENT_SECRET;
            const encode = Buffer.from(client_id + ':' + client_secret).toString('base64');
            const req = await fetch("https://www.reddit.com/api/v1/access_token", {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encode}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: 'http://localhost:5173',
                }),
            });
            if (!req.ok || req.status !== 200) throw new Error("Error at Reddit endpoint");
            const response: SuccessfulAuthResponse = await req.json();
            return response;
        }
        throw new Error("Missing code");
    } catch (error: any) {
        console.error(error);
        throw new Error(`Error at tokenRetrieval: ${error.message}`)
    }
}