import React from "react"
import Comment from "../../atoms/Comment/Comment"
import "./Comments.css"

interface Prop {
    author: string,
    author_fullname: string,
    body_html: string,
    created_utc: number,
    depth: number,
    downs: number,
    id: string,
    link_id: string,
    name: string,
    parent_id: string,
    replies: {
        data: {
            children: Array<object>
        }
    } | string,
    send_replies: boolean,
    ups: number
}
export default function Comments ({t1}) {
    
    return (
        <section>
            {t1 && t1.map((comment: Prop) => {
                if (comment) {
                    return <Comment 
                    key={comment.id}
                    id={comment.id} 
                    author={comment.author} 
                    body_html={comment.body_html} 
                    downs={comment.downs} 
                    ups={comment.ups}
                    replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 1 ? comment.replies.data.children.length-1 : 0}/>
                }
            })}
        </section>
    )
}
