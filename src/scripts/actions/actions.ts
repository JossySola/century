import {comment as commentAction} from "../comment/comment";
import getAuthorization from "../authorization/authorization";

// This function is called by React Router as an action
export async function submitComment ({request}) {
    
    // request is an object with specific properties such as: 
    // body, bodyUsed, cache, credentials, destination, headers, integrity, isHistoryNavigation, keepalive, method (POST, GET), mode, redirect, referrer, referrerPolicy, signal, targetAddressSpace, url
    const data = Object.fromEntries(await request.formData());
    // Object.fromEntries transforms a list of key-value pairs into an object
    // formData() method of the Request interface reads the request body and returns it as a promise that resolves with a FormData object
    // The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values

    const url = new URL(request.url);
    // example: http://localhost:5173/r/gaming/comments/1e8170e/10_years_ago_the_beta_for_destiny_1/
    const pathname = url.pathname;
    // example: /r/gaming/comments/1e8170e/10_years_ago_the_beta_for_destiny_1/
    const link = pathname.slice(1,pathname.length-1);
    // example: r/gaming/comments/1e8170e/10_years_ago_the_beta_for_destiny_1
    
    const comment = data['comment'];
    const parent = data['fullname'];
    const input= document.getElementById("submit-comment") as HTMLInputElement;
    input ? input.value = "" : null;
    
    if (!data['comment']) {
        return null;
    }
    
    try {
        const body = await commentAction(parent, comment);
        const response = await body.json();
        if (response.ok) {
            return response;
        }
    } catch (error) {
        window.sessionStorage.removeItem("tempLink");
        window.sessionStorage.setItem("tempLink", link);
        getAuthorization();
        return null
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