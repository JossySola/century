const base = "https://oauth.reddit.com/api";

export async function vote (id: string, dir: "1" | "0" | "-1") {
    const url = `${base}/api/vote`;

    const payload = {
        method: 'POST',
        body: new URLSearchParams({
            dir,
            id,
            rank: "",
            "uh / X-Modhash header": ""
        })
    }

}