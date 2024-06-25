import React from "react"
import { useHTMLText } from "../../scripts/custom_hooks/hooks"
import "./Subreddit.css"
 
export default function Subreddit ({payload}) {
    useHTMLText(payload.public_description_html, payload.id);
    
    return (
        <section>
            <a href={`https://www.reddit.com${payload.url}`} target="_blank">
                <img src={payload.banner_img} style={{
                    backgroundColor: payload.banner_background_color
                }}/>
                <img src={payload.icon_img} style={{
                    backgroundColor: payload.key_color,
                    borderRadius: "50%",
                    width: 64
                }}/>
                <h3>{payload.header_title}</h3>
                
                
                <p id={payload.id}></p>
                <p>{payload.subscribers} members</p>
            </a>
        </section>
    )
}
