import { isRouteErrorResponse, Outlet, Scripts, ScrollRestoration } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import { authMiddleware } from "./middleware/auth";
import type { Route } from './+types/root';
import { userContext } from "./context";

export const unstable_middleware = [authMiddleware];
export async function loader({ request, context }: Route.LoaderArgs) {
    const session = context.get(userContext);
    if (session && session.access_token) {
        request.headers.append("access_token", session.access_token);
    }
}
export function HydrateFallback() {
    return <p>Loading...</p>
}
export default function App({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <h2>App</h2>
            <Outlet />
        </>
    )
}
export function Layout({
    children,
}: { 
    children: React.ReactNode
}) {
    return (
        <html>
            <head>
                <link
                rel="icon"
                href="data:image/x-icon;base64,AA"
                />
            </head>
            <body>
                <h1>Layout</h1>
                { children }
                <Analytics />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
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