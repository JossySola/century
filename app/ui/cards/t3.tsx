import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, useDisclosure, User } from "@heroui/react"
import { Heart, HeartFill, Message } from "../icons"
import { formatAmount } from "../../utils/format-amount"
import { useEffect, useState } from "react";
import Comments from "../drawers/comments";
import { useFetcher } from "react-router";
import type { Listing } from "~/utils/types";
import { motion } from "motion/react";

export default function T3({ author, subreddit, id, permalink, num_comments, selftext, subreddit_id, thumbnail, thumbnail_height, thumbnail_width, title, ups }: {
    author: string,
    subreddit: string,
    id: string,
    permalink: string,
    num_comments: number,
    selftext: string,
    subreddit_id: string,
    thumbnail: string,
    thumbnail_height: number,
    thumbnail_width: number,
    title: string,
    ups: number,
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [moreData, setMoreData] = useState<Array<Listing>>([]);
    const fetcher = useFetcher();
    const [preview, setPreview] = useState<string | undefined>(undefined);
    // Make a useEffect fetch when isOpen is true, to gather further data from subreddit
    useEffect(() => {
        if (!isOpen) return;
        if (!thumbnail) return;
        if (preview) return;
        fetcher.load(`/api/subreddit/${permalink}`);
    }, [isOpen, thumbnail, preview, permalink]);
    useEffect(() => {
        if (fetcher.data) {
            const data: Array<Listing> = fetcher.data;
            setMoreData(data);
        }
    }, [fetcher.data]);
    useEffect(() => {
        if (moreData && moreData[0] && moreData[0].kind === "Listing") {
            const children = moreData[0].data.children;
            if (children && children.length > 0) {
                if (children[0].kind === "t3" && children[0].data.preview) {
                    const preview = children[0].data.preview;
                    if (preview.images.length > 0) {
                        const url = preview.images[0].source.url;
                        setPreview(url);
                    }
                }
            }
        }
    }, [moreData]);
    return (
        <>
        <button onClick={() => onOpen()} className="cursor-pointer w-full max-w-[90vw] md:w-[532px]">
            <Card className="p-5">
                <CardHeader className="flex flex-col gap-3 text-center">
                    <User name={author} description={subreddit} />
                    <h4 className="w-full">{title}</h4>
                </CardHeader>
                <CardBody className="flex flex-col justify-center items-center text-center">
                    {
                        thumbnail 
                        ? <Image src={thumbnail} width={thumbnail_width} />
                        : null 
                    }
                    <p className="w-full line-clamp-3 overflow-hidden text-ellipsis">{selftext}</p>
                </CardBody>
                <Divider />
                <CardFooter className="flex flex-row text-gray-500">
                    <div className="flex flex-row justify-center items-center gap-3">
                        {
                            ups > 0
                            ? <HeartFill />
                            : <Heart />
                        }
                        <span>{formatAmount(ups)}</span>
                        <Message />
                        <span>{ num_comments.toString() }</span>
                    </div>
                </CardFooter>
            </Card>
        </button>
        <Modal 
        isOpen={isOpen} 
        placement="center" 
        size="lg" 
        scrollBehavior="outside" 
        backdrop="blur" 
        onOpenChange={onOpenChange}>
            <ModalContent>
                {onClose => (
                    <>
                    <ModalHeader className="flex flex-col justify-center items-start gap-3">
                        <User name={author} description={subreddit} />
                        <h5 className="w-full">{title}</h5>
                    </ModalHeader>
                    <ModalBody>
                        <div className="inline-flex items-center justify-center">
                            {
                                preview && <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><Image src={preview} alt="cover image" /></motion.div>
                            }
                            {
                                !preview && thumbnail ? <Image src={thumbnail} width={thumbnail_width} alt="cover image" /> : null
                            }
                        </div>
                        
                        <p className="w-full overflow-clip p-x-3">{selftext}</p>
                        <Divider />
                        <div className="flex flex-row justify-center items-center gap-3">
                            <Heart />
                            <span>{formatAmount(ups)}</span>
                            <Message />
                            <span>{ num_comments.toString() }</span>
                        </div>
                        <Comments num_comments={num_comments} comments={ moreData[1] ?? [] } />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" onPress={onClose}><span>Close</span></Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}