import { getSession } from "~/sessions.server";
import type { Route } from "./+types/search";
import search from "~/utils/querying/search";
import type { Listing } from "~/utils/types";
import T5 from "~/ui/cards/t5";

export async function loader({ 
    request,
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const access_token = session.get("access_token");
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? "";
    const response = await search(query, access_token);
    if (response instanceof Error) return { error: `${response.message}` }
    return response;
}
export default function Search({ loaderData }: Route.ComponentProps) {
    return (
        <>
        {
            loaderData 
            ?  (loaderData as Listing).data.children.map(thing => {
                if (thing.kind === "t5") {
                    return (
                        <T5 
                        key={thing.data.id}
                        display_name_prefixed={thing.data.display_name_prefixed}
                        subscribers={thing.data.subscribers}
                        name={thing.data.name}
                        public_description={thing.data.public_description}
                        banner_img={thing.data.banner_img}
                        icon_img={thing.data.icon_img} />
                    )
                }
            })
            : <h3>No results</h3>
        }
        </>
    )
}