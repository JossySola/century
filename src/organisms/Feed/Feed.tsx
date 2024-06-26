import React, { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { useCacheTimer } from "../../scripts/custom_hooks/hooks";
import Preview from "../../molecules/Preview/Preview";
import Account from "../../molecules/Account/Account";
import Subreddit from "../../molecules/Subreddit/Subreddit";
import "./Feed.css"
 
interface Article {
    author: string;
    author_fullname: string;
    created_utc: number;
    downs: number;
    id: string;
    kind: "t3";
    name: string;
    num_comments: number;
    permalink: string;
    preview: object;
    selftext: string;
    selftext_html: string | null;
    subreddit: string;
    subreddit_id: string;
    subreddit_name_prefixed: string;
    title: string;
    ups: number;
    url: string;
}
interface _Account {
    created_utc: number,
    icon_img: string,
    id: string,
    is_blocked: boolean,
    kind: "t2",
    name: string,
    snoovatar_img: string,
    subreddit: object,
    verified: boolean,
}
interface _Subreddit {
    banner_background_color: string,
    banner_background_image: string,
    banner_img: string,
    banner_size: Array<number>,
    community_icon: string,
    created_utc: number,
    description_html: string,
    display_name_prefixed: string,
    header_img: string,
    header_size: Array<number>,
    header_title: string,
    icon_img: string,
    icon_size: Array<number>,
    id: string,
    key_color: string,
    kind: "t5",
    name: string,
    primary_color: string,
    public_description_html: string,
    subscribers: number,
    title: string,
    url: string,
}

type Thing = Article | _Account | _Subreddit;

export default function Feed () {
    const data: any = useLoaderData();
    
    data.url && useCacheTimer(data.url);
    
    return (
        <main id="feed">
            {data.error && <span>Authorizing the Web App to connect to Reddit is required to Search.</span>}
            {
                data.elements && data.elements.map((element: Thing) => {
                    if (element.kind === "t3" as "t3") {
                        if (element.author !== "[deleted]") {
                            return <Preview payload={element} key={element.id}/>
                        }
                    }
                    if (element.kind === "t5" as "t5") {
                        return <Subreddit payload={element} key={element.id} />
                    }
                    if (element.kind === "t2" as "t2") {
                        if (!element.is_blocked) {
                            return <Account payload={element} key={element.id} />
                        }
                    }
                })
            }
        </main>
    )
}
