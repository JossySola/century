import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { usePostDataFetcher } from "../../scripts/custom_hooks/hooks";
import { Thing, SVG } from "../../types/types";
import Post_Content from "../../molecules/Post_Content/Post_Content"
import Comments from "../../molecules/Comments/Comments"
import back_icon from "../../assets/icons/back_icon.svg"
import post_loading from "../../assets/icons/loading_post_light.svg";
import spinner from "../../assets/icons/mobile_loading.png";
import "./Post.css"
import { getUserlessAuthorization } from "../../scripts/authorization/authorization";
import { getCurrentUser } from "../../scripts/actions/actions";

export default function Post () {
    const {subreddit, id, title} = useParams<string>();
    const [data, setData] = useState<Thing | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [sortType, setSortType] = useState<"best" | "new" | "top" | "controversial" | "old">("best");
    const navigate = useNavigate();
    const width = window.screen.width;

    const fullname = data && data[0][0].name;
    
    useEffect(() => {
        // Every time the user changes the Sort type for the comments,
        // this hook will run
        if (subreddit && id && title) {
            // Fetches new data for the same post but in a different Sort type
            usePostDataFetcher(subreddit, id, title, sortType).then(response => {
                if (response) {
                    setData(response.JSON);
                    setLoading(false);
                }
            });
        }
    }, [sortType])

    useEffect(() => {
        getCurrentUser().then(response => {
            if (response === undefined || response === null) {
                getUserlessAuthorization();
            } else {
                return;
            }
        })
    }, [])
    
    return (
        <>
            {
                // Go Back button
            }
            <a onClick={e => {
                    e.preventDefault();
                    navigate(-1);
                }}><img src={back_icon as SVG as string} alt="Go Back" aria-label="Go Back"/>
            </a>
            
            {
                // Display spinner if width is <= 600px
            }
            {
                loading && width <= 600 ?
                    <img className="feed-spinner" src={spinner as SVG as string} /> :
                    null
            }
            {
                // Display gray shadow if width is > 600px
            }
            {
                loading && width > 600 ?
                    <img className="post-loading" src={post_loading as SVG as string} /> :
                    null
            }
            {
                // Display 2 components that makes up the whole POST
            }
            <article id="post">
                {
                    data && 
                    <>
                        <Post_Content t3={data[0][0]}/>
                        <Comments t1={data[1]} t3={true} fullname={fullname} sortType={sortType} setSortType={setSortType}/>
                    </>
                }
            </article>
        </>
        
    )
}