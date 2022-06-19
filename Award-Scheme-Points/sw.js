importScripts("/assets.js");

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", e => e.respondWith(Fetch(e)));
self.addEventListener("message", e => e.waitUntil(Message(e)));

const FILE_CACHE = "Offline Resources";

let UPDATING = false;

async function Fetch(e) {
    if (e.request.method == "GET" && !UPDATING) {
        let request = e.request;
        let url = new URL(request.url);

        let cache = await caches.open(FILE_CACHE);

        let cachedResource = await cache.match(url.origin + url.pathname);

        if (cachedResource) return cachedResource;
        else
        {
            let response = await fetch(request);
            let clonedResponse = response.clone();

            if (url.origin == location.origin && response.ok && !UPDATING) {
                if (self.assets.includes(response.url.replace(location.origin, ""))) {
                    cache.keys().then(keys => {
                        if (!keys.find(key => key.url == response.url))
                            cache.put(response.url, clonedResponse);
                    });
                }
            }
            
            return clonedResponse;
        }
    }

    return fetch(e.request);
}

async function Message(e) {
    if (e.data.command == "update") {
        await Update();
    }
}

async function Update() {
    UPDATING = true;
    
    let fileCache = await caches.open(FILE_CACHE);

    // Fetch and cache all matching items from the assets manifest
    let assetData = self.assets;
    
    let filePromises = [];
    assetData.forEach(asset =>
        filePromises.push(fetch(asset))
    );

    let files = await Promise.all(filePromises);

    let putPromises = [];
    files.forEach(file =>
        putPromises.push(fileCache.put(file.url, file))
    );

    await Promise.all(putPromises);
    UPDATING = false;
    
    let keys = await fileCache.keys();

    let toDelete = keys.filter(key =>  {
        let url = key.url.replace(location.origin, "");
        return !self.assets.includes(url);
    });
    
    let deletePromises = [];
    toDelete.forEach(key =>
        deletePromises.push(fileCache.delete(key))
    );

    await Promise.all(deletePromises);
}