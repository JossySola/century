import React from "react"
import fetchHandler from "../../cache/hook"
import "./Preview.css"
 
export default function Preview ({payload}) {
    const profileImage = async () => {
        return await getUserImage(payload.author);
    }
    console.log(profileImage())
    return (
        <article>

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
const getUserImage = async (name: string) => {
    let avatar:string = "";
    try {
        if (name || name !== undefined) {
            const response = await fetchHandler(`https://www.reddit.com/user/${name}/about.json`);
            avatar = response.data.snoovatar_img;
        }
    } catch (e) {
        console.error(e);
    } finally {
        if (avatar) {
            return avatar;
        } else {
            return getRandomAvatar();
        }
    }
}