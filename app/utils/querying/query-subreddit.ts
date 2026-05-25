export default async function querySubreddit(pathname: string, access_token: string) {
    try {
        const request = await fetch(`https://oauth.reddit.com${pathname}.json?raw_json=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            }
        });
        if (!request.ok) {
            const attempt = await fetch(`https://www.reddit.com${pathname}.json?raw_json=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
                }
            });
            if (!attempt.ok) throw new Error("Failed to fetch from public endpoint as a second attempt.");
            const response = await attempt.json();
            return response;
        }
        return await request.json();
    } catch (error: any) {
        console.error('Failed at querySubreddit: ', error.message);
        throw new Error("Error while fetching subreddit");
    }
}