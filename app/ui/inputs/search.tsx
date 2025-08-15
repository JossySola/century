import { Button, Input } from "@heroui/react";
import Logo from "/Reddit_Icon_FullColor.svg";
import { useState } from "react";
import { Form } from "react-router";

export default function Search() {
    const [value, setValue] = useState<string>("");
    return <Form action="/" method="post" className="w-full flex flex-row gap-3 justify-center items-center">
        <Input 
        autoComplete="off"
        label="Search on Reddit" 
        name="query"
        variant="underlined" 
        value={value}
        onValueChange={setValue}
        endContent={ 
            <div className="h-full inline-flex justify-center items-center">
                <img src={Logo} width={32} alt="Reddit bubble icon" />
            </div>
        }
        classNames={{
            label: "text-sm font-sans",
            input: "h-full font-['Arial'] text-lg"
        }} />
        <Button color="primary" type="submit" size="sm"><span className="text-lg">Go</span></Button>
    </Form>
}