import React from "react"
import { Form } from "react-router-dom"
import "./Submit.css"
 
interface Props {
    fullname: string,
    setSubmitEvent: React.Dispatch<React.SetStateAction<React.FormEvent<HTMLFormElement>>>
}
export default function Submit ({fullname, setSubmitEvent}: Props) {
    
    return (
        <>
            <Form id="comment-form" role="comment" method="post" className="submit-form" onSubmit={(e) => {
                setSubmitEvent(e);
            }}>
                <input name="comment" id="submit-comment" aria-label="Comment" placeholder="Write a comment..." type="comment" className="submit-input"/>
                <input name="fullname" value={fullname} style={{display: "none"}} readOnly/>
                <button form="comment-form" id="submit" type="submit">Comment</button>
            </Form>
        </>
    )
}