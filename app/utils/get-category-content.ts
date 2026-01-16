'use server'
export default async function getCategoryContent(category: string, cookie: string | undefined) {
    const req = await fetch(`https://oauth.reddit.com/r/${category}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${cookie}`,
            'Content-Type': 'application/json',
            'User-Agent': "centurytimes/2.1.0",
        },
    });
    if (req.status !== 200) {
        console.error(req.statusText);
        console.error(req.status)
        throw new Error("Failed at fetching subreddits");
    }
    const response = await req.json();
    return response.data.children;
}