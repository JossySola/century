import { getSession } from "~/sessions.server";
import type { Route } from "./+types/tech";
import { useEffect, useMemo, useState } from "react";
import type { Thing } from "~/utils/types";
import { useActionData, useSubmit } from "react-router";
import T3 from "~/ui/cards/t3";
import { Spinner } from "@heroui/react";

export default function Main({ actionData }: Route.ComponentProps) {
    const [data, setData] = useState<Array<Thing>>([]);
    const submit = useSubmit();
    const actionResult = useActionData<typeof action>();

    useEffect(() => {
        submit({}, { method: 'POST' })
    }, [submit]);
    useEffect(() => {
        if (actionResult) {
            setData(actionResult);
        }
    }, [actionResult]);

    const posts = useMemo(() => data && data.map((element: Thing, index: number) => {
        if (element.kind === "t3") {
            return <T3 
                key={ index }
                author={ element.data.author }
                id={ element.data.id }
                permalink={ element.data.permalink }
                num_comments={ element.data.num_comments ?? 0 }
                selftext={ element.data.selftext ?? "" }
                subreddit={ element.data.subreddit ?? "" }
                subreddit_id={ element.data.subreddit_id }
                thumbnail={ element.data.thumbnail ?? "" }
                thumbnail_height={ element.data.thumbnail_height ?? 0 }
                thumbnail_width={ element.data.thumbnail_width ?? 0 }
                title={ element.data.title ?? "" }
                ups={ element.data.ups }/>
        }
    }), [data]);
    return (
        <section className="flex flex-col items-center gap-3 w-full">
            <h3>Tech</h3>
            {
                posts
            }
        </section>
    )
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const tokenCookie = session.get("access_token");
    
    const req = await fetch("https://www.reddit.com/r/technology.json?raw_json=1", {
        method: "GET",
        headers: {
            'Authorization': `Basic ${tokenCookie}`,
            'Content-Type': 'application/json',
            'User-Agent': "centurytimes/2.0",
        },
    });
    if (req.status !== 200) {
        console.error(req.statusText);
        console.error(req.status)
        throw new Error("Failed at fetching subreddits");
    }
    const response = await req.json();
    return response.data.children;
}
export function HydrateFallback() {
    return <Spinner size="lg" color="primary" label="Loading..." />
}