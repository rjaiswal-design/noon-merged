/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Storybook smoke-test integration is currently disabled because
// @chromatic-com/storybook@5 (CJS) cannot load storybook@10 (ESM).
// To re-enable: remove `@chromatic-com/storybook` from .storybook/main.ts
// addons (or upgrade it), re-import storybookTest below, and add a
// second `storybook` project to `test.projects` mirroring the `unit` one.
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
void dirname;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@ui': path.resolve(__dirname, 'src/packages/ui'),
      '@tokens': path.resolve(__dirname, 'src/packages/tokens'),
      '@state': path.resolve(__dirname, 'src/packages/state')
    }
  },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          }
        }
      }
    ]
  }
});