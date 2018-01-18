const staticAssets = [
    './src/index.html',
    './assets/vendor/bootstrap/css/bootstrap.css',
    './assets/css/style.css',
    './assets/vendor/bootstrap/jquery-3.2.1.min.js',
    './assets/vendor/bootstrap/js/bootstrap.min.js',
    './slick/slick.css',
    './slick/slick-theme.css',
    './slick/slick.min.js',
    './random-verse.js',
    './assets/img/pic1.jpg',
    './assets/img/pic2.jpg',
    './assets/img/pic3.jpg',
    './assets/img/pic4.jpg',
    './assets/img/pic5.jpg',
    './assets/img/pic6.png',
];

self.addEventListener('install', async event => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    
    if(url.origin === location.origin){
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('news-dynamic');
    
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}