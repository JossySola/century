import { Button } from "@heroui/react";
import { Form, useNavigation } from "react-router";

export default function SignOut() {
    const navigation = useNavigation();
    const isSigningOut =
        navigation.state !== "idle" &&
        navigation.formAction === "/api/signout";

    return (
        <Form method="post" action="/api/signout" className="w-full flex justify-center items-center">
            <Button
            type="submit"
            className="w-full bg-[#D93900] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium"
            radius="full"
            isLoading={isSigningOut}
            isDisabled={isSigningOut}>
                Sign out
            </Button>
        </Form>
    )
}
