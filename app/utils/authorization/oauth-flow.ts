'use server'
import { getSession } from "~/sessions.server";
import getAppOnlyOAuthorization from "./get-app-only-oauth";
import refreshToken from "./refresh-token";
import tokenRetrieval from "./token-retrieval";

export default async function oAuthFlow(
    request: Request
): Promise<{ message?: string, error?: string }> {
const session = await getSession(
    request.headers.get("Cookie"),
  );
  const url = new URL(request.url);
  const stateFromParams = url.searchParams.get("state");
  const stateFromCookies = session.get("century_state");
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error") as "access_denied" | "unsupported_response_type" | "invalid_scope" | "invalid_request" | undefined;

  console.log("⏳ Starting...")
  console.log("⏳ Checking 'state' in params...")
  if (stateFromParams) {
    console.log("✅ State exists!")
    console.log("⏳ Checking if state from params and state from cookies are the same...")
    if (stateFromParams === stateFromCookies) {
      console.log("✅ State sent and State received are the same!")
      if (code) {
        console.log("⏳ Code exists!, starting token retrieval...")
        const token = await tokenRetrieval({error, code});
        if (token instanceof Error) return { error: "Token could not be retrieved" };
        session.set("access_token", token.access_token);
        session.set("access_expires_in", token.expires_in.toString());
        console.log("✅ Settings up cookies and exiting.")
        return {
            message: "You successfully signed in with Reddit!"
        }
      }
      if (error) {
        console.log("🚨 Error exists...")
        // "error" is included in the URL's params
        // If an access token is already present, return
        if (session.has("access_token")) {
          console.log("✅ Access token exists, exiting.")
          return { error: "Failed Reddit Authorization. Backing up with userless permissions." };
        };
        // If the error message includes "access_denied", it means the user chose not to grant the app permissions
        if (error.includes("access_denied")) console.log("⚠️ User denied authorization, exiting...");
        // If there is no access token, and the authorization failed
        // make a fallback with App Only OAuth flow
        console.log("⏳ Starting App Only OAuthorization flow")
        const authorize = await getAppOnlyOAuthorization();
        if (authorize instanceof Error || authorize.error) return { error: "Failed at App Only Authorization" };
        session.set("access_token", authorize.access_token);
        session.set("access_expires_in", authorize.expires_in.toString());
        console.log("✅ Setting up cookies and exiting.")
        return { 
            error: "Failed Reddit Authorization. Backing up with userless permissions."
        }
      }
      console.log("✅ State exists but not other valid param, exiting.")
      return { message: "Reddit connected!" };
    } else {
      console.log("🚨 States are not the same. Preventing XSF and exiting.")
      return { error: "Reddit may not be connected" };
    }
  } else {
    console.log("⏳ State does not exist on params...")
    console.log("⏳ Checking if access token exists...")
    if (session.has("access_token")) {
      console.log("✅ Access token exists...")
      console.log("⏳ Checking if access token is expired...")
      const refresh_token = session.get("refresh_token");
      if (refresh_token) {
        console.log("✅ Refresh token exists...")
        const expire_date = session.get("access_expires_in");
        if (expire_date && Number.parseInt(expire_date) < Date.now()) {
          console.log("⚠️ Token has expired...")
          console.log("⏳ Refreshing token...")
          const response = await refreshToken(expire_date, refresh_token);
          if (response instanceof Error) return { error: "Token could not be refreshed" };
          session.set("access_token", response.access_token);
          session.set("access_expires_in", response.expires_in.toString());
          console.log("✅ Setting up cookies and exiting.")
          return {
            message: "Reddit connection refreshed!",
          }
        }
        console.log("✅ Token hasn't expired. Exiting.")
        return { message: "Reddit connected!" };
      } else {
        console.log("✅ Refresh token does not exist because the app may be using the App Only OAuth flow. Exiting.")
        return { message: "Reddit connected!" };
      }
    }
    console.log("⏳ Starting App Only OAuthorization flow")
    const authorize = await getAppOnlyOAuthorization();
    if (authorize instanceof Error || authorize.error) return { error: "Failed at App Only Authorization" };
    session.set("access_token", authorize.access_token);
    session.set("access_expires_in", authorize.expires_in.toString());
    console.log("✅ Setting up cookies and exiting.")
    return {
        message: "Reddit connected!"
    };
  }
}