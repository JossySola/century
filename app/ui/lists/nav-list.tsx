import { Divider } from "@heroui/react";
import { NavLink } from "react-router";

export default function NavList() {
    return (
        <>
            <div className="flex flex-col gap-1 mt-3 mb-3 w-full items-center">
                <Divider />
                <Divider />
            </div>
            
            <ul className="inline-flex gap-5">
                <li><NavLink preventScrollReset to="/space" prefetch="intent" 
                className={ ({ isActive, isPending }) => (
                    isActive ? "pb-2 border-b-4 border-b-gray-700" : 
                    isPending ? "pb-2 border-b-4 transparent" :
                    ""
                )}>Space</NavLink></li>
                <li><NavLink preventScrollReset to="/gaming" prefetch="intent" 
                className={ ({ isActive, isPending }) => (
                    isActive ? "pb-2 border-b-4 border-b-gray-700" : 
                    isPending ? "pb-2 border-b-4 transparent" :
                    ""
                )}>Gaming</NavLink></li>
                <li><NavLink preventScrollReset to="/science" prefetch="intent" 
                className={ ({ isActive, isPending }) => (
                    isActive ? "pb-2 border-b-4 border-b-gray-700" : 
                    isPending ? "pb-2 border-b-4 transparent" :
                    ""
                )}>Science</NavLink></li>
                <li><NavLink preventScrollReset to="/sports" prefetch="intent" 
                className={ ({ isActive, isPending }) => (
                    isActive ? "pb-2 border-b-4 border-b-gray-700" : 
                    isPending ? "pb-2 border-b-4 transparent" :
                    ""
                )}>Sports</NavLink></li>
                <li><NavLink preventScrollReset to="/tech" prefetch="intent" 
                className={ ({ isActive, isPending }) => (
                    isActive ? "pb-2 border-b-4 border-b-gray-700" : 
                    isPending ? "pb-2 border-b-4 transparent" :
                    ""
                )}>Tech</NavLink></li>
            </ul>
        </>
    )
}