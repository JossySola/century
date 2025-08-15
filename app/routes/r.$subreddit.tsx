import { getSession } from "~/sessions.server";
import type { Route } from "./+types/r.$subreddit";
import { useMemo } from "react";
import T3 from "~/ui/cards/t3";
import type { Listing, Thing } from "~/utils/types";

export async function loader({ params, request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.get("access_token");
    const req = await fetch(`https://www.reddit.com/r/${params.subreddit}.json?raw_json=1`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${access_token}`,
            'Content-Type': 'application/json',
            'User-Agent': "centurytimes/2.0",
        },
    });
    if (req.status !== 200) {
        console.error(req.statusText);
        console.error(req.status)
        throw new Error("Failed at fetching subreddits");
    }
    const response: Listing = await req.json();
    return response.data.children;
}
export default function Main({ loaderData, params }: Route.ComponentProps) {
    const posts = useMemo(() => loaderData && loaderData.map((element: Thing, index: number) => {
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
    }), [loaderData]);
    return (
        <section className="flex flex-col items-center gap-3 w-full">
            <h3>{ params.subreddit }</h3>
            {
                posts
            }
        </section>
    )
}
export function HydrateFallback() {
    return <p>Loading...</p>
}