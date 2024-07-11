import React from "react"
import { Link } from "react-router-dom"
import Cover from "../../atoms/Cover/Cover"
import Summary from "../../atoms/Summary/Summary"
import User from "../../atoms/User/User"

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

export const getRandomAvatar = () => {
    const random = Math.floor(Math.random()*7);
    switch (random) {
        case 1:
            return `${process.env['PUBLIC_URL']}/avatar_default_1.png`;
            break;
        case 2:
            return `${process.env['PUBLIC_URL']}/avatar_default_2.png`;
            break;
        case 3:
            return `${process.env['PUBLIC_URL']}/avatar_default_3.png`;
            break;
        case 4:
            return `${process.env['PUBLIC_URL']}/avatar_default_4.png`;
            break;
        case 5:
            return `${process.env['PUBLIC_URL']}/avatar_default_5.png`;
            break;
        case 6:
            return `${process.env['PUBLIC_URL']}/avatar_default_6.png`;
            break;
        case 7:
            return `${process.env['PUBLIC_URL']}/avatar_default_7.png`;
            break;
        default:
            return `${process.env['PUBLIC_URL']}/avatar_default_1.png`;
    }
}