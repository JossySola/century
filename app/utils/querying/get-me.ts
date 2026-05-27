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
        if (!request.ok) {
            return {
                name: undefined,
                icon_img: undefined,
                name_prefixed: undefined,
                icon_color: undefined,
                total_karma: undefined,
                gold_creddits: undefined,
                subscribers: undefined,
            }
        };
        const response = await request.json();
        return response;
    } catch (error: any) {
        console.error(error.message);
        throw new Error('Failed at getting user\'s data');
    }
}