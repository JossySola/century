import { getSession } from "~/sessions.server";
import type { Route } from "./+types/author.$name";
import decodeEntities from "~/utils/decode-entities";

export async function loader({ request, params }: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const tokenCookie = session.get("access_token");
    const req = await fetch(`https://www.reddit.com/user/${params.name}/about.json`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${tokenCookie}`,
            'Content-Type': 'application/json',
            'User-Agent': 'centurytimes/2.0',
        },
    });
    if (req.status !== 200) {
        console.error(req.status);
        console.error(req.statusText);
        throw new Error("Failed at fetching author's data");
    }
    const data = await req.json();
    return decodeEntities(data);
}