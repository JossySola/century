import { addToast, Button, Input } from "@heroui/react";
import { Send } from "../icons";
import { useFetcher } from "react-router";
import { useEffect, useState } from "react";
import type { T1 } from "~/utils/types";

export default function PostComment({
    id,
    handleNewComment,
}: {
    id: string,
    handleNewComment: (comment: T1) => void,
}) {
    const fetcher = useFetcher();
    const [value, setValue] = useState("");
    useEffect(() => {
        if (fetcher.data) {
            handleNewComment(fetcher.data.data);
            if (fetcher.data.error) {
                addToast({
                    description: fetcher.data.error,
                    color: "danger",
                })
            }
        }
    }, [fetcher.data]);
    return (
        <fetcher.Form
            method="post"
            action={`/api/comment/${id}`}
            className="w-full flex flex-row items-center gap-2 font-[Geist]"
        >
            <Input
                name="text"
                type="text"
                label="Write a comment"
                autoComplete="off"
                value={value}
                onValueChange={setValue}
                required
            />
            <Button
                type="submit"
                color="primary"
                aria-label="Submit comment"
                isLoading={fetcher.state !== "idle"}
                isDisabled={fetcher.state !== "idle"}
                isIconOnly
            >
                <Send />
            </Button>
        </fetcher.Form>
    );
}