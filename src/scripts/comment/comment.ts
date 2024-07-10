const base = "https://oauth.reddit.com/api";
const access_token: string | null = window.localStorage.getItem("access_token");

export async function comment (thing_id: string, text: string) {
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
    
    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.ok === false) {
        if (response.success === false) throw new Error("Unsuccessful request from 'comment' function.");
        if (response.json && response.json.errors.length > 0) {
            console.error({
                error: response.json.errors[0][0],
                msg: response.json.errors[0][1]
            });
            throw new Error(`${response.json.errors[0][0]}: ${response.json.errors[0][1]}`);
        }
        throw new Error("Failed request from 'comment' function.");
    }
    return response;
}

export async function del (id: string) {
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
}

export async function edit (thing_id: string, text: string) {
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
}