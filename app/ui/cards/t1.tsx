import { Avatar, Card, CardBody } from "@heroui/react";
import { memo, useEffect, useState } from "react";
import { useFetcher } from "react-router";
import type { T1 as T1type, T2 } from "~/utils/types";
import { Heart, Message } from "../icons";

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
        if (avatarCache[author]) {
            setImage(avatarCache[author]);
            return;
        }
        const timer = setTimeout(() => fetcher.load(`/api/author/${author}`), index * 500);
        return () => clearTimeout(timer);
    }, [isOpen, comment.data.author, comment.kind]);
    useEffect(() => {
        if (fetcher.data) {
            const data: T2 = fetcher.data;
            const author = comment.data.author;
            const url = data.data.snoovatar_img;
            if (author && url) {
                avatarCache[author] = url;
                setImage(url);
            }
        }
    }, [fetcher.data, comment.data.author]);
    return (
        <Card className="w-full">
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
    )
})
export default T1;