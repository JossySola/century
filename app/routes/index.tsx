import type { Route } from "./+types/_index";
import { useMemo } from "react";
import PostCard from "../ui/cards/card-post";
import {
  getSession,
  commitSession,
} from "../sessions.server";
import { data } from "react-router";
 
interface Thing {
    kind: "t1" | "t2" | "t3" | "t4" | "t5" | "t6";
    data: {
        all_awardings: Array<unknown>,
        allow_live_comments: boolean,
        approved_at_utc: number | null,
        approved_by: string | null,
        archived: boolean,
        author: string,
        author_flair_background_color: string | null,
        author_flair_css_class: string | null,
        author_flair_richtext: Array<unknown>,
        author_flair_template_id: string | null,
        author_flair_text: string | null,
        author_flair_text_color: string | null,
        author_flair_type: string,
        author_fullname: string,
        author_is_blocked: boolean,
        author_patreon_flair: boolean,
        athor_premium: boolean,
        awarders: Array<unknown>,
        banned_at_utc: number | null,
        banned_by: string | null,
        can_gild: boolean,
        can_mod_post: boolean,
        category: string | null,
        clicked: boolean,
        content_categories: Array<string> | null,
        contest_mode: boolean,
        created: number,
        created_utc: number,
        discussion_type: string | null,
        distinguished: string | null,
        domain: string,
        downs: number,
        edited: boolean,
        gilded: number,
        gildings: object,
        hidden: boolean,
        hide_score: boolean,
        id: string,
        is_created_from_ads_ui: boolean,
        is_crosspostable: boolean,
        is_meta: boolean,
        is_original_content: boolean,
        is_reddit_media_domain: boolean,
        is_robot_indexable: boolean,
        is_self: boolean,
        is_video: boolean,
        likes: number | null,
        link_flair_background_color: string | null,
        link_flair_css_class: string,
        link_flair_richtext: Array<{
            e: string,
            t: string
        }>,
        link_flair_text: string,
        link_flair_text_color: string | null,
        link_flair_type: string,
        locked: boolean,
        media: {
            event_id: string,
            type: string,
        },
        media_embed: {
            content: string,
            height: number,
            scrolling: boolean,
            width: number,
        },
        media_only: boolean,
        mod_note: string | null,
        mod_reason_by: string | null,
        mod_reason_title: string | null,
        mod_reports: Array<unknown>,
        name: string,
        no_follow: boolean,
        num_comments: number,
        num_crossposts: number,
        num_reports: number | null,
        over_18: boolean,
        permalink: string,
        pinned: boolean,
        pwls: number,
        quarantine: boolean,
        removal_reason: string | null,
        removed_by: string | null,
        removed_by_category: string | null,
        report_reasons: Array<string> | null,
        saved: boolean,
        score: number,
        secure_media: {
            event_id: string,
            type: string,
        },
        secure_media_embed: {
            content: string,
            height: number,
            media_domain_url: string,
            scrolling: boolean,
            width: number,
        },
        selftext: string,
        selftext_html: string | null,
        send_replies: boolean,
        spoiler: boolean,
        stickied: boolean,
        subreddit: string,
        subreddit_id: string,
        subreddit_name_prefixed: string,
        subreddit_subscribers: number,
        subreddit_type: string,
        suggested_sort: string,
        thumbnail: string,
        thumbnail_height: number,
        thumbnail_width: number,
        title: string,
        top_awarded_type: string | null,
        total_awards_received: number,
        treatment_tags: Array<string>,
        ups: number,
        upvote_ratio: number,
        url: string,
        url_overridden_by_dest: string,
        user_reports: Array<string>,
        view_count: number | null,
        visited: boolean,
        wls: number,
    }
}
export async function loader({request}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.has("access_token");

    if (!access_token) {
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        const encode = window.btoa(client_id + ':' + client_secret);
        const req = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${encode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                scope: "*"
            })
        });
        const res = await req.json();
        if (res) {
            session.set("access_token", res.access_token);
            return data(
                { error: session.get("error") },
                { 
                    headers: {
                        "Set-Cookie": await  commitSession(session),
                    },
                },
            );
        };
    }
    const tokenCookie = session.get("access_token");
    const req = await fetch("https://www.reddit.com/r/worldnews.json?raw_json=1", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`),
        },
    });
    const response = await req.json();
    if (response) {
        return response.data.children;
    }
}

export default function Main({ loaderData }: Route.ComponentProps) {
    
    const posts = useMemo(() => loaderData && loaderData.map((element: Thing, index: number) => {
        return <PostCard
        key={ index }
        author={ element.data.author }
        id={ element.data.id }
        permalink={ element.data.permalink }
        num_comments={ element.data.num_comments }
        selftext={ element.data.selftext }
        subreddit={ element.data.subreddit }
        subreddit_id={ element.data.subreddit_id }
        thumbnail={ element.data.thumbnail }
        thumbnail_height={ element.data.thumbnail_height }
        thumbnail_width={ element.data.thumbnail_width }
        title={ element.data.title }
        ups={ element.data.ups }/>
    }), loaderData);
    return (
        posts
    )
}

export async function action({ request }: Route.ActionArgs) {

}