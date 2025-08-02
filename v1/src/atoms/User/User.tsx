import React from "react"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks"
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
    preview: boolean;
}
export default function User ({subreddit, author, preview}: Props) {
    // Returns string or null, pointing to the profile's image URL
    const profile = useProfilePicture(author, preview);
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
    
    return (
        // Link to User's profile page
        <a id="user-anchor" href={`https://www.reddit.com/u/${author}/`} target="_blank" style={{width: "fit-content"}}>
            <section id="user" className={subreddit ? "grid-3" : "grid-2"}>
                {
                    // USER IMAGE
                }
                { typeof profile === "string" && <img src={profile} className="User-img"/>}
                {
                    // If there is no image, use one of the Default Avatars from the array above
                }
                { !profile && <img src={getCachedOrNewImage(avatars, author)} className="User-img"/>}
                
                
                {subreddit ? 
                <>
                    {
                        // If there is a Subreddit (community) name, display the community's name and author's name
                    }
                    <h4 className="user-subreddit">{subreddit}</h4>
                    <h4 className="user-author">{author}</h4>
                    {
                        // Otherwise, only display the author's name
                    }
                </> : <h4 className="user-author" style={{fontWeight: 700}}>{author}</h4>}
            </section>
        </a>
    )
}