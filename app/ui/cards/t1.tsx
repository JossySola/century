import { Avatar, Button, Card, CardBody } from "@heroui/react";
import { useMemo } from "react";
import type { Listing, T1 } from "~/utils/types";
import { Heart, Message } from "../icons";
import { motion } from "motion/react";
import { PlusCircle } from "@geist-ui/icons";
import type { T1 as CommentKind } from "~/utils/types";

function renderRedditHtml(bodyHtml: string) {
    if (typeof window === "undefined") {
        return { __html: "" };
    }

    const parser = new DOMParser();
    const decoded = parser.parseFromString(bodyHtml, "text/html").documentElement.textContent ?? "";
    const doc = parser.parseFromString(decoded, "text/html");

    doc.querySelectorAll("script,style,iframe,object,embed,link,meta").forEach((node) => node.remove());

    doc.querySelectorAll<HTMLElement>("*").forEach((el) => {
        [...el.attributes].forEach((attr) => {
            const name = attr.name.toLowerCase();
            if (name.startsWith("on")) {
                el.removeAttribute(attr.name);
                return;
            }

            if (name === "href" || name === "src") {
                const value = attr.value.trim().toLowerCase();
                const isSafe = value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
                if (!isSafe) {
                    el.removeAttribute(attr.name);
                }
            }
        });
    });

    return { __html: doc.body.innerHTML };
}

export default function T1 ({
    author,
    author_fullname,
    body,
    body_html,
    created_utc,
    depth,
    downs,
    likes,
    is_submitter,
    link_id,
    name,
    replies,
    send_replies,
    subreddit_id,
    ups,
    addRepliesToStack,
}: {
    author: string,
    author_fullname: string,
    body: string,
    body_html: string,
    created_utc: number,
    depth: number,
    downs: number,
    likes: number | null,
    is_submitter: boolean,
    link_id: string,
    name: string,
    replies: "" | Listing,
    send_replies: boolean,
    subreddit_id: string,
    ups: number,
    addRepliesToStack: (replies: Listing) => void,
}) {
    const safeBodyHtml = useMemo(() => renderRedditHtml(body_html), [body_html]);

    return (
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-full m-3">
            <Card className="p-5">
                <CardBody>
                    <div className="grid grid-flow-row grid-rows-[auto_auto_auto] grid-cols-1 gap-3">
                        <div className="col-span-1 row-start-1 row-span-1 flex flex-row gap-3">
                            <Avatar size="sm" src={undefined} />
                            <span className="font-semibold">{author}</span>
                        </div>
                        <div className="col-span-1 row-start-2 row-span-1 flex flex-row gap-3">
                            <div
                                className="font-['Arial'] [&_a]:underline [&_a]:break-all"
                                dangerouslySetInnerHTML={safeBodyHtml}
                            />
                        </div>
                        <div className="col-span-1 row-start-3 row-span-1 flex flex-row gap-3">
                            <span className="inline-flex items-center justify-center gap-3"><Heart /> {ups}</span>
                            <span className="inline-flex items-center justify-center gap-3">
                                <Message /> 
                                { replies ? replies.data.children.length : 0 } 
                                { replies && <Button isIconOnly variant="flat" onPress={() => {
                                    addRepliesToStack(replies)
                                }}><PlusCircle /></Button> }
                            </span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    );
};