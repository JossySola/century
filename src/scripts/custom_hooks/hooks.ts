import { useState, useEffect } from "react";
import fetchHandler from "../../cache/hook";
import redditFilter from "../redditFilter/redditFilter";
import { Thing } from "../../types/types";

export function useProfilePicture(author: string, preview: boolean): string | null {
    const [profile, setProfile] = useState("");

    // Every time the feed first loads, it fetches the User's profile pictures.
    // However, as an example, if the API sends 29 posts, the script will fetch
    // 29 times per second (or whatever the time it takes), leading to the error
    // 'too many requests'. Returning null in this condition will be handled by
    // the corresponding component, which will place a default avatar.
    if (preview) {
        return null;
    }
    // Fetches the public JSON for a specific user. If the request is fulfilled
    // it returns the property 'snoovatar_img', which is the source of the image.
    const getUserImage = async (name: string) => {
        try {
            if (name === "[deleted]") return;
            if (name || name !== undefined) {
                const response = await fetchHandler(`https://www.reddit.com/user/${name}/about.json`);
                if (response.data) {
                    return response.data.snoovatar_img;
                }
            }
        } catch (e) {
            console.error(e);
            return null;
        }
    };
    // The hook runs after the component renders in the first mount.
    // It uses the function which returns a promise, as it uses async...await
    // Using the method '.then' we retrieve the resolved value and
    // use the hook Profile to store it.
    useEffect(() => {
        getUserImage(author).then(response => setProfile(response));
    }, []);

    return profile;
}
export function useHTMLText(body_html: string, id: string): void {
    const [text, setText] = useState("");

    const decodeBody = (body: string) => {
        // Object with ASCII symbols equivalents
        const symbols = {
            "&excl;": "!",
            "&quot;": '"',
            "&QUOT;": '"',
            "&num;": "#",
            "&dollar;": "$",
            "&percnt;": "%",
            "&amp;": "&",
            "&AMP;": "&",
            "&#39;": "'",
            "&apos;": "'",
            "&lpar;": "(",
            "&rpar;": ")",
            "&ast;": "*",
            "&midast;": "*",
            "&plus;": "+",
            "&comma;": ",",
            "&period;": ".",
            "&sol;": "/",
            "&colon;": ":",
            "&semi;": ';',
            "&lt;": "<",
            "&LT;": "<",
            "&gt;": ">",
            "&GT;": ">",
            "&quest;": "?",
            "&commat;": "@",
            "&lsqb;": "[",
            "&lbrack;": "[",
            "&rsqb;": "]",
            "&rbrack;": "]",
            "&bsol;": "\/",
            "&Hat;": "^",
            "&lowbar;": "_",
            "&UnderBar;": "_",
            "&grave;": "`",
            "&DiacriticalGrave;": "`",
            "&lcub;": "{",
            "&lbrace;": "{",
            "&verbar;": "|",
            "&vert;": "|",
            "&VerticalLine;": "|",
            "&rcub;": "}",
            "&rbrace;": "}",
            "&#x200B;": " "
        }
        // Creates a DOM element <textarea>
        const textarea = document.createElement("textarea");
        // Inserts body as text in the element created
        textarea.innerHTML = body;
        // References the text inside the element created
        const text = textarea.value;

        for (const symbol in symbols) {
            // Iterates through each key inside the object "symbols"
            if (text.indexOf(symbol) >= 0) {
                // if the "symbol" (key) is present inside <textarea>
                // it will replace the "symbol" (key) with the value
                const str = text.replaceAll(symbol, symbols[symbol]);
                return str;
            }
        }
        return text;
    }
    const insertToDiv = (decoded_body: string) => {
        // An element with a specific ID must be created in the component
        // the function will be called at.
        const div = document.getElementById(id);
        // Inserts the text that has been filtered with ASCII values
        if (div) div.innerHTML = decoded_body;
    }
    useEffect(() => {
        // Runs after the component has rendered and at the first mount
        // Sets the hook with the text that has been filtered with
        // ASCII values
        setText(decodeBody(body_html));
    }, [])
    // It inserts the hook's value inside the element that is specified
    // with the ID
    if (text) insertToDiv(text);
}
export function useCacheTimer(request: string): void {
    useEffect(() => {
        // Runs after the first render
        const timer = setInterval(() => {
            // Checks every cache in caches
            caches.keys().then(keys => {
                for (const key of keys) {
                    // for every key in cache, check if it starts with "century-"
                    // which is the prefix used in this Web App when it saves
                    // something inside the cache
                    const isOurCache = key.startsWith("century-");
                    if (isOurCache) {
                        // If the key starts with the prefix, it will delete it
                        caches.open(key).then(cache => {
                            cache.delete(request)
                        })
                    }
                }
            })
        }, 300000); // run this code every 15 minutes

        return () => {
            console.log("Cleaning custom hook timer..."); 
            caches.keys().then(keys => {
                for (const key of keys) {
                    const isOurCache = key.startsWith("century-");
                    if (isOurCache) {
                        caches.open(key).then(cache => {
                            console.log(cache)
                            cache.delete(request)
                            console.log("Custom Hook: Cache deleted")
                        })
                    }
                }
            })
            clearInterval(timer)}; // Removes Interval hook when component is unmounted
    }, [])
}
export function useFeedData(loader) {
    const [data, setData] = useState({});
    
    useEffect(() => {
        if (loader) {
            setData(loader);
        } else {
            const pathname = window.location.pathname;
            const URL = `https://www.reddit.com${pathname}.json?raw.json=1`
            console.log(pathname)
            
            async() => {
                await fetchHandler(URL).then(response => {
                    const elements = redditFilter(response);
                    setData({
                        elements,
                        URL: URL,
                        pathname: pathname
                    })
                })
            }
        }
    }, [])
    return data;
}

type hookOutput = {JSON: Thing};
export async function usePostDataFetcher(subreddit: string, id: string, title: string, sort: string): Promise<hookOutput | undefined> {
    
    let loggedIn = false;
    const access_token = window.localStorage.getItem("access_token");
    const publicEndpoint = `https://www.reddit.com/r/${subreddit}/comments/${id}/${title}.json`;
    const privateEndpoint = sort === "reply" || sort === "del" ? `https://oauth.reddit.com/comments/${id}/?sort=new` : `https://oauth.reddit.com/comments/${id}/?sort=${sort}`;
    
    const payload = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    try {
        const body = await fetch(privateEndpoint, payload);
        const response = await body.json();
        // The expected response from either of the URL endpoints above is an array with two objects
        // or in this case, two Listings. [t3, t1]
        if (response.length === 2 && typeof response[0] === "object" && typeof response[1] === "object") {
            loggedIn = true;
            const JSON = redditFilter(response);
            return {JSON};
        } else {
            throw new Error("Unauthorized");
        }
    } catch(e) {
        const body = await fetch(publicEndpoint, payload);
        const response = await body.json();

        if(response) {
            const JSON = redditFilter(response);
            return {JSON};
        }
    }
}