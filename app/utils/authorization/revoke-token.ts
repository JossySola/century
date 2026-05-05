export default async function revokeToken(token: string): Promise<void | Error>{
    try {
        if (!token) throw new Error("Token is missing")
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        // Encode both env variables into base64
        const encode = Buffer.from(client_id + ':' + client_secret).toString('base64');
        const request = await fetch("https://www.reddit.com/api/v1/revoke_token", {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)'
            },
            body: new URLSearchParams({
                token,
            })
        });
        if (!request.ok) throw new Error("Error at fetch");
    } catch (error: any) {
        console.error(error);
        throw new Error("Error at revokeToken: ", error.message);       
    }
}