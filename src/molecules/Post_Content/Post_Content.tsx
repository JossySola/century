import React from "react"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks"
import User from "../../atoms/User/User";
import "./Post_Content.css"
 
export default function Post_Content ({t3}) {
    const profile = useProfilePicture(t3.author);
    const res = t3.preview && t3.preview.images && t3.preview.images[0].resolutions;
    const size = res && res.length - 1;
    const url = res && size && res[size].url;
    
    return (
        <section id="content">
            <User subreddit={t3.subreddit_name_prefixed} author={t3.author} src={profile} />
            
            <h2>{t3.title}</h2>
            
            
            {t3.selftext && <p>{t3.selftext}</p>}

            <div className="content-bottom">
                <section>
                    <img /><span>Ups:{t3.ups} </span>
                    <img /><span>Downs:{t3.downs} </span>
                    <img /><span>Comments:{t3.num_comments} </span>
                </section>
                <a href={t3.url} target="_blank" className="secondary">Open article</a>
            </div>
            
        </section>
    )
}
