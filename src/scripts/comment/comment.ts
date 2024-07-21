import getAuthorization from "../authorization/authorization";
const base = "https://oauth.reddit.com/api";


export async function comment (thing_id: string, text: string) {
    const access_token: string | null = window.localStorage.getItem("access_token");
    const url = `${base}/comment`;
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            api_type: "json",
            recaptcha_token: "a",
            return_rtjson: "true",
            richtext_json: "",
            text: `${text}`,
            thing_id: `${thing_id}`,
        })
    }
    
    try {
        const body = await fetch(url, payload);
        const response = await body.json();
        
        if (response) {
            return response;
        }
    } catch (e) {
        return null;
    }
    
}

export async function del (id: string) {
    const access_token: string | null = window.localStorage.getItem("access_token");
    const url = `${base}/del`;
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            id,
        })
    }

    try {
        const body = await fetch(url, payload);
        const response = await body.json();
        if (response.ok === false) {
            throw new Error("Failed request from 'comment > del' function");
        }
        return response;
    } catch (e) {
        getAuthorization();
    }
}

export async function edit (thing_id: string, text: string) {
    const access_token: string | null = window.localStorage.getItem("access_token");
    const url = `${base}/editusertext`;
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            api_type: "json",
            return_rtjson: "true",
            richtext_json: "",
            text,
            thing_id,
        })
    }
    const body = await fetch(url, payload);
    const response = await body.json();
    return response;
}