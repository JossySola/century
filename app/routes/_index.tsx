import { getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import { useEffect, useMemo } from "react";
import T3 from "~/ui/cards/t3";
import type { Listing, Thing } from "~/utils/types";
import { useActionData, useOutletContext } from "react-router";
import T5 from "~/ui/cards/t5";

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
    return response.data.children;
}
export default function Index({ loaderData }: Route.ComponentProps) {
    const action: Listing = useOutletContext();
    const objectsFromLoader = useMemo(() => loaderData.map((element: Thing, index: number) => {
        if (element.kind === "t3") {
            return <T3 
            key={ index }
            author={ element.data.author }
            id={ element.data.id }
            permalink={ element.data.permalink }
            num_comments={ element.data.num_comments ?? 0 }
            selftext={ element.data.selftext ?? "" }
            subreddit={ element.data.subreddit ?? "" }
            subreddit_id={ element.data.subreddit_id }
            thumbnail={ element.data.thumbnail ?? "" }
            thumbnail_height={ element.data.thumbnail_height ?? 0 }
            thumbnail_width={ element.data.thumbnail_width ?? 0 }
            title={ element.data.title ?? "" }
            ups={ element.data.ups } />
        }
    }), [loaderData]);
    
    const objectsFromAction = useMemo(() => action?.data.children.map((element: Thing, index: number) => {
        if (element.kind === "t5") {
            return <T5 
            key={index}
            display_name_prefixed={element.data.display_name_prefixed}
            subscribers={element.data.subscribers}
            name={element.data.name}
            public_description={element.data.public_description}
            banner_img={element.data.banner_img}
            icon_img={element.data.icon_img}
            />
        }
    }), [action]);
    
    return (
        <>
        {
            objectsFromAction ?? objectsFromLoader
        }
        </>
    )
}