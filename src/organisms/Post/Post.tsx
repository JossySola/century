import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { usePostDataFetcher } from "../../scripts/custom_hooks/hooks";
import { Thing } from "../../types/types";
import Post_Content from "../../molecules/Post_Content/Post_Content"
import Comments from "../../molecules/Comments/Comments"
import back_icon from "../../assets/icons/back_icon.svg"
import post_loading from "../../assets/icons/loading_post_light.svg";
import "./Post.css"

export default function Post () {
    const {subreddit, id, title} = useParams<string>();
    const [data, setData] = useState<Thing | undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [sortType, setSortType] = useState<"best" | "new" | "top" | "controversial" | "old">("best");
    const navigate = useNavigate();

    const fullname = data && data[0][0].name;
    
    useEffect(() => {
        // Every time the user changes the Sort type for the comments,
        // this hook will run
        if (subreddit && id && title) {
            // Fetches new data for the same post but in a different Sort type
            usePostDataFetcher(subreddit, id, title, sortType).then(response => {
                if (response) {
                    setData(response.JSON);
                    setLoggedIn(response.loggedIn);
                    setLoading(false);
                }
            });
        }
    }, [sortType])
    
    return (
        <>
            <a onClick={e => {
                    e.preventDefault();
                    navigate(-1);
                }}><img src={back_icon as unknown as string} alt="Go Back" aria-label="Go Back"/>
            </a>
            
            {
                loading ?
                    <img className="post-loading" src={post_loading as unknown as string} />
                : null
            }

            <article id="post">
                {
                    data && 
                    <>
                        <Post_Content t3={data[0][0]}/>
                        <Comments t1={data[1]} t3={true} fullname={fullname} sortType={sortType} setSortType={setSortType} loggedIn={loggedIn}/>
                    </>
                }
            </article>
        </>
        
    )
}