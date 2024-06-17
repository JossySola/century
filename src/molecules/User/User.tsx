import React from "react"
import "./User.css"

interface Props {
    author: string;
    src: string | undefined;
}
export default function User ({author, src}: Props) {
    
    return (
        <a href={`https://www.reddit.com/u/${author}/`} target="_blank">
            <section>
                <img src={src} className="User-img"/>
                <h4>u/{author}</h4>
            </section>
        </a>
    )
}
