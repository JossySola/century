import fetchHandler from "../cache/hook";
import getAuthorization from "./authorization/authorization";

export default async function request (url: string, payload: object) {
    try {
        const request = await fetchHandler(url, payload);
        if (request.ok === false) {
            throw new Error(`Status: ${request.status}. Unauthorized`);
        }
        return request;
    } catch (error) {
        console.error(error);
        getAuthorization();
    }
}