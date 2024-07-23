import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        runtimeCaching: [
          {
            handler: "StaleWhileRevalidate",
            options: {
              cacheableResponse: {
                statuses: [0, 200],
              },
              cacheName: "http-cache",
              expiration: {
                maxAgeSeconds: 60,
              },
            },
            urlPattern: ({ url }) => {
              const { protocol } = new URL(url);

              return "http:" === protocol || "https:" === protocol;
            },
          },
        ],
      },
    }),
  ],
});
