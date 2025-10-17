export default function getAuthorization() {
    const state = "x";
    const endpoint = new URL("https://www.reddit.com/api/v1/authorize");
    const client_id = process.env.REDDIT_CLIENT_ID!;
    const params = {
        client_id,
        response_type: "code",
        state,
        redirect_uri: "https://centurytimes.jossysola.com",
        duration: "temporary" as "temporary",
        scope: "edit identity read submit vote",
    }
    const q = new URLSearchParams(params);
    const qStr = q.toString();
    endpoint.search = qStr;
    return { endpoint: endpoint.toString() };
}