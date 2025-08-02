interface Error {
    ok: boolean,
    status?: number,
    url?: string,
    name?: string,
    message?: string
}

export default async function fetchHandler(url: string, payload?: object) {
    const cacheVersion = timestamp();
    const cacheName = `century-${cacheVersion}`;
    
    let cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
        //console.log("Cached data retrieved.");
        return cachedData;
    }

    //console.log("Fetching fresh data...");

    const cacheStorage = await caches.open(cacheName);

    try {
        if (!url && !payload) {
            throw new Error("No arguments received.");
        }
        if (!url) {
            throw new Error("No URL has been passed.");
        }
        if (url && !payload) {
            await cacheStorage.add(url);
        }
        if (url && payload) {
            const response = await fetch(url, payload);
            await cacheStorage.put(url, response);
            
            if (!response.ok) throw response;
        }
        cachedData = await getCachedData(cacheName, url);
        await deleteOldCaches(cacheName);
        return cachedData;

    } catch (error: Error) {
        
        return {
            ok: error.ok,
            status: error.status,
            url: error.url,
            type: error.name,
            message: error.message
        }
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