export default async function getAccessToken (stateSent: string, stateReceived: string, code: string) {
    const client_id = import.meta.env['VITE_CLIENT_ID'];
    const client_secret = import.meta.env['VITE_CLIENT_SECRET'];
    const encode = window.btoa(client_id + ':' + client_secret);

    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encode}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: "https://www.centurytimes.jossysola.com/"
        })
    }

    if (stateSent === stateReceived) {
        console.log(client_secret)
        const body = await fetch("https://www.reddit.com/api/v1/access_token", payload);
        const response = await body.json();
        window.localStorage.setItem("access_token", response.access_token)
        return response.access_token;
    } else {
        return null;
    }
}