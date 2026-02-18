// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Use an absolute path for the global CSS so Vite/ Vitest can resolve it reliably
  css: [
    resolve(__dirname, 'assets/css/variables.css')
  ]
})
