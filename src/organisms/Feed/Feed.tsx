import React from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { SVG, FeedLoader } from "../../types/types";
import Preview from "../../molecules/Preview/Preview";
import Account from "../../molecules/Account/Account";
import Subreddit from "../../molecules/Subreddit/Subreddit";
import back_icon from "../../assets/icons/back_icon.svg";
import loading from "../../assets/icons/loading_feed_light.svg";
import spinner from "../../assets/icons/mobile_loading.png";
import "./Feed.css";

export default function Feed () {
    const data = useLoaderData() as FeedLoader;
    const navigate = useNavigate();
    const navigation = useNavigation();
    const width = window.screen.width;
    
    return (
        <>
            {
                // If the width of the screen is < 600px, use the Spinner icon for loading, otherwise, the gray shadow
                width <= 600 ? 
                <div className="feed-spinner" style={navigation.state === "loading" ? {display: ""} : {display: "none"}}>
                    <img src={spinner as SVG as string} />
                </div> : 
                <div style={navigation.state === "loading" ? {display: ""} : {display: "none"}}>
                    <img className="feed-loading" src={loading as SVG as string} />
                </div>
            }
            
            <main id="feed" style={navigation.state === "loading" ? {display: "none"} : {display: ""}}>
                {data.error && <span style={{color: "rgb(252, 71, 46)"}}>Authorizing the Web App to connect to Reddit is required to Search.</span>}
                {   
                    /* When the user searches something, the loader will return: elements and pathname as properties
                       This will display a "Back" button to navigate back as well as a header to display the name of
                       the Subreddit
                    */
                }
                {data.pathname && 
                    <header>
                        <a onClick={e => {
                            e.preventDefault();
                            navigate(-1);
                        }} style={{gridArea: "back"}}><img src={back_icon as SVG as string} alt="Go Back" aria-label="Go Back"/></a>
                        <h2 style={{gridArea: "subreddit"}}>{data.pathname}</h2>
                    </header>
                }
                {
                    // Maps through the elements and according to their "kind", it returns either a Preview, Subreddit or Account
                }
                {
                    data.elements && data.elements.map((element) => {
                        if (element.kind === "t3" as "t3") {
                            if (element.author !== "[deleted]") {
                                return <Preview payload={element} key={element.id}/>
                            }
                        }
                        if (element.kind === "t5" as "t5") {
                            return <Subreddit payload={element} key={element.id} />
                        }
                        if (element.kind === "t2" as "t2") {
                            if (!element.is_blocked) {
                                return <Account payload={element} key={element.id} />
                            }
                        }
                    })
                }
            </main>
        </>
    )
}
