import { useState, useEffect } from "react";
import fetchHandler from "../../cache/hook";

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

export const getRandomAvatar = () => {
    const random = Math.floor(Math.random()*7);
    switch (random) {
        case 1:
            return "/src/assets/avatar/avatar_default_1.png";
            break;
        case 2:
            return "/src/assets/avatar/avatar_default_2.png";
            break;
        case 3:
            return "/src/assets/avatar/avatar_default_3.png";
            break;
        case 4:
            return "/src/assets/avatar/avatar_default_4.png";
            break;
        case 5:
            return "/src/assets/avatar/avatar_default_5.png";
            break;
        case 6:
            return "/src/assets/avatar/avatar_default_6.png";
            break;
        case 7:
            return "/src/assets/avatar/avatar_default_7.png";
            break;
        default:
            return "/src/assets/avatar/avatar_default_1.png";
    }
}