import React from "react"
import { Link } from "react-router-dom"
import { getRandomAvatar } from "../../scripts/custom_hooks/hooks"
import Cover from "../../atoms/Cover/Cover"
import Summary from "../../atoms/Summary/Summary"
import User from "../../atoms/User/User"

import avatar_default_1 from "../../assets/icons/avatar/avatar_default_1.png"
import avatar_default_2 from "../../assets/icons/avatar/avatar_default_2.png"
import avatar_default_3 from "../../assets/icons/avatar/avatar_default_3.png"
import avatar_default_4 from "../../assets/icons/avatar/avatar_default_4.png"
import avatar_default_5 from "../../assets/icons/avatar/avatar_default_5.png"
import avatar_default_6 from "../../assets/icons/avatar/avatar_default_6.png"
import avatar_default_7 from "../../assets/icons/avatar/avatar_default_7.png"

import "./Preview.css"
 
export default function Preview ({payload}) {
    const profile = getRandomAvatar();
    const images = payload.preview && payload.preview.images;
    
    return (
        <article id={images ? "preview-big" : "preview-small"} className="preview">
            <User  subreddit={undefined} author={payload.author} src={profile} />
            <Link to={payload.permalink}>
                <Cover preview={images ? images : null} />
                <Summary  title={payload.title}/>
            </Link>
        </article>
    )
}