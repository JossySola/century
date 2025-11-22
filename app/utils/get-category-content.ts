'use server'
export default async function getCategoryContent(category: string, cookie: string | undefined) {
    const req = await fetch(`https://www.reddit.com/r/${category}.json?raw_json=1`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${cookie}`,
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