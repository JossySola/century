import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import fetchHandler from "../../cache/hook"
import Cover from "../Cover/Cover"
import Summary from "../Summary/Summary"
import User from "../User/User"
import "./Preview.css"
 
export default function Preview ({payload}) {
    const [profile, setProfile] = useState("");
    useEffect(() => {
        getUserImage(payload.author).then(response => setProfile(response));
    }, [])
    const images = payload.preview && payload.preview.images;

    return (
        <article>
            <User  author={payload.author} src={profile} />
            <Link to={payload.permalink}>
                <Cover preview={images ? images : null} />
                <Summary  title={payload.title}/>
            </Link>
        </article>
    )
}

const getRandomAvatar = () => {
    const random = Math.floor(Math.random()*7);
    switch (random) {
        case 1:
            return "/src/assets/avatar/avatar_default_1.png";
            break;
        case 2:
            return "/src/assets/avatar/avatar_default_2.png";
            break;
        case 3:
            return "/src/assets/avatar/avatar_default_3.png";
            break;
        case 4:
            return "/src/assets/avatar/avatar_default_4.png";
            break;
        case 5:
            return "/src/assets/avatar/avatar_default_5.png";
            break;
        case 6:
            return "/src/assets/avatar/avatar_default_6.png";
            break;
        case 7:
            return "/src/assets/avatar/avatar_default_7.png";
            break;
        default:
            return "/src/assets/avatar/avatar_default_1.png";
    }
}
const getUserImage = async (name: string): Promise<string> => {
    let avatar:string = "";
    try {
        if (name || name !== undefined) {
            const response = await fetchHandler(`https://www.reddit.com/user/${name}/about.json`);
            if (response.data) avatar = response.data.snoovatar_img; 
        }
    } finally {
        if (avatar) {
            return avatar;
        } else {
            return getRandomAvatar();
        }
    }
}