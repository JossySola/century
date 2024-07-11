interface Listing {
    kind: string,
    data: {
        children: any[],
        author: string,
        author_fullname: string,
        banner_background_color: string,
        banner_background_image: string,
        banner_img: string,
        banner_size: Array<number>,
        body_html: string,
        community_icon: string,
        created_utc: number,
        description_html: string,
        depth: number,
        display_name_prefixed: string,
        downs: number,
        header_img: string,
        header_size: Array<number>,
        header_title: string,
        icon_img: string,
        icon_size: Array<number>,
        id: string,
        is_blocked: boolean,
        key_color: string,
        likes: boolean | null,
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
        primary_color: string,
        public_description_html: string,
        selftext: string,
        selftext_html: string,
        snoovatar_img: string,
        subreddit: string,
        subreddit_id: string,
        subreddit_name_prefixed: string,
        subscribers: number,
        title: string,
        parent_id: string,
        replies: number,
        send_replies: boolean,
        ups: number,
        url: string,
        verified: boolean
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
                    likes,
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
                    kind: "t1",
                    likes,
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
                const {
                    created_utc,
                    icon_img,
                    id,
                    is_blocked,
                    name,
                    snoovatar_img,
                    subreddit,
                    verified,
                } = obj.data;
                return {
                    created_utc,
                    icon_img,
                    id,
                    is_blocked,
                    kind: "t2",
                    name,
                    snoovatar_img,
                    subreddit,
                    verified,
                }
            }
            case 't3': {
                // Link
                const {
                    author,
                    author_fullname,
                    created_utc,
                    downs,
                    id,
                    likes,
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
                    kind: "t3",
                    likes,
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
                const {
                    banner_background_color,
                    banner_background_image,
                    banner_img,
                    banner_size,
                    community_icon,
                    created_utc,
                    description_html,
                    display_name_prefixed,
                    header_img,
                    header_size,
                    header_title,
                    icon_img,
                    icon_size,
                    id,
                    key_color,
                    name,
                    primary_color,
                    public_description_html,
                    subscribers,
                    title,
                    url,
                } = obj.data;
                return {
                    banner_background_color,
                    banner_background_image,
                    banner_img,
                    banner_size,
                    community_icon,
                    created_utc,
                    description_html,
                    display_name_prefixed,
                    header_img,
                    header_size,
                    header_title,
                    icon_img,
                    icon_size,
                    id,
                    key_color,
                    kind: "t5",
                    name,
                    primary_color,
                    public_description_html,
                    subscribers,
                    title,
                    url,
                }
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