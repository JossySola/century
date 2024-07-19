const generateStr = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~-_';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
function isValid (char: number): number {
    if(char > 45 && char < 48) {
        char += 2;
    } else if(char > 57 && char < 65) {
        char += 7;
    } else if(char > 90 && char < 95) {
        char += 4;
    } else if(char > 95 && char < 97) {
        char += 1;
    } else if(char > 122 && char < 126) {
        char += 3;
    } else if(char > 126) {
        const difference = char - 126;
        char = 45;
        char += difference;
    }
    return char;
}
const encrypt = (str: string): Array<string> => {
    let newStr: Array<string> = [];
    const len = str.length;
    const numPlaces = Math.floor(Math.random()*len+1);

    for(let i=0; i < str.length; i++) {
        let char = str.charCodeAt(i); // returns a number
        char += numPlaces;
        const validation = isValid(char);
        const secondVal = isValid(validation);
        const thirdVal = isValid(secondVal);
        newStr.push(String.fromCharCode(thirdVal));
    }
    return newStr;
}

interface Params {
    [index: string]: string;
    client_id: string;
    response_type: string;
    state: string;
    redirect_uri: string;
    duration: "temporary" | "permanent";
    scope: string;
}

export default async function getAuthorization () {
    const cipher  = generateStr(16);
    const state = encrypt(cipher).join('');
    window.localStorage.setItem("state", state);

    const endpoint = new URL("https://www.reddit.com/api/v1/authorize");
    const client_id = "l5_-5TT-vFgloN4_53HJoQ";

    const params: Params = {
        client_id: client_id,
        response_type: "code",
        state: state,
        redirect_uri: "https://www.centurytimes.jossysola.com/",
        duration: "temporary" as "temporary",
        scope: "edit identity read submit vote",
    }
    
    const q = new URLSearchParams(params);
    // Returns an Object with 'size': num
    const qStr = q.toString();
    // Returns the key:value pairs as Strings
    endpoint.search = qStr;
    // Assigns the 'search' Object property of "endpoint" to the string. 
    // Now console logging endpoint will return the URL Object with: '?' plus the parameters

    window.location.href = endpoint.toString();
    // Replaces the current URL the user is at with the endpoint URL as a string
}