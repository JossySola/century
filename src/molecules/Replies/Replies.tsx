import React from "react"
import Comment from "../../atoms/Comment/Comment"
import { getRepliesAmount } from "../Comments/Comments"
import "./Replies.css"
 
export default function Replies ({t1}) {
    
    return (
        <section className="replies">
            <div className="replies-connector"></div>
            <div className="replies-comments">
                {t1 && t1.map(comment => {
                    if (comment && comment.author !== "[deleted]") {
                        return <Comment 
                        key={comment.id}
                        id={comment.id} 
                        author={comment.author} 
                        body_html={comment.body_html}
                        depth={comment.depth} 
                        downs={comment.downs} 
                        likes={comment.likes}
                        ups={comment.ups}
                        name={comment.name}
                        replies={getRepliesAmount(comment)}
                        more={comment.replies && comment.replies}/>
                    }
                })}
            </div>
        </section>
    )
}