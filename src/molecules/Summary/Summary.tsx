import React from "react"
import "./Summary.css"

interface Props {
    title: string;
}
export default function Summary ({title}: Props) {
 
    return (
        <section>
            <h2>{title}</h2>
        </section>
    )
}
