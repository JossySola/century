import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from "vite-tsconfig-paths";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const paths = tsconfigPaths({ root: __dirname });
export default defineConfig({
  plugins: [tsconfigPaths({root: resolve(__dirname, "../../")}), react()],
  test: {
    projects: [
      {
        plugins: [paths],
        test: {
          include: ['app/test/**/*.server.test.ts'],
          name: 'Server-side',
          environment: 'node',
        }
      },
      {
        plugins: [paths],
        test: {
          include: ['app/test/**/*.browser.test.{ts,tsx}'],
          name: 'Browser',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [
              { browser: 'chromium' },
              { browser: 'firefox' },
            ]
          }
        }
      },
      {
        plugins: [paths],
        test: {
          include: ['app/test/**/*.client.test.ts'],
          name: 'Client-side',
          environment: 'happy-dom',
        }
      }

    ]
  }
})