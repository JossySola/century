import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import { useState } from "react";
import { Link } from "react-router";
import { GamesTopic, SciencesTopic, SpookyTopic, SportsTopic, TechnologyTopic } from "./icons";
import Logo from "/Reddit_Logo_Wordmark_OrangeRed.svg";
import Search from "./inputs/search";

export default function HeaderMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
            </NavbarContent>
            <NavbarContent justify="center">
                <NavbarBrand>
                    <Link to="/">
                        <h1 className="title text-[8vw] sm:text-[2.25rem]">The 21st Century Times</h1>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarMenu className="pt-10 gap-3">
                <Search />
                <NavbarMenuItem>
                    <Link to="/space" prefetch="viewport" className="w-full font-semibold text-2xl inline-flex items-center gap-3"><SpookyTopic/> Space</Link>
                </NavbarMenuItem>
                <NavbarItem>
                    <Link to="/gaming" prefetch="viewport" className="w-full font-semibold text-2xl inline-flex items-center gap-3"><GamesTopic /> Gaming</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/science" prefetch="viewport" className="w-full font-semibold text-2xl inline-flex items-center gap-3"><SciencesTopic /> Science</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/sports" prefetch="viewport" className="w-full font-semibold text-2xl inline-flex items-center gap-3"><SportsTopic /> Sports</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/tech" prefetch="viewport" className="w-full font-semibold text-2xl inline-flex items-center gap-3"><TechnologyTopic /> Tech</Link>
                </NavbarItem>
                <div className="w-full mt-5 inline-flex items-center gap-3">
                    <span className="text-xl">Powered with </span>
                    <img src={Logo} width={64} alt="Reddit Wordmark" />
                </div>
            </NavbarMenu>
        </Navbar>
    )
}