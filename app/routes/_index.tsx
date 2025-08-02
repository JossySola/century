import { NavLink } from "react-router";
import type { Route } from "./+types/_index";
import { userContext } from "../context";

export async function loader({ context }: Route.LoaderArgs) {
    //console.log(context.get(userContext))
}

export default function Main({ loaderData }: Route.ComponentProps) {
    return (
        <NavLink 
        to="/" 
        className={({ isActive, isPending, isTransitioning }) => 
            [
                isPending ? "pending" : "",
                isActive ? "active" : "",
                isTransitioning ? "transitioning" : "",
            ].join(" ")
        }>Main</NavLink>
    )
}

export async function action({ request }: Route.ActionArgs) {

}