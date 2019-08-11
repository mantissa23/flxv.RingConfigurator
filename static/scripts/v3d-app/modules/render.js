'use strict';

let appInstance = null; //инстанс приложения v3d
let objMovementInfos = {}; //значения камеры для функции render


/**
 * @description Инициализация
 * @param {object} appInstance
 */
export function init(value) {
  appInstance = value;
  stopRenderInPause();
};

/**
 * @description Принудительная отрисовка 3D сцены
 */
export function updateCanvas() {
  appInstance.enableRendering();
};


/**
 * @description Обновление объектов на сцене
 * @param {object} meshRing
 * @param {object} point
 * @param {object} gems
 * @param {object} planeShadow
 */
export function updateScene(meshRing, point, gems, planeShadow) {

  // установка колец
  if (meshRing) {
    meshRing.position.set(0 + point.position.x, 10 + point.position.y, 0 + point.position.z);
    meshRing.rotation.copy(point.rotation);
    meshRing.rotation.set(meshRing.rotation.x, meshRing.rotation.y, 5.5+meshRing.rotation.z);
    meshRing.material[0].wireframe = false;
    meshRing.material[1].wireframe = false;
    appInstance.scene.add(meshRing);
  }

  // активация камней
  if (gems) {
    gems.position.set(0 + point.position.x, 10 + point.position.y, 0 + point.position.z);
    gems.rotation.copy(point.rotation);
    gems.rotation.set(gems.rotation.x, gems.rotation.y, 5.5 + gems.rotation.z);
      // meshRing.material.wireframe = true;
    appInstance.scene.add(gems);
  }
  appInstance.enableSSAA(0, false);
  appInstance.enableRendering();
  appInstance.enableSSAA(4, false);
  appInstance.disableRendering (1);

  // активация теней
  planeShadow.traverse( function ( object ) { object.visible = true; } );

  planeShadow.position.set(
    planeShadow.position.x + point.position.x,
    planeShadow.position.y + point.position.y,
    planeShadow.position.z + point.position.z
  );

  planeShadow.rotation.copy(point.rotation);
  appInstance.scene.add(planeShadow);


  // пост эффекты
/*     this.appInstance.enablePostprocessing([{
      type: 'ssao',
      radius: 5,
      aoClamp: 0.25,
      lumInfluence: 0.7
    }]); */
};


  /**
 * @description Остановка рендера при отсутствии действий пользователя
 */
export function stopRenderInPause(){
  whenMoved("Camera", 0.001, 1, function() {
      enableRendering();
      }, function() {}, function() {
      disableRendering();
  });

  function enableRendering() {
    appInstance.enableSSAA(0, false);
    appInstance.enableRendering();
  }

  function disableRendering() {
    appInstance.enableSSAA(4, false);
    appInstance.disableRendering (1);
  }

  function whenMoved(objName, delta, period, cb_start, cb_move, cb_stop) {

    function checkMoving(objName, obj) {

      var info = objMovementInfos[objName] ||
      savePreviousCoords(objName, obj, false, -1);

      info.frameCounter = info.frameCounter + 1;

      if ((info.frameCounter % period) != 0)
          return;

      var isMoving =
          Math.abs(obj.position.x - info.prevPosX) > delta ||
          Math.abs(obj.position.y - info.prevPosY) > delta ||
          Math.abs(obj.position.z - info.prevPosZ) > delta ||
          Math.abs(obj.rotation.x - info.prevRotX) > delta ||
          Math.abs(obj.rotation.y - info.prevRotY) > delta ||
          Math.abs(obj.rotation.z - info.prevRotZ) > delta ||
          Math.abs(obj.scale.x - info.prevScaX) > delta ||
          Math.abs(obj.scale.y - info.prevScaY) > delta ||
          Math.abs(obj.scale.z - info.prevScaZ) > delta;

      if (!info.prevIsMoving && isMoving) {
          cb_start();
          savePreviousCoords(objName, obj, true, info.frameCounter);
      } else if (info.prevIsMoving && isMoving) {
          cb_move();
          savePreviousCoords(objName, obj, true, info.frameCounter);
      } else if (info.prevIsMoving && !isMoving) {
          cb_stop();
          savePreviousCoords(objName, obj, false, info.frameCounter);
      } else {
          savePreviousCoords(objName, obj, false, info.frameCounter);
      }
    };

    function savePreviousCoords(objName, obj, prevIsMoving, frameCounter) {
      if (objMovementInfos[objName]) {
          var info = objMovementInfos[objName];

          info.prevPosX = obj.position.x;
          info.prevPosY = obj.position.y;
          info.prevPosZ = obj.position.z;
          info.prevRotX = obj.rotation.x;
          info.prevRotY = obj.rotation.y;
          info.prevRotZ = obj.rotation.z;
          info.prevScaX = obj.scale.x;
          info.prevScaY = obj.scale.y;
          info.prevScaZ = obj.scale.z;
          info.prevIsMoving = prevIsMoving;
          info.frameCounter = frameCounter;
      } else {
          var info = {
              prevPosX: obj.position.x,
              prevPosY: obj.position.y,
              prevPosZ: obj.position.z,
              prevRotX: obj.rotation.x,
              prevRotY: obj.rotation.y,
              prevRotZ: obj.rotation.z,
              prevScaX: obj.scale.x,
              prevScaY: obj.scale.y,
              prevScaZ: obj.scale.z,
              prevIsMoving: prevIsMoving,
              frameCounter: frameCounter
          };
          objMovementInfos[objName] = info;
      }

      return info;
  }

  function addToRender(objName) {
    var obj = appInstance.scene.getObjectByName(objName);
      if (!obj) return;

      appInstance.renderCallbacks.push(function() { checkMoving(objName, obj); });
  }
    addToRender(objName);
  }
}
