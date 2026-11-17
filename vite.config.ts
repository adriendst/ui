import { defineConfig } from 'vite'

// Build de publication (ADR 0029) : JS en ESM, une seule feuille dist/style.css.
export default defineConfig({
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'style' },
    rollupOptions: { external: [/^react($|\/)/, /^react-dom($|\/)/] },
  },
})
