import { getSession } from "~/sessions.server";
import type { Route } from "./+types/subreddit";
import querySubreddit from "~/utils/querying/query-subreddit";
import { useEffect } from "react";
import { addToast } from "@heroui/react";
import type { Listing } from "~/utils/types";
import T3 from "~/ui/modals/t3";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const access_token = session.get("access_token");
    if (!access_token) return { error: "Failed loading results 😔. Please try again later or try another query" }
    const url = new URL(request.url);
    const path = url.pathname;
    const response = await querySubreddit(path, access_token);
    if (response instanceof Error) return { error: "Failed loading results 😔. Please try again later or try another query" }
    return response;
}

export default function Subreddit({ loaderData }: Route.ComponentProps) {
    useEffect(() => {
        if (loaderData && loaderData.error) {
            addToast({
                description: loaderData.error,
                color: 'danger',
            });
        }
    }, [loaderData]);
    return (
        <main className="flex flex-col items-center gap-5 w-full mb-5">
            {
                loaderData && !loaderData.error
                ? (loaderData as Listing).data.children.map(thing => {
                    if (thing.kind === "t3") {
                        return (
                            <T3 
                            key={thing.data.id}
                            title={thing.data.title}
                            subreddit={thing.data.subreddit}
                            subreddit_name_prefixed={thing.data.subreddit_name_prefixed}
                            name={thing.data.name}
                            ups={thing.data.ups}
                            link_flair_text={thing.data.link_flair_text}
                            subreddit_id={thing.data.subreddit_id}
                            id={thing.data.id}
                            author={thing.data.author}
                            permalink={thing.data.permalink}
                            url={thing.data.url}
                            likes={thing.data.likes}
                            selftext={thing.data.selftext}
                            num_comments={thing.data.num_comments}
                            selftext_html={thing.data.selftext_html}
                            preview={thing.data.preview} />
                        )
                    }
                })
                : <h3>No results</h3>
            }
        </main>
    )
}