import React, { useState } from "react"
import { useProfilePicture, useHTMLText } from "../../scripts/custom_hooks/hooks"
import Replies from "../../molecules/Replies/Replies"
import redditFilter from "../../scripts/redditFilter/redditFilter"
import formatAmount from "../../scripts/amount"
import { vote } from "../../scripts/voting/voting"
import { del } from "../../scripts/comment/comment"
import { Listing, SVG } from "../../types/types"

import dislike from "../../assets/icons/dislike.svg"
import disliked from "../../assets/icons/disliked.svg"
import like from "../../assets/icons/like.svg"
import liked from "../../assets/icons/liked.svg"
import plus_icon from "../../assets/icons/plus_icon.svg"
import minus_icon from "../../assets/icons/minus_icon.svg"
import comment_icon from "../../assets/icons/comment_icon.svg"
import bin from "../../assets/icons/bin.svg"
import avatar1 from "../../assets/avatar_default_1.png"
import avatar2 from "../../assets/avatar_default_2.png"
import avatar3 from "../../assets/avatar_default_3.png"
import avatar4 from "../../assets/avatar_default_4.png"
import avatar5 from "../../assets/avatar_default_5.png"
import avatar6 from "../../assets/avatar_default_6.png"
import avatar7 from "../../assets/avatar_default_7.png"

import getCachedOrNewImage from "../../profiles.js"

import "./Comment.css"
 
interface Props {
    author: string,
    body_html: string,
    id: string,
    depth: number,
    downs: number,
    ups: number,
    likes: boolean | null,
    name: string,
    replies: number,
    more: Listing | string,
    self: boolean,
    comments: Array<Element | React.JSX.Element> | undefined,
    setComments: React.Dispatch<React.SetStateAction<Array<Element | React.JSX.Element>>> | undefined
}
export default function Comment ({
    author, 
    body_html, 
    id, 
    depth, 
    downs, 
    ups, 
    likes, 
    name, 
    replies, 
    more,
    self,
    comments,
    setComments}: Props) {
    const [showReplies, setShowReplies] = useState(false);
    const [voting, setVoting] = useState(likes === true ? "1" : "0");
    const profile = useProfilePicture(author, false);
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];

    body_html && useHTMLText(body_html, id);

    const t1 = more && typeof more !== "string" ? redditFilter(more) : null;

    return (
        <div className="comment-div">
            <div className="comment" style={depth > 0 ? {margin: "0.5rem"} : undefined}>
                {depth > 0 ? <div className="comment-connector"></div> : null}

                {
                    profile ? 
                        <img src={profile} className="User-img"/> : 
                        <img src={getCachedOrNewImage(avatars, author)} className="User-img"/>
                }

                <div className="content">
                    <h4>u/{author}</h4>
                    <div id={id}></div>

                    <div className="comment-interactions">
                        <div className="interactions-left">
                            <button onClick={e => {
                                e.preventDefault();
                                if (voting === "0" || voting === "-1") {
                                    vote(name, "1");
                                    setVoting("1");
                                    ups++;
                                } else {
                                    vote(name, "0");
                                    setVoting("0");
                                    ups--;
                                }
                            }}>
                                <img src={voting === "1" ? liked as SVG as string : like as SVG as string} alt="upvotes" decoding="sync"/><span>{formatAmount(ups)}</span>
                            </button>
                            
                            <button onClick={e => {
                                e.preventDefault();
                                if (voting === "0" || voting === "1") {
                                    vote(name, "-1");
                                    setVoting("-1");
                                } else {
                                    vote(name, "0");
                                    setVoting("0");
                                }
                            }}>
                                <img src={voting === "-1" ? disliked as SVG as string : dislike as SVG as string} alt="downvotes" decoding="sync"/><span>{formatAmount(downs)}</span>
                            </button>

                            <button>
                                <img src={comment_icon as SVG as string} alt="comments" decoding="sync"/> {formatAmount(replies)}
                            </button>

                            { replies !== 0 && t1 && t1[0] !== undefined && 
                                <a onClick={e => {
                                    e.preventDefault();
                                    showReplies ? setShowReplies(false) : setShowReplies(true);
                                    }}><img src={showReplies ? minus_icon as SVG as string : plus_icon as SVG as string} 
                                        alt="load replies" 
                                        decoding="sync" 
                                        style={{width: 20, height: 20}}/>
                                </a>
                            }
                        </div>
                        {
                            self && comments !== undefined && setComments !== undefined ? 
                            <div className="interactions-right" style={{margin: "1rem"}}>
                                <button type="button" onClick={(e) => {
                                    e.preventDefault();
                                    del(name);
                                    /*
                                    const newArr = comments.filter((comment) => {
                                        console.log(comment)
                                        return comment.key !== id
                                    });
                                    setComments(newArr)
                                    */
                                }}><img src={bin as SVG as string}  alt="delete comment"/></button>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
            {
                showReplies && t1 ? <Replies t1={t1}/> : null
            }
        </div>
    )
}