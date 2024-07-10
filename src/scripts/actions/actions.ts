import {comment as commentAction} from "../comment/comment";
import getAuthorization from "../authorization/authorization";

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
    
    try {
        const response = await commentAction(parent, comment);
        if (response.ok === false) {
            throw new Error("Failed fetch from 'submitComment' action.");
        }
        return response;

    } catch (error) {
        console.error(error);
        getAuthorization();
    } finally {
        await caches.keys().then(keys => {
            for (const key of keys) {
                caches.open(key).then(async (cache) => {
                    await cache.delete(`https://www.reddit.com/${link}.json`).then(response => {
                        if (response) {
                            console.log("From submitComment Action: cache deleted");
                        } else {
                            console.log("From submitComment Action: Cache deletion failed!");
                        }
                    })
                }) 
            }
        })
    }
    
}