import { commitSession, getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import { Spinner } from "@heroui/react";
import searchByCategory from "~/utils/querying/search-by-category";
import getMe from "~/utils/querying/get-me";
import RedditSignDropdown from "~/ui/dropdown/sign";
import getUserOAuth from "~/utils/authorization/get-user-oauth";
import { redirect } from "react-router";
import type { IdentityResponse } from "~/utils/types";

export async function loader({ request }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.get("access_token");
    if (!access_token) return {};
    const subreddits = await searchByCategory("worldnews", access_token);
    const identity: IdentityResponse = await getMe(access_token);
    const me = {
        name: identity.name ?? undefined,
        icon_img: identity.icon_img ?? undefined,
        name_prefixed: identity.subreddit?.display_name_prefixed ?? undefined,
        icon_color: identity.subreddit?.icon_color ?? undefined,
        total_karma: identity.total_karma ?? undefined,
        gold_creddits: identity.gold_creddits ?? undefined,
        subscribers: identity.subreddit?.subscribers ?? 0,
    }
    return {
        subreddits: subreddits ?? null,
        me,
    };
}
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
export default function Index({ loaderData, actionData }: Route.ComponentProps) {
    const identity = loaderData.me;
    //console.log(actionData)
    return (
        <main className="flex flex-col items-center gap-5 w-full mb-5">
            <div className="absolute top-7 right-[8vw] z-10" aria-label="Sign into Reddit">
                <RedditSignDropdown
                name={identity?.name} 
                display_name={identity?.name_prefixed} 
                icon_img={identity?.icon_img}
                icon_color={identity?.icon_color}
                total_karma={identity?.total_karma}
                gold_creddits={identity?.gold_creddits}
                subscribers={identity?.subscribers} />
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