import { Button } from "@heroui/react";
import { useFetcher } from "react-router";

export default function SignOut() {
    const fetcher = useFetcher();
    return (
        <fetcher.Form method="post" action="/api/signout" className="w-full flex justify-center items-center">
            <Button
            type="submit"
            className="w-full bg-[#D93900] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium"
            radius="full"
            isLoading={fetcher.state !== "idle" ? true : false}
            isDisabled={fetcher.state !== "idle" ? true : false}>
                Sign out
            </Button>
        </fetcher.Form>
    )
}