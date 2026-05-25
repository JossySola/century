import { Button, Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Search() {
    const navigate = useNavigate();
    const [value, setValue] = useState<string>("");

    const handleSubmit = () => {
        navigate({
            pathname: "/search",
            search: `?q=${value}`
        });
    }
    return <form 
    className="w-full flex flex-row gap-3 justify-center items-center"
    action={handleSubmit}>
        <Input 
        autoComplete="off"
        label="Search on Reddit" 
        name="query"
        variant="underlined" 
        value={value}
        onValueChange={setValue}
        classNames={{
            label: "text-sm font-sans",
            input: "h-full font-['Arial'] text-lg"
        }} />
        <Button 
        color="primary" 
        type="submit" 
        size="sm">
            <span className="text-lg">Go</span>
        </Button>
    </form>
}