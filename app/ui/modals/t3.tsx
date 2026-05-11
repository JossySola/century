import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Skeleton, useDisclosure, User } from "@heroui/react";
import { memo} from "react";
import { motion } from "motion/react";
import Preview from "../cards/preview";

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
        subreddit: string, // e.g. 'worldnews'
        subreddit_name_prefixed: string, // e.g. 'r/worldnews'
        name: string, // e.g. 't3_1t824fj',
        ups: number,
        link_flair_text: string | null, // e.g. 'Russia/Ukraine'
        subreddit_id: string, // e.g. 't5_2qh13'
        id: string, // e.g. '1t824fj'
        author: string, // e.g. 'UNITED24Media'
        permalink: string, // e.g. '/r/worldnews/comments/1t824fj/moscows_victory_day_parade_lasted_just_45_ (...)
        url: string, // e.g. 'https://united24media.com/anti-fake/moscows-victory-day-parade-lasted-just-45-hortest-in-modern-russian-history-18629'
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
                        <User name={author} description={subreddit} />
                        <h5 className="w-full">{title}</h5>
                    </ModalHeader>
                    <ModalBody>
                        
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