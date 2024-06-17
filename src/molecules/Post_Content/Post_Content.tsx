import React from "react"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks"
import User from "../User/User";
import "./Post_Content.css"
 
export default function Post_Content ({t3}) {
    const profile = useProfilePicture(t3.author);
    const res = t3.preview.images[0].resolutions;
    const size = res.length - 1;
    const url = res[size].url;
    
    return (
        <section>
            <User author={t3.author} src={profile} />
            
            <h2>{t3.title}</h2>
            {t3.preview && <img src={url} style={{width: url.width, height: "auto"}} />}
            {t3.selftext && <p>{t3.selftext}</p>}

            <section>
                <img /><span>{t3.ups}</span>
                <img /><span>{t3.downs}</span>
                <img /><span>{t3.num_comments}</span>
            </section>
        </section>
    )
}
