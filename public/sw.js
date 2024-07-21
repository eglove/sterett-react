// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
self.addEventListener('install', async () => {
	return self.skipWaiting()
})

self.addEventListener('activate', async () => {
	return self.clients.claim()
})

self.addEventListener('fetch', async (event) => {
	const { method, url } = event.request
	const protocol = new URL(url).protocol

	if (method !== 'GET' || (protocol !== 'http:' && protocol !== 'https:')) {
		return
	}

	const cache = await caches.open('http-cache')

	const cachedResponse = await cache.match(event.request)

	if (cachedResponse) {
		fetchAndUpdateCache(cache, event.request)
		return cachedResponse
	} else {
		const response = await fetch(event.request)

		if (response.ok) {
			cache.put(event.request, response.clone())
			return response
		}
	}
})

async function fetchAndUpdateCache (cache, request) {
	const response = await fetch(request)

	if (response.ok) {
		cache.put(request, response.clone()) // clone the response because put() consumes the body
	}
}
