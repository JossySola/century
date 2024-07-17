import React from "react"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks.js"
import avatar1 from "../../assets/avatar_default_1.png"
import avatar2 from "../../assets/avatar_default_2.png"
import avatar3 from "../../assets/avatar_default_3.png"
import avatar4 from "../../assets/avatar_default_4.png"
import avatar5 from "../../assets/avatar_default_5.png"
import avatar6 from "../../assets/avatar_default_6.png"
import avatar7 from "../../assets/avatar_default_7.png"
import getCachedOrNewImage from "../../profiles.js"
import "./User.css"

interface Props {
    subreddit: string | undefined;
    author: string;
    preview?: boolean;
}
export default function User ({subreddit, author, preview}: Props) {
    const profile = useProfilePicture(author, preview);
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
    
    return (
        <a id="user-anchor" href={`https://www.reddit.com/u/${author}/`} target="_blank" style={{width: "fit-content"}}>
            <section id="user" className={subreddit ? "grid-3" : "grid-2"}>
                { typeof profile === "string" && <img src={profile} className="User-img"/>}
                { !profile && <img src={getCachedOrNewImage(avatars, author)} className="User-img"/>}
                
                
                {subreddit ? 
                <>
                    <h4 className="user-subreddit">{subreddit}</h4>
                    <h4 className="user-author">{author}</h4>
                </> : <h4 className="user-author" style={{fontWeight: 700}}>{author}</h4>}
            </section>
        </a>
    )
}