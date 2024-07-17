export interface Listing {
    data: {
        children: Array<Link> | Array<Subreddit> | Array<Comment> | Array<Account>
    },
    kind: "Listing"
}
export interface Subreddit {
    data: {
        banner_background_color: string,
        banner_background_image: string,
        banner_img: string,
        banner_size: number | null,
        community_icon: string,
        created_utc: number,
        description_html: string,
        display_name_prefixed: string,
        header_img: string | null,
        header_size: number | null,
        header_title: string,
        icon_img: string,
        icon_size: number | null,
        id: string,
        key_color: string,
        name: string,
        primary_color: string,
        public_description_html: string,
        subscribers: number,
        title: string,
        url: string
    },
    kind: "t5"
}
export interface Comment {
    data: {
        author: string,
        author_fullname: string,
        body_html: string,
        created_utc: number,
        depth: number,
        downs: number,
        id: string,
        kind: "t1",
        likes: true | false | null,
        link_id: string,
        name: string,
        parent_id: string,
        replies: Listing,
        send_replies: boolean,
        ups: number
    }
    kind: "t1"
}
export interface Link {
    data: {
        author: string,
        author_fullname: string,
        created_utc: number,
        downs: number,
        id: string,
        kind: "t3",
        likes: true| false | null,
        name: string,
        num_comments: number,
        permalink: string,
        preview: undefined | Array<Preview>,
        selfText: string,
        selftext_html: string,
        subreddit: string,
        subreddit_id: string,
        subreddit_name_prefixed: string,
        title: string,
        ups: number,
        url: string
    },
    kind: "t3"
}
export interface Account {
    data: {
        created_utc: number,
        icon_img: string,
        id: string,
        is_blocked: boolean,
        name: string,
        snoovatar_img: string,
        subreddit: {
            banner_img: string,
            banner_size: number | null,
            description: string,
            display_name_prefixed: string,
            header_img: string | null,
            header_size: number | null,
            icon_color: string,
            icon_img: string,
            icon_size: Array<number>,
            name: string,
            title: string,
            url: string
        },
        verified: boolean
    },
    kind: "t2"
}
export type Thing = Subreddit | Comment | Link | Account;

export interface Preview {
    enabled: boolean,
    images: [
        {
            id: string,
            resolutions: Array<Resolution>
            source: Resolution
        }
    ]
}
interface Resolution {
    height: number,
    url: string,
    width: number
}