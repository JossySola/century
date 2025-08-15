import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Spinner, useDisclosure } from "@heroui/react";
import type { Listing, Thing } from "~/utils/types";
import T1 from "../cards/t1";
import { useEffect, useRef, useState } from "react";
import { BookOpen } from "../icons";

export default function Comments({ num_comments, comments }: {
    num_comments: number,
    comments?: Listing,
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [feed , setFeed] = useState<Array<Thing>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const children = comments && comments.data ? comments.data.children : [];
    const loadingRef = useRef(null);
    const scrollableRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef(0);
    
    useEffect(() => {
        if (!isOpen) return;
        if (!scrollableRef.current || !loadingRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadComments();
                }
            }, 
            {
                root: scrollableRef.current,
                threshold: 1,
            }
        );
        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }
        return () => observer.disconnect();
    }, [isOpen, feed.length]);
    useEffect(() => {
        if (!comments) return;
        if (feed.length > 0) return;
        loadComments();
    }, [children.length]);
    useEffect(() => {
        if (!isLoading) {
            requestAnimationFrame(() => {
                restoreScrollPosition();
            })
        }
    }, [feed, isLoading]);

    const loadComments = () => {
        setIsLoading(true);
        saveScrollPosition();
        setFeed(prev => {
            const count = prev.length + 5;
            return children.slice(0, count);
        })
        setIsLoading(false);
    };
    const saveScrollPosition = () => {
        if (scrollableRef.current) {
            scrollPositionRef.current = scrollableRef.current.scrollTop;
        }
    };
    const restoreScrollPosition = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTop = scrollPositionRef.current;
        }
    };
    
    return (
        <>
        <Button onPress={onOpen} isDisabled={ num_comments === 0 } size="lg" className="w-full flex flex-row p-2" color="danger"><span className="text-lg">Read comments </span><BookOpen width={20} height={20} /></Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom" size="lg">
            <DrawerContent>
                {
                    onClose => (
                        <>
                        <DrawerHeader></DrawerHeader>
                        <DrawerBody>
                            <div ref={scrollableRef} className="flex flex-col-reverse items-center overflow-y-auto h-full p-x-5 pb-5">
                                <section className="w-5/6 max-w-[95%] flex flex-col-reverse justify-center items-center gap-5">
                                    {
                                        feed
                                        ? feed.map((comment, index) => {
                                            if (comment.kind === "t1") {
                                                return <T1 comment={comment} key={comment.data.id} isOpen={isOpen} index={index} />
                                            }
                                        })
                                        :   <span>No comments yet</span>
                                    }
                                </section>
                                {
                                    comments && comments.data.children.length !== feed.length 
                                    && <div ref={loadingRef} className="flex flex-row justify-center items-center w-full h-fit mb-10">
                                        <Spinner variant="wave" color="primary" size="lg" />
                                    </div>
                                }
                            </div>
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