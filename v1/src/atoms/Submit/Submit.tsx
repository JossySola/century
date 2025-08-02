import React, { useEffect, useState } from "react"
import { Form } from "react-router";
import { getCurrentUser } from "../../scripts/actions/actions"
import Comment from "../../atoms/Comment/Comment"
import "./Submit.css"
import getAuthorization from "../../scripts/authorization/authorization"
 
interface Props {
    fullname: string,
    setComments: React.Dispatch<React.SetStateAction<Array<Element | React.JSX.Element>>>,
    comments: Array<Element | React.JSX.Element>
}
export default function Submit ({fullname, setComments, comments}: Props) {
    const [me, setMe] = useState<string>("");

    useEffect(() => {
        // The function implementation uses the /api/me.json endpoint
        // to retrieve the current logged in user data and returns
        // their name as a string
        getCurrentUser().then(response => {
            if (response) {
                // If successful, use the hook and set the response, which is the user's name
                setMe(response);
            }
        })
    }, [])
    
    return (
        <>
            <Form id="comment-form" role="comment" method="post" className="submit-form" onSubmit={ (e) => {
                    // If User submits the Form, a <Comment> component is created
                    // Then using the React hook "setComments", the new component
                    // is added to the comments array
                    const comment = <Comment 
                    author={me}
                    body_html={e.target[0].value}
                    id={fullname}
                    key={fullname}
                    depth={0}
                    downs={0}
                    ups={1}
                    likes={true}
                    name={fullname}
                    replies={0}
                    self={true}
                    comments={comments}
                    more=""
                    setComments={setComments}/>;
                    
                    if (me) {
                        setComments((prev) => [comment, ...prev])
                    } else {
                        getAuthorization();
                    }
                    
                }}>
                {
                    // Field where the user can type a comment
                }
                <input name="comment" id="submit-comment" aria-label="Comment" placeholder="Write a comment..." type="comment" className="submit-input"/>
                {
                    // Field saving the id (fullname) of the parent where we are submitting to
                    // This field is not visible to the user and will be added to the
                    // submitted form
                }
                <input name="fullname" value={fullname} style={{display: "none"}} readOnly/>
                {
                    // Button to submit the form
                }
                <button form="comment-form" id="submit" type="submit">Comment</button>
            </Form>
        </>
    )
}