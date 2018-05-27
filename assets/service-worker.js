const prefix = "/jsGBC-web";

importScripts(`${prefix}/cache-polyfill.js`);

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("jsGBC").then(function (cache) {
      return cache.addAll([
        `${prefix}`,
        `${prefix}/`,
        `${prefix}/index.html`,
        `${prefix}/jsgbc-web.js`,
        `${prefix}/styles/index.css`,
        `${prefix}/styles/github.css`,
        `${prefix}/bower_components/jsgbc-ui/images/lcd.png`,
        `${prefix}/bower_components/webcomponentsjs/webcomponents.min.js`
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