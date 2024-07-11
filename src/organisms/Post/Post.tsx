import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import getPostData from "../../scripts/loaders/getPostData"
import Post_Content from "../../molecules/Post_Content/Post_Content"
import Comments from "../../molecules/Comments/Comments"
import { Prop } from "../../molecules/Comments/Comments"
import back_icon from "../../assets/icons/back_icon.svg"
import "./Post.css"

type State = Prop | Array<Prop | Array<Prop>> | object;

export default function Post () {
    const {subreddit, id, title} = useParams();
    const [data, setData] = useState<State | undefined>();
    const [submitEvent, setSubmitEvent] = useState<React.FormEvent<HTMLFormElement> | undefined>();
    const navigate = useNavigate();

    const fullname = data && data[0][0].name;

    useEffect(() => {
        getPostData(subreddit, id, title).then(response => setData(response));
    }, [submitEvent])

    return (
        <article>
            <a onClick={e => {
                e.preventDefault();
                navigate(-1);
            }}><img src={back_icon as unknown as string} alt="Go Back" aria-label="Go Back"/></a>
            
            {
                data && 
                <>
                    <Post_Content t3={data[0][0]}/>
                    <Comments t1={data[1]} t3={true} fullname={fullname} setSubmitEvent={setSubmitEvent} />
                </>
            }
        </article>
    )
}