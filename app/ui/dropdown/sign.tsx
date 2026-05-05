import { Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import { Logout } from "../icons";
import { Form } from "react-router";

export default function RedditSignDropdown({
    name,
    icon_img,
    display_name,
}: { name: string, icon_img: string | null, display_name: string }) {
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
                                src: icon_img ?? ""
                            }}
                            description={display_name ?? ""}
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
                        <Form method="post">
                            <Button
                            type="submit"
                            className="w-full bg-[#D93900] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium"
                            radius="full">
                                Sign in with Reddit
                            </Button>
                        </Form>
                       
                    </DropdownItem>
                }
            </DropdownMenu>
        </Dropdown>
    )
}