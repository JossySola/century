import { Thing, Listing } from "../../types/types";

export default function redditFilter (obj: Thing | Listing | Array<Listing>) {
    if (!Array.isArray(obj)) {
        switch (obj.kind) {
            case 'Listing': {
                const map = obj.data.children.map((child: Thing) => redditFilter(child));
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
            case 'more': {
                return null;
            }
            default: {
                throw new Error(`The object kind was not found in the Switch cases.`);
            }
        }
    } else if (Array.isArray(obj)) {
        // Condition when the argument is an Array of two Listings (objects). Commonly seen when the API returns one listing with the post data and the second listing with the post comments
        return obj.map((child) => redditFilter(child));
    }
}