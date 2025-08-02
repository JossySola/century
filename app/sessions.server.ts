import { createCookieSessionStorage } from "react-router";

export type Access = {
    "access_token": string;
    "token_type": "bearer";
    "expires_in": number;
    "scope": string;
    "mode": "AOO" | "IMPLICIT";
}
const { getSession, commitSession, destroySession } = createCookieSessionStorage<Access>();
export { getSession, commitSession, destroySession };