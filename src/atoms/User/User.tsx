import React from "react"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks.js"
import "./User.css"

interface Props {
    subreddit: string | undefined;
    author: string;
}
export default function User ({subreddit, author}: Props) {
    const profile = useProfilePicture(author);
    
    return (
        <a href={`https://www.reddit.com/u/${author}/`} target="_blank">
            <section id="user" className={subreddit ? "grid-3" : "grid-2"}>
                {
                    typeof profile === "number" ?
                        <img src={`avatar_default_${profile}.png`} className="User-img"/> :
                        <img src={profile} className="User-img"/>
                }
                
                
                {subreddit ? 
                <>
                    <h4 className="user-subreddit">{subreddit}</h4>
                    <h4 className="user-author">{author}</h4>
                </> : <h4 className="user-author" style={{fontWeight: 700}}>{author}</h4>}
            </section>
        </a>
    )
}
