import React, { useState } from "react"
import { useProfilePicture, useHTMLText } from "../../scripts/custom_hooks/hooks"
import Replies from "../../molecules/Replies/Replies"
import redditFilter from "../../scripts/redditFilter/redditFilter"
import formatAmount from "../../scripts/amount"
import dislike from "../../assets/icons/dislike.svg"
import disliked from "../../assets/icons/disliked.svg"
import like from "../../assets/icons/like.svg"
import liked from "../../assets/icons/liked.svg"
import plus_icon from "../../assets/icons/plus_icon.svg"
import minus_icon from "../../assets/icons/minus_icon.svg"
import comment_icon from "../../assets/icons/comment_icon.svg"
import { vote } from "../../scripts/voting/voting"
import avatar1 from "../../assets/avatar_default_1.png"
import avatar2 from "../../assets/avatar_default_2.png"
import avatar3 from "../../assets/avatar_default_3.png"
import avatar4 from "../../assets/avatar_default_4.png"
import avatar5 from "../../assets/avatar_default_5.png"
import avatar6 from "../../assets/avatar_default_6.png"
import avatar7 from "../../assets/avatar_default_7.png"
import "./Comment.css"
 
export default function Comment ({author, body_html, id, depth, downs, ups, likes, name, replies, more}) {
    const [showReplies, setShowReplies] = useState(false);
    const [voting, setVoting] = useState(likes === true ? "1" : "0");
    const profile = useProfilePicture(author);
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7];
    const randomIndex = Math.floor(Math.random() * avatars.length -1);
    const imagePath = avatars[randomIndex];

    body_html && useHTMLText(body_html, id);

    const t1 = redditFilter(more);
    
    return (
        <div className="comment-div">
            <div className="comment" style={depth > 0 ? {margin: "0.5rem"} : undefined}>
                {depth > 0 ? <div className="comment-connector"></div> : null}

                {
                    profile ? 
                        <img src={profile} className="User-img"/> : 
                        <img src={imagePath} className="User-img"/>
                }

                <div className="content">
                    <h4>u/{author}</h4>
                    <div id={id}></div>

                    <div className="comment-interactions">
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
                            <img src={voting === "1" ? liked as unknown as string : like as unknown as string} alt="upvotes" decoding="sync"/><span>{formatAmount(ups)}</span>
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
                            <img src={voting === "-1" ? disliked as unknown as string : dislike as unknown as string} alt="downvotes" decoding="sync"/><span>{formatAmount(downs)}</span>
                        </button>

                        <button>
                            <img src={comment_icon as unknown as string} alt="comments" decoding="sync"/> {formatAmount(replies)}
                        </button>

                        { replies !== 0 && t1 && 
                            <a onClick={e => {
                                e.preventDefault();
                                showReplies ? setShowReplies(false) : setShowReplies(true);
                                }}><img src={showReplies ? minus_icon as unknown as string : plus_icon as unknown as string} 
                                    alt="load replies" 
                                    decoding="sync" 
                                    style={{width: 20, height: 20}}/>
                            </a>
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