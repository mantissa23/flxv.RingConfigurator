'use strict';

import * as geometry2 from './geometry.js';

let appInstance = null; //инстанс приложения v3d
let planeShadow = null; // оригинальный объект тени от кольца

/**
 * @description инициализация модуля
 * @param {object} appInstance
 */
export function init(value) {
  appInstance = value;
  planeShadow = appInstance.scene.getObjectByName('planeShadow');
  planeShadow.traverse(function(object) { object.visible = false; });
};


/**
 * @description подгонка тени под размер кольца
 * @param {object} ring
 * @param {object} point
 * @returns {object} planeShadowInstance
 */
export function generatePlaneShadow(ring, point) {
  let namePlaneShadow = 'planeShadowInstance'+point.name;
  let planeShadowInstance = appInstance.scene.getObjectByName(namePlaneShadow);

  if (planeShadowInstance && planeShadowInstance.name == namePlaneShadow) {
    appInstance.scene.remove(planeShadowInstance);
  }
  planeShadowInstance = planeShadow.clone(true);
  planeShadowInstance.name = namePlaneShadow;

  // высчитываем координаты
  var offsetY = 1;
  switch (ring.shape.name.charAt(0)) {
    case 'a':
      offsetY = (ring.size == 15) ? offsetY : offsetY - (ring.size - 15) * 0.4;
      offsetY = offsetY - (ring.shape.sizeY/2.2);
    break;
    case 'c':
      offsetY = (ring.size == 15) ? offsetY : offsetY - (ring.size - 15) * 0.5;
      offsetY = offsetY - (ring.shape.sizeY/2.2);
    break;
    case 'd':
      offsetY = (ring.size == 15) ? offsetY : offsetY - (ring.size - 15) * 0.5;
      offsetY = offsetY - (ring.shape.sizeY/2.9);
    break;
    case 'j':
      offsetY = (ring.size == 15) ? offsetY : offsetY - (ring.size - 15) * 0.5;
      offsetY = offsetY - (ring.shape.sizeY/2.9);
    break;
  }

  planeShadowInstance.position.set(0, offsetY, 0);

  // изменяем масштаб по ширине и длине
  var offsetX = 1 + (ring.shape.sizeX * 0.5);
  var offsetY = 1 + ((ring.size-15) * 0.1);
  planeShadowInstance.scale.set (0, offsetY, offsetX);
  return planeShadowInstance;
};


 /** @description генерация меша по профилю и заливка материалами
   * @param {string} name 'man' или 'woman'
   * @param {object} ring
   * @param {object} shape
   * @return {object} mesh
   */
  export function generateMesh(name, ring, shape) {
    var radius;
    var mesh = appInstance.scene.getObjectByName('Ring'+name);

    if (mesh) {
      appInstance.scene.remove (mesh);
      mesh.geometry.dispose();
    }

    // создаем путь-окружность
    if (ring.size == 15) {
      radius = 1;
    } else {
      radius = (ring.size - 15) * 6;
    }

    // выдавливаем и рисуем
    var degreesStart = 0;
    var degreesEnd = 360.05; // 360.05
    var radiansStart = (degreesStart * Math.PI) / 180;
    var radiansEnd = (degreesEnd * Math.PI) / 180;
    var pathCircle = new THREE.Curve();
    pathCircle.getPoint = function(t) {
      var segment = (radiansStart - radiansEnd) * t;
      return new THREE.Vector3(radius * Math.cos(segment), radius * Math.sin(segment), 0);
    };

    var extrudeSettings = {
      curveSegments: 6, // 10,
      steps: 40, // 70,
      depth: 0,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelSegments: 0,
      extrudePath: pathCircle,
    };

    var geometry = geometry2.extrudeGeometry(shape, extrudeSettings);

    mesh = new v3d.Mesh(geometry);
    mesh.geometry.computeBoundingBox();
    mesh.geometry.center();

    // сглаживание меша

    //mesh.geometry.mergeVertices ();
    mesh.geometry.scale(0.072, 0.072, 0.072);
    mesh.name = 'Ring'+name;
    mesh.geometry.computeVertexNormals(true);
    var min = -0.05;
    var max = 0;
    var a = mesh.geometry;

    // this.mergeVerticesInOut(mesh, 0, 0.09, 0.01);
    mesh.updateMatrix();
    return mesh;
  };

/** @description Слияние вершин в регионе указанном area
 * @param {object} mesh
 * @param {float} minArea - минимальное значение области для поиска вершин
 * @param {float} maxArea - максимальное значение области для поиска вершин
 * @param {float} amount - значение области, при которой вершины будут сливаться
 * @return {object} mesh
 */
  function mergeVerticesInOut(mesh, minArea, maxArea, amount) {
    for (var i = 0; i < mesh.geometry.faces.length; i++) {
      var a = mesh.geometry;
      var aY = a.vertices [a.faces[i].a].y.toFixed(2);
      var bY = a.vertices [a.faces[i].b].y.toFixed(2);
      var cY = a.vertices [a.faces[i].c].y.toFixed(2);

      if ((aY-minArea)*(aY-maxArea) <= 0) {
        console.log (aY);
        a.vertices [a.faces[i].a].x = 0;
        a.vertices [a.faces[i].b].x = 0;
        a.vertices [a.faces[i].c].x = 0;
      }
    }
    return mesh;
  };
