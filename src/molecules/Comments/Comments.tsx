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
    sortType: "best" | "new" | "top" | "controversial" | "old",
    setSortType: React.Dispatch<React.SetStateAction<string>>,
    loggedIn: boolean
}
type stateArray = Array<React.JSX.Element>;

export default function Comments ({t1, t3, fullname, sortType, setSortType, loggedIn}: Props) {
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
            {
                loggedIn ? <div id="comments-sort">
                                <label>Sort by:</label>
                                <select name="sorting" id="comments-selection" defaultValue={sortType} aria-label="Select how the comments are sorted" onChange={() => {
                                    const select = document.getElementById("comments-selection");
                                    if (select) {
                                        setSortType(select.value);
                                    }
                                }}>
                                    <option value="best">Best</option>
                                    <option value="new">New</option>
                                    <option value="top"> Top</option>
                                    <option value="controversial">Controversial</option>
                                    <option value="old">Old</option>
                                </select>
                            </div> 
                : null
            }
            
            <div id="comments-wrapper">
                <section  id="comments-section" onScroll={() => handleInfiniteScroll(t1, comments, setComments)}>
                    
                    
                    {comments}
                    {
                        comments.length !== t1.length ? <img src={loading as unknown as string} className="comments-loading"/> : null
                    }
                </section>
            </div>
            
            {t3 && fullname && <Submit fullname={fullname} setSortType={setSortType}/>}
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