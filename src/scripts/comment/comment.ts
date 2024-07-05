const base = "https://oauth.reddit.com/api";

export async function comment (thing_id: string, text: string) {
    const url = `${base}/comment`;
    const access_token: string | null = window.localStorage.getItem("access_token");
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            api_type: "json",
            //recaptcha_token: "a",
            //return_rtjson: "false",
            //richtext_json: "",
            //text: `${text}`,
            //thing_id: `${thing_id}`,
            //"uh / X-Modhash header": `5botvt3ctoccdf6514070278fdb8a46d705dd23efa58ceb152`
        })
    }
    
    const me = await fetch(`${base}/v1/me`);
    const m = await me.json();
    const body = await fetch(url, payload);
    const response = await body.json();
    console.log(response)

    if (!response.ok) {
        if (response.success === false) throw new Error("Unsuccessful request.")
        if (response.json && response.json.errors) {
            console.error({
                error: response.json.errors[0][0],
                msg: response.json.errors[0][1]
            })
            throw new Error(`${response.json.errors[0][0]}: ${response.json.errors[0][1]}`)
        }
        throw new Error("Failed request.");
    }
}

export async function del (id: string) {
    const url = `${base}/del`;
    const payload = {
        method: 'POST',
        body: new URLSearchParams({
            id,
            "uh / X-Modhash header": "zee5g23a4ac5a9277f8058a4645a84318b8de053c58ecffd94"
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
            "uh / X-Modhash header": "zee5g23a4ac5a9277f8058a4645a84318b8de053c58ecffd94"
        })
    }
}