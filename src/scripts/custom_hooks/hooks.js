import { useState, useEffect } from "react";
import fetchHandler from "../../cache/hook";
import redditFilter from "../redditFilter/redditFilter";

export function useProfilePicture(author, preview) {
    const [profile, setProfile] = useState("");

    if (preview) {
        return null;
    }
    
    const getUserImage = async (name) => {
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

    useEffect(() => {
        getUserImage(author).then(response => setProfile(response));
    }, []);

    return profile;
}
export function useHTMLText(body_html, id) {
    const [text, setText] = useState("");

    const decodeBody = (body) => {
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
        const textarea = document.createElement("textarea");
        textarea.innerHTML = body;
        const text = textarea.value;
        
        for (const symbol in symbols) {
            if (text.indexOf(symbol) >= 0) {
                const str = text.replaceAll(symbol, symbols[symbol]);
                return str;
            }
        }
        return text;
    }
    const insertToDiv = (decoded_body) => {
        const div = document.getElementById(id);
        if (div) div.innerHTML = decoded_body;
    }
    useEffect(() => {
        setText(decodeBody(body_html));
    }, [])
    
    if (text) insertToDiv(text);
}
export function useCacheTimer(request) {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("Custom Hook: Setting timer...")
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
        }, 300000);

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
            clearInterval(timer)};
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
export async function usePostDataFetcher(subreddit, id, title, sort) {
    
    let loggedIn = false;
    const access_token = window.localStorage.getItem("access_token");
    const publicEndpoint = `https://www.reddit.com/r/${subreddit}/comments/${id}/${title}.json`;
    const privateEndpoint = `https://oauth.reddit.com/comments/${id}/?sort=${sort}`;
    
    const privatePayload = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    try {
        const body = await fetch(privateEndpoint, privatePayload);
        const response = await body.json();
        
        if (response.length === 2 && typeof response[0] === "object" && typeof response[1] === "object") {
            loggedIn = true;
            const JSON = redditFilter(response)
            return {JSON, loggedIn};
        } else {
            throw new Error("Unauthorized");
        }
    } catch(e) {
        const body = await fetch(publicEndpoint);
        const response = await body.json();

        if(response) {
            const JSON = redditFilter(response)
            return {JSON, loggedIn};
        }
    }
}