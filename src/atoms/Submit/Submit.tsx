import React from "react"
import { Form } from "react-router-dom"
import "./Submit.css"
 
export default function Submit ({fullname}) {
    
    return (
        <Form id="comment-form" role="comment" method="post" className="submit-form">
            <input name="comment" id="submit-comment" aria-label="Comment" placeholder="Write a comment..." type="comment" className="submit-input"/>
            <input name="fullname" value={fullname} readOnly style={{display: "none"}} />
            <button form="comment-form" type="submit">Comment</button>
        </Form>
    )
}
