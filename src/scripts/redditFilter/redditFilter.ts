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
        preview: {
            enabled: boolean,
            images: [
                {
                    id: string,
                    resolutions: [
                        {
                            height: number,
                            url: string,
                            width: number,
                        }
                    ],
                    source: {
                        height: number,
                        url: string,
                        width: number,
                    },
                    variants: object
                }
            ]
        },
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

export default function redditFilter (obj: Listing) {
    if (obj.kind) {
        switch (obj.kind) {
            case 'Listing': {
                const map = obj.data.children.map(child => redditFilter(child));
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
                    preview,
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
                    preview,
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
            case 'more': {
                return;
            }
            default: {
                throw new Error(`The object kind: ${obj.kind} was not found in the Switch cases.`)
            }
        }
    } else if (Array.isArray(obj)) {
        // Possible infinite loop
        return obj.map(child => redditFilter(child));
    }
}

//wwwGET("worldnews.json?raw_json=1");
//wwwGET("worldnews/comments/1d1iybe/rworldnews_live_thread_russian_invasion_of.json")