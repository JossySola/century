import React, { useState } from "react"
import { useProfilePicture, useHTMLText } from "../../scripts/custom_hooks/hooks"
import Replies from "../../molecules/Replies/Replies"
import redditFilter from "../../scripts/redditFilter/redditFilter"
import formatAmount from "../../scripts/amount"
import dislike from "../../assets/icons/dislike.svg"
import like from "../../assets/icons/like.svg"
import plus_icon from "../../assets/icons/plus_icon.svg"
import minus_icon from "../../assets/icons/minus_icon.svg"
import comment_icon from "../../assets/icons/comment_icon.svg"
import { vote } from "../../scripts/voting/voting"
import "./Comment.css"
 
export default function Comment ({author, body_html, id, depth, downs, ups, name, replies, more}) {
    const [showReplies, setShowReplies] = useState(false);
    const [voting, setVoting] = useState("0");
    const profile = useProfilePicture(author);
    body_html && useHTMLText(body_html, id);

    const t1 = redditFilter(more)
    
    return (
        <div className="comment-div">
            <div className="comment" style={depth > 0 ? {margin: "0.5rem"} : undefined}>
                {depth > 0 ? <div className="comment-connector"></div> : null}
                <img src={profile} className="User-img"/>

                <div className="content">
                    <h4>u/{author}</h4>
                    <div id={id}></div>

                    <div className="comment-interactions">
                        <button onClick={e => {
                            e.preventDefault();
                            if (voting === "0" || voting === "-1") {
                                vote(name, "1");
                                setVoting("1")
                            } else {
                                vote(name, "0");
                                setVoting("0")
                            }
                        }}>
                            <img src={like as unknown as string} alt="upvotes" decoding="sync"/> {formatAmount(ups)}
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
                            <img src={dislike as unknown as string} alt="downvotes" decoding="sync"/> {formatAmount(downs)}
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