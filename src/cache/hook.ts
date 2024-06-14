export default async function fetchHandler(url: string, method?: string, payload?: object) {
    // 1. Calls fn and store data on cache
    // 2. If called again with same data, it will return the cached result instead of calling fn
    const cacheVersion = timestamp();
    const cacheName = `century-${cacheVersion}`;
    let cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
        console.log("Retrieved cached data.");
        return cachedData;
    }

    console.log("Fetching fresh data.");

    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.add(url);
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