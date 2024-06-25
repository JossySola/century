export default async function getAccessToken (stateSent: string, stateReceived: string, code: string) {
    const client_id = "l5_-5TT-vFgloN4_53HJoQ";
    const client_secret = "YwEIj2KTi75cC3RciATZKW9Yup3JZQ";
    const encode = window.btoa(client_id + ':' + client_secret);

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${encode}`
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            code,
            redirect_uri: "http://localhost:5173/"
        })
    }

    if (stateSent === stateReceived) {
        const body = await fetch("https://www.reddit.com/api/v1/access_token", payload);
        const response = await body.json();
        window.localStorage.setItem("access_token", response.access_token)
        return response.access_token;
    } else {
        return null;
    }
}