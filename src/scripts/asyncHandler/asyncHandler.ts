interface Listing {
    kind: string,
    data: {
        children: any[],
        author: string,
        author_fullname: string,
        body_html: string,
        created_utc: number,
        depth: number,
        downs: number,
        id: string,
        link_id: string,
        name: string,
        num_comments: number,
        permalink: string,
        selftext: string,
        selftext_html: string,
        subreddit: string,
        subreddit_id: string,
        subreddit_name_prefixed: string,
        title: string,
        parent_id: string,
        replies: number,
        send_replies: boolean,
        ups: number,
        url: string
    }
}

function filter (obj: Listing) {
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


//wwwGET("worldnews.json?raw_json=1");
//wwwGET("worldnews/comments/1d1iybe/rworldnews_live_thread_russian_invasion_of.json")

export default async function asyncHandler<T, U>(url: string, method?: "POST" | "GET" | undefined, payload?: T | undefined): Promise<U | undefined> {
    if (url) {
        if (!method || method === "GET" as "GET") {
            if (!payload) {
                const baseURL = "https://www.reddit.com/r/";
                const body = await fetch(`${baseURL}${url}`);
                
                if (!body.ok) {
                    const {status, statusText} = body;
                    console.error(`${status}, ${statusText}`);
                    return {status, statusText} as unknown as Promise<U>;
                }

                const response = await body.json();
                return filter(response) as Promise<U>;
            } else if (payload) {

            }
        } else if (method === "POST" as "POST") {
            if (payload) {

            } else {
                console.error("To send a POST request, you must pass a payload as object");
                return undefined;
            }
        } else if (!method && payload) {
            console.error("Please define the method as the second argument");
            return undefined;
        }
    } else {
        console.error("An URL must be passed as an argument");
        return undefined;
    }
}