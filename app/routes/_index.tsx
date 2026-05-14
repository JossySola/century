import { getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import { addToast, Spinner } from "@heroui/react";
import searchByCategory from "~/utils/querying/search-by-category";
import type { T3 as t3Type } from "~/utils/types";
import T3 from "~/ui/modals/t3";
import upvoteAction from "~/utils/actions/upvote";
import { useEffect } from "react";
import { useFetchers } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.get("access_token");
    if (!access_token) return {};
    const subreddits = await searchByCategory("worldnews", access_token);
    return {
        subreddits: subreddits ?? null,
    };
}

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.get("access_token");
    const formData = await request.formData();
    const action = formData.get("action");
    if (!access_token) {
        return { error: "You must sign in to Reddit in order to upvote" };
    }
    if (action === "upvote") {
        const dir = (formData.get("dir")?.toString() ?? "") as "1" | "0" | "-1";
        const id = formData.get("id")?.toString() ?? "";
        try {
            const ok = await upvoteAction(access_token, id, dir);
            if (!ok) return { error: "Unable to register vote" };
            return { ok: true };
        } catch(e: any) {
            console.log(e.message);
            if (e.message.includes("Unauthorized")) {
                return { error: "You must sign in to Reddit in order to upvote" };
            } else {
                return { error: "Unable to register vote" };
            }
        }
        
    }
    return null;
}

export default function Index({ loaderData, actionData }: Route.ComponentProps) {
    const children: Array<t3Type> = loaderData.subreddits?.data?.children ?? []; 
    const fetchers = useFetchers();

    useEffect(() => {
        if (actionData && actionData.error) {
            addToast({
                description: actionData.error,
                color: "danger",
            });
        }
    }, [actionData]);

    useEffect(() => {
        // Using fetcher from Upvote UI component does not make data available through actionData
        for (const fetcher of fetchers) {
            if (fetcher.data && fetcher.data.error) {
                addToast({
                    description: fetcher.data.error,
                    color: "danger",
                });
                break;
            }
        }
    }, [fetchers]);

    return (
        <main className="flex flex-col items-center gap-5 w-full mb-5">
            {
                children && children.map(t3 => (
                    <T3
                    key={t3.data.id}
                    title={t3.data.title}
                    subreddit={t3.data.subreddit}
                    subreddit_name_prefixed={t3.data.subreddit_name_prefixed}
                    name={t3.data.name}
                    ups={t3.data.ups}
                    link_flair_text={t3.data.link_flair_text}
                    subreddit_id={t3.data.subreddit_id}
                    id={t3.data.id}
                    author={t3.data.author}
                    permalink={t3.data.permalink}
                    url={t3.data.url}
                    likes={t3.data.likes}
                    selftext={t3.data.selftext}
                    num_comments={t3.data.num_comments}
                    selftext_html={t3.data.selftext_html}
                    preview={t3.data.preview} 
                    />
                ))
            }
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
