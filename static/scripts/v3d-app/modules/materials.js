'use strict';

let appInstance = null; //инстанс приложения v3d

// Объекты - материалы
const baseMat = {
  yellowPolished: null,
  yellowMatt: null,
  yellowMattCross: null,
  whitePolished: null,
  whiteMatt: null,
  whiteMattCross: null,
  rhodium: null
}

/**
 * @description инициализация модуля
 * @param {object} appInstance
 */
export function init(value) { appInstance = value; };


/**
 * @description Возвращает объект материала из сцены по названию
 * @param {string} name
 * @return {object}
 */
export function getMaterial(name) {
  return baseMat[name] = (baseMat[name]) ? baseMat[name] : appInstance.scene.getObjectByName(name).material;
}


/**
 * @description подготовка массива материалов в соответствии с параметрами кольца
 * @param {object} ring
 * @return {array} materials [material1, material2]
 */
export function generateMaterials(ring) {
  let mult = []; // мультиматериалы
  let color1 = ring.material1.color;
  let color2 = ring.material2.color;
  let surface1 = ring.material1.surface;
  let surface2 = ring.material2.surface;
  let materialName = null;

  switch (ring.division) {
  case 'm1m1':
    if (surface1 =='rhodium') {
      materialName = 'rhodium';
    } else {
      surface1 = surface1[0].toUpperCase() + surface1.slice(1);
      materialName = color1+surface1;
    }
    mult.push (getMaterial(materialName), getMaterial(materialName));
    break;
  case 'm1m2':
    if (surface1 =='rhodium') {
      materialName = 'rhodium';
    } else {
      surface1 = surface1[0].toUpperCase() + surface1.slice(1);
      materialName = color1+surface1;
    }
    mult.push (getMaterial(materialName));
    if (surface2 =='rhodium') {
      materialName = 'rhodium';
    } else {
      surface2 = surface2[0].toUpperCase() + surface2.slice(1);
      materialName = color2+surface2;
    }
    mult.push (getMaterial(materialName));
    break;
}
  return mult;
};


/**
 * @description присвоение материалов кольцу
 * @param {object} meshRing
 * @return {object} meshRing
 */
export function assignMaterialsToMeshRing(ring, meshRing) {
  // распределяем материалы
  let offset = -0.1;
  if (ring.diamonds.position == 'channel') offset = 0.1;
  for (var i = 0; i < meshRing.geometry.faces.length; i++) {
    var vertex1 = meshRing.geometry.vertices[meshRing.geometry.faces[i].a].z;
    var vertex2 = meshRing.geometry.vertices[meshRing.geometry.faces[i].b].z;
    var vertex3 = meshRing.geometry.vertices[meshRing.geometry.faces[i].c].z;

    if (vertex1 > offset && vertex2 > offset && vertex3 > offset) {
      meshRing.geometry.faces[i].materialIndex = 0;
    }
    if (vertex1 <= offset && vertex2 <= offset && vertex3 <= offset) {
      meshRing.geometry.faces[i].materialIndex = 1;
    }
  }
  return meshRing;
}
