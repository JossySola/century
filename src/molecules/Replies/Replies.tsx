import React from "react"
import Comment from "../../atoms/Comment/Comment"
import { Prop } from "../Comments/Comments"
import curve from "../../assets/curve.svg"
import rect from "../../assets/rect.svg"
import "./Replies.css"
 
export default function Replies ({t1}) {
    
    const render = () => {
        let load = [];
        for (let i: number = 0; i < t1.length; i++) {
            const comment: Prop = t1[i];
            
            if (comment && comment.author !== "[deleted]") {
                load.push(<Comment 
                    key={comment.id}
                    id={comment.id} 
                    author={comment.author} 
                    body_html={comment.body_html} 
                    downs={comment.downs} 
                    ups={comment.ups}
                    replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length : 0}
                    more={comment.replies && comment.replies} />)
            } else {
                break;
            }
        }
        return load
    }

    return (
        <section className="replies">
            <div className="connector"><img src={curve}/></div>
            {render()}
        </section>
    )
}
