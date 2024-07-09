import React from "react"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks"
import User from "../../atoms/User/User"
import formatAmount from "../../scripts/amount"
import comment_icon from "../../assets/icons/comment_icon_black.svg"
import like from "../../assets/icons/like_black.svg"
import dislike from "../../assets/icons/dislike_black.svg"
import open_tab_white from "../../assets/icons/open_tab_white.svg"
import info_icon from "../../assets/icons/info_icon.svg"
import "./Post_Content.css"
 
export default function Post_Content ({t3}) {
    const profile = useProfilePicture(t3.author);
    
    return (
        <section id="content">
            <div className="content-user">
                <User subreddit={t3.subreddit_name_prefixed} author={t3.author} src={profile} />
                <h2>{t3.title}</h2>
            </div>
            {t3.selftext && <p>{t3.selftext}</p>}

            <div className="content-bottom">
                <section className="content-interactions">

                    <div className="light-primary content-bubble">
                        <img src={like as unknown as string} alt="upvotes" aria-label="number of upvotes"/><span>{formatAmount(t3.ups)}</span>
                    </div>
                    
                    <div className="light-primary content-bubble">
                        <img src={dislike as unknown as string} alt="downvotes" aria-label="number of downvotes"/><span>{formatAmount(t3.downs)}</span>
                    </div>
                    
                    <div className="light-primary content-bubble">
                        <img src={comment_icon as unknown as string} alt="comments" aria-label="number of comments"/><span>{formatAmount(t3.num_comments)}</span>
                        <img src={info_icon as unknown as string} className="content-info" title="Comments from deleted users are filtered out" alt="Comments from deleted users are filtered out" aria-label="Comments from deleted users are filtered out"/>
                    </div>
                </section>
                <a href={t3.url} target="_blank" className="secondary">Open article <img src={open_tab_white as unknown as string} /></a>
            </div>
        </section>
    )
}
