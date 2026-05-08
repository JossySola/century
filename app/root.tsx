import { Links, Outlet, Scripts, ScrollRestoration, type LinksFunction } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import type { Route } from './+types/root';
import appStylesHref from './app.css?url';
import HeaderMenu from "./ui/navbar";
import NavList from "./ui/lists/nav-list";
import Search from "./ui/inputs/search";
import { getSession, commitSession } from "./sessions.server";
import { data } from "react-router";
import Logo from "/Reddit_Logo_Wordmark_OrangeRed.svg";
import { HeroUIProvider, Spinner, ToastProvider } from "@heroui/react";
import getAppOnlyOAuthorization from "./utils/authorization/get-app-only-oauth";
import tokenRetrieval from "./utils/authorization/token-retrieval";
import refreshToken from "./utils/authorization/refresh-token";
import search from "./utils/querying/search";

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
};
export default function App({actionData}: Route.ComponentProps) {
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
};
export async function loader({request}: Route.LoaderArgs) {
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
        console.log("✅ Code exists!, starting token retrieval...")
        const token = await tokenRetrieval({error, code});
        if (token instanceof Error) return data({ error: "Token could not be retrieved" }, { status: 500, statusText: "Internal Server Error" });
        session.set("access_token", token.access_token);
        session.set("access_expires_in", token.expires_in.toString());
        console.log("✅ Settings up cookies and exiting.")
        return data(
          {},
          {
            headers: {
              "Set-Cookie": await commitSession(session),
            },
            status: 200
          },
        );
      }
      if (error) {
        console.log("🚨 Error exists...")
        // "error" is included in the URL's params
        // If an access token is already present, return
        if (session.has("access_token")) {
          console.log("✅ Access token exists, exiting.")
          return data({}, { status: 200 })
        };
        // If the error message includes "access_denied", it means the user chose not to grant the app permissions
        if (error.includes("access_denied")) console.log("⚠️ User denied authorization, exiting...");
        // If there is no access token, and the authorization failed
        // make a fallback with App Only OAuth flow
        console.log("⏳ Starting App Only OAuthorization flow")
        const authorize = await getAppOnlyOAuthorization();
        if (authorize instanceof Error || authorize.error) return data({ error: "Failed at App Only Authorization" }, { status: 400, statusText: "Bad Request" });
        session.set("access_token", authorize.access_token);
        session.set("access_expires_in", authorize.expires_in.toString());
        console.log("✅ Setting up cookies and exiting.")
        return data(
          { error: "Failed Reddit Authorization. Backing up with userless permissions."},
          {
            headers: {
              "Set-Cookie": await commitSession(session),
            },
          },
        );
      }
      console.log("✅ State exists but not other valid param, exiting.")
      return data({}, {status: 200});
    } else {
      console.log("🚨 States are not the same. Preventing XSF and exiting.")
      return data({}, { status: 401 });
    }
  } else {
    console.log("⏳ State does not exist on params...")
    console.log("⏳ Checking if access token exists...")
    if (session.has("access_token")) {
      console.log("✅ Access token exists...")
      console.log("✅ Checking if access token is expired...")
      const refresh_token = session.get("refresh_token");
      if (refresh_token) {
        console.log("✅ Refresh token exists...")
        const expire_date = session.get("access_expires_in");
        if (expire_date && Number.parseInt(expire_date) < Date.now()) {
          console.log("⚠️ Token has expired...")
          console.log("⏳ Refreshing token...")
          const response = await refreshToken(expire_date, refresh_token);
          if (response instanceof Error) return data({ error: "Token could not be refreshed" }, { status: 500, statusText: "Internal Server Error" });
          session.set("access_token", response.access_token);
          session.set("access_expires_in", response.expires_in.toString());
          console.log("✅ Setting up cookies and exiting.")
          return data(
            {},
            {
              headers: {
                "Set-Cookie": await commitSession(session),
              },
              status: 200
            },
          );
        }
        console.log("✅ Token hasn't expired. Exiting.")
        return data({}, {status: 200});
      } else {
        console.log("✅ Refresh token does not exist because the app may be using the App Only OAuth flow. Exiting.")
        return data({}, {status: 200});
      }
    }
    console.log("⏳ Starting App Only OAuthorization flow")
    const authorize = await getAppOnlyOAuthorization();
    if (authorize instanceof Error || authorize.error) return data({ error: "Failed at App Only Authorization" }, { status: 400, statusText: "Bad Request" });
    session.set("access_token", authorize.access_token);
    session.set("access_expires_in", authorize.expires_in.toString());
    console.log("✅ Setting up cookies and exiting.")
    return data(
      {},
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }
};
export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const query = formData.get("query")?.toString();
  const session = await getSession(
    request.headers.get("Cookie"),
  );
  const access_token = session.get("access_token");
  const response = await search(query, access_token);
  return response;
};
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <main className="flex flex-col items-center gap-3 pb-10">
      <HeaderMenu />
      <nav className="sm:block hidden my-5">
        <Search />
        <NavList />
      </nav>
      <section className="font-['Arial'] w-full h-[50vh] flex flex-col justify-center items-center text-2xl text-center gap-3">
        <p>An error has occurred 😓</p>  
        <p>{`${(error as any).message}`}</p>
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
};
export function HydrateFallback() {
    return <Spinner size="lg" color="primary" label="Loading..." />
};