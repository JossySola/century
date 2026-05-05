import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import useInfiniteScroll from "~/utils/custom-hooks";
import { useEffect } from "react";
import { addToast, Spinner } from "@heroui/react";
import searchByCategory from "~/utils/querying/search-by-category";
import getMe from "~/utils/querying/get-me";
import RedditSignDropdown from "~/ui/dropdown/sign";
import getUserOAuth from "~/utils/authorization/get-user-oauth";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.get("access_token");
    if (!access_token) return {};
    const subreddits = await searchByCategory("worldnews", access_token);
    const me = await getMe(access_token);
    return {
        subreddits: subreddits ?? null,
        me: me ?? null,
    };
}
/*
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
*/
export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const state = crypto.randomUUID();
    session.set("century_state", state);
    const URL = await getUserOAuth(state);
    return redirect(URL.toString(), {
        headers: {
            "Set-Cookie": await commitSession(session),
        }
    });
}
export default function Index({ loaderData }: Route.ComponentProps) {
    console.log(loaderData)
    /*
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
    */
    return (
        <main className="flex flex-col items-center gap-5 w-full mb-5">
            <div className="absolute top-7 right-[8vw] z-10" aria-label="Sign into Reddit">
                
            </div>
        </main>
    )
}
export function HydrateFallback() {
    return (
        <section className="flex flex-col items-center gap-5 w-full mb-5">
            <Spinner variant="wave" color="primary" size="lg" />
        </section>
    )
}