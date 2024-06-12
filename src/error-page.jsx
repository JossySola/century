import { useRouteError } from "react-router-dom";

export default function ErrorPage () {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <h1>Sorry, an unexpected error has occurred :(</h1>
            <i>{error.statusText || error.message}</i>
        </div>
    )
}