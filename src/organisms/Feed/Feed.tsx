import React, { useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { useCacheTimer } from "../../scripts/custom_hooks/hooks";
import Preview from "../../molecules/Preview/Preview";
import "./Feed.css"
 
interface Article {
    author: string;
    author_fullname: string;
    created_utc: number;
    downs: number;
    id: string;
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

export default function Feed () {
    const data: any = useLoaderData();
    
    useCacheTimer(data.url);
    
    return (
        <main>
            {
                data.articles && data.articles.map((article: Article) => {
                    if (article.author !== "[deleted]") {
                        return <Preview payload={article} key={article.id}/>
                    }
                })
            }
        </main>
    )
}
