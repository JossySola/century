import React from "react"
import Comment from "../../atoms/Comment/Comment"
import "./Replies.css"
 
export default function Replies ({t1}) {
    
    return (
        <section className="replies">
            <div className="replies-connector" style={t1.length === 1 ? {height: "40%"} : {height: "100%"}}></div>
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
                        ups={comment.ups}
                        replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length : 0}
                        more={comment.replies && comment.replies}/>
                    }
                })}
            </div>
        </section>
    )
}