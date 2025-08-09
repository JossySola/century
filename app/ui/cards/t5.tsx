import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, User } from "@heroui/react"
import { Heart, HeartFill, Message } from "../icons"
import { formatAmount } from "../../utils/format-amount"
import { useEffect } from "react";
import Comments from "../drawers/comments";

export default function T5({ author, subreddit, id, permalink, num_comments, selftext, subreddit_id, thumbnail, thumbnail_height, thumbnail_width, title, ups }: {
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
    // Make a useEffect fetch when isOpen is true, to gather further data from subreddit
    return (
        <>
        <button onClick={() => onOpen()} className="cursor-pointer">
            <Card className="w-full max-w-[90vw] md:w-[532px] p-5">
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
        placement="top" 
        size="lg" 
        scrollBehavior="inside" 
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
                        {
                            thumbnail 
                            ? <Image src={thumbnail} width={thumbnail_width} />
                            : null 
                        }
                        <p className="w-full overflow-clip p-x-3">{selftext}</p>
                        <Divider />
                        <div className="flex flex-row justify-center items-center gap-3">
                            <Heart />
                            <span>{formatAmount(ups)}</span>
                            <Message />
                            <span>{ num_comments.toString() }</span>
                        </div>
                        <Comments num_comments={num_comments} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={onClose}><span>Close</span></Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}