import { addToast, BreadcrumbItem, Breadcrumbs, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Spinner, useDisclosure } from "@heroui/react";
import type { T1 as CommentKind, Listing, More, Thing } from "~/utils/types";
import T1 from "../cards/t1";
import React, { useEffect, useState } from "react";
import { BookOpen } from "../icons";
import { useFetcher } from "react-router";

export default function Comments({ permalink, num_comments }: {
    permalink: string,
    num_comments: number,
}) {
    const fetcher = useFetcher();
    const [currentPage, setCurrentPage] = useState<React.Key>("");
    const [listings, setListings] = useState<Array<Listing>>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(() => {
        if (num_comments > 0) {
            fetcher.load(`api${permalink}`);
        }
    }, []);
    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data[1] && !listings.length) {
                setListings([fetcher.data[1]]);
            }
        }
    }, [fetcher.data]);
    const addRepliesToStack = (replies: Listing) => {
        setListings(prev => {
            const newArr = [...prev];
            prev.push(replies);
            return newArr;
        });
    }
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
                        <DrawerBody className="w-full flex flex-col justify-center items-center">
                            <Breadcrumbs size="lg" underline="active" onAction={key => setCurrentPage(key)}>
                            {
                                listings && listings.map(listing => {
                                    const array = listing.data.children;
                                    const lastItem = array.splice(-1, array.length - 1);
                                    const id = lastItem[0].kind === "more" ? lastItem[0].data.id : "";
                                    if (id) {
                                        return (
                                            <BreadcrumbItem key={id}>
                                                {
                                                    array && array.map(comment => {
                                                        if (comment.kind === "t1") {
                                                            return (
                                                                <T1 
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
                                                                ups={comment.data.ups} 
                                                                addRepliesToStack={addRepliesToStack} />
                                                            )
                                                        }
                                                    })
                                                }
                                            </BreadcrumbItem>
                                        )
                                    }
                                    return;
                                })
                            }
                            </Breadcrumbs>
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