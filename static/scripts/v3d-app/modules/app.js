'use strict';

import * as helpers from './helpers.js';
import * as materials from './materials.js';
import * as shapes from './shapes.js';
import * as rings from './rings.js';
import * as gems from './gems.js';
import * as render from './render.js';


let appInstance = null; //инстанс приложения v3d

/**
 * @description Инициализация для vue
 * @param {object} appInstance
 */
export function init(app) {
  appInstance = app;
  helpers.init(app);
  materials.init(app);
  shapes.init(app);
  rings.init(app);
  gems.init(app, shapes.original.sub);
  render.init(app);
};


/**
 * @description Инициализация для dev-окружения
 * @param {string} container ID выделенной области для 3D
 */
export function init_dev(app) {
  appInstance = app;
  helpers.init(app);
  materials.init(app);
  shapes.init(app);
  rings.init(app);
  gems.init(app, shapes.original.sub);
  render.init(app);
};


/**
 * @description полное обновление сцены
 * @param {string} name: 'man' или 'woman'
 * @params {object} ring: состояние кольца
 * @param {string}  point: 'pointLeft' или 'pointRight'
 */
export function update(name, ring, point) {
  //console.log (appInstance)
  const shape = shapes.update(ring); // создаем шейп
  const objPoint = helpers.getPoint(point);

  let meshRing = rings.generateMesh(name, ring, shape); // генерация меша
  meshRing.material = materials.generateMaterials(ring); // возвращает массив материалов кольца
  meshRing = materials.assignMaterialsToMeshRing (ring, meshRing); // изменяет индексы материалов кольца для присвоения
  let objGems = gems.createGems(ring, objPoint, meshRing); // добавление камней, если нужно
  const planeShadow = rings.generatePlaneShadow(ring, objPoint); // генерация тени для кольца
  render.updateScene(meshRing, objPoint, objGems, planeShadow); // вывод созданных объектов на сцену.
}
