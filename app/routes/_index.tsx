import { getSession } from "~/sessions.server";
import type { Route } from "./+types/_index";
import { useEffect, useMemo, useRef, useState } from "react";
import T3 from "~/ui/cards/t3";
import type { Listing, Thing } from "~/utils/types";
import { useOutletContext } from "react-router";
import T5 from "~/ui/cards/t5";
import { Spinner } from "@heroui/react";

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
    const scrollableRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef(0);
    const loadingRef = useRef(null);
    const [feed , setFeed] = useState<Array<Thing>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (feed.length > 0) return;
        addToFeed();
    }, []);
    useEffect(() => {
        if (!scrollableRef.current || !loadingRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    addToFeed();
                }
            }, 
            {
                root: scrollableRef.current,
                threshold: 1,
            }
        );
        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }
        return () => observer.disconnect();
    }, [feed]);
    useEffect(() => {
        if (!isLoading) {
            requestAnimationFrame(() => {
                restoreScrollPosition();
            })
        }
    }, [feed, isLoading]);

    const addToFeed = () => {
        setIsLoading(true);
        saveScrollPosition();
        if (loaderData) {
            setFeed(prev => {
                const diff = loaderData.length - prev.length;
                if ((loaderData.length && loaderData.length <= 5) || diff < 5) {
                    return loaderData;
                };
                const count = prev.length + 5;
                const newArray = loaderData.slice(0, count);
                /*
                if (loaderData.length !== feed.length || (action && action.data && action.data.children).length !== feed.length) {
                    newArray.push(<div ref={loadingRef} className="flex flex-row justify-center items-center w-full h-fit mb-10">
                        <Spinner variant="wave" color="primary" size="lg" />
                    </div>);
                    return newArray;
                } 
                */
                return newArray;
            });
            return;
        };
        if (action && action.data && action.data.children) {
            setFeed(prev => {
                const children = action.data.children;
                const diff = children.length - prev.length;

                if ((children.length && children.length <= 5) || diff < 5) {
                    return children;
                };
                const count = prev.length + 5;
                const newArray = loaderData.slice(0, count);
                /*
                if (loaderData.length !== feed.length || (action && action.data && action.data.children).length !== feed.length) {
                    newArray.push(<div ref={loadingRef} className="flex flex-row justify-center items-center w-full h-fit mb-10">
                        <Spinner variant="wave" color="primary" size="lg" />
                    </div>);
                    return newArray;
                }
                */
                return newArray;
            });
            return;
        };
        setIsLoading(false);
        return;
    }
    const saveScrollPosition = () => {
        if (scrollableRef.current) {
            scrollPositionRef.current = scrollableRef.current.scrollTop;
        }
    };
    const restoreScrollPosition = () => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTop = scrollPositionRef.current;
        }
    };

    const render = feed.map((element: Thing, index: number) => {
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
    });
    
    return (
        <section ref={scrollableRef} className="flex flex-col items-center gap-5">
            { render }
        </section>
    )
}