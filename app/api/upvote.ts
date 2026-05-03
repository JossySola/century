'use server'
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/upvote";

export async function action({request, params}: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
}