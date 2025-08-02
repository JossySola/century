import React from "react"
import { Link } from "react-router";
import { LinkOnlyData } from "../../types/types"
import Cover from "../../atoms/Cover/Cover"
import Summary from "../../atoms/Summary/Summary"
import User from "../../atoms/User/User"
import "./Preview.css"

type Props = {payload: LinkOnlyData}
export default function Preview ({payload}: Props) {
    const images = payload.preview && payload.preview["images"];
    
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