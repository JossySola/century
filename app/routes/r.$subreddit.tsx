import { getSession } from "~/sessions.server";
import type { Route } from "./+types/r.$subreddit";
import type { Listing } from "~/utils/types";
import { Spinner } from "@heroui/react";
import useInfiniteScroll from "~/utils/custom-hooks";

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
    const { render, renderLoadingDots } = useInfiniteScroll(loaderData);

    return (
        <section className="flex flex-col items-center gap-3 w-full">
            <h3 className="reddit-header my-5">r/{ params.subreddit }</h3>
            { render }
            { renderLoadingDots() }
        </section>
    )
}
export function HydrateFallback() {
    return <Spinner size="lg" color="primary" label="Loading..." />
}