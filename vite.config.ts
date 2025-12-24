import { fileURLToPath, URL } from 'node:url'
import { writeFileSync } from 'node:fs'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default ({ mode }) =>  {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    base: env.GITHUB_PAGES_PATH || env.BASE_PATH || (process.env.NODE_ENV === 'production'
      ? '/openpose_editor/'
      : '/'),
    plugins: [
      vue(),
      vueJsx(),
      {
        name: 'create-version-file',
        apply: 'build',
        writeBundle() {
          writeFileSync('dist/version.txt', `v${packageJson.version}`);
        },
      }
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  })
}
