import type { Route } from "./+types/news";
import { getSession } from "../sessions.server";
import searchByCategory from "~/utils/querying/search-by-category";
import T3Skeleton from "~/ui/skeletons/t3-skeleton";
import T3 from "~/ui/modals/t3";
import type { T3 as T3Type } from "~/utils/types";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.get("access_token") ?? "";
    const subreddits = await searchByCategory("worldnews", access_token);
    return {
        subreddits: subreddits ?? null,
    };
}
export default function Main({ loaderData, actionData }: Route.ComponentProps) {
    const subreddits = loaderData.subreddits;
    const children: Array<T3Type> = subreddits?.data?.children ?? [];
    if (!subreddits) {
        return (
            <main className="flex flex-col items-center gap-5 w-full mb-5">
                <T3Skeleton />
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center gap-5 w-full mb-5">
            {
                children.length > 0
                ? children.map(t3 => (
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
                : <p className="font-['Arial'] text-gray-600">No posts available right now.</p>
            }
        </main>
    )
}

export function HydrateFallback() {
    return <T3Skeleton />
}
