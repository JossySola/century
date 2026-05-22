import { Links, Outlet, redirect, Scripts, ScrollRestoration, useNavigate, type LinksFunction } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import type { Route } from './+types/root';
import appStylesHref from './app.css?url';
import HeaderMenu from "./ui/navbar";
import NavList from "./ui/lists/nav-list";
import Search from "./ui/inputs/search";
import { getSession, commitSession } from "./sessions.server";
import { data } from "react-router";
import Logo from "/Reddit_Logo_Wordmark_OrangeRed.svg";
import { addToast, HeroUIProvider, Spinner, ToastProvider } from "@heroui/react";
import { useEffect } from "react";
import oAuthFlow from "./utils/authorization/oauth-flow";
import fetchIdentity from "./utils/authorization/fetch-identity";
import RedditSignDropdown from "./ui/dropdown/sign";
import getUserOAuth from "./utils/authorization/get-user-oauth";

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
          <ToastProvider placement="bottom-center" maxVisibleToasts={1} toastProps={{
            classNames: {
              title: "font-['Arial']",
              description: "font-['Arial']"
            },
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
export default function App({actionData, loaderData}: Route.ComponentProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (loaderData) {
      type loaderConnection = {
        message?: string;
        error?: string;
      }
      const connectionData: loaderConnection = loaderData;
      /*if (connectionData.message) {
        addToast({
          description: connectionData.message,
          color: "success",
          shouldShowTimeoutProgress: true,
        });
      }*/
      if (connectionData.error) {
        addToast({
          description: connectionData.error,
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      } else if (connectionData.message === "redirect") {
        navigate("/");
      }
    }
  }, [loaderData]);
  return (
    <main className="flex flex-col items-center gap-3 pb-10">
      <HeaderMenu />
      <div className="absolute top-7 right-[8vw] z-10" aria-label="Sign into Reddit">
        <RedditSignDropdown
        name={loaderData.identity?.name} 
        display_name={loaderData.identity?.name_prefixed} 
        icon_img={loaderData.identity?.icon_img}
        icon_color={loaderData.identity?.icon_color}
        total_karma={loaderData.identity?.total_karma}
        gold_creddits={loaderData.identity?.gold_creddits}
        subscribers={loaderData.identity?.subscribers} />
      </div>
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
  const responseOAuth = await oAuthFlow(request, session);
  const responseIdentity = await fetchIdentity(request, session);
  return data(
    {
      message: responseOAuth instanceof Response ? "redirect" : responseOAuth.message,
      error: responseOAuth instanceof Response ? "" : responseOAuth.error,
      identity: responseIdentity,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      }
    }
  )
};
export async function action({request}: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const state = crypto.randomUUID();
    session.set("century_state", state);
    const URL = await getUserOAuth(state);
    return redirect(URL.toString(), {
        headers: {
            "Set-Cookie": await commitSession(session),
        }
    });
};
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <main className="flex flex-col items-center gap-3 pb-10">
      <HeaderMenu />
      <nav className="sm:block hidden my-5">
        <Search />
        <NavList />
      </nav>
      <section className="font-['Arial'] w-110 h-[50vh] flex flex-col justify-center items-center text-2xl text-center gap-3">
        <h3>An error has occurred 😓</h3>  
        <p>Something happened while connecting with Reddit. Please try again after some minutes.</p>
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
