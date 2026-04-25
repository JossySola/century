export default async function searchByCategory(category: string, access_token: string) {
    try {
        const request = await fetch(`https://www.reddit.com/r/${category}.json?raw_json=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json',
                'User-Agent': 'web:centurytimes:v2.1.0 (by /u/jossysola)',
            }
        });
        if (!request.ok) throw new Error("Error while fetching");
        return await request.json();
    } catch (error: any) {
        console.error('Failed at searchByCategory: ', error.message);
        throw new Error("Error while fetching by category");
    }
}