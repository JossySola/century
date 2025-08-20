import { useOutletContext } from "react-router";
import type { Listing, Thing } from "./types";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@heroui/react";
import T3 from "~/ui/cards/t3";
import T5 from "~/ui/cards/t5";

export default function useInfiniteScroll(loaderData: any) {
    const action: Listing = useOutletContext();
    const scrollPositionRef = useRef(0);
    const loadingRef = useRef(null);
    const [feed , setFeed] = useState<Array<Thing>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (feed.length > 0) {
            setFeed([]);
        }
        addToFeed();
    }, [action])
    useEffect(() => {
        if (feed.length > 0) return;
        addToFeed();
    }, []);
    useEffect(() => {
        if (!loadingRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    addToFeed();
                }
            }, 
            {
                root: document,
                threshold: 1,
            }
        );
        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }
        return () => observer.disconnect();
    }, [feed.length]);
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
        if (action && action.data && action.data.children) {
            setFeed(prev => {
                const children = action.data.children;
                if (prev.length === children.length) {
                    return prev;
                }
                if (children.length <= 5) {
                    return children;
                }
                const diff = children.length - prev.length;
                if (diff < 5) {
                    return children;
                };
                const count = prev.length + 5;
                const newArray = children.slice(0, count);
                return newArray;
            });
            return;
        };
        if (loaderData) {
            setFeed(prev => {
                if (prev.length === loaderData.length) {
                    return prev;
                }
                if (loaderData.length <= 5) {
                    return loaderData;
                }
                const diff = loaderData.length - prev.length;
                if (diff < 5) {
                    return loaderData;
                };

                const count = prev.length + 5;
                const newArray = loaderData.slice(0, count);
                return newArray;
            });
            return;
        };
        setIsLoading(false);
        return;
    }
    const saveScrollPosition = () => {
        const scrollable = document.documentElement ?? document.body;
        if (scrollable) {
            scrollPositionRef.current = scrollable.scrollTop;
        }
    };
    const restoreScrollPosition = () => {
        const scrollable = document.documentElement ?? document.body;
        if (scrollable) {
            scrollable.scrollTop = scrollPositionRef.current;
        }
    };
    const renderLoadingDots = () => {
        if (loaderData) {
            if (loaderData.length !== feed.length) {
                return <div ref={loadingRef} className="relative bottom-0 flex flex-row justify-center w-full h-fit p-y-10">
                    <Spinner variant="wave" color="primary" size="lg" />
                </div>
            }
        } else if (action && action.data) {
            if (action.data.children && action.data.children.length !== feed.length) {
                return <div ref={loadingRef} className="relative bottom-0 flex flex-row justify-center w-full h-fit p-y-10">
                    <Spinner variant="wave" color="primary" size="lg" />
                </div>
            }
        }
        return null;
    }

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

    return {
        render,
        renderLoadingDots,
    }
}