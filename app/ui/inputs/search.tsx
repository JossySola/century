import { Button, Input } from "@heroui/react";
import { MagnifyingGlass } from "../icons";

export default function Search() {
    return <form className="w-full flex flex-row gap-3 justify-center items-center">
        <Input label="Search on Reddit" variant="bordered" endContent={ <MagnifyingGlass /> } />
        <Button color="primary"><span className="text-lg">Go</span></Button>
    </form>
}