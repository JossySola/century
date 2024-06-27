import React from "react"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks"
import User from "../../atoms/User/User"
import comment_icon from "../../assets/icons/comment_icon.svg"
import like from "../../assets/icons/like.svg"
import dislike from "../../assets/icons/dislike.svg"
import open_tab_white from "../../assets/icons/open_tab_white.svg"

import "./Post_Content.css"
 
export default function Post_Content ({t3}) {
    const profile = useProfilePicture(t3.author);
    const res = t3.preview && t3.preview.images && t3.preview.images[0].resolutions;
    const size = res && res.length - 1;
    const url = res && size && res[size].url;
    
    return (
        <section id="content">
            <div className="content-user">
                <User subreddit={t3.subreddit_name_prefixed} author={t3.author} src={profile} />
                <h2>{t3.title}</h2>
            </div>
            
            
            
            {t3.selftext && <p>{t3.selftext}</p>}

            <div className="content-bottom">
                <section className="content-interactions">
                    <img src={like} alt="upvotes"/><span>{t3.ups} </span>
                    <img src={dislike} alt="downvotes"/><span>{t3.downs} </span>
                    <img src={comment_icon} alt="comments"/><span>{t3.num_comments} </span>
                </section>
                <a href={t3.url} target="_blank" className="secondary">Open article <img src={open_tab_white} /></a>
            </div>
        </section>
    )
}
