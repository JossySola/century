import React, { useState } from "react"
import { useProfilePicture, useHTMLText } from "../../scripts/custom_hooks/hooks"
import redditFilter from "../../scripts/redditFilter/redditFilter"
import { Prop } from "../../molecules/Comments/Comments"
import Comments from "../../molecules/Comments/Comments"
import "./Comment.css"
 
export default function Comment ({author, body_html, id, downs, ups, replies, more}) {
    const [showReplies, setShowReplies] = useState(false);
    const profile = useProfilePicture(author);
    body_html && useHTMLText(body_html, id);

    const t1 = redditFilter(more)
    
    return (
        <div>
            <img src={profile} className="User-img"/>
            <h4>u/{author}</h4>
            <div id={id}></div>
            <span>Ups: {ups} </span>
            <span>Downs: {downs} </span>
            <span>Replies: {replies} </span>
            { replies !== 0 && t1 && <a onClick={e => {
                e.preventDefault();
                showReplies ? setShowReplies(false) : setShowReplies(true);
            }}>...</a>}
            {
                showReplies && t1 ? <Comments t1={t1} /> : null
            }
        </div>
    )
}