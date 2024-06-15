export default async function fetchHandler(url: string, method?: "GET" | "POST", payload?: object) {
    const cacheVersion = timestamp();
    const cacheName = `century-${cacheVersion}`;
    let cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
        console.log("Cached data retrieved.");
        return cachedData;
    }

    console.log("Fetching fresh data...");

    const cacheStorage = await caches.open(cacheName);

    if (url && !method && !payload) {
        await cacheStorage.add(url);
    } else if (url && method === "GET" as "GET" && payload) {
        const response = await fetch(url, payload);
        await cacheStorage.put(url, response);
    } else if (url && method === "POST" as "POST" && payload) {
        const response = await fetch(url, payload);
        await cacheStorage.put(url, response);
    } else {
        console.error("No condition is met with the arguments passed.");
        return undefined;
    }

    
    cachedData = await getCachedData(cacheName, url);
    await deleteOldCaches(cacheName);

    return cachedData;
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