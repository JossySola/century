import React, { useEffect, useState } from "react"
import Comment from "../../atoms/Comment/Comment"
import Submit from "../../atoms/Submit/Submit"
import loading from "../../assets/icons/loading_dots.svg"
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
    likes: boolean | null,
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
    t1: Array<Prop>,
    t3?: boolean,
    fullname: string | undefined,
    setSubmitEvent: React.Dispatch<React.SetStateAction<React.FormEvent<HTMLFormElement>>>
}
type stateArray = Array<React.JSX.Element>;

export default function Comments ({t1, t3, fullname, setSubmitEvent}: Props) {
    const [comments, setComments] = useState<stateArray>([]);

    t1.sort((a, b) => {
        if (a.created_utc < b.created_utc) {
            return 1;
        } else if (a.created_utc > b.created_utc) {
            return -1;
        }
        return 0;
    })
    
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
                    likes={comment.likes}
                    name={comment.name}
                    replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length : 0}
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
            <section  id="comments-section" onScroll={() => handleInfiniteScroll(t1, comments, setComments)}>
                {comments}
                {
                    comments.length !== t1.length ? <img src={loading as unknown as string} className="comments-loading"/> : null
                }
            </section>
            {t3 && fullname && <Submit fullname={fullname} setSubmitEvent={setSubmitEvent}/>}
        </>
    )
}

const handleInfiniteScroll = (array: Array<Prop>, comments: stateArray, setComments: React.Dispatch<React.SetStateAction<stateArray>>) => {
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
                    likes={comment.likes} 
                    name={comment.name}
                    ups={comment.ups}
                    replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length : 0}
                    more={comment.replies && comment.replies} />)
            } else {
                break;
            }
        }
        return setComments(comments.concat(addArray));
    }
}