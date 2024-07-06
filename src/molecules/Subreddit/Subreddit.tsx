import React from "react"
import { useHTMLText } from "../../scripts/custom_hooks/hooks"
import formatAmount from "../../scripts/amount";
import open_tab_white from "../../assets/icons/open_tab_white.svg";
import "./Subreddit.css"
import { Link } from "react-router-dom";
 
export default function Subreddit ({payload}) {
    useHTMLText(payload.public_description_html, payload.id);
    
    return (
        <section className="subreddit">
                <img src={payload.banner_img} className="subreddit-banner" style={{
                    backgroundColor: payload.banner_background_color
                }}/>
                
                <div className="subreddit-identity">
                    <img src={payload.icon_img} className="subreddit-icon" style={{
                        backgroundColor: payload.key_color,
                        borderRadius: "50%",
                        width: 64,
                        height: 64
                    }}/>
                    <h3>{payload.display_name_prefixed}</h3>
                    <a href={`https://www.reddit.com${payload.url}`} target="_blank" className="subreddit-button"><img src={open_tab_white as unknown as string} alt="Open subreddit in another tab" aria-label="Open subreddit in another tab"/></a>
                </div>
                
                <Link to={payload.display_name_prefixed}>
                    <p id={payload.id}></p>
                    <p style={{color: "#656869", textAlign: "center"}}>{formatAmount(payload.subscribers)} members</p>
                </Link>
        </section>
    )
}
