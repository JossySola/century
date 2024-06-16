import React, { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
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
    
    useEffect(() => {
        const timer = setInterval(() => {
            caches.keys().then(keys => {
                for (const key of keys) {
                    const isOurCache = key.startsWith("century-");
                    if (isOurCache) {
                        caches.open(key).then(cache => {
                            cache.delete(data.url).then(response => console.log(response))
                        })
                    }
                }
            })
        }, 300000);

        return () => clearInterval(timer);
    }, [])
    
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
