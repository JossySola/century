import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/tech";
import { useEffect, useMemo, useState } from "react";
import type { Thing } from "./news";
import { data, useActionData, useSubmit } from "react-router";
import T5 from "~/ui/cards/t5";

export async function loader({request}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.has("access_token");

    if (!access_token) {
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        const encode = Buffer.from(client_id + ':' + client_secret).toString('base64');
        const req = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${encode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': "centurytimes/2.0",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                scope: "*"
            })
        });
        if (req.status !== 200) {
            throw new Error("Failed at fetching subreddits");
        }
        const res = await req.json();
        session.set("access_token", res.access_token);
        return data(
            { error: session.get("error") },
            { 
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            },
        );
    }
    return data(
        { error: session.get("error") },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
}
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
        return <T5 
        key={ index }
        author={ element.data.author }
        id={ element.data.id }
        permalink={ element.data.permalink }
        num_comments={ element.data.num_comments }
        selftext={ element.data.selftext }
        subreddit={ element.data.subreddit }
        subreddit_id={ element.data.subreddit_id }
        thumbnail={ element.data.thumbnail }
        thumbnail_height={ element.data.thumbnail_height }
        thumbnail_width={ element.data.thumbnail_width }
        title={ element.data.title }
        ups={ element.data.ups }/>
    }), [data]);
    return (
        posts
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
            "Authorization": `${tokenCookie}`,
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
    return <p>Loading...</p>
}