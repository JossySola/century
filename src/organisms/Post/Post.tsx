import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import fetchHandler from "../../cache/hook"
import redditFilter from "../../scripts/redditFilter/redditFilter"

import Post_Content from "../../molecules/Post_Content/Post_Content"
import Comments from "../../molecules/Comments/Comments"

import "./Post.css"

 
export default function Post () {
    const {subreddit, id, title} = useParams();
    const [data, setData] = useState();

    const url = `https://www.reddit.com/r/${subreddit}/comments/${id}/${title}.json`;

    useEffect(() => {
        fetchHandler(url).then(response => setData(redditFilter(response)));
    }, [])
 
    return (
        <article>
            {
                data && 
                <>
                    <Post_Content t3={data[0][0]}/>
                    <Comments t1={data[1][0]} />
                </>
            }
        </article>
    )
}