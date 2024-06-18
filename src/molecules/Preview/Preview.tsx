import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useProfilePicture } from "../../scripts/custom_hooks/hooks"
import fetchHandler from "../../cache/hook"
import Cover from "../../atoms/Cover/Cover"
import Summary from "../../atoms/Summary/Summary"
import User from "../../atoms/User/User"
import "./Preview.css"
 
export default function Preview ({payload}) {
    const profile = useProfilePicture(payload.author);
    const images = payload.preview && payload.preview.images;

    return (
        <article>
            <User  author={payload.author} src={profile} />
            <Link to={payload.permalink}>
                <Cover preview={images ? images : null} />
                <Summary  title={payload.title}/>
            </Link>
        </article>
    )
}