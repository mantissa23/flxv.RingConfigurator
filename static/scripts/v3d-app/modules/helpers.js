'use strict';

let appInstance = null; //инстанс приложения v3d

// Объекты-привязки для генерации колец
const point = {
  pointLeft: null,
  pointRight: null
}

/**
 * @description инициализация модуля
 * @param {object} appInstance
 */
export function init(value) { appInstance = value; };

/**
 * @description Возвращает объект Point из сцены
 * @param {string} name pointLeft, pointRight
 * @return {object}
 */
export function getPoint(name) {
  return point[name] = (point[name]) ? point[name] : appInstance.scene.getObjectByName(name);
}
