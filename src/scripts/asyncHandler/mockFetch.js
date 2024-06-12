function filter (obj) {
    if (obj.kind) {
        switch (obj.kind) {
            case 'Listing': {
                const map = obj.data.children.map(child => filter(child));
                return map;
            }
            case 't1': {
                // Comment
                const {
                    author,
                    author_fullname,
                    body_html,
                    created_utc,
                    depth,
                    downs,
                    id,
                    link_id,
                    name,
                    parent_id,
                    replies,
                    send_replies,
                    ups
                } = obj.data;
                return {
                    author,
                    author_fullname,
                    body_html,
                    created_utc,
                    depth,
                    downs,
                    id,
                    link_id,
                    name,
                    parent_id,
                    replies,
                    send_replies,
                    ups
                }
            }
            case 't2': {
                // Account
            }
            case 't3': {
                // Link
                const {
                    author,
                    author_fullname,
                    created_utc,
                    downs,
                    id,
                    name,
                    num_comments,
                    permalink,
                    selftext,
                    selftext_html,
                    subreddit,
                    subreddit_id,
                    subreddit_name_prefixed,
                    title,
                    ups,
                    url
                } = obj.data;
                return {
                    author,
                    author_fullname,
                    created_utc,
                    downs,
                    id,
                    name,
                    num_comments,
                    permalink,
                    selftext,
                    selftext_html,
                    subreddit,
                    subreddit_id,
                    subreddit_name_prefixed,
                    title,
                    ups,
                    url
                }
            }
            case 't4': {
                // Message
            }
            case 't5': {
                // Subreddit
            }
            case 't6': {
                // Award
            }
            default: {
                return false;
            }
        }
    } else if (Array.isArray(obj)) {
        // Possible infinite loop
        return obj.map(child => filter(child));
    }
}

export default async function mockAsyncHandler(url, method, payload) {
    if (url) {
        if (!method || method === "GET") {
            if (!payload) {
                const baseURL = "https://www.reddit.com/r/";
                const body = await fetch(`${baseURL}${url}`);
                
                if (!body.ok) {
                    const {status, statusText} = body;
                    console.error(`${status}, ${statusText}`);
                    return {status, statusText};
                }

                const response = await body.json();
                return filter(response);
            } else if (payload) {

            }
        } else if (method === "POST") {
            if (payload) {

            } else {
                console.error("To send a POST request, you must pass a payload as object");
                return undefined;
            }
        }
    } else {
        console.error("An URL must be passed as an argument");
        return undefined;
    }
}