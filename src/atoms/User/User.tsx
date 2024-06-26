import React from "react"
import "./User.css"

interface Props {
    subreddit: string | undefined;
    author: string;
    src: string | undefined;
}
export default function User ({subreddit, author, src}: Props) {
    
    return (
        <a href={`https://www.reddit.com/u/${author}/`} target="_blank">
            <section id="user" className={subreddit ? "grid-3" : "grid-2"}>
                <img src={src} className="User-img"/>
                {subreddit ? 
                <>
                    <h4 className="subreddit">{subreddit}</h4>
                    <h4 className="author">{author}</h4>
                </> : <h4 className="author" style={{fontWeight: 700}}>{author}</h4>}
            </section>
        </a>
    )
}
