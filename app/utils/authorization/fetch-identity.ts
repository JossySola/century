'use server'
import { getSession } from "~/sessions.server";
import type { IdentityResponse } from "../types";
import getMe from "../querying/get-me";

type IdentityType = {
    name: string | undefined,
    icon_img: string | undefined,
    name_prefixed: string | undefined,
    icon_color: string | undefined,
    total_karma: number | undefined,
    gold_creddits: number | undefined,
    subscribers: number | undefined,
}
export default async function fetchIdentity(request: Request): Promise<IdentityType | null> {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.get("access_token");
    if (!access_token) return null;
    const response: IdentityResponse = await getMe(access_token);
    const identity = {
        name: response.name ?? undefined,
        icon_img: response.icon_img ?? undefined,
        name_prefixed: response.subreddit?.display_name_prefixed ?? undefined,
        icon_color: response.subreddit?.icon_color ?? undefined,
        total_karma: response.total_karma ?? undefined,
        gold_creddits: response.gold_creddits ?? undefined,
        subscribers: response.subreddit?.subscribers ?? 0,
    }
    return identity;
}