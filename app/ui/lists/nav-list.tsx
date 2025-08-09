import { Divider } from "@heroui/react";
import { Link } from "react-router";

export default function NavList() {
    return (
        <>
            <div className="flex flex-col gap-1 mt-3 mb-3 w-full items-center">
                <Divider />
                <Divider />
            </div>
            
            <ul className="inline-flex gap-5">
                <li><Link to="/astronomy" className="font-normal">Astronomy</Link></li>
                <li><Link to="/gaming" className="font-normal">Gaming</Link></li>
                <li><Link to="/science" className="font-normal">Science</Link></li>
                <li><Link to="/sports" className="font-normal">Sports</Link></li>
                <li><Link to="/tech" className="font-normal">Tech</Link></li>
            </ul>
        </>
    )
}