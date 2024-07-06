import {comment as commentAction} from "../comment/comment";

export async function submitComment ({request}) {
    const data = Object.fromEntries(await request.formData());
    const url = new URL(request.url);
    const pathname = url.pathname;
    const link = pathname.slice(1,pathname.length-1)
    const comment = data['comment'];
    const parent = data['fullname'];
    const input= document.getElementById("submit-comment") as HTMLInputElement;
    input ? input.value = "" : null;

    if (!data['comment']) {
        return null;
    }
    
    const response = await commentAction(parent, comment);

    await caches.keys().then(keys => {
        for (const key of keys) {
            caches.open(key).then(async (cache) => {
                await cache.delete(`https://www.reddit.com/${link}.json`);
            }) 
        }
    })

    return response;
}