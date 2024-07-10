import React from "react"
import "./Cover.css"

interface Props {
    preview: {
        images: [
            {
                source: {
                    height: number,
                    url: string,
                    width: number,
                }
            }
        ]
    } | null
}
export default function Cover ({preview}: Props) {
    const source = preview ? preview[0].source : "";
    
    return (
        <>
        {
            preview ? 
            <picture>
                {
                    source && <img src={source.url} className="cover-image" />
                }
            </picture> : null
        }
        </>
    )
}
