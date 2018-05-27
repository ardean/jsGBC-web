importScripts("/cache-polyfill.js");

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("jsGBC").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/jsgbc-web.js",
        "/styles/index.css",
        "/styles/github.css",
        "/bower_components/jsgbc-ui/images/lcd.png",
        "/bower_components/webcomponentsjs/webcomponents.min.js"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});