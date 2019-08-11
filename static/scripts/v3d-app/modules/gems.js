'use strict';

import CSG from './csg.js';
import * as materials from './materials.js';


let appInstance = null; //инстанс приложения v3d

// оригинальные 3D объекты
const gems = {
  gemRound: null,
  gemBoxAll: null,
  gemSectionRound: null,
  gemChannelRound: null
};

// векторный шейп для выдавливания канавок
let shapeForSubtract = null;


/**
 * @description инициализация модуля и загрузка объектов из сцены
 * @param {object} app
 * @param {object} shape_sub
 */
export function init(app, shape_sub) {
  appInstance = app;
  shapeForSubtract = shape_sub;
  for (const key in gems) {
    gems[key] = appInstance.scene.getObjectByName(key);
    gems[key].traverse( function (object) { object.visible = false; } );
  }

};

/**
 * @description Генерация камней для кольца
 * @param {object} ring
 * @param {object} point
 * @param {object} meshRing
 * @return {group} group
 */
export function createGems(ring, point, meshRing) {
  removeGems(point);
  if (ring.diamonds.position != 'none') {
    if (ring.diamonds.position == 'channel') {
      var meshForSubtract = generateMeshForSubtract(ring);
      cutRingForGems (ring, meshForSubtract, meshRing);
      materials.assignMaterialsToMeshRing (ring, meshRing);
    }
    const pathCircle = generatePath(ring);
    const jems = addGemsOnPath(ring, point, pathCircle);
    return jems;
  }
  return null;
};

/**
 * @description Поиск в сцене инстансов камней и их удаление
 * @param {object} point Объект привязки кольца
 */
function removeGems(point) {
  let childrenToRemove = [];
  appInstance.scene.traverse(function(child){
    if(child.name == 'gem'+point.name) childrenToRemove.push(child);
  });
  childrenToRemove.forEach(function(child) { appInstance.scene.remove(child); });
};

/**
 * @description Генерация окружности (сплайн) для размещения камней
 * @param {object} ring
 * @return {object} Сплайн окружности
 */
function generatePath(ring) {
  let radius = calculateRadius(ring);
  const degreesStart = 0;
  const degreesEnd = 360; // 360.1;
  const radiansStart = (degreesStart * Math.PI) / 180;
  const radiansEnd = (degreesEnd * Math.PI) / 180;
  const pathCircle = new THREE.Curve();
  pathCircle.getPoint = function(t) {
    let segment = (radiansStart - radiansEnd) * t;
    return new THREE.Vector3(radius * Math.cos(segment), radius * Math.sin(segment), 0);
  };
  return pathCircle;
};

/**
 * @description Генерация инстансов и размещение по сплайну
 * @param {object} ring
 * @param {object} point
 * @param {object} pathCircle
 */
