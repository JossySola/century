import { Avatar, Card, CardBody } from "@heroui/react";
import { memo, useEffect, useState } from "react";
import { useFetcher } from "react-router";
import type { T1 as T1type, T2 } from "~/utils/types";
import { Heart, Message } from "../icons";
import { motion } from "motion/react";

const avatarCache: Record<string, string> = {};
const T1 = memo(({ comment, isOpen, index }: { 
    comment: T1type, 
    isOpen: boolean,
    index: number,
}) => {
    const [image, setImage] = useState<string>("");
    const fetcher = useFetcher();
    useEffect(() => {
        if (!isOpen) return;
        if (comment.kind !== "t1") return;
        const author = comment.data.author;
        if (!author) return;
        if (author === '[deleted]') return;
        if (avatarCache[author]) {
            setImage(avatarCache[author]);
            return;
        }
        const timer = setTimeout(() => fetcher.load(`/api/author/${author}`), index * 500);
        return () => clearTimeout(timer);
    }, [isOpen, comment.data.author, comment.kind]);
    useEffect(() => {
        if (fetcher.data) {
            const data: T2 | string = fetcher.data;
            if (typeof data === "string") {
                return;
            }
            const author = comment.data.author;
            const url = data.data.snoovatar_img.replace(/&amp;/g, "&");
            if (author && url) {
                avatarCache[author] = url;
                setImage(url);
            }
        }
    }, [fetcher.data, comment.data.author]);
    return (
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-full m-3">
            <Card className="p-5">
                <CardBody>
                    <div className="grid grid-flow-row grid-rows-[auto_auto_auto] grid-cols-1 gap-3">
                        <div className="col-span-1 row-start-1 row-span-1 flex flex-row gap-3">
                            <Avatar size="sm" src={image ?? undefined}/>
                            <span className="font-semibold">{ comment.data.author }</span>
                        </div>
                        <div className="col-span-1 row-start-2 row-span-1 flex flex-row gap-3">
                            <p className="font-['Arial']">{ comment.data.body }</p>
                        </div>
                        <div className="col-span-1 row-start-3 row-span-1 flex flex-row gap-3">
                            <span className="inline-flex items-center justify-center gap-3"><Heart /> { comment.data.ups }</span>
                            <span className="inline-flex items-center justify-center gap-3"><Message /> { comment.data.replies ? comment.data.replies.data.children.length : 0 }</span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    )
})
export default T1;