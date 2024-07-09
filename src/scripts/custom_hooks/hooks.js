import { useState, useEffect } from "react";
import fetchHandler from "../../cache/hook";
import { useLoaderData } from "react-router-dom";
import redditFilter from "../redditFilter/redditFilter";

export function useProfilePicture(author) {
    const [profile, setProfile] = useState("");
    
    const getUserImage = async (name) => {
        let avatar = "";
        try {
            if (name === "[deleted]") return;
            if (name || name !== undefined) {
                const response = await fetchHandler(`https://www.reddit.com/user/${name}/about.json`);
                if (response.data) avatar = response.data.snoovatar_img; 
            }
        } catch (e) {
            return getRandomAvatar();
        } finally {
            if (avatar) {
                return avatar;
            } else {
                return getRandomAvatar();
            }
        }
    }
    useEffect(() => {
        getUserImage(author).then(response => setProfile(response));
    }, [])

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
// ******************************************
export const getRandomAvatar = () => {
    const random = Math.floor(Math.random()*7);
    switch (random) {
        case 1:
            return "avatar_default_1";
            break;
        case 2:
            return "avatar_default_2";
            break;
        case 3:
            return "avatar_default_3";
            break;
        case 4:
            return "avatar_default_4";
            break;
        case 5:
            return "avatar_default_5";
            break;
        case 6:
            return "avatar_default_6";
            break;
        case 7:
            return "avatar_default_7";
            break;
        default:
            return "avatar_default_1";
    }
}