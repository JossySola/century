
export default async function upvoteAction(access_token: string, id: string, dir: "1" | "0" | "-1") {
    try {
        if (!access_token || !id || !dir) throw new Error("Argument missing");
        const request = await fetch("https://oauth.reddit.com/api/vote", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            },
            body: new URLSearchParams({
                id,
                dir,
            })
        });
        console.log(request)
        if (!request.ok) throw new Error("Reddit endpoint fetch failed");
        return true;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed at upvoteAction: ${error.message}`);
    }
}