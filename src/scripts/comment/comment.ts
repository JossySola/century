const base = "https://oauth.reddit.com/api";

export async function comment (thing_id: string, text: string) {
    const url = `${base}/comment`;
    const access_token: string | null = window.localStorage.getItem("access_token");
    const payload = {
        method: 'POST',
        body: new URLSearchParams({
            api_type: "json",
            recaptcha_token: "a",
            return_rtjson: "true",
            text: `${text}`,
            thing_id: `${thing_id}`,
            "uh / X-Modhash header": "zee5g23a4ac5a9277f8058a4645a84318b8de053c58ecffd94"
        })
    }
    
    const me = await fetch("https://oauth.reddit.com/api/me.json");
    console.log(await me.json())
    const response = await fetch(url, payload);
    console.log(response);
    return response;
}

export async function del (id: string) {
    const url = `${base}/del`;
    const payload = {
        method: 'POST',
        body: new URLSearchParams({
            id,
        })
    }
}

export async function edit (thing_id: string, text: string) {
    const url = `${base}/editusertext`;
    const payload = {
        method: 'POST',
        body: new URLSearchParams({
            api_type: "json",
            return_rtjson: "true",
            richtext_json: "",
            text,
            thing_id,
        })
    }
}