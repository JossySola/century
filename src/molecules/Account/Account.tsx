import React from "react"
import { AccountOnlyData } from "../../types/types";
import "./Account.css"

type Props = {payload: AccountOnlyData}
export default function Account ({payload}: Props) {
    const {
        display_name_prefixed,
        icon_img,
        url
    } = payload.subreddit;

    return (
        <section className="account">
            {
                // EXTERNAL LINK
            }
            <a href={`https://www.reddit.com${url}`} target="_blank">
                {
                    // USER PROFILE IMAGE
                }
                <img src={icon_img} className="User-img"/>
                {
                    // USER NAME
                }
                <h4>{display_name_prefixed}</h4>
            </a>
        </section>
    )
}
