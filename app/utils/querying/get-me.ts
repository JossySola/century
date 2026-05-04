
export default async function getMe(access_token: string) {
    try {
        if (!access_token) throw new Error("Empty argument");
        const request = await fetch("https://oauth.reddit.com/api/v1/me", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            },
        });
        if (!request.ok) throw new Error("Failed at Reddit endpoint");
        const response = await request.json();
        return response;
    } catch (error: any) {
        console.error(error.message);
        throw new Error('Failed at getting user\'s data');
    }
}