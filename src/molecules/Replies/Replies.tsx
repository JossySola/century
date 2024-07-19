import React from "react"
import Comment from "../../atoms/Comment/Comment"
import { getRepliesAmount } from "../Comments/Comments"
import { CommentOnlyData } from "../../types/types"
import "./Replies.css"

type Props = {t1: Array<CommentOnlyData>}
export default function Replies ({t1}: Props) {
    
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
                        more={comment.replies ? comment.replies : ""}
                        self={false}
                        comments={undefined}
                        setComments={undefined}/>
                    }
                })}
            </div>
        </section>
    )
}