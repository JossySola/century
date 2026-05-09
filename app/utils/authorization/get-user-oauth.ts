'use server'
export default async function getUserOAuth(state: string): Promise<URL | Error> {
    try {
        if (!state) throw new Error("Empty state");
        const client_id = process.env.REDDIT_CLIENT_ID;
        if (!client_id) throw new Error("Empty client id");
        const endpoint = new URL("https://www.reddit.com/api/v1/authorize");
        endpoint.search = new URLSearchParams({
            client_id,
            response_type: "code",
            state,
            redirect_uri: "http://localhost:5173",
            duration: "permanent",
            scope: "edit identity read submit vote"
        }).toString();
        return endpoint;
    } catch (error: any) {
        console.error("Error at getUserOAuth", error.message);
        throw new Error("Error attempting to sign in");
    }
}