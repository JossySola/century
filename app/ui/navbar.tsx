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
                <NavbarBrand><h1 className="title text-[8vw] sm:text-[2.25rem]">The 21st Century Times</h1></NavbarBrand>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link to="/astronomy" className="w-full font-semibold">Astronomy</Link>
                </NavbarMenuItem>
                <NavbarItem>
                    <Link to="/gaming" className="w-full font-semibold">Gaming</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/science" className="w-full font-semibold">Science</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/sports" className="w-full font-semibold">Sports</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/tech" className="w-full font-semibold">Tech</Link>
                </NavbarItem>
            </NavbarMenu>
        </Navbar>
    )
}