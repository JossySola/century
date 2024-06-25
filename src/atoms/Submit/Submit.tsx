import React from "react"
import { Form } from "react-router-dom"
import "./Submit.css"
 
export default function Submit ({fullname}) {
 
    return (
        <Form id="comment-form" role="comment">
            <input name="comment" id="submit-comment" aria-label="Comment" placeholder="Write a comment..." type="comment"></input>
            <input form="comment-form" type="submit">Submit</input>
        </Form>
    )
}
