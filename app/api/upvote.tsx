import { getSession } from "~/sessions.server";
import type { Route } from "./+types/upvote";
import getAuthorization from "~/utils/get-authorization";

export async function action({request, params}: Route.ActionArgs): Promise<{response?: any, endpoint?: string, error?: string}> {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const tokenCookie = session.get("access_token");
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${tokenCookie}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            dir: params.vote,
            id: params.id,
            rank: "",
            "uh / X-Modhash header": ""
        })
    }
    try {
        const req = await fetch("https://oauth.reddit.com/api/vote", payload);
        const response = await req.json(); 
        if (!response.ok) {
            if (response.success === false) throw new Error("Unsuccessful request from 'vote' function.");
            if (response.json && response.json.errors.length > 0) {
                console.error({
                    error: response.json.errors[0][0],
                    msg: response.json.errors[0][1]
                });
                throw new Error(`${response.json.errors[0][0]}: ${response.json.errors[0][1]}`);
            }
            console.error("Failed request from 'vote' function.", response);
            throw new Error("Failed request from 'vote' function.");
        }
        return { response };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            if (error.message.includes("USER_REQUIRED")) {
                return getAuthorization();      
            }      
        }
        return { error: "An error occurred during the voting process." };
    }
}