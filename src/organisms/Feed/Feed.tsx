import React, { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import "./Feed.css"
 
export default function Feed () {
    const data: any = useLoaderData();
    
    useEffect(() => {
        const timer = setInterval(() => {
            caches.keys().then(keys => {
                for (const key of keys) {
                    const isOurCache = key.startsWith("century-");
                    if (isOurCache) {
                        caches.open(key).then(cache => {
                            cache.delete(data.url).then(response => console.log(response))
                        })
                    }
                }
            })
        }, 300000);

        return () => clearInterval(timer);
    }, [])

    console.log(data)

    return (<></>)
}
