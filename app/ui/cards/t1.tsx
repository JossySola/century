import { Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import type { Thing } from "~/utils/types";

export default function T1({ comment }: { comment: Thing }) {
    const [image, setImage] = useState<string>("");
    const fetcher = useFetcher();
    useEffect(() => {
        if (comment.kind === "t1") {
            if (comment.data.author) {
                fetcher.load(`/api/author/${comment.data.author}`);
            }
        }
    }, []);
    useEffect(() => {
        if (fetcher.data) {

        }
    }, [fetcher.data]);
    return (
        <Card>
            <CardBody>

            </CardBody>
        </Card>
    )
}