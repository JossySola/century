import {comment} from "../comment/comment";

export async function submitComment ({request}) {
    const data = Object.fromEntries(await request.formData());
    if (!data.comment) {
        return null;
    }
    console.log(data)
    return null;
}