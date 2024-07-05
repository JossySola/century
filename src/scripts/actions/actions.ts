import {comment as commentAction} from "../comment/comment";

export async function submitComment ({request}) {
    const data = Object.fromEntries(await request.formData());
    const comment = data['comment'];
    const parent = data['fullname'];
    const input= document.getElementById("submit-comment") as HTMLInputElement;

    if (!data['comment']) {
        return null;
    }
    
    const response = await commentAction(parent, comment);
    console.log(response)

    input ? input.value = "" : null;

    return null;
}