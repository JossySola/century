import { getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import useInfiniteScroll from "~/utils/custom-hooks";
import { useEffect } from "react";
import { addToast, Spinner } from "@heroui/react";
import getCategoryContent from "~/utils/get-category-content";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const data = await getCategoryContent("worldnews", session.get("access_token"));

    return {
        data,
        url: request.url,
    };
}

export async function clientLoader({
    serverLoader,
    params,
}: Route.ClientLoaderArgs) {
    const serverData = await serverLoader();
    const url = new URL(serverData.url);
    const pendingAction = window.sessionStorage.getItem("x-century-pending-action");

    if (pendingAction && !url.searchParams.get("error")) {
        const { action, id, payload } = JSON.parse(pendingAction);
        if (action === "vote") {
            const dir = payload === "0" ? "1" : payload;
            const fetcher = await fetch(`/api/upvote/${id}/${dir}`, {
                method: "POST",
            });
            const fetcherData = await fetcher.json();
            if (fetcherData.error) {
                addToast({ 
                    title: "Error", 
                    description: "There was an error processing your vote.",
                    color: "danger", 
                });
            } else {
                addToast({ 
                    title: "Success", 
                    description: "Your vote was processed successfully.",
                    color: "success", 
                });
                window.sessionStorage.removeItem("x-century-pending-action");
            }
        }
    }
    return {
        ...serverData,
    }
}
clientLoader.hydrate = true as const;
export function HydrateFallback() {
    return (
        <section className="flex flex-col items-center gap-5 w-full mb-5">
            <Spinner variant="wave" color="primary" size="lg" />
        </section>
    )
}
export default function Index({ loaderData }: Route.ComponentProps) {
    const { render, renderLoadingDots } = useInfiniteScroll(loaderData.data);
    useEffect(() => {
        const url = new URL(loaderData.url);
        const error = url.searchParams.get("error");
        if (error && error.includes("access_denied")) {
            addToast({ 
                title: "Authorization Error", 
                description: "You need to authorize the app to upvote and comment.",
                color: "danger", 
            });
        }
    }, []);
    return (
        <section className="flex flex-col items-center gap-5 w-full mb-5">
            { render ?? null }
            { renderLoadingDots() ?? null }
        </section>
    )
}