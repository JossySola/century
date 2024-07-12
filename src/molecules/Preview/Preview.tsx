import React from "react"
import { Link } from "react-router-dom"
import Cover from "../../atoms/Cover/Cover"
import Summary from "../../atoms/Summary/Summary"
import User from "../../atoms/User/User"
import "./Preview.css"
 
export default function Preview ({payload}) {
    const images = payload.preview && payload.preview.images;
    
    return (
        <article id={images ? "preview-big" : "preview-small"} className="preview">
            <User  subreddit={undefined} author={payload.author} preview={true}/>
            <Link to={payload.permalink}>
                <Cover preview={images ? images : null}/>
                <Summary  title={payload.title}/>
            </Link>
        </article>
    )
}