function addGemsOnPath(ring, point, pathCircle) {
  var countStones = ring.diamonds.stones; // колво камней для установки (берется из diamond.stones, либо высчитывается)
  if (ring.diamonds.mode == 'max') countStones = getNumberGems(ring, "max").number;
  if (ring.diamonds.mode == 'half') countStones = getNumberGems(ring, "half").number;
  if (ring.diamonds.mode == 'third') countStones = getNumberGems(ring, "third").number;

  var paramGems = getNumberGems(ring, "max");
  var idealStartPoint = 0.5; //желаемая средняя точка на окружности кольца для всех камней
  var localOffset = (paramGems.sizeGem * paramGems.offset) / paramGems.sizeRing * 10;
  var startPoint = idealStartPoint - ((localOffset*countStones)/2); // вычисляемая позиция первого камня
  var group = new THREE.Group();
  group.name = 'gem'+point.name;

  var countMax = countStones;
  if (countStones < paramGems.number) countMax = countStones;

  // генерация только section *2
  if (ring.diamonds.rows == 2 && ring.diamonds.position == 'section') {
    var pos = startPoint;
    var group1 = new THREE.Group();
    group1.name = 'gem'+point.name;
    for (var i = 0; i < countMax; i++) {
      var instance = gems.gemSectionRound.clone(true);
      instance.name = 'gem'+point.name;
      instance.traverse( function ( object ) { object.visible = true; } );
      assignMaterials(ring, instance);
      var axis = new THREE.Vector3();
      var up = new THREE.Vector3(1, 0, 0);
      instance.position.copy( pathCircle.getPoint(pos) );
      var tangent = pathCircle.getTangentAt(pos).normalize();
      axis.crossVectors( up, tangent ).normalize();
      var radians = Math.acos( up.dot( tangent ) );
      instance.quaternion.setFromAxisAngle( axis, radians );
      group1.add( instance );
      var localOffset = (paramGems.sizeGem *paramGems.offset)/paramGems.sizeRing*10;
      pos = startPoint+(localOffset*(i+1));

      // присвоение материалов для блока 1
      var mat = materials.generateMaterials(ring);
      instance.children[0].children[0].children[0].material = mat[0];
      instance.children[0].children[0].children[1].material = mat[0];

    };
    var group2 = new THREE.Group();
    group2.name = 'gem'+point.name;
    var pos = startPoint;
    for (var i = 0; i < countMax; i++) {
      var instance = gems.gemSectionRound.clone(true);
      instance.name = 'gem'+point.name;
      instance.traverse( function ( object ) { object.visible = true; } );
      assignMaterials(ring, instance);
      var axis = new THREE.Vector3();
      var up = new THREE.Vector3(1, 0, 0);
      instance.position.copy( pathCircle.getPoint(pos) );
      var tangent = pathCircle.getTangentAt(pos).normalize();
      axis.crossVectors( up, tangent ).normalize();
      var radians = Math.acos( up.dot( tangent ) );
      instance.quaternion.setFromAxisAngle( axis, radians );
      group2.add( instance );
      var localOffset = (paramGems.sizeGem *paramGems.offset)/paramGems.sizeRing*10;
      pos = startPoint+(localOffset*(i+1));

      // присвоение материалов для блока 2
      var mat = materials.generateMaterials(ring);
      instance.children[0].children[0].children[0].material = mat[1];
      instance.children[0].children[0].children[1].material = mat[1];
    };
    group1.position.set(0 + group1.position.x, group1.position.y, group1.position.z+0.7);
    group2.position.set(0 + group2.position.x, group2.position.y, group2.position.z-0.7);
    group.add( group1 );
    group.add( group2 );
  // генерация всего остального
  } else {
      var pos = startPoint;
      for (var i = 0; i < countMax; i++) {
      if (ring.diamonds.position == 'flush') {
        var instance = gems.gemRound.clone(true);
      }
      if (ring.diamonds.position == 'section') {
        var instance = gems.gemSectionRound.clone(true);
      }
      if (ring.diamonds.position == 'channel') {
        var instance = gems.gemChannelRound.clone(true);
      }
      instance.name = 'gem'+point.name;
      instance.traverse( function ( object ) { object.visible = true; } );
      var axis = new THREE.Vector3();
      var up = new THREE.Vector3(1, 0, 0);
      instance.position.copy( pathCircle.getPoint(pos) );
      var tangent = pathCircle.getTangentAt(pos).normalize();
      axis.crossVectors( up, tangent ).normalize();
      var radians = Math.acos( up.dot( tangent ) );
      instance.quaternion.setFromAxisAngle( axis, radians );
      group.add( instance );
      var localOffset = (paramGems.sizeGem *paramGems.offset)/paramGems.sizeRing*10;
      pos = startPoint+(localOffset*(i+1));

      // присвоение материалов
      if (ring.diamonds.position == 'section' || ring.diamonds.position == 'channel') {
        var mat = materials.generateMaterials(ring);
        instance.children[0].children[0].children[0].material = mat[0];
        instance.children[0].children[0].children[1].material = mat[1];
      }
    };
  }
  return group;
};


/**
 * @description Расчет радиуса для генерации окружности
 * @param {object} ring
 * @param {float} radius
 */
function calculateRadius(ring) {
  var radius;
  switch (ring.shape.name.charAt(0)) {
    case 'a':
      radius = (ring.size == 15) ? 1 : (ring.size - 15) * 6;
      radius = radius * 0.072 + 8.2;
      radius = radius + (ring.shape.sizeY/1.5);
    break;
    case 'c':
      radius = (ring.size == 15) ? 1 : (ring.size - 15) * 6;
      radius = radius * 0.072 + 7.5;
      radius = radius + (ring.shape.sizeY/0.7);
    break;
    case 'd':
      radius = (ring.size == 15) ? 1 : (ring.size - 15) * 6;
      radius = radius * 0.072 + 8.1;
      radius = radius + (ring.shape.sizeY/1.5);
    break;
    case 'j':
      radius = (ring.size == 15) ? 1 : (ring.size - 15) * 6;
      radius = radius * 0.072 + 8.2;
      radius = radius + (ring.shape.sizeY/1.5);
    break;
  }
  return radius;
};

/**
 * @description Расчет количества камней, учитывая все параметры кольца
 * @param {object} ring
 * @param {string} mode Тип заполнения: max, half, third
 * @return {object} number Количество камней для данного типа кольца
 *                  sizeJem размер камня
 *                  sizeRing  размер кольца (не радиус!)
 *                  offset  коэффициент смещения между камней
 */
export function getNumberGems(ring, mode) {
  var number;
  var sizeGem = 0.1; // длина камня
  var sizeRing = calculateRadius(ring);
  var offset; // шаг смещения камня по окружности фиксированный

  sizeRing = (sizeRing*100)/100;
  if (ring.diamonds.position == 'flush') offset = 0.25;
  if (ring.diamonds.position == 'section') offset = 0.2;
  if (ring.diamonds.position == 'channel') offset = 0.23;
  number = Math.floor (sizeRing/(sizeGem*offset)/10);

  switch (mode) {
    case 'half':
      number = Math.round (number/2);
      break;
    case 'third':
      number = Math.round (number/3);
      break;
    case 'user':
      number = ring.diamonds.stones;
      break;
  }

  return {
    number: number,
    sizeGem: sizeGem,
    sizeRing, sizeRing,
    offset
  }
};

