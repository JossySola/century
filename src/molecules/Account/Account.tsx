import React from "react"
import "./Account.css"
 
export default function Account ({payload}) {
    const {
        display_name_prefixed,
        icon_img,
        url
    } = payload.subreddit;

    return (
        <section>
            <a href={`https://www.reddit.com${url}`} target="_blank">
                <img src={icon_img} className="User-img"/>
                <h4>{display_name_prefixed}</h4>
            </a>
        </section>
    )
}
