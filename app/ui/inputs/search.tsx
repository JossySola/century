import { Button, Input } from "@heroui/react";
import { MagnifyingGlass } from "../icons";
import Logo from "/Reddit_Icon_FullColor.svg";

export default function Search() {
    return <form method="post" className="w-full flex flex-row gap-3 justify-center items-center">
        <Input 
        label="Search on Reddit" 
        variant="underlined" 
        endContent={ 
            <div className="h-full inline-flex justify-center items-center">
                <img src={Logo} width={32} alt="Reddit bubble icon" />
            </div>
        }
        classNames={{
            label: "text-sm font-sans",
            input: "h-full"
        }} />
        <Button color="primary" type="submit" size="sm"><span className="text-lg">Go</span></Button>
    </form>
}