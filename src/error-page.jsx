import { useRouteError } from "react-router-dom";

export default function ErrorPage () {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <h2>Sorry, an unexpected error has occurred :'(</h2>
            <i>{error.statusText || error.message}</i>
        </div>
    )
}