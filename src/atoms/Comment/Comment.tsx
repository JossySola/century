import React, { useState } from "react"
import { useProfilePicture, useHTMLText } from "../../scripts/custom_hooks/hooks"
import Replies from "../../molecules/Replies/Replies"

import redditFilter from "../../scripts/redditFilter/redditFilter"
import dislike from "../../assets/icons/dislike.svg"
import like from "../../assets/icons/like.svg"
import comment_icon from "../../assets/icons/comment_icon.svg"

import "./Comment.css"
 
export default function Comment ({author, body_html, id, downs, ups, replies, more}) {
    const [showReplies, setShowReplies] = useState(false);
    const profile = useProfilePicture(author);
    body_html && useHTMLText(body_html, id);

    const t1 = redditFilter(more)
    
    return (
        <div className="comment-div">
            <div className="comment">
                <img src={profile} className="User-img"/>

                <div className="content">
                    <h4>u/{author}</h4>
                    <div id={id}></div>

                    <div className="comment-interactions">
                        <span><img src={like} alt="upvotes" decoding="sync"/> {ups} </span>
                        <span><img src={dislike} alt="downvotes" decoding="sync"/> {downs} </span>
                        <span><img src={comment_icon} alt="comments" decoding="sync"/> {replies} </span>
                    </div>
                    

                    { replies !== 0 && t1 && <a onClick={e => {
                        e.preventDefault();
                        showReplies ? setShowReplies(false) : setShowReplies(true);
                    }}>...</a>}
                    
                </div>
            </div>
            {
                showReplies && t1 ? <Replies t1={t1} /> : null
            }
        </div>
        
    )
}