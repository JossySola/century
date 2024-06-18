import React from "react"
import { useProfilePicture, useHTMLText } from "../../scripts/custom_hooks/hooks"
import "./Comment.css"
 
export default function Comment ({author, body_html, id, downs, ups, replies}) {
    const profile = useProfilePicture(author);

    body_html && useHTMLText(body_html, id);

    return (
        <div>
            <img src={profile} className="User-img"/>
            <h4>u/{author}</h4>
            <div id={id}></div>
            <span>Ups: {ups} </span>
            <span>Downs: {downs} </span>
            <span>Replies: {replies} </span>
        </div>
    )
}