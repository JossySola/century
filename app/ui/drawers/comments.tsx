import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Spinner, useDisclosure } from "@heroui/react";
import type { T1 as CommentKind } from "~/utils/types";
import T1 from "../cards/t1";
import { useEffect, useState } from "react";
import { BookOpen } from "../icons";
import { useFetcher } from "react-router";

export default function Comments({ permalink, num_comments }: {
    permalink: string,
    num_comments: number,
}) {
    const fetcher = useFetcher();
    const [comments, setComments] = useState<Array<CommentKind>>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(() => {
        if (num_comments > 0) {
            fetcher.load(`api${permalink}`);
        }
    }, []);
    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data[1] && fetcher.data[1].kind === "Listing") {
                setComments(fetcher.data[1].data.children);
            }
        }
    }, [fetcher.data]);
    return (
        <>
            <Button onPress={onOpen} isDisabled={ num_comments === 0 } size="lg" className="w-full flex flex-row p-2" color="danger">
                <span className="text-lg">Read comments </span>
                <BookOpen width={20} height={20} />
            </Button>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="lg">
                <DrawerContent>
                    {
                        onClose => (
                            <>
                                <DrawerHeader></DrawerHeader>
                                <DrawerBody className="w-full flex flex-col  gap-3">
                                    {
                                        comments && comments.length
                                        ?   comments.map(comment => {
                                                if (comment.kind === "t1") {
                                                return <T1 
                                                key={comment.data.id}
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
                                <DrawerFooter>
                                    <Button onPress={onClose}><span>Close</span></Button>
                                </DrawerFooter>
                            </>
                        )
                    }
                </DrawerContent>
            </Drawer>
        </>
    )
}