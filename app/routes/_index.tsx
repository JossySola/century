import { getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import useInfiniteScroll from "~/utils/custom-hooks";
import { useEffect } from "react";
import { addToast } from "@heroui/react";

export async function loader({ request }: Route.LoaderArgs) {
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
    return {
        data: response.data.children,
        url: request.url,
    };
}
export async function clientLoader({
  params,
}: Route.ClientLoaderArgs) {
    const pendingAction = window.sessionStorage.getItem("x-century-pending-action");
    const pendingUrl = window.sessionStorage.getItem("x-century-pending-url");

    if (pendingAction && pendingUrl) {
        const parsedAction = JSON.parse(pendingAction);
        window.sessionStorage.removeItem("x-century-pending-action");
        window.sessionStorage.removeItem("x-century-pending-url");
        console.log(parsedAction, pendingUrl);
    }
}
export default function Index({ loaderData }: Route.ComponentProps) {
    const { render, renderLoadingDots } = useInfiniteScroll(loaderData.data);
    //https://www.centurytimes.jossysola.com/?state=x&error=access_denied#_ 
    useEffect(() => {
        const url = new URL(loaderData.url);
        const error = url.searchParams.get("error");
        if (error) {
            addToast({ 
                title: "Authorization Error", 
                description: "You need to authorize the app to upvote and comment.",
                color: "danger", 
            });
        }
    }, []);
    return (
        <section className="flex flex-col items-center gap-5 w-full mb-5">
            { render }
            { renderLoadingDots() }
        </section>
    )
}