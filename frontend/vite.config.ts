import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    createHtmlPlugin({ minify: true, entry: 'src/index.tsx' }),
    react(),
    tsConfigPaths()
  ]
});
