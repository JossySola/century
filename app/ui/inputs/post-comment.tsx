import { addToast, Button, Input } from "@heroui/react";
import { useFetcher, useRouteLoaderData } from "react-router";
import React, { useEffect, useState } from "react";
import type { T1 } from "~/utils/types";
import Publish from '@react-spectrum/s2/icons/Publish';

export default function PostComment({
    id,
    handleNewComment,
}: {
    id: string,
    handleNewComment: (comment: T1) => void,
}) {
    const fetcher = useFetcher<{ error?: string; comment?: T1 }>();
    const rootLoaderData = useRouteLoaderData("root") as { identity?: { name?: string } } | undefined;
    const isSignedIn = Boolean(rootLoaderData?.identity?.name);
    const [value, setValue] = useState("");
    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data.error) {
                addToast({
                    description: fetcher.data.error,
                    color: "danger",
                })
            } else if (fetcher.data.comment) {
                handleNewComment(fetcher.data.comment);
                setValue("");
            }
        }
    }, [fetcher.data, handleNewComment]);
    return (
        <fetcher.Form
            method="post"
            action={`/api/comment/${id}`}
            className="w-full flex flex-row items-center gap-2 font-[Geist]"
            onSubmit={(event) => {
                if (isSignedIn) return;
                event.preventDefault();
                addToast({
                    description: "You must sign in first in order to comment.",
                    color: "danger",
                });
            }}
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
                <Publish UNSAFE_style={{"--iconPrimary": "#fff"} as React.CSSProperties} />
            </Button>
        </fetcher.Form>
    );
}
