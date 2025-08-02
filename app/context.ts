import { unstable_createContext } from "react-router";

interface Userless {
    "access_token": string;
    "token_type": "bearer";
    "expires_in": number;
    "scope": string;
    "mode": "AOO";
}
export const userContext = unstable_createContext<Userless | null>(null);