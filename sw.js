// Service Worker for Cyber-Tamer Portfolio PWA
// Provides offline functionality and caching

const CACHE_NAME = 'cyber-tamer-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/js/boot-sequence.js',
    '/js/navigation.js',
    '/js/gravity-engine.js',
    '/js/terminal.js',
    '/js/effects.js',
    '/js/heatmap.js',
    '/js/main.js',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@300;400;600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    // console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // console.log('[ServiceWorker] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // console.log('[ServiceWorker] Skip waiting');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    // console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        // console.log('[ServiceWorker] Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // console.log('[ServiceWorker] Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    // console.log('[ServiceWorker] Serving from cache:', event.request.url);
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then((response) => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    // Cache the new resource
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch((error) => {
                    // console.log('[ServiceWorker] Fetch failed:', error);

                    // Return offline page if available
                    return caches.match('/index.html');
                });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    // console.log('[ServiceWorker] Background sync:', event.tag);

    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

function syncData() {
    // Implement any background sync logic here
    return Promise.resolve();
}

// Push notifications (optional)
self.addEventListener('push', (event) => {
    // console.log('[ServiceWorker] Push received');

    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [200, 100, 200],
        tag: 'cyber-tamer-notification',
        requireInteraction: false
    };

    event.waitUntil(
        self.registration.showNotification('Cyber-Tamer Portfolio', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    // console.log('[ServiceWorker] Notification clicked');
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
    );
});
