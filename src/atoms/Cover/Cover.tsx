import React from "react"
import { Preview } from "../../types/types"
import "./Cover.css"


type Props = { preview: Preview | null };
export default function Cover ({preview}: Props) {
    const source = preview ? preview[0].source : "";
    // Used by the <Preview> component if there is a cover image available
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