/**
 * @description Присвоение материалов к камням, если это нужно
 * @param {object} ring
 * @param {object} gem Объект камня для которого требуется присвоить материал
 */
function assignMaterials (ring, gem) {
  var mat = null;
  if (ring.diamonds.position == 'none' || ring.diamonds.position == 'flush') return;

  mat = gem.material = materials.generateMaterials(ring);

  if (ring.diamonds.position == 'section' && ring.diamonds.rows == 2) {
    gem.children[0].children[0].children[0].material = mat[0];
    gem.children[0].children[0].children[1].material = mat[0];
  } else {
    gem.children[0].children[0].children[0].material = mat[0];
    gem.children[0].children[0].children[1].material = mat[1];
  }
};

/**
* @description
*/
/*   cutRingForGems (ring, meshForSubtract, meshRing) {
  var obj1 = THREE.CSG.fromMesh(meshRing);
  var obj2 = THREE.CSG.fromMesh(meshForSubtract);
  var subtract_bsp =  obj1.subtract(obj2);
  var result = THREE.CSG.toMesh(subtract_bsp, Ring3D.materials.yellowPolished);
  result.position.set(result.position.x, result.position.y, 10 + result.position.z);
  result.geometry.mergeVertices ();
  result.geometry.computeVertexNormals(true);
  meshRing.geometry.copy(result.geometry);
  meshRing.updateMatrix();
}, */
function cutRingForGems (ring, meshForSubtract, meshRing) {
  meshRing.updateMatrix();
  meshForSubtract.updateMatrix();
  var obj1 = CSG.fromMesh(meshRing);
  var obj2 = CSG.fromMesh(meshForSubtract);

  var subtract_bsp =  obj1.subtract(obj2);

  var result = CSG.toMesh(subtract_bsp, meshRing.matrix);

  result.material = meshRing.material

  // result.position.set(result.position.x, result.position.y, 10 + result.position.z);
  // result.geometry.mergeVertices ();
  //result.geometry.computeVertexNormals(true);

  meshRing.geometry.copy(result.geometry);
  meshRing.updateMatrix();
};


/**
* @description Создается объект для вырезания канавки
* @param {object} ring
* @return {object} mesh
*/
function generateMeshForSubtract(ring) {
  var radius;
  if (ring.size == 15) {
    radius = 1;
  } else {
    radius = (ring.size - 15) * 6;
  }
  switch (ring.shape.name.charAt(0)) {
    case 'a':
      radius = radius + (ring.shape.sizeY*5.5);
    break;
    case 'c':
      radius = radius + (ring.shape.sizeY*6); // С - неверно работает
    break;
    case 'd':
      radius = radius + (ring.shape.sizeY*4.5);
    break;
    case 'j':
      radius = radius + (ring.shape.sizeY*5);
    break;
  }

  var degreesStart = 0;
  var numberGems = null;
  if (ring.diamonds.mode == 'user') {
    numberGems = ring.diamonds.stones;
  } else {
    var res = getNumberGems(ring, ring.diamonds.mode);
    numberGems = res.number;
  }
  var res = getNumberGems(ring, 'max');
  var degreesEnd = numberGems*((res.sizeGem * res.offset) / res.sizeRing * 360 * 10);

  var radiansStart = (degreesStart * Math.PI) / 180;
  var radiansEnd = (degreesEnd * Math.PI) / 180;
  var pathCircle = new THREE.Curve();
  pathCircle.getPoint = function(t) {
    var segment = (radiansStart - radiansEnd) * t;
    return new THREE.Vector3(radius * Math.cos(segment), radius * Math.sin(segment), 0);
  };

  var extrudeSettings = {
    curveSegments: 6, // 10,
    depth: 0,
    steps: 40, // 70,
    bevelEnabled: false,
    extrudePath: pathCircle,
  };

  var geometry = new v3d.ExtrudeGeometry(shapeForSubtract, extrudeSettings);
  var mesh = appInstance.scene.getObjectByName('meshForSubtract');
  if (mesh) {
    appInstance.scene.remove (mesh);
    mesh.geometry.dispose();
  }

  mesh = new v3d.Mesh(geometry);
  mesh.name = 'meshForSubtract';
  mesh.geometry.scale(0.074, 0.074, 0.074);
  mesh.geometry.mergeVertices();
  mesh.geometry.computeVertexNormals(true);

  var idealStartPoint = 0.5;
  var localOffset = (res.sizeGem * res.offset) / res.sizeRing * 10;
  var startPoint = idealStartPoint - ((localOffset*numberGems)/2);
  startPoint = startPoint - (0.012);
  var offset = v3d.Math.degToRad(startPoint*360);
  mesh.rotation.set(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z-offset);
  mesh.updateMatrix();
  return mesh;
}
