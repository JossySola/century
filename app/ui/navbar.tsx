import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router";

export default function HeaderMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
            </NavbarContent>
            <NavbarContent justify="center">
                <NavbarBrand><h1 className="title">The 21st Century Times</h1></NavbarBrand>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link to={"#"} className="w-full">Science</Link>
                </NavbarMenuItem>
                <NavbarItem>
                    <Link to={"#"} className="w-full">Technology</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to={"#"} className="w-full">Sports</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to={"#"} className="w-full">Astronomy</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to={"#"} className="w-full">Gaming</Link>
                </NavbarItem>
            </NavbarMenu>
        </Navbar>
    )
}