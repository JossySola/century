import React, { useEffect, useRef, useState } from "react"
import Comment from "../../atoms/Comment/Comment"
import Submit from "../../atoms/Submit/Submit"
import loading_dots from "../../assets/icons/loading_dots.svg"
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
    const scrollPositionRef = useRef(0);
    const containerRef = useRef(null);
    const [comments, setComments] = useState<stateArray>([]);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false);
    
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
                    replies={getRepliesAmount(comment)}
                    more={comment.replies && comment.replies}
                    setTrigger={setTrigger}
                    trigger={trigger}/>
                )
                } else {
                break;
            }
        }
        setComments(firstLoad);
    }, [t1, trigger])

    useEffect(() => {
        // Preserve scroll position
        if (!loading) {
            restoreScrollPosition();
        }
    }, [comments, loading])

    const saveScrollPosition = () => {
        if (containerRef.current) {
            scrollPositionRef.current = containerRef.current.scrollTop;
        }
    }
    const restoreScrollPosition = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = scrollPositionRef.current;
        }
    }
    const loadMoreData = () => {
        setLoading(true);
        saveScrollPosition();
        const section = document.getElementById("comments-section");
        let numberOfNodes = section ? section.children.length: 0;
        let addArray: stateArray = [];

        for (let i: number = 1; i < 6; i++) {
            const index: number = i + numberOfNodes;
            const comment: Prop = t1[index];

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
                    replies={getRepliesAmount(comment)}
                    more={comment.replies && comment.replies} />)
            } else {
                break;
            }
        }
        setComments(comments.concat(addArray));
        setLoading(false);
    }
    const handleInfiniteScroll = () => {
        if (containerRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
            const scroll = (scrollTop * -1) + clientHeight;
            const height = scrollHeight -1;
            if (scroll >= height) {
                loadMoreData();
            }
        }
    }
    
    return (
        <>
            {
                loggedIn ? <div id="comments-sort">
                                <label>Sort by:</label>
                                <select name="sorting" id="comments-selection" defaultValue={sortType} aria-label="Select how the comments are sorted" onChange={() => {
                                    const select = document.getElementById("comments-selection");
                                    if (select) {
                                        setComments([]);
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
                <section  ref={containerRef} id="comments-section" onScroll={() => handleInfiniteScroll()}>
                    {
                        loading || !comments ? <img src={loading_dots as unknown as string} className="comments-loading"/> : comments
                    }
                    
                    {
                        comments && comments.length !== t1.length ? <img src={loading_dots as unknown as string} className="comments-loading"/> : null
                    }
                </section>
            </div>
            
            {t3 && fullname && <Submit fullname={fullname} setSortType={setSortType} trigger={trigger} setTrigger={setTrigger}/>}
        </>
    )
}

export const getRepliesAmount = (comment) => {
    if (comment && comment.replies !== "") {
        const children = comment.replies.data.children;
        const isString = typeof comment.replies === "string";
        const isEmpty = children.length === 0 ? true : false;
        const isKindMore = children[0].kind === "more" ? true : false;
        let amount = 0;

        if (!isString || !isEmpty) {
            if (isKindMore) {
                return 0;
            }
            if (children !== undefined) {
                children.map(child => {
                    if (child.kind !== "more") {
                        amount++;
                    } else {
                        return;
                    }
                })
                return amount;
            }
            return amount;
        } else {
            return 0;
        }
    }
    return 0;
}