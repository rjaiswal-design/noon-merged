import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  async viteFinal(viteConfig) {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias ?? {}),
      '@': path.resolve(here, '../src'),
      '@ui': path.resolve(here, '../src/packages/ui'),
      '@tokens': path.resolve(here, '../src/packages/tokens'),
      '@state': path.resolve(here, '../src/packages/state'),
    };
    viteConfig.server = viteConfig.server ?? {};
    viteConfig.server.fs = {
      ...(viteConfig.server.fs ?? {}),
      allow: [path.resolve(here, '..')],
    };
    return viteConfig;
  },
};

export default config;
