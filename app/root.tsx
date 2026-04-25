import { isRouteErrorResponse, Links, Outlet, Scripts, ScrollRestoration, type LinksFunction } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import type { Route } from './+types/root';
import appStylesHref from './app.css?url';
import HeaderMenu from "./ui/navbar";
import NavList from "./ui/lists/nav-list";
import Search from "./ui/inputs/search";
import { getSession, commitSession } from "./sessions.server";
import { data } from "react-router";
import type { Listing } from "./utils/types";
import Logo from "/Reddit_Logo_Wordmark_OrangeRed.svg";
import { HeroUIProvider, Spinner, ToastProvider } from "@heroui/react";
import getUserlessAuthorization from "./utils/authorization/get-userless-auth";
import tokenRetrieval from "./utils/authorization/token-retrieval";
import refreshToken from "./utils/authorization/refresh-token";
import { headers } from "happy-dom/lib/PropertySymbol";
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
}
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
}
export async function loader({request}: Route.LoaderArgs) {
  const session = await getSession(
    request.headers.get("Cookie"),
  );
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error") as "access_denied" | "unsupported_response_type" | "invalid_scope" | "invalid_request" | undefined;

  if (!session.has("access_token")) {
    // User is not authenticated, probably because it's their first visit
    const userless_auth = await getUserlessAuthorization();
    if (userless_auth) {
      session.set("access_token", userless_auth.access_token);
      session.set("access_expires_in", userless_auth.expires_in.toDateString());
      return data(
        { 
          headers: {
            'Set-Cookie': await commitSession(session),
          },
        },
      );
    }
    return data(
      { error: "Error signing userless" },
    )
  } else if (code && state === session.get("century_state")) {
    // User has been redirected after app authorization
    const auth = await tokenRetrieval({ error, code });
    if (auth) {
      session.set("access_token", auth.access_token);
      session.set("access_expires_in", auth.expires_in.toDateString());
      return data(
        {
          headers: {
            'Set-Cookie': await commitSession(session),
          },
        },
      );
    }
    return data(
      { error: "Error signing in" },
    )
  } else if (error) {
    // User has been redirected after rejecting app authorization
    return data({
      error
    });
  } else {
    // User comebacks and may have an expired token
    const expires_in = session.get("access_expires_in");
    const refresh_token = session.get("refresh_token");
    if (session.has("access_token") && expires_in &&  refresh_token) {
      const refresh = await refreshToken(expires_in, refresh_token);
      if (refresh) {
        session.set("access_token", refresh.access_token);
        session.set("access_expires_in", refresh.expires_in.toDateString());
        return data({
          headers: {
            'Set-Cookie': await commitSession(session),
          },
        });
      }
      return data(
        { error: "Failed to refresh the session" },
      )
    }
    return data(
      { error: "Failed starting the session refresh process" },
    )
  }
}
export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const query = formData.get("query")?.toString();
  const session = await getSession(
    request.headers.get("Cookie"),
  );
  const access_token = session.get("access_token");
  const response = await search(query, access_token);
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
        <p>Please give it some minutes and try again 🙏</p>
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