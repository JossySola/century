import { isRouteErrorResponse, Links, Outlet, Scripts, ScrollRestoration, type LinksFunction } from "react-router";
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
import type { Listing } from "./utils/types";
import Logo from "/Reddit_Logo_Wordmark_OrangeRed.svg";
import { HeroUIProvider, Spinner, ToastProvider } from "@heroui/react";

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
              <title>The 21st Century Times</title>
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
                <HeroUIProvider>
                  <ToastProvider placement="bottom-center" toastProps={{
                    classNames: {
                      title: "font-['Arial']",
                      description: "font-['Arial']"
                    }
                  }} />
                  { children }
                </HeroUIProvider>
                <Analytics />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}
export default function App({ actionData }: Route.ComponentProps) {
  return (
      <main className="flex flex-col items-center gap-3 pb-10">
        <HeaderMenu />
        <nav className="sm:block hidden my-5">
          <Search />
          <NavList />
        </nav>
        <Outlet context={actionData} />
        <div className="w-full mt-5 flex flex-row justify-center items-center gap-3">
                    <span className="text-xl text-gray-600">Powered with </span>
                    <img src={Logo} width={64} alt="Reddit Wordmark" />
                </div>
        <footer className="fixed bottom-0 p-y-5 w-full z-15 backdrop-blur-sm">
          <p className="font-['Arial'] w-full text-center">Made with ❤️ in Mexico</p>
        </footer>
      </main>
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
      throw new Error("Failed at getting a token");
    }
    const res = await req.json();
    session.set("access_token", res.access_token);
    session.set("access_mode", "userless");
    session.set("access_expires_in", (Date.now() + res.expires_in * 1000).toString());
    return data(
      { error: session.get("error") },
      { 
        headers: {
            "Set-Cookie": await commitSession(session),
        },
      },
    );
  }
  const token = session.get("access_token");
  const expiry = session.get("access_expires_in");

  if (expiry && Date.now() >= parseInt(expiry)) {
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
          grant_type: `refresh_token&refresh_token=${token}`,
          scope: "*"
      })
    });
    if (req.status !== 200) {
      throw new Error("Failed at getting a token");
    }
    const res = await req.json();
    session.set("access_token", res.access_token);
    session.set("access_mode", "userless");
    session.set("access_expires_in", (Date.now() + res.expires_in * 1000).toString());
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
export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const query = formData.get("query");
  const session = await getSession(
    request.headers.get("Cookie"),
  );
  const access_token = session.get("access_token");
  if (!query) {
    throw new Error("No query provided");
  }
  if (!access_token) {
    throw new Error("No token");
  }
  const endpoint = new URL("https://oauth.reddit.com/subreddits/search");
  const params = new URLSearchParams(endpoint.search);
  params.append("limit", '15');
  params.append("show", 'all');
  params.append("show_users", 'true');
  params.append("sort", 'relevance');
  params.append("typeahead_active", 'None');
  params.append("q", `${query.toString()}`);
  endpoint.search = params.toString();
  const req = await fetch(endpoint, {
    method: "GET",
    headers: {
    "Authorization": `Bearer ${access_token}`,
    "User-Agent": "centurytimes/2.0",
    "Content-Type": "application/json"
    }
  })
  if (req.status !== 200) {
    console.error(req.statusText);
    console.error(req.status);
    throw new Error("Error while searching query");
  }
  const response: Listing = await req.json();
  return response;
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
    <main className="flex flex-col items-center gap-3 pb-10">
      <HeaderMenu />
      <nav className="sm:block hidden my-5">
        <Search />
        <NavList />
      </nav>
      <section className="font-['Arial'] w-full h-[50vh] flex flex-col justify-center items-center text-2xl text-center gap-3">
        <h1 className="font-['Arial']">{message}</h1>
        <p>An error has occurred 😓</p>  
        <p>Sometimes Reddit gets tired of sending data 😒</p>  
      </section>
      <div className="w-full mt-5 flex flex-row justify-center items-center gap-3 fixed bottom-10">
          <span className="text-xl text-gray-600">Powered with </span>
          <img src={Logo} width={64} alt="Reddit Wordmark" />
      </div>
      <footer className="fixed bottom-0 p-y-5 w-full z-15 backdrop-blur-sm">
        <p className="font-['Arial'] w-full text-center">Made with ❤️ in Mexico</p>
      </footer>
    </main>
  )
}
export function HydrateFallback() {
    return <Spinner size="lg" color="primary" label="Loading..." />
}