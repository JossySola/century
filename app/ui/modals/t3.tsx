import { Button, Chip, Divider, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, User } from "@heroui/react";
import { memo } from "react";
import { motion } from "motion/react";
import Preview from "../cards/preview";
import { Link } from "react-router";
import { ExternalLink } from "@geist-ui/icons";
import { Message } from "../icons";
import { formatAmount } from "~/utils/formatting/format-amount";
import Upvote from "../buttons/upvote";

const T3 = memo(function T3(
    { 
        title, 
        subreddit, 
        subreddit_name_prefixed, 
        name, 
        ups, 
        link_flair_text,
        subreddit_id,
        id,
        author,
        permalink,
        url,
        likes,
        selftext,
        num_comments,
        selftext_html,
        preview,
    } : {
        title: string,
        subreddit: string,
        subreddit_name_prefixed: string,
        name: string,
        ups: number,
        link_flair_text: string | null,
        subreddit_id: string,
        id: string,
        author: string,
        permalink: string,
        url: string,
        likes: null | boolean,
        selftext_html: string | null,
        num_comments: number,
        selftext: string,
        preview: {
            enabled: boolean,
            images: Array<{
                id: string,
                resolutions: Array<{
                    height: number,
                    url: string,
                    width: number,
                }>,
                source: {
                    url: string,
                    height: number,
                    width: number,
                },
                variants: {}

            }>
        }
}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const image = preview ? preview.images[0].source.url.replace(/&amp;/g, "&") : "";
    
    return (
        <>
            <motion.button initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={() => onOpen()} className="cursor-pointer w-full max-w-[90vw] md:w-133">
                <Preview
                title={title}
                subreddit_name_prefixed={subreddit_name_prefixed}
                name={name}
                ups={ups}
                num_comments={num_comments}
                link_flair_text={link_flair_text}
                subreddit_id={subreddit_id}
                id={id}
                author={author}
                likes={likes}
                selftext_html={selftext_html}
                selftext={selftext}
                preview={preview} />
            </motion.button>
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
                            <User name={author} description={subreddit_name_prefixed} />
                            { link_flair_text && <Chip color="primary" variant="bordered">{link_flair_text}</Chip> }
                            <h5 className="w-full">{title} <Link to={url} target="_blank" aria-label="visit external link" className="w-fit text-[#ff4500] p-3 text-center inline-flex"><ExternalLink width={16} height={16} /></Link></h5>
                        </ModalHeader>
                        <ModalBody>
                            { image 
                            ? <Image src={image} alt="Preview image of article" />
                            : null
                            }
                            <p className="font-[Geist]">{selftext}</p>
                            <Divider />
                            <section className="flex flex-row justify-center items-center gap-6">
                                <Upvote likes={likes} votes={ups} id={name} />
                                
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <Message />
                                    <span>{formatAmount(num_comments)}</span>
                                </div>
                            </section>

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
});
export default T3;