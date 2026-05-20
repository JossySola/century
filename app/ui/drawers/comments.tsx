import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from "@heroui/react";
import type { T1 as CommentKind } from "~/utils/types";
import T1 from "../cards/t1";
import { useEffect, useState } from "react";
import Chat from '@react-spectrum/s2/icons/Chat';
import { useFetcher } from "react-router";
import PostComment from "../inputs/post-comment";

export default function Comments({ permalink, num_comments, id }: {
    permalink: string,
    num_comments: number,
    id: string,
}) {
    const fetcher = useFetcher();
    const [comments, setComments] = useState<Array<CommentKind>>([]);
    const [postedComments, setPostedComments] = useState<Array<CommentKind>>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const isT1 = (value: unknown): value is CommentKind => {
        return typeof value === "object" && value !== null && (value as CommentKind).kind === "t1";
    };

    useEffect(() => {
        // If the post is supposed to have comments, fetch the comments via API endpoint
        if (num_comments > 0) {
            fetcher.load(`api${permalink}`);
        }
    }, []);
    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data[1] && fetcher.data[1].kind === "Listing") {
                const loaded: Array<CommentKind> = fetcher.data[1].data.children.filter(isT1);
                setComments(loaded);
                setPostedComments((prev) =>
                    prev.filter(
                        (posted) => !loaded.some((serverComment) => serverComment.data.name === posted.data.name)
                    )
                );
            }
        }
    }, [fetcher.data]);
    const handleNewComment = (comment: CommentKind) => {
        setPostedComments((prev) => {
            const exists = prev.some((entry) => {
                if (entry.data.name) return entry.data.name === comment.data.name;
                return false;
            });
            if (exists) return prev;
            return [comment, ...prev];
        });
    };
    const visibleComments = [...postedComments, ...comments];
    return (
        <>
            <Button onPress={onOpen} isDisabled={ num_comments === 0 } size="lg" className="w-full flex flex-row p-2" color="danger">
                <span className="text-lg">Read comments </span>
                <Chat UNSAFE_style={{"--iconPrimary": "#fff", "width": "25px"} as React.CSSProperties} />
            </Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="lg">
                <DrawerContent>
                    {
                        onClose => (
                            <>
                                <DrawerHeader></DrawerHeader>
                                <DrawerBody className="w-full flex flex-col  gap-3">
                                    {
                                        visibleComments && visibleComments.length
                                        ?   visibleComments.map(comment => {
                                                if (comment.kind === "t1") {
                                                return <T1 
                                                key={comment.data.name}
                                                author={comment.data.author}
                                                author_fullname={comment.data.author_fullname}
                                                body={comment.data.body}
                                                body_html={comment.data.body_html}
                                                created_utc={comment.data.created_utc}
                                                depth={comment.data.depth}
                                                downs={comment.data.downs}
                                                likes={comment.data.likes}
                                                is_submitter={comment.data.is_submitter}
                                                link_id={comment.data.link_id}
                                                name={comment.data.name}
                                                replies={comment.data.replies}
                                                send_replies={comment.data.send_replies}
                                                subreddit_id={comment.data.subreddit_id}
                                                ups={comment.data.ups} />
                                            }
                                        })
                                        : null
                                    }
                                </DrawerBody>
                                <DrawerFooter className="flex flex-col">
                                    <PostComment id={id} handleNewComment={handleNewComment} />
                                    <Button onPress={onClose} className="w-fit"><span>Close</span></Button>
                                </DrawerFooter>
                            </>
                        )
                    }
                </DrawerContent>
            </Drawer>
        </>
    )
}
