import React, { useEffect, useState } from "react"
import Comment from "../../atoms/Comment/Comment"
import "./Comments.css"

interface Prop {
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
type stateArray = Array<React.JSX.Element>;

export default function Comments ({t1}) {
    const [comments, setComments] = useState<stateArray>([]);

    useEffect(() => {
        let firstLoad: Array<React.JSX.Element> = [];

        for (let i: number = 0; i < 5; i++) {
                const comment: Prop = t1[i];
                if (comment) {
                    firstLoad.push(<Comment 
                        key={comment.id}
                        id={comment.id} 
                        author={comment.author} 
                        body_html={comment.body_html} 
                        downs={comment.downs} 
                        ups={comment.ups}
                        replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length-1 : 0}/>)
                } else {
                    break;
                }
        }
        setComments(firstLoad);
    }, [])
    
    
    return (
        <section id="comments-section" onScroll={() => handleInfiniteScroll(t1, comments, setComments)}>
            {comments}
        </section>
    )
}

const handleInfiniteScroll = (array: Array<Prop>, comments: stateArray, setComments: React.Dispatch<React.SetStateAction<stateArray>>) => {
    const section = document.getElementById("comments-section");
    const currentPos = section && section.scrollHeight ? section.offsetHeight - section.scrollTop : 0;
    const scrollHeight = section ? section.scrollHeight : 0;
    let numberOfNodes = section ? section.children.length: 0;

    

    if (currentPos === scrollHeight + 16) {
        let addArray: stateArray = [];

        for (let i: number = 1; i < 6; i++) {
            const index: number = i + numberOfNodes;
            const comment: Prop = array[index];

            if (comment) {
                addArray.push(<Comment 
                    key={comment.id}
                    id={comment.id} 
                    author={comment.author} 
                    body_html={comment.body_html} 
                    downs={comment.downs} 
                    ups={comment.ups}
                    replies={typeof comment.replies !== "string" && comment.replies.data.children.length > 0 ? comment.replies.data.children.length-1 : 0}/>)
            } else {
                break;
            }
        }
        return setComments(comments.concat(addArray));
    }
}