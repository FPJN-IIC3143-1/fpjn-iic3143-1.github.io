import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from "vite";
import dotenv from 'dotenv';
import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MealsBUddy',
        short_name: 'mealsBuddy',
        start_url: '/',
        scope: '/',
        theme_color: '#ebebeb',
        background_color: '#ffffff',
        icons: [
            {
                src: 'pwa-64x64.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'maskable-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
      }, 
    }),
    remix({
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  define: {
    'process.env': {
      VITE_AUTH0_DOMAIN: JSON.stringify(process.env.VITE_AUTH0_DOMAIN),
      VITE_AUTH0_CLIENT_ID: JSON.stringify(process.env.VITE_AUTH0_CLIENT_ID),
      VITE_AUTH0_AUDIENCE: JSON.stringify(process.env.VITE_AUTH0_AUDIENCE),
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'https://3pndzfcvne.us-east-1.awsapprunner.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix before forwarding
      },
      '/recipes': {
        target: 'https://3pndzfcvne.us-east-1.awsapprunner.com',
        changeOrigin: true,
      },
      '/nutrition': {
        target: 'https://3pndzfcvne.us-east-1.awsapprunner.com',
        changeOrigin: true,
      },
      '/preferences': {
        target: 'https://3pndzfcvne.us-east-1.awsapprunner.com',
        changeOrigin: true,
      },
      '/pantry': {
        target: 'https://3pndzfcvne.us-east-1.awsapprunner.com',
        changeOrigin: true,
      },
      '/payment': {
        target: 'https://3pndzfcvne.us-east-1.awsapprunner.com',
        changeOrigin: true,
      },
    },
  },
});