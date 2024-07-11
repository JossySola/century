import redditFilter from "../redditFilter/redditFilter";

export default async function getPostData(subreddit: string | undefined, id: string | undefined, title: string | undefined): Promise<object | undefined> {
    const access_token = window.localStorage.getItem("access_token");
    const publicEndpoint = `https://www.reddit.com/r/${subreddit}/comments/${id}/${title}.json`;
    const privateEndpoint = `https://oauth.reddit.com/comments/${id}.json`;

    const payload = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    try {
        const body = await fetch(privateEndpoint, payload);
        const response = await body.json();
        
        if (response.length === 2 && typeof response[0] === "object" && typeof response[1] === "object") {
            return redditFilter(response);
        } else {
            throw new Error("Unauthorized");
        }
    } catch(e) {
        const body = await fetch(publicEndpoint);
        const response = await body.json();

        if(response) {
            return redditFilter(response);
        }
    }
}