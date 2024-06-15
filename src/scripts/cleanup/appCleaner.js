export default async function cleanCache () {
    const keys = await caches.keys();

    for (const key of keys) {
        const isOurCache = key.startsWith("century-");
        if (isOurCache) {
            caches.delete(key);
        }
    }
}