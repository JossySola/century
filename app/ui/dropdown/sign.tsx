import { Avatar, Badge, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import { Logout } from "../icons";
import { Form, Link, redirect } from "react-router";

export default function RedditSignDropdown({
    name,
    icon_img,
    display_name,
    icon_color,
    total_karma,
    gold_creddits,
    subscribers,
}: { name?: string, icon_img?: string | null, display_name?: string, icon_color?: string, total_karma?: number, gold_creddits?: number, subscribers?: number }) {
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
                                src: icon_img ?? "",
                            }}
                            description={display_name ?? ""}
                            name={name} />
                        </DropdownItem>
                        <DropdownItem key="user-subscribers">
                            <p className="text-gray-600">Subscribers: {subscribers}</p>
                        </DropdownItem>
                        <DropdownItem key="user-karma">
                            <p className="text-gray-600">Karma: {total_karma}</p>
                        </DropdownItem>
                        <DropdownItem key="user-gold-creddits">
                            <p className="text-gray-600">Gold Creddits: {gold_creddits}</p>
                        </DropdownItem>
                        <DropdownItem key="sign-out" className="data-[hover=true]:bg-transparent">
                            <Link
                            className="bg-[#FF4500] text-white hover:bg-[#e03d02] active:bg-[#B32D00] focus:ring-[#FF4500] font-medium rounded-2xl p-2 flex flex-row gap-2 w-fit justify-center items-center"
                            to="/signout">
                                Sign out
                                <Logout />
                            </Link>
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