import { isRouteErrorResponse, Link, Links, Outlet, Scripts, ScrollRestoration, type LinksFunction } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import type { Route } from './+types/root';
import appStylesHref from './app.css?url';
import HeaderMenu from "./ui/navbar";
import NavList from "./ui/lists/nav-list";
import Search from "./ui/inputs/search";
import {
  getSession,
  commitSession,
} from "./sessions.server";
import { data } from "react-router";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];
export function Layout({
    children,
}: { 
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
              <title>21st Century Times</title>
              <link rel="icon" type="image/svg+xml" href="/century.svg" />
              <meta charSet="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta name="description" content="Inspired by The New York Times, I present 'The 21st Century Times', working with the Reddit API, it features popular Subreddits dedicated to worldwide news, technology, sports, astronomy, science & gaming. The user is also able to search, upvote, downvote and comment on specific Subreddits." />
              <meta property="og:url" content="https://www.centurytimes.jossysola.com/" />
              <meta property="og:type" content="website" />
              <meta property="og:title" content="The 21st Century Times" />
              <meta property="og:description" content="Web Application using the Reddit API to display worldwide news and articles about technology, sports, astronomy, science and gaming. Searching subreddits is enabled." />
              <meta property="og:image" content="https://centurytimes.jossysola.com/banner.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="twitter:domain" content="centurytimes.jossysola.com" />
              <meta property="twitter:url" content="https://www.centurytimes.jossysola.com/" />
              <meta name="twitter:title" content="The 21st Century Times" />
              <meta name="twitter:description" content="Web Application using the Reddit API to display worldwide news and articles about technology, sports, astronomy, science and gaming. Searching subreddits is enabled." />
              <meta name="twitter:image" content="https://centurytimes.jossysola.com/banner.png"></meta>
              <Links />
            </head>
            <body className="flex flex-col items-center gap-3 p-3">
                
                  { children }
                  
                <Analytics />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}
export async function loader({request}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const access_token = session.has("access_token");

    if (!access_token) {
        const client_id = process.env.REDDIT_CLIENT_ID;
        const client_secret = process.env.REDDIT_CLIENT_SECRET;
        const encode = Buffer.from(client_id + ':' + client_secret).toString('base64');
        const req = await fetch("https://www.reddit.com/api/v1/access_token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${encode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': "centurytimes/2.0",
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                scope: "*"
            })
        });
        if (req.status !== 200) {
            throw new Error("Failed at fetching subreddits");
        }
        const res = await req.json();
        session.set("access_token", res.access_token);
        session.set("access_mode", "userless");
        return data(
            { error: session.get("error") },
            { 
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            },
        );
    }
    return data(
        { error: session.get("error") },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
}
export default function App() {
  return (
      <>
        <HeaderMenu />
        <nav className="sm:block hidden my-5">
          <Search />
          <NavList />
        </nav>
        <Outlet />
      </>
  )
}
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
export function HydrateFallback() {
    return <p>Loading...</p>
}