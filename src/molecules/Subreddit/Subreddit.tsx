import React from "react"
import { useHTMLText } from "../../scripts/custom_hooks/hooks"
import { SubredditOnlyData } from "../../types/types";
import formatAmount from "../../scripts/amount";
import open_tab_white from "../../assets/icons/open_tab_white.svg";
import "./Subreddit.css"
import { Link } from "react-router-dom";

type Props = {payload: SubredditOnlyData}
export default function Subreddit ({payload}: Props) {
    useHTMLText(payload.public_description_html, payload.id);
    
    return (
        <section className="subreddit">
                {
                    // Renders a banner if the Subreddit community has a banner image
                }
                <img src={payload.banner_img} className="subreddit-banner" style={{
                    backgroundColor: payload.banner_background_color
                }}/>
                
                {
                    // Render the Subreddit community's profile image, name, and a link to their Reddit page
                }
                <div className="subreddit-identity" style={payload.banner_img ? {justifyContent: "center"} : {justifyContent: "left"}}>
                    {payload.icon_img && <img src={payload.icon_img} className="subreddit-icon" style={{
                        backgroundColor: payload.key_color,
                        borderRadius: "50%",
                        width: 64,
                        height: 64
                    }}/>}
                    <h3>{payload.display_name_prefixed}</h3>
                    <a href={`https://www.reddit.com${payload.url}`} target="_blank" className="subreddit-button"><img src={open_tab_white as unknown as string} alt="Open subreddit in another tab" aria-label="Open subreddit in another tab"/></a>
                </div>
                
                {
                    // Renders a link to a dynamic React route. Displays the Subreddit's description and the amount of members
                }
                <Link to={payload.display_name_prefixed}>
                    <p id={payload.id}></p>
                    <p style={{color: "#656869", textAlign: "center"}}>{formatAmount(payload.subscribers)} members</p>
                </Link>
        </section>
    )
}
