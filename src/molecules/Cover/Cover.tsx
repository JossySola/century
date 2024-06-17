import React from "react"
import "./Cover.css"

interface Props {
    preview: [
        {
            id: string,
            resolutions: Array<object>,
            source: {
                height: number,
                url: string,
                width: number,
            },
            variants: object
        }
    ] | null
}
export default function Cover ({preview}: Props) {
    const source = preview && preview[0].source;
    
    return (
        <>
        {
            preview ? 
            <picture>
                <img src={source ? source.url : ""} style={source ? {width: source.width, height: "auto", maxWidth: "732px"} : {display: "none"}}/>
            </picture> : null
        }
        </>
    )
}
