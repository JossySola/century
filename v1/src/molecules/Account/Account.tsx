import React from "react"
import { AccountOnlyData } from "../../types/types";
import avatar1 from "../../assets/avatar_default_1.png"
import avatar2 from "../../assets/avatar_default_2.png"
import avatar3 from "../../assets/avatar_default_3.png"
import avatar4 from "../../assets/avatar_default_4.png"
import avatar5 from "../../assets/avatar_default_5.png"
import avatar6 from "../../assets/avatar_default_6.png"
import avatar7 from "../../assets/avatar_default_7.png"
import getCachedOrNewImage from "../../profiles.js"
import "./Account.css"

type Props = {payload: AccountOnlyData}
export default function Account ({payload}: Props) {
    const {
        display_name_prefixed,
        icon_img,
        url
    } = payload.subreddit;

    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];

    return (
        <section className="account">
            {
                // EXTERNAL LINK
            }
            <a href={`https://www.reddit.com${url}`} target="_blank">
                {
                    // USER PROFILE IMAGE
                }
                <img src={icon_img.startsWith("https://styles.redditmedia.com") ? getCachedOrNewImage(avatars, display_name_prefixed) : icon_img} className="User-img"/>
                {
                    // USER NAME
                }
                <h4>{display_name_prefixed}</h4>
            </a>
        </section>
    )
}
