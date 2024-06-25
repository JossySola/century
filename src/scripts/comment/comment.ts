const base = "https://oauth.reddit.com";

export async function comment (thing_id: string, text: string) {
    const url = `${base}/api/comment`;
    const access_token: string | null = window.localStorage.getItem("access_token");
    const payload = {
        method: 'POST',
        body: new URLSearchParams({
            api_type: "json",
            recaptcha_token: "",
            return_rtjson: "true",
            richtext_json: "",
            text,
            thing_id,
        })
    }
}

export async function del (id: string) {
    const url = `${base}/api/del`;
    const payload = {
        method: 'POST',
        body: new URLSearchParams({
            id,
        })
    }
}

export async function edit (thing_id: string, text: string) {
    const url = `${base}/api/editusertext`;
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