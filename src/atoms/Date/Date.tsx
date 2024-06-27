import React, { useEffect, useState } from "react"
import "./Date.css"
 
export default function _Date () {
    const [timestamp, setTimeStamp] = useState(Date.now());

    useEffect(() => {
        const now = setInterval(() => {
            setTimeStamp(Date.now());
        }, 1000);

        return () => clearInterval(now);
    })
 
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    const now = new Date(timestamp);
    const day = days[now.getDay()];
    const dayNum = now.getDate().toString();
    const month = months[now.getMonth()];
    const year = now.getFullYear().toString();
    const hour = now.getHours().toString();
    const minutes = now.getMinutes().toString();


    return (
        <span id='date'>{`${day}, ${month} ${dayNum}, ${year} ${hour}:${minutes}`}</span>
    )
}
