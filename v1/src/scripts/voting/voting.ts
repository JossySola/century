import getAuthorization from "../authorization/authorization";
const base = "https://oauth.reddit.com/api";

export async function vote (id: string, dir: "1" | "0" | "-1") {
    const url = `${base}/vote`;
    const access_token: string | null = window.localStorage.getItem("access_token");
    const payload = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            dir,
            id,
            rank: "",
            "uh / X-Modhash header": ""
        })
    }
    
    try {
        const body = await fetch(url, payload);
        const response = await body.json();
        if (response.ok === false) {
            if (response.success === false) throw new Error("Unsuccessful request from 'vote' function.");
            if (response.json && response.json.errors.length > 0) {
                console.error({
                    error: response.json.errors[0][0],
                    msg: response.json.errors[0][1]
                });
                throw new Error(`${response.json.errors[0][0]}: ${response.json.errors[0][1]}`);
            }
            throw new Error("Failed request from 'vote' function.");
        }
        return response;
    } catch (error) {
        console.error(error);
        getAuthorization();
    }
}