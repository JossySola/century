import React from "react"
import { SVG } from "../../types/types"
import github from "../../assets/github-mark-white.png"
import inkscape from "../../assets/inkscape-flat-w-transp-white.svg"
import react_router from "../../assets/react-router-mark-color-inverted.svg"
import react from "../../assets/react.svg"
import typescript from "../../assets/ts-logo-128.svg"
import postman from "../../assets/2893aede23f01bfcbd2319326bc96a6ed0524eba759745ed6d73405a3a8b67a8.png"
import vite from "../../../public/vite.svg"
import vercel from "../../assets/vercel-icon-light.svg"
import mexico from "../../assets/white_mexico.svg"
import reddit from "../../assets/Reddit_Lockup_Bubble.svg"
import "./Footer.css"

export default function Footer () {
 
    return (
        <footer>
            <div className="footer-poweredwith">
                <p>Powered with </p>
                <a target="_blank" href="https://www.reddit.com/"><img src={reddit as SVG as string} alt="Reddit icon" title="Reddit"></img></a>
            </div>
            <section className="footer-technologies">

                <p>Technologies used</p>
                <div className="footer-icons">
                    <a target="_blank" href="https://github.com/"><img src={github as SVG as string} alt="Github icon" title="Github"></img></a>
                    <a target="_blank" href="https://inkscape.org/"><img src={inkscape as SVG as string} alt="Inkscape icon" title="Inkscape"></img></a>
                    <a target="_blank" href="https://reactrouter.com/en/main"><img src={react_router as SVG as string} alt="React Router icon" title="React Router"></img></a>
                    <a target="_blank" href="https://www.typescriptlang.org/"><img src={typescript as SVG as string} alt="TypeScript icon" title="TypeScript"></img></a>
                    <a target="_blank" href="https://react.dev/"><img src={react as SVG as string} alt="React icon" title="React"></img></a>
                    <a target="_blank" href="https://www.postman.com/"><img src={postman as SVG as string} alt="Postman icon" title="Postman"></img></a>
                    <a target="_blank" href="https://vitejs.dev/"><img src={vite as SVG as string} alt="Vite icon" title="Vite"></img></a>
                    <a target="_blank" href="https://vercel.com/"><img src={vercel as SVG as string} alt="Vercel icon" title="Vercel"></img></a>
                </div>
            </section>

            <details className="footer-details">
                <summary>Privacy Policy & Terms of Use</summary>
                <br></br>
                These Terms of Use and Privacy Policy (or "Terms") govern your use of this website, (hereafter, "Web Application" which refers to the URI: <a href="https://centurytimes.jossysola.com">www.centurytimes.jossysola.com</a>). You (hereafter, "the User") agree with these Terms by accessing and using the Web Application's features.
                <br></br>

                <details>
                    <summary>Privacy Policy</summary>
                    <br></br>
                    The collection and usage of data will always be for the Reddit platform communication purpose, if applicable.
                    <br></br><br></br>
                    No personal information is required by this Web Application, unless the User decides to take some actions such as submitting a comment, upvoting or downvoting a post or comment, or searching, which will direct them to the Reddit's Authorization page.
                    <br></br><br></br>
                    The User may be asked for their Reddit username and password to sign in, or sign up if the User does not have a Reddit account in order to give the Web Application permission to take actions (i.e. write and post a comment) on their behalf. However, any Authentication and/or Authorization process that requires any sensitive data from the User will always take place on Reddit's official platform.
                    <br></br><br></br>
                    The Web Application only stores data locally in cache, meaning there is no database where data is stored externally but only stored in the User’s device. The data saved in local storage is the access token and state token. The data saved in session storage is text such as a query the User typed to search before being redirected to the Reddit Authorization page, the URL path the User was at before being redirected to the Reddit Authorization page and variables referencing PNG images. The data stored in cache is data fetched from Reddit such as user profile images, posts and comments.
                    <br></br><br></br>
                    The Web Application deletes its cache every time is visited as well as every 15 minutes as long as the Web Application is open. The session storage is cleared once the data is consumed by the Web Application or when the page session ends (A page session lasts as long as the tab or the browser is open, and survives over page reloads and restores). The local storage has no expiration time, however, it can be cleared manually by the User. The way of cleaning this data depends on the browser but usually it’s done by clearing the browser data and/or cookies.
                </details>
                <details>
                    <summary>Terms of Use</summary>
                    <br></br>
                    As the Web Application main feature is the display and usage of the Reddit Services (Reddit API, "Application Programming Interface", which establishes the interaction between Reddit and third party developers who wish to use Reddit's data/features in their own applications), the User of this Web Application is bound by the <a href="https://www.redditinc.com/policies/user-agreement" target="_blank">Reddit User Agreement</a>.
                </details>
            </details>

            <div className="footer-madein">
                <p>Made with ❤️ in México</p>
                <img src={mexico as SVG as string} alt="Mexico seal"></img>
            </div>
            
        </footer>
    )
}
