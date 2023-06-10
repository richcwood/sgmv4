import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import ssr from 'vite-plugin-ssr/plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'path';

const monacoPlugin = (<any>monacoEditorPlugin).default as typeof monacoEditorPlugin;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ssr({ prerender: true, includeAssetsImportedByServer: true }),
    monacoPlugin({}),
  ],

  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    },
  }
});
