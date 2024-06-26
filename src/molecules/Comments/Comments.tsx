import React, { useEffect, useState } from "react"
import Comment from "../../atoms/Comment/Comment"
import Submit from "../../atoms/Submit/Submit"
import "./Comments.css"

export interface Prop {
    author: string,
    author_fullname: string,
    body_html: string,
    created_utc: number,
    depth: number,
    downs: number,
    id: string,
    link_id: string,
    name: string,
    parent_id: string,
    replies: {
        data: {
            children: Array<object>
        }
    } | string,
    send_replies: boolean,
    ups: number
}
interface Props {
    t1: Prop,
    t3?: boolean,
    fullname: string | undefined,
}
type stateArray = Array<React.JSX.Element>;

export default function Comments ({t1, t3, fullname}: Props) {
    const [comments, setComments] = useState<stateArray>([]);

    useEffect(() => {
        let firstLoad: stateArray = [];

        for (let i: number = 0; i < 5; i++) {
            const comment: Prop = t1[i];
            
            if (comment && comment.author !== "[deleted]") {
                firstLoad.push(
                    <Comment 
                    key={comment.id}
                    id={comment.id} 
                    author={comment.author} 
                    body_html={comment.body_html}
                    depth={comment.depth} 
                    downs={comment.downs} 
                    ups={comment.ups}
                    replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length -1 : 0}
                    more={comment.replies && comment.replies}/>
                )
                } else {
                break;
            }
        }
        setComments(firstLoad);
    }, [])

    return (
        <>
            <section id="comments-section" onScroll={() => handleInfiniteScroll(t1, comments, setComments)}>
                {comments}
            </section>
            {t3 && fullname && <Submit fullname={fullname}/>}
        </>
    )
}

const handleInfiniteScroll = (array: Prop, comments: stateArray, setComments: React.Dispatch<React.SetStateAction<stateArray>>) => {
    const section = document.getElementById("comments-section");
    const currentPos = section && section.scrollHeight ? section.offsetHeight - section.scrollTop : 0;
    const scrollHeight = section ? section.scrollHeight : 0;
    let numberOfNodes = section ? section.children.length: 0;
    
    if (currentPos === scrollHeight + 25) {
        
        let addArray: stateArray = [];

        for (let i: number = 1; i < 6; i++) {
            const index: number = i + numberOfNodes;
            const comment: Prop = array[index];

            if (comment && comment.author !== "[deleted]") {
                addArray.push(<Comment 
                    key={comment.id}
                    id={comment.id} 
                    author={comment.author} 
                    body_html={comment.body_html}
                    depth={comment.depth}  
                    downs={comment.downs} 
                    ups={comment.ups}
                    replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length-1 : 0}
                    more={comment.replies && comment.replies} />)
            } else {
                break;
            }
        }
        return setComments(comments.concat(addArray));
    }
}