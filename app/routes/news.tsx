import type { Route } from "./+types/news";
import { getSession } from "../sessions.server";
import { Spinner } from "@heroui/react";
import useInfiniteScroll from "~/utils/custom-hooks";

export async function loader({ request }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const tokenCookie = session.get("access_token");
    
    const req = await fetch("https://www.reddit.com/r/worldnews.json?raw_json=1", {
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
export default function Main({ loaderData }: Route.ComponentProps) {
    const { render, renderLoadingDots } = useInfiniteScroll(loaderData);
    return (
        <section className="flex flex-col items-center gap-3 w-full">
            <h3 className="reddit-header my-5">News</h3>
            { render }
            { renderLoadingDots() }
        </section>
    )
}
export function HydrateFallback() {
    return <Spinner size="lg" color="primary" label="Loading..." />
}