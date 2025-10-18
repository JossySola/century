export default function getAuthorization() {
    const state = "x";
    const endpoint = new URL("https://www.reddit.com/api/v1/authorize");
    const client_id = process.env.REDDIT_CLIENT_ID!;
    const params = {
        client_id,
        response_type: "code",
        state,
        redirect_uri: "http://localhost:5173",
        duration: "permanent",
        scope: "edit identity read submit vote",
    }
    const q = new URLSearchParams(params);
    const qStr = q.toString();
    endpoint.search = qStr;
    return { endpoint: endpoint.toString() };
}