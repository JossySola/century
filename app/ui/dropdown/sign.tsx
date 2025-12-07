import { Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Logout } from "../icons";

export default function RedditSignDropdown() {
    const fetcher = useFetcher();
    const [name, setName] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    useEffect(() => {
        fetcher.load("/api/me");
        console.log("Loading user info from /api/me", fetcher.data);
    }, []);
    useEffect(() => {
        if (fetcher.data) {
            console.log("Fetcher data for user info:", fetcher.data);
            setName(fetcher.data.user || "");
            setDisplayName(fetcher.data.displayName || "");
            setAvatar(fetcher.data.avatar || "");
        }
    }, [fetcher.data]);
    return (
        <Dropdown>
            <DropdownTrigger>
                <div>
                    <Badge 
                    color={name ? "success" : "default"} 
                    content="" 
                    placement="bottom-right" 
                    size="sm"
                    shape="circle">
                        <Avatar as="button" className="w-8 h-8" src="Reddit_Icon_FullColor.webp" />
                    </Badge>
                </div>
            </DropdownTrigger>
            <DropdownMenu 
            aria-label="Static Actions">
                {
                    name 
                    ? <>
                        <DropdownItem key="user-info" className="data-[hover=true]:bg-transparent">
                            <User
                            avatarProps={{
                                src: avatar
                            }}
                            description={displayName ?? ""}
                            name={name} />
                        </DropdownItem>
                        <DropdownItem key="sign-out" className="data-[hover=true]:bg-transparent">
                            <Button
                            className="w-full bg-[#FF4500] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium"
                            radius="full" 
                            endContent={ <Logout /> }
                            onPress={async () => {
                                await fetch("/api/signout", { method: "POST" });
                                window.location.reload();
                            }}>
                                Sign out
                            </Button>                        
                        </DropdownItem>
                    </>
                    : <DropdownItem key="sign-in" className="data-[hover=true]:bg-transparent">
                        <Button
                        className="w-full bg-[#D93900] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium"
                        radius="full" 
                        onPress={async () => {
                            const endpoint = await fetch("/api/authorize", { method: "POST" });
                            const response = await endpoint.json();
                            window.location.href = response.endpoint;
                        }}>
                            Sign in with Reddit
                        </Button>                        
                    </DropdownItem>
                }
            </DropdownMenu>
        </Dropdown>
    )
}