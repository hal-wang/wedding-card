import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import PurgeIcons from 'vite-plugin-purge-icons';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { createProxy } from '/@/build/proxy';
import { wrapperEnv } from '/@/build/env';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const {
    VITE_GLOB_API_PROXY_PREFIX,
    VITE_GLOB_PROXY_API_URL,
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
  } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: [
      vue(),
      WindiCSS(),
      PurgeIcons(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
        svgoOptions: true,
      }),
    ],
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#1e80ff', //  Primary color
            'success-color': '#55D187', //  Success color
            'error-color': '#ED6F6F', //  False color
            'warning-color': '#EFBD47', //   Warning color
            'font-size-base': '14px', //  Main font size
            'border-radius-base': '2px', //  Component/float fillet
            'app-content-background': '#fafafa', //   Link color
          },
          javascriptEnabled: true,
        },
      },
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      sourcemap: true,
      outDir: 'dist',
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy([[VITE_GLOB_API_PROXY_PREFIX, VITE_GLOB_PROXY_API_URL]]),
    },
  };
};
