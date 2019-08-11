import Vue from 'vue';
import {
  numberLiteralTypeAnnotation
} from '@babel/types';

require('~/static/scripts/v3d-app/core/svg-loader.js');

import * as shapes from '~/static/scripts/v3d-app/modules/shapes.js';
import * as render from '~/static/scripts/v3d-app/modules/render.js';
import * as app from '~/static/scripts/v3d-app/modules/app.js';
import * as gems from '~/static/scripts/v3d-app/modules/gems.js';

const sceneObjects = {};

export default ({
  store,
  env
}) => {
  const {
    BASE_URL,
    V3D_CACHE,
    V3D_DISABLE_RENDER
  } = env;

  // @todo Убрать инициализации, связанные с 3D в модули
  Vue.prototype.$v3dProxy = {
    /**
     * Загрузка сцены, объектов и материалов
     * @param {String}
     */
    init(container) {
      // установка альфа-канала бэкграунда
      const ctxSettings = {
        alpha: true,
        preserveDrawingBuffer: true,
      };
      const preloader = null;
      const sceneURL = `${BASE_URL}assets/feliksov-konstruktor.gltf`;
      const v3dApp = new window.v3d.App(container, ctxSettings, preloader);
      const v3dLoader = new window.v3d.SVGLoader();

      if (!!+V3D_DISABLE_RENDER === true) {
        document.getElementById(container).innerText = 'env.V3D_DISABLE_RENDER prevents the rendering';
        return true;
      }

      window.v3d.Cache.enabled = !!+V3D_CACHE;

      // Очистка бэка
      v3dApp.clearBkgOnLoad = true;
      v3dApp.renderer.setClearColor(0x000000, 0);

      v3dApp.loadScene(
        sceneURL,
        async () => {
            window.$nuxt.$loading.start();
            v3dApp.enableControls();
            v3dApp.run();



            // Параметры колец
            sceneObjects.man = {
              ...store.getters.renderParams('man'),
            };
            sceneObjects.woman = {
              ...store.getters.renderParams('woman'),
            };

            // Загрузка шейпов
            const shapesPromise = Object.keys(shapes.original).map(
              shape =>
              new Promise((resolve, reject) => {
                v3dLoader.load(
                  `${BASE_URL}shapes/shape_${shape}.svg`,
                  paths => {
                    const objShapes = paths[0].toShapes(true);

                    shapes.original[shape] = objShapes[0];
                    resolve(objShapes[0]);
                  },
                  null,
                  err => reject(err)
                );
              })
            );

            await Promise.all(shapesPromise).then(
              () => {
                // инициализируем модули
                app.init(v3dApp);
                // Обновляем модели
                app.update('woman', sceneObjects.woman, 'pointRight');
                app.update('man', sceneObjects.man, 'pointLeft');
              },
              reason => {
                const {
                  target
                } = reason;
                throw new Error(`[shapesPromise/Error]: ${target.responseURL} - ${target.statusText}`);
              }
            );

            window.$nuxt.$loading.finish();
          },
          null,
          err => {
            console.error('loadScene:');
            console.error(err);
          }
      );
    },

    /**
     * Обновление моделей
     * @param {Object}
     */
    update() {
      if (+V3D_DISABLE_RENDER) {
        return false;
      }
      if (store.state.resetMode || ['both', 'woman'].includes(store.state.modelKey)) {
        app.update('woman', store.getters.renderParams('woman'), 'pointRight');
      }

      if (store.state.resetMode || ['both', 'man'].includes(store.state.modelKey)) {
        app.update('man', store.getters.renderParams('man'), 'pointLeft');
      }
      // this.getNumberGems(store.getters.renderParams(store.state.modelKey));
    },

    /**
     * @description Принудительное обновление канвы
     */
    updateCanvas() {
      if (+V3D_DISABLE_RENDER) {
        return false;
      }
      render.updateCanvas();
    },

    /**
     * Вызов ф-ции объектов window.Ring3D без контекста
     * @param {Array} - [obj, func, [args]]
     */
    call(payload) {
      try {
        const [obj, fun, args] = payload;

        //return window['Ring3D'][obj][fun](...args);
        return gems.getNumberGems(...args);
      } catch (e) {
        console.error(new Error(e));
      }
    },
  };
};
