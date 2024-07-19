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
                <div>
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

            <div className="footer-madein">
                <p>Made with 💖 in Mexico</p>
                <img src={mexico as SVG as string} alt="Mexico seal"></img>
            </div>
            
        </footer>
    )
}
