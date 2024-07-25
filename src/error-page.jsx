import { useRouteError } from "react-router-dom";
import "./error-page.css";

export default function ErrorPage () {
    const error = useRouteError();
    return (
        <div>
            {
                error.ok === undefined && error.status === undefined && error.url === undefined ? 
                <>
                    <h2>A Tracking Protection may be preventing the page to display data.</h2>
                    <p>This website retrieves data from www.reddit.com, this is called a <b>"third-party request"</b>. Tracking Protections may block third-party requests that could potentially track the user. To display the website properly, <b>disable the Tracking Protection</b> in your browser only for this website specifically.</p>
                    <p>______________________________________________________</p>
                    <p>Este sitio web recibe información de la plataforma www.reddit.com, a esto se le conoce como <b>"solicitud de terceros"</b>. Las Protecciones de Rastreo pueden bloquear solicitudes de terceros que consideren como rastreadores. Para continuar, necesitarás <b>deshabilitar la protección de rastreo</b> solo para este sitio web.</p>
                </> : 
                <div className="error-page">
                    <h2>Sorry, an unexpected error has occurred :'(</h2>
                    <h3>This may be due to:</h3>
                        <ul>
                            <li>A weak or null <b>Internet connection</b></li>
                                <ul>
                                    <li>Check your Internet connection (Wi-Fi, Cellular Data or Ethernet connection).</li>
                                </ul>
                            <li>No results were received</li>
                                <ul>
                                    <li>Try searching with another word or clicking another link.</li>
                                </ul>
                            <li>An intermittent issue with Reddit</li>
                                <ul>
                                    <li>Try again later or with another device</li>
                                </ul>
                        </ul>
                    <h3>Sorry for the inconvenience!</h3>
                </div>
                    
            }
            
        </div>
    )
}

//<i style={{color: "rgb(252, 71, 46)"}}>{error.statusText || error.message}</i>