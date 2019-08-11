import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';
import dotenv from 'dotenv';
import fs from 'fs';
import merge from 'lodash-es/merge';
import nodeExternals from 'webpack-node-externals';
import path from 'path';

const {
  NODE_ENV = 'development'
} = process.env;
const IS_DEV = NODE_ENV === 'development'

/**
 * Переменные окружения и режимы работы:
 * .env                # загружается во всех случаях
 * .env.local          # загружается во всех случаях, игнорируется git
 * .env.[mode]         # загружается только в указанном режиме работы
 * .env.[mode].local   # загружается только в указанном режиме работы, игнорируется git
 */
;
[
  '', // загружается во всех случаях
  '.local', // загружается во всех случаях, игнорируется git
  `.${NODE_ENV}`, // загружается только в указанном режиме работы
  `.${NODE_ENV}.local`, // загружается только в указанном режиме работы, игнорируется git
]
.map(f => path.resolve(process.cwd(), `.env${f}`))
  .filter(p => fs.existsSync(p))
  .map(p => dotenv.parse(fs.readFileSync(p)))
  .forEach(
    v =>
    (process.env = {
      ...process.env,
      ...v,
    })
  );

const {
  DEBUG = false,
    MODE = 'spa',
    ANALYZER_MODE = 'static',
    BASE_URL = '/',
    PERSISTED_STORE = 1,
    V3D_CACHE = 1,
    V3D_DISABLE_RENDER = 0,
} = process.env;

const nuxtConfig = {
  mode: MODE,

  /**
   * Конфиг тега HEAD. Использует vue-meta
   * @see https://github.com/nuxt/vue-meta
   */
  head: {
    title: 'Конструктор обручальных колец',
    titleTemplate: '%s — feliksov.ru',
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        // href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap&subset=cyrillic',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap&subset=cyrillic',
      },
    ],
    script: [{
      src: `${BASE_URL}scripts/v3d-app/core/v3d.js`,
      prefetch: true,
      body: true,
    }, ],
  },

  /**
   * Компонент спиннер
   */
  loading: +V3D_DISABLE_RENDER ? true : '~/components/Loading.vue',

  /**
   * Глобальные стили
   */
  css: ['~/assets/style/app.styl'],

  /**
   * Плагины, загружаются перед приложением
   */
  plugins: [{
      src: '~/plugins/axios',
    },
    {
      src: '~/plugins/v3d',
    },
    {
      src: '~/plugins/vuetify',
    },
    {
      src: '~/plugins/vuelidate',
    },
  ],

  /**
   * Модули Nuxt.js
   */
  modules: [
    // ['@nuxtjs/component-cache', {}],
    [
      '@nuxtjs/axios',
      {
        debug: IS_DEV,
        retry: true,
        proxy: true,
        prefix: '/api',
      },
    ],
    ['@nuxtjs/proxy'],
  ],

  /**
   * Параметры модуля @nuxtjs/proxy
   */
  proxy: {
    '/api': 'https://feliksov.ru',
  },

  /**
   * Конфиги роутера
   */
  router: {
    base: BASE_URL,

    // middleware: ['breadcrumb'],

    // extendRoutes(routes, resolve) {},

    scrollBehavior(to, from, savedPosition) {
      return {
        x: 0,
        y: 0,
      };
    },
  },

  /**
   * Переменные окружения
   */
  env: {
    DEBUG,
    MODE,
    BASE_URL,
    PERSISTED_STORE,
    V3D_CACHE,
    V3D_DISABLE_RENDER,
  },

  /**
   * Параметры рендера страницы
   */
  renderer: {
    bundleRenderer: {
      shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type)
    },
  },

  /**
   * Параметры сборки приложения
   */
  build: {
    analyze: ANALYZER_MODE ? {
      analyzerMode: ANALYZER_MODE
    } : false,

    // babel: {},

    // cache: true,

    cssSourceMap: false,

    extractCSS: true,

    /* optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|styl|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }, */

    transpile: [/^vuetify/],

    plugins: [new VuetifyLoaderPlugin()],

    watch: ['./.env*', '~/config/*.js'],

    /**
     * Конфиг вебпака
     */
    extend(config) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/],
          }),
        ];
      }
    },
  },
};

// Конфиг режима работы
const confPath = path.resolve(process.cwd(), `./config/nuxt.${NODE_ENV}.js`);

export default merge(nuxtConfig, fs.existsSync(confPath) ? require(confPath).default : {});
