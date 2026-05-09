import { getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import { Spinner } from "@heroui/react";
import searchByCategory from "~/utils/querying/search-by-category";

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

}
export default function Index({ loaderData, actionData }: Route.ComponentProps) {

    return (
        <main className="flex flex-col items-center gap-5 w-full mb-5">

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