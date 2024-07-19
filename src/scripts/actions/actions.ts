import {comment as commentAction} from "../comment/comment";
import getAuthorization from "../authorization/authorization";

export async function submitComment ({request}) {
    // This function is called by React Router as an action
    const data = Object.fromEntries(await request.formData());
    const url = new URL(request.url);
    const pathname = url.pathname;
    const link = pathname.slice(1,pathname.length-1);
    const comment = data['comment'];
    const parent = data['fullname'];
    const input= document.getElementById("submit-comment") as HTMLInputElement;
    input ? input.value = "" : null;
    
    if (!data['comment']) {
        return null;
    }
    
    try {
        const response = await commentAction(parent, comment);
        if (response.ok === false) {
            throw new Error("Failed fetch from 'submitComment' action.");
        }
        return response;

    } catch (error) {
        console.error(error);
        window.sessionStorage.setItem("tempLink", link);
        getAuthorization();
    }
}
export async function getCurrentUser (): Promise<string | null| undefined> {
    // This function returns the name of the current logged in Reddit user
    const access_token = window.localStorage.getItem("access_token");
    try {
        const me = await fetch(`https://oauth.reddit.com/api/me.json`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const mejson = await me.json();
        
        if (me.ok) {
            window.sessionStorage.setItem("me", mejson.data.name);
            return mejson.data.name;
        }
    } catch (e) {
        return null;
    }
}