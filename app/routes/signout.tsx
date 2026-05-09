import { getSession } from "~/sessions.server";
import type { Route } from "../api/+types/signout";
import revokeToken from "~/utils/authorization/revoke-token";
import { redirect, useFetcher } from "react-router";
import { Button } from "@heroui/react";
import { Logout } from "~/ui/icons";

export async function action({ request }: Route.ActionArgs) {
    const session = await getSession(
        request.headers.get("Cookie"),
    );
    const token = session.get("access_token");
    if (!token) return false;
    const req = await revokeToken(token);
    if (req instanceof Error) return false;
    return redirect("/");
}
export default function SignOut() {
    const fetcher = useFetcher();
    return (
        <section className="w-screen flex flex-row justify-center items-center">
            <fetcher.Form method="post" className="flex flex-col gap-5 m-5 w-96 text-center">
                <p className="font-[Geist] text-2xl">Click the button below to sign out of Reddit in this app</p>
                <Button
                type="submit"
                isDisabled={fetcher.state !== "idle" ? true : false}
                className="font-[Geist] w-full bg-[#FF4500] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium"
                radius="full" 
                endContent={ <Logout /> }>
                    {
                        fetcher.state !== "idle"
                        ? "Signing out..."
                        : "Sign Out"
                    }
                </Button>
            </fetcher.Form>
        </section>
    )
}
