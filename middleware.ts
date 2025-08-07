import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REDDIT_ACCESS_TOKEN_COOKIE = "_reddit_access_token";
export async function middleware(request: NextRequest) {
    try {
        let response = NextResponse.next();
        let accessToken = request.cookies.get(REDDIT_ACCESS_TOKEN_COOKIE);

        if (!accessToken) {
            console.log("No Reddit token cookie found. Fetching a new one...");
            try {
                const client_id = process.env.REDDIT_CLIENT_ID;
                const client_secret = process.env.REDDIT_CLIENT_SECRET;

                if (!client_id || !client_secret) {
                throw new Error("Reddit client ID or secret is not set in environment variables.");
                }
                const basicAuth = Buffer.from(client_id + ':' + client_secret).toString('base64');
                const tokenResponse = await fetch("https://www.reddit.com/api/v1/access_token", {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${basicAuth}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: "client_credentials",
                        // For application-only tokens, scope should be a list of read-only scopes.
                        // Using `*` is fine for now but not best practice.
                        scope: "*",
                    }),
                });
                
                if (!tokenResponse.ok) {
                    const errorText = await tokenResponse.text();
                    throw new Error(`Failed to fetch new token: ${tokenResponse.status} ${errorText}`);
                }
                const tokenData = await tokenResponse.json();
                response.cookies.set({
                    name: REDDIT_ACCESS_TOKEN_COOKIE,
                    value: tokenData.access_token,
                    httpOnly: true,
                    path: "/",
                    secure: true,
                    maxAge: tokenData.expires_in,
                });
                const requestHeaders = new Headers(request.headers);
                requestHeaders.set('cookie', response.headers.get("Set-Cookie") || "");
                const finalResponse = NextResponse.next({
                    request: {
                        headers: requestHeaders,
                    },
                });
                return finalResponse
            } catch (error) {
                console.error("Middleware token fetch failed:", error);
                return NextResponse.next();
        }
        }
        console.log("Found existing Reddit token. Proceeding with request.");
        return NextResponse.next();
    } catch (error) {
        console.error("An unhandled error occurred in the middleware:", error);
        return new Response("Internal Server Error.", { status: 500 });
    }
}
export const config = {
    matcher: ["/((?!api|_next/static|auth|_next/image|favicon.ico|assets).*)"],
};