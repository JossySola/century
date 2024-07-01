import React from "react"
import { useHTMLText } from "../../scripts/custom_hooks/hooks"
import formatAmount from "../../scripts/amount";
import "./Subreddit.css"
 
export default function Subreddit ({payload}) {
    useHTMLText(payload.public_description_html, payload.id);
    
    return (
        <section className="subreddit">
            <a href={`https://www.reddit.com${payload.url}`} target="_blank">
                <img src={payload.banner_img} className="subreddit-banner" style={{
                    backgroundColor: payload.banner_background_color
                }}/>
                
                <div className="subreddit-identity">
                    <img src={payload.icon_img} className="subreddit-icon" style={{
                        backgroundColor: payload.key_color,
                        borderRadius: "50%",
                        width: 64
                    }}/>
                    <h3>{payload.display_name_prefixed}</h3>
                </div>
                
                <p id={payload.id}></p>
                <p style={{color: "#656869", textAlign: "center"}}>{formatAmount(payload.subscribers)} members</p>
            </a>
        </section>
    )
}
