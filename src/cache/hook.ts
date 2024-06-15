export default async function fetchHandler(url: string, payload?: object) {
    const cacheVersion = timestamp();
    const cacheName = `century-${cacheVersion}`;
    
    let cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
        console.log("Cached data retrieved.");
        return cachedData;
    }

    console.log("Fetching fresh data...");

    const cacheStorage = await caches.open(cacheName);

    try {
        if (url && !payload) {
            const response = await fetch(url);
            await cacheStorage.put(url, response);
        } else if (url && payload) {
            const response = await fetch(url, payload);
            await cacheStorage.put(url, response);
        }
        cachedData = await getCachedData(cacheName, url);
        await deleteOldCaches(cacheName);
    
        return cachedData;
    } catch (e) {
        console.error({
            From: "Fetch Handler",
            e,
            Code: e.cause,
        });
        return e;
    }
}

const timestamp = (): string => {
    const date: number = Date.now();
    const timestamp: string = date.toString();

    let value = "";
    let count = 0;

    while (count < 7) {
        value += timestamp[count];
        count++;
    }
    return value;
}

async function getCachedData(cacheName: string, url: string) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }
    return await cachedResponse.json();
}

async function deleteOldCaches(currentCache: string) {
    const keys = await caches.keys();

    for (const key of keys) {
        const isOurCache = key.startsWith("century-");
        if (currentCache === key || !isOurCache) {
            continue;
        }
        caches.delete(key);
    }
}