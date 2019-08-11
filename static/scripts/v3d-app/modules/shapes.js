'use strict';


let appInstance = null; //инстанс приложения v3d


//библиотека образцовых шейпов, загруженных из файлов
export const original = {
  a: null,
  a_u: null,
  a_v: null,
  a_s: null,
  c: null,
  c_u: null,
  c_v: null,
  c_s: null,
  d: null,
  d_u: null,
  d_v: null,
  d_s: null,
  j: null,
  j_u: null,
  j_v: null,
  j_s: null,
  sub: null
};

/**
 * @description инициализация модуля
 * @param {object} appInstance
 */
export function init(value) { appInstance = value; };


/** @description Изменение векторного шейпа до экструдирования в 3D
 * @param {object} ring
 * @return {object} Новый шейп
 */
export function update(ringObject) {
  let shape;
  let shapeName;
  let x = ringObject.shape.sizeX;
  let y = ringObject.shape.sizeY;

  if (ringObject.grooves.name != "none") {
      shapeName = ringObject.shape.name + "_" + ringObject.grooves.name;
  } else {
      shapeName = ringObject.shape.name;
  }

  switch (shapeName) {
    case "a":
      shape = original.a.clone();
      x=x/5*35-35;
      y=y/1.5*15-15;
//Изменение по X
      //curve inner
      shape.curves[0].v0.x = shape.curves[0].v0.x+x;
      shape.curves[0].v1.x = shape.curves[0].v1.x+x;
      shape.curves[0].v2.x = shape.curves[0].v2.x+x;
      shape.curves[0].v3.x = shape.curves[0].v3.x+x;
      //line inner
      shape.curves[1].v1.x = shape.curves[1].v1.x+x;
      //line inner
      shape.curves[2].v2.x = shape.curves[2].v2.x-x;
      //curve inner
      shape.curves[3].v0.x = shape.curves[3].v0.x-x;
      shape.curves[3].v1.x = shape.curves[3].v1.x-x;
      shape.curves[3].v2.x = shape.curves[3].v2.x-x;
      shape.curves[3].v3.x = shape.curves[3].v3.x-x;
      //line side
      shape.curves[4].v1.x = shape.curves[4].v1.x-x;
      shape.curves[4].v2.x = shape.curves[4].v2.x-x;
      //curve out
      shape.curves[5].v0.x = shape.curves[5].v0.x-x;
      shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      shape.curves[5].v2.x = shape.curves[5].v2.x-x;
      shape.curves[5].v3.x = shape.curves[5].v3.x-x;
      //line out
      shape.curves[6].v1.x = shape.curves[6].v1.x-x;
      //line out
      shape.curves[7].v2.x = shape.curves[7].v2.x+x;
      //curve out
      shape.curves[8].v0.x = shape.curves[8].v0.x+x;
      shape.curves[8].v1.x = shape.curves[8].v1.x+x;
      shape.curves[8].v2.x = shape.curves[8].v2.x+x;
      shape.curves[8].v3.x = shape.curves[8].v3.x+x;
      //line side
      shape.curves[9].v1.x = shape.curves[9].v1.x+x;
      shape.curves[9].v2.x = shape.curves[9].v2.x+x;
//Y
      //line side
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      //curve out
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[5].v3.y = shape.curves[5].v3.y+y;
      //line out
      shape.curves[6].v1.y = shape.curves[6].v1.y+y;
      shape.curves[6].v2.y = shape.curves[6].v2.y+y;
      //line out
      shape.curves[7].v1.y = shape.curves[7].v1.y+y;
      shape.curves[7].v2.y = shape.curves[7].v2.y+y;
      //curve out
      shape.curves[8].v0.y = shape.curves[8].v0.y+y;
      shape.curves[8].v1.y = shape.curves[8].v1.y+y;
      shape.curves[8].v2.y = shape.curves[8].v2.y+y;
      shape.curves[8].v3.y = shape.curves[8].v3.y+y;
      //line side
      shape.curves[9].v1.y = shape.curves[9].v1.y+y;
      //shape.curves[9].v2.y = shape.curves[9].v2.y+y;
      break;
    case "a_u":
      shape = original.a_u.clone();
      x=x/5*35-35;
      y=y/1.5*15-15;
//Изменение по X
      //curve inner
      shape.curves[0].v0.x = shape.curves[0].v0.x+x;
      shape.curves[0].v1.x = shape.curves[0].v1.x+x;
      shape.curves[0].v2.x = shape.curves[0].v2.x+x;
      shape.curves[0].v3.x = shape.curves[0].v3.x+x;
      //line inner
      shape.curves[1].v1.x = shape.curves[1].v1.x+x;
      //line inner
      shape.curves[2].v2.x = shape.curves[2].v2.x-x;
      //curve inner
      shape.curves[3].v0.x = shape.curves[3].v0.x-x;
      shape.curves[3].v1.x = shape.curves[3].v1.x-x;
      shape.curves[3].v2.x = shape.curves[3].v2.x-x;
      shape.curves[3].v3.x = shape.curves[3].v3.x-x;
      //line side
      shape.curves[4].v1.x = shape.curves[4].v1.x-x;
      shape.curves[4].v2.x = shape.curves[4].v2.x-x;
      //curve out
      shape.curves[5].v0.x = shape.curves[5].v0.x-x;
      shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      shape.curves[5].v2.x = shape.curves[5].v2.x-x;
      shape.curves[5].v3.x = shape.curves[5].v3.x-x;
      //line out
      shape.curves[6].v1.x = shape.curves[6].v1.x-x;
      //line out
      shape.curves[9].v2.x = shape.curves[9].v2.x+x;
      //curve out
      shape.curves[10].v0.x = shape.curves[10].v0.x+x;
      shape.curves[10].v1.x = shape.curves[10].v1.x+x;
      shape.curves[10].v2.x = shape.curves[10].v2.x+x;
      shape.curves[10].v3.x = shape.curves[10].v3.x+x;
      //line side
      shape.curves[11].v1.x = shape.curves[11].v1.x+x;
      shape.curves[11].v2.x = shape.curves[11].v2.x+x;
//Y
      //line side
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      //curve out
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[5].v3.y = shape.curves[5].v3.y+y;
      //line out
      shape.curves[6].v1.y = shape.curves[6].v1.y+y;
      shape.curves[6].v2.y = shape.curves[6].v2.y+y;
      //желоб
      shape.curves[7].v0.y =  shape.curves[7].v0.y+y;
      shape.curves[7].v1.y =  shape.curves[7].v1.y+y;
      shape.curves[7].v2.y =  shape.curves[7].v2.y+y;
      shape.curves[7].v3.y =  shape.curves[7].v3.y+y;
      shape.curves[8].v0.y =  shape.curves[8].v0.y+y;
      shape.curves[8].v1.y =  shape.curves[8].v1.y+y;
      shape.curves[8].v2.y =  shape.curves[8].v2.y+y;
      shape.curves[8].v3.y =  shape.curves[8].v3.y+y;
      //line out
      shape.curves[9].v1.y = shape.curves[9].v1.y+y;
      shape.curves[9].v2.y = shape.curves[9].v2.y+y;
      //curve out
      shape.curves[10].v0.y = shape.curves[10].v0.y+y;
      shape.curves[10].v1.y = shape.curves[10].v1.y+y;
      shape.curves[10].v2.y = shape.curves[10].v2.y+y;
      shape.curves[10].v3.y = shape.curves[10].v3.y+y;
      //line side
      shape.curves[11].v1.y = shape.curves[11].v1.y+y;
      break;
    case "a_v":
      shape = original.a_v.clone();
      x=x/5*35-35;
      y=y/1.5*15-15;
//Изменение по X
      //curve inner
      shape.curves[0].v0.x = shape.curves[0].v0.x+x;
      shape.curves[0].v1.x = shape.curves[0].v1.x+x;
      shape.curves[0].v2.x = shape.curves[0].v2.x+x;
      shape.curves[0].v3.x = shape.curves[0].v3.x+x;
      //line inner
      shape.curves[1].v1.x = shape.curves[1].v1.x+x;
      //line inner
      shape.curves[2].v2.x = shape.curves[2].v2.x-x;
      //curve inner
      shape.curves[3].v0.x = shape.curves[3].v0.x-x;
      shape.curves[3].v1.x = shape.curves[3].v1.x-x;
      shape.curves[3].v2.x = shape.curves[3].v2.x-x;
      shape.curves[3].v3.x = shape.curves[3].v3.x-x;
      //line side
      shape.curves[4].v1.x = shape.curves[4].v1.x-x;
      shape.curves[4].v2.x = shape.curves[4].v2.x-x;
      //curve out
      shape.curves[5].v0.x = shape.curves[5].v0.x-x;
      shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      shape.curves[5].v2.x = shape.curves[5].v2.x-x;
      shape.curves[5].v3.x = shape.curves[5].v3.x-x;
      //line out
      shape.curves[6].v1.x = shape.curves[6].v1.x-x;
      //line out
      shape.curves[9].v2.x = shape.curves[9].v2.x+x;
      //curve out
      shape.curves[10].v0.x = shape.curves[10].v0.x+x;
      shape.curves[10].v1.x = shape.curves[10].v1.x+x;
      shape.curves[10].v2.x = shape.curves[10].v2.x+x;
      shape.curves[10].v3.x = shape.curves[10].v3.x+x;
      //line side
      shape.curves[11].v1.x = shape.curves[11].v1.x+x;
      shape.curves[11].v2.x = shape.curves[11].v2.x+x;
//Y
      //line side
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      //curve out
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[5].v3.y = shape.curves[5].v3.y+y;
      //line out
      shape.curves[6].v1.y = shape.curves[6].v1.y+y;
      shape.curves[6].v2.y = shape.curves[6].v2.y+y;
      //желоб
      shape.curves[7].v0.y =  shape.curves[7].v0.y+y;
      shape.curves[7].v1.y =  shape.curves[7].v1.y+y;
      shape.curves[7].v2.y =  shape.curves[7].v2.y+y;
      shape.curves[7].v3.y =  shape.curves[7].v3.y+y;
      shape.curves[8].v0.y =  shape.curves[8].v0.y+y;
      shape.curves[8].v1.y =  shape.curves[8].v1.y+y;
      shape.curves[8].v2.y =  shape.curves[8].v2.y+y;
      shape.curves[8].v3.y =  shape.curves[8].v3.y+y;
      //line out
      shape.curves[9].v1.y = shape.curves[9].v1.y+y;
      shape.curves[9].v2.y = shape.curves[9].v2.y+y;
      //curve out
      shape.curves[10].v0.y = shape.curves[10].v0.y+y;
      shape.curves[10].v1.y = shape.curves[10].v1.y+y;
      shape.curves[10].v2.y = shape.curves[10].v2.y+y;
      shape.curves[10].v3.y = shape.curves[10].v3.y+y;
      //line side
      shape.curves[11].v1.y = shape.curves[11].v1.y+y;
      break;
    case "a_s":
      shape = original.a_s.clone();
      x=x/5*35-35;
      y=y/1.5*15-15;
//Изменение по X
      //curve inner
      shape.curves[0].v0.x = shape.curves[0].v0.x+x;
      shape.curves[0].v1.x = shape.curves[0].v1.x+x;
      shape.curves[0].v2.x = shape.curves[0].v2.x+x;
      shape.curves[0].v3.x = shape.curves[0].v3.x+x;
      //line inner
      shape.curves[1].v1.x = shape.curves[1].v1.x+x;
      //line inner
      shape.curves[2].v2.x = shape.curves[2].v2.x-x;
      //curve inner
      shape.curves[3].v0.x = shape.curves[3].v0.x-x;
      shape.curves[3].v1.x = shape.curves[3].v1.x-x;
      shape.curves[3].v2.x = shape.curves[3].v2.x-x;
      shape.curves[3].v3.x = shape.curves[3].v3.x-x;
      //line side
      shape.curves[4].v1.x = shape.curves[4].v1.x-x;
      shape.curves[4].v2.x = shape.curves[4].v2.x-x;
      //curve out
      shape.curves[5].v0.x = shape.curves[5].v0.x-x;
      shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      shape.curves[5].v2.x = shape.curves[5].v2.x-x;
      shape.curves[5].v3.x = shape.curves[5].v3.x-x;
      //line out
      shape.curves[6].v1.x = shape.curves[6].v1.x-x;
      //line out
      shape.curves[10].v2.x = shape.curves[10].v2.x+x;
      //curve out
      shape.curves[11].v0.x = shape.curves[11].v0.x+x;
      shape.curves[11].v1.x = shape.curves[11].v1.x+x;
      shape.curves[11].v2.x = shape.curves[11].v2.x+x;
      shape.curves[11].v3.x = shape.curves[11].v3.x+x;
      //line side
      shape.curves[12].v1.x = shape.curves[12].v1.x+x;
      shape.curves[12].v2.x = shape.curves[12].v2.x+x;
//Y
      //line side
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      //curve out
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[5].v3.y = shape.curves[5].v3.y+y;
      //line out
      shape.curves[6].v1.y = shape.curves[6].v1.y+y;
      shape.curves[6].v2.y = shape.curves[6].v2.y+y;
      //желоб
      shape.curves[7].v1.y = shape.curves[7].v1.y+y;
      shape.curves[7].v2.y = shape.curves[7].v2.y+y;
      shape.curves[8].v1.y = shape.curves[8].v1.y+y;
      shape.curves[8].v2.y = shape.curves[8].v2.y+y;
      shape.curves[9].v1.y = shape.curves[9].v1.y+y;
      shape.curves[9].v2.y = shape.curves[9].v2.y+y;
      //line out
      shape.curves[10].v1.y = shape.curves[10].v1.y+y;
      shape.curves[10].v2.y = shape.curves[10].v2.y+y;
      //curve out
      shape.curves[11].v0.y = shape.curves[11].v0.y+y;
      shape.curves[11].v1.y = shape.curves[11].v1.y+y;
      shape.curves[11].v2.y = shape.curves[11].v2.y+y;
      shape.curves[11].v3.y = shape.curves[11].v3.y+y;
      //line side
      shape.curves[12].v1.y = shape.curves[12].v1.y+y;
      break;
  case "c":
      shape = original.c.clone();
      x=x/5*35-35;
      y=y/1.5*15-15;
      shape.curves[0].xRadius =  shape.curves[0].xRadius+x;
      shape.curves[0].yRadius =  shape.curves[0].yRadius+y;
      shape.curves[0].aY =  shape.curves[0].aY+y;
  break;
  case "c_u":
      shape = original.c_u.clone();
      x=x/5*35-35;
      y=y/1.5*15-15;
      var offset1_x=-0.05;
      var offset2_x=0.5;
      if (x<5) {
          //inner curve
          shape.curves[0].v1.x = (shape.curves[0].v1.x+x)-(x*offset2_x);
          shape.curves[0].v2.x = (shape.curves[0].v2.x+x)-(x*offset1_x);
          shape.curves[0].v3.x = shape.curves[0].v3.x+x;
          //side curve
          shape.curves[1].v0.x = shape.curves[1].v0.x+x;
          shape.curves[1].v1.x = (shape.curves[1].v1.x+x)-(x*offset1_x);
          shape.curves[1].v2.x = (shape.curves[1].v2.x+x)-(x*offset2_x);
          //side curve
          shape.curves[4].v1.x = (shape.curves[4].v1.x-x)+(x*offset2_x);
          shape.curves[4].v2.x = (shape.curves[4].v2.x-x)+(x*offset1_x);
          shape.curves[4].v3.x = shape.curves[4].v3.x-x;
          //
          shape.curves[5].v0.x = shape.curves[5].v0.x-x;
          shape.curves[5].v1.x = (shape.curves[5].v1.x-x)+(x*offset1_x);
          shape.curves[5].v2.x = (shape.curves[5].v2.x-x)+(x*offset2_x);
      } else {
          //inner curve
          shape.curves[0].v2.x = shape.curves[0].v2.x+x;
          shape.curves[0].v3.x = shape.curves[0].v3.x+x;
          //side curve
          shape.curves[1].v0.x = shape.curves[1].v0.x+x;
          shape.curves[1].v1.x = shape.curves[1].v1.x+x;
          shape.curves[4].v2.x = shape.curves[4].v2.x-x;
          shape.curves[4].v3.x = shape.curves[4].v3.x-x;
          //
          shape.curves[5].v0.x = shape.curves[5].v0.x-x;
          shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      }
//Y
      //inner curve
      shape.curves[0].v2.y = shape.curves[0].v2.y+y;
      shape.curves[0].v3.y = shape.curves[0].v3.y+y;
      //side curve
      shape.curves[1].v0.y = shape.curves[1].v0.y+y;
      shape.curves[1].v1.y = shape.curves[1].v1.y+y;
      shape.curves[1].v2.y = shape.curves[1].v2.y+y;
      shape.curves[1].v3.y = shape.curves[1].v3.y+y;
      //grooves
      shape.curves[2].v0.y = shape.curves[2].v0.y+y;
      shape.curves[2].v1.y = shape.curves[2].v1.y+y;
      shape.curves[2].v2.y = shape.curves[2].v2.y+y;
      shape.curves[2].v3.y = shape.curves[2].v3.y+y;
      shape.curves[3].v0.y = shape.curves[3].v0.y+y;
      shape.curves[3].v1.y = shape.curves[3].v1.y+y;
      shape.curves[3].v2.y = shape.curves[3].v2.y+y;
      shape.curves[3].v3.y = shape.curves[3].v3.y+y;
      //side curve
      shape.curves[4].v0.y = shape.curves[4].v0.y+y;
      shape.curves[4].v1.y = shape.curves[4].v1.y+y;
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      shape.curves[4].v3.y = shape.curves[4].v3.y+y;
      //
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
  break;
  case "c_v":
      shape = original.c_v.clone();
      x=x/5*35-35;
      y=y/1.5*15-15;
      var offset1_x=-0.05;
      var offset2_x=0.5;
      if (x<5) {
          //inner curve
          shape.curves[0].v1.x = (shape.curves[0].v1.x+x)-(x*offset2_x);
          shape.curves[0].v2.x = (shape.curves[0].v2.x+x)-(x*offset1_x);
          shape.curves[0].v3.x = shape.curves[0].v3.x+x;
          //side curve
          shape.curves[1].v0.x = shape.curves[1].v0.x+x;
          shape.curves[1].v1.x = (shape.curves[1].v1.x+x)-(x*offset1_x);
          shape.curves[1].v2.x = (shape.curves[1].v2.x+x)-(x*offset2_x);
          shape.curves[4].v1.x = (shape.curves[4].v1.x-x)+(x*offset2_x);
          shape.curves[4].v2.x = (shape.curves[4].v2.x-x)+(x*offset1_x);
          shape.curves[4].v3.x = shape.curves[4].v3.x-x;
          //
          shape.curves[5].v0.x = shape.curves[5].v0.x-x;
          shape.curves[5].v1.x = (shape.curves[5].v1.x-x)+(x*offset1_x);
          shape.curves[5].v2.x = (shape.curves[5].v2.x-x)+(x*offset2_x);
      } else {
          shape.curves[0].v2.x = shape.curves[0].v2.x+x;
          shape.curves[0].v3.x = shape.curves[0].v3.x+x;
          //side curve
          shape.curves[1].v0.x = shape.curves[1].v0.x+x;
          shape.curves[1].v1.x = shape.curves[1].v1.x+x;
          shape.curves[4].v2.x = shape.curves[4].v2.x-x;
          shape.curves[4].v3.x = shape.curves[4].v3.x-x;
          //
          shape.curves[5].v0.x = shape.curves[5].v0.x-x;
          shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      }
//Y
      //inner curve
      shape.curves[0].v2.y = shape.curves[0].v2.y+y;
      shape.curves[0].v3.y = shape.curves[0].v3.y+y;

      //side curve
      shape.curves[1].v0.y = shape.curves[1].v0.y+y;
      shape.curves[1].v1.y = shape.curves[1].v1.y+y;
      shape.curves[1].v2.y = shape.curves[1].v2.y+y;
      shape.curves[1].v3.y = shape.curves[1].v3.y+y;

      //grooves
      shape.curves[2].v0.y = shape.curves[2].v0.y+y;
      shape.curves[2].v1.y = shape.curves[2].v1.y+y;
      shape.curves[2].v2.y = shape.curves[2].v2.y+y;
      shape.curves[2].v3.y = shape.curves[2].v3.y+y;
      shape.curves[3].v0.y = shape.curves[3].v0.y+y;
      shape.curves[3].v1.y = shape.curves[3].v1.y+y;
      shape.curves[3].v2.y = shape.curves[3].v2.y+y;
      shape.curves[3].v3.y = shape.curves[3].v3.y+y;

      //side curve
      shape.curves[4].v0.y = shape.curves[4].v0.y+y;
      shape.curves[4].v1.y = shape.curves[4].v1.y+y;
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      shape.curves[4].v3.y = shape.curves[4].v3.y+y;

      //
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
  break;

  case "c_s":
      shape = original.c_s.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;
      var offset1_x=-0.05;
      var offset2_x=0.5;
      if (x<5) {
          //inner curve
          //shape.curves[0].v0.x = shape.curves[0].v0.x+x;
          shape.curves[0].v1.x = (shape.curves[0].v1.x+x)-(x*offset2_x);
          shape.curves[0].v2.x = (shape.curves[0].v2.x+x)-(x*offset1_x);
          shape.curves[0].v3.x = shape.curves[0].v3.x+x;

          //side curve
          shape.curves[1].v0.x = shape.curves[1].v0.x+x;
          shape.curves[1].v1.x = (shape.curves[1].v1.x+x)-(x*offset1_x);
          shape.curves[1].v2.x = (shape.curves[1].v2.x+x)-(x*offset2_x);
          //shape.curves[1].v3.x = shape.curves[1].v3.x+x;
          //side curve
          //shape.curves[4].v0.x = shape.curves[4].v0.x-x;
          shape.curves[5].v1.x = (shape.curves[5].v1.x-x)+(x*offset2_x);
          shape.curves[5].v2.x = (shape.curves[5].v2.x-x)+(x*offset1_x);
          shape.curves[5].v3.x = shape.curves[5].v3.x-x;

          shape.curves[6].v0.x = shape.curves[6].v0.x-x;
          shape.curves[6].v1.x = (shape.curves[6].v1.x-x)+(x*offset1_x);
          shape.curves[6].v2.x = (shape.curves[6].v2.x-x)+(x*offset2_x);
          //shape.curves[6].v3.x = shape.curves[6].v3.x-x;
      } else {
                  //inner curve
          shape.curves[0].v2.x = shape.curves[0].v2.x+x;
          shape.curves[0].v3.x = shape.curves[0].v3.x+x;

          //side curve
          shape.curves[1].v0.x = shape.curves[1].v0.x+x;
          shape.curves[1].v1.x = shape.curves[1].v1.x+x;
          //side curve
          shape.curves[5].v2.x = shape.curves[5].v2.x-x;
          shape.curves[5].v3.x = shape.curves[5].v3.x-x;

          shape.curves[6].v0.x = shape.curves[6].v0.x-x;
          shape.curves[6].v1.x = shape.curves[6].v1.x-x;
      }

//Y
      //inner curve
      shape.curves[0].v2.y = shape.curves[0].v2.y+y;
      shape.curves[0].v3.y = shape.curves[0].v3.y+y;

      //side curve
      shape.curves[1].v0.y = shape.curves[1].v0.y+y;
      shape.curves[1].v1.y = shape.curves[1].v1.y+y;
      shape.curves[1].v2.y = shape.curves[1].v2.y+y;
      shape.curves[1].v3.y = shape.curves[1].v3.y+y;

      //grooves
      shape.curves[2].v0.y = shape.curves[2].v0.y+y;
      shape.curves[2].v1.y = shape.curves[2].v1.y+y;
      shape.curves[2].v2.y = shape.curves[2].v2.y+y;
      shape.curves[2].v3.y = shape.curves[2].v3.y+y;

      shape.curves[3].v1.y = shape.curves[3].v1.y+y;
      shape.curves[3].v2.y = shape.curves[3].v2.y+y;

      shape.curves[4].v0.y = shape.curves[4].v0.y+y;
      shape.curves[4].v1.y = shape.curves[4].v1.y+y;
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      shape.curves[4].v3.y = shape.curves[4].v3.y+y;

      //side curve
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[5].v3.y = shape.curves[5].v3.y+y;

      //
      shape.curves[6].v0.y = shape.curves[6].v0.y+y;
      shape.curves[6].v1.y = shape.curves[6].v1.y+y;
  break;
    case "d":
      shape = original.d.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      var offset1_x=0.5;
      var offset2_x=0.5;
//console.log (shape)
      if (x<5) {
          //изменение значения по X
          //прямая
          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

          //кривые
          shape.curves[2].v0.x =  shape.curves[2].v0.x-x; //крайняя левая
          shape.curves[2].v1.x =  shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)+(x*offset1_x)//1.5;
          shape.curves[3].v1.x =  (shape.curves[3].v1.x+x)-(x*offset1_x);//*1.5;
          shape.curves[3].v2.x =  (shape.curves[3].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[3].v3.x =  (shape.curves[3].v3.x+x); //крайняя правая

      } else {
          //изменение значения по X
          //прямая
          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

          //кривые
          shape.curves[2].v0.x =  shape.curves[2].v0.x-x; //крайняя левая
          shape.curves[2].v1.x =  shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)-(x*offset1_x)//1.5;
          shape.curves[3].v1.x =  (shape.curves[3].v1.x+x)+(x*offset1_x);//*1.5;
          shape.curves[3].v2.x =  (shape.curves[3].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[3].v3.x =  (shape.curves[3].v3.x+x); //крайняя правая
      }

      var offset1_y=0.2;

      if (y>1.5) {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y);//-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;//центр правой
          shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
          shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
      } else {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y)-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;//центр правой
          shape.curves[3].v1.y =  (shape.curves[3].v1.y+y);
          shape.curves[3].v2.y =  (shape.curves[3].v2.y+y)-(y*offset1_y);
      }

      break;

    case "d_u":
      shape = original.d_u.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      var offset1_x=0.5;
      var offset2_x=0.5;
//console.log (shape)
      if (x<5) {
          //изменение значения по X
          //прямая

          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          //shape.curves[0].v2.x =  shape.curves[0].v2.x-x;
          //shape.curves[1].v1.x =  shape.curves[1].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

          //кривая до желобка
          shape.curves[2].v0.x = shape.curves[2].v0.x-x;
          shape.curves[2].v1.x = shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)+(x*offset1_x)//1.5;
          shape.curves[5].v1.x =  (shape.curves[5].v1.x+x)-(x*offset1_x);//*1.5;
          shape.curves[5].v2.x =  (shape.curves[5].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[5].v3.x =  (shape.curves[5].v3.x+x); //крайняя правая

      } else {

          //изменение значения по X
          //прямая
          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          //shape.curves[0].v2.x =  shape.curves[0].v2.x-x;
          //shape.curves[1].v1.x =  shape.curves[1].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

          //кривая до желобка
          shape.curves[2].v0.x = shape.curves[2].v0.x-x;
          shape.curves[2].v1.x = shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)-(x*offset1_x)//1.5;
          //shape.curves[2].v3.x = shape.curves[2].v3.x+x;

          //shape.curves[2].v0.x =  shape.curves[2].v0.x+x;//центр правой
          shape.curves[5].v1.x =  (shape.curves[5].v1.x+x)+(x*offset1_x);//*1.5;
          shape.curves[5].v2.x =  (shape.curves[5].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[5].v3.x =  (shape.curves[5].v3.x+x); //крайняя правая

      }

      var offset1_y=0.2;

      if (y>1.5) {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y);//-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
          //желоб
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
          shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
          shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
          shape.curves[3].v3.y =  shape.curves[3].v3.y+y;
          shape.curves[4].v0.y =  shape.curves[4].v0.y+y;
          shape.curves[4].v1.y =  shape.curves[4].v1.y+y;
          shape.curves[4].v2.y =  shape.curves[4].v2.y+y;
          shape.curves[4].v3.y =  shape.curves[4].v3.y+y;

          shape.curves[5].v0.y =  shape.curves[5].v0.y+y;//центр правой
          shape.curves[5].v1.y =  shape.curves[5].v1.y+y;
          shape.curves[5].v2.y =  shape.curves[5].v2.y+y;
      } else {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y)-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
          //желоб
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
          shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
          shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
          shape.curves[3].v3.y =  shape.curves[3].v3.y+y;
          shape.curves[4].v0.y =  shape.curves[4].v0.y+y;
          shape.curves[4].v1.y =  shape.curves[4].v1.y+y;
          shape.curves[4].v2.y =  shape.curves[4].v2.y+y;
          shape.curves[4].v3.y =  shape.curves[4].v3.y+y;

          shape.curves[5].v0.y =  shape.curves[5].v0.y+y;//центр правой
          shape.curves[5].v1.y =  (shape.curves[5].v1.y+y);
          shape.curves[5].v2.y =  (shape.curves[5].v2.y+y)-(y*offset1_y);
      }

      break;

    case "d_v":
      shape = original.d_v.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      var offset1_x=0.5;
      var offset2_x=0.5;
console.log (shape)
      if (x<5) {
          //изменение значения по X
          //прямая

          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          //shape.curves[0].v2.x =  shape.curves[0].v2.x-x;
          //shape.curves[1].v1.x =  shape.curves[1].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

          //кривая до желобка
          shape.curves[2].v0.x = shape.curves[2].v0.x-x;
          shape.curves[2].v1.x = shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)+(x*offset1_x)//1.5;
          shape.curves[5].v1.x =  (shape.curves[5].v1.x+x)-(x*offset1_x);//*1.5;
          shape.curves[5].v2.x =  (shape.curves[5].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[5].v3.x =  (shape.curves[5].v3.x+x); //крайняя правая

      } else {

          //изменение значения по X
          //прямая
          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;
          //кривая до желобка
          shape.curves[2].v0.x = shape.curves[2].v0.x-x;
          shape.curves[2].v1.x = shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)-(x*offset1_x)//1.5;
          shape.curves[5].v1.x =  (shape.curves[5].v1.x+x)+(x*offset1_x);//*1.5;
          shape.curves[5].v2.x =  (shape.curves[5].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[5].v3.x =  (shape.curves[5].v3.x+x); //крайняя правая

      }

      var offset1_y=0.2;

      if (y>1.5) {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y);//-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
          //желоб
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
          shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
          shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
          shape.curves[3].v3.y =  shape.curves[3].v3.y+y;
          shape.curves[4].v0.y =  shape.curves[4].v0.y+y;
          shape.curves[4].v1.y =  shape.curves[4].v1.y+y;
          shape.curves[4].v2.y =  shape.curves[4].v2.y+y;
          shape.curves[4].v3.y =  shape.curves[4].v3.y+y;

          shape.curves[5].v0.y =  shape.curves[5].v0.y+y;//центр правой
          shape.curves[5].v1.y =  shape.curves[5].v1.y+y;
          shape.curves[5].v2.y =  shape.curves[5].v2.y+y;
      } else {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y)-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
          //желоб
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
          shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
          shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
          shape.curves[3].v3.y =  shape.curves[3].v3.y+y;
          shape.curves[4].v0.y =  shape.curves[4].v0.y+y;
          shape.curves[4].v1.y =  shape.curves[4].v1.y+y;
          shape.curves[4].v2.y =  shape.curves[4].v2.y+y;
          shape.curves[4].v3.y =  shape.curves[4].v3.y+y;

          shape.curves[5].v0.y =  shape.curves[5].v0.y+y;//центр правой
          shape.curves[5].v1.y =  (shape.curves[5].v1.y+y);
          shape.curves[5].v2.y =  (shape.curves[5].v2.y+y)-(y*offset1_y);
      }

      break;

      case "d_s":
      shape = original.d_s.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      var offset1_x=0.5;
      var offset2_x=0.5;
console.log (shape.curves)
      if (x<5) {
          //изменение значения по X
          //прямая
          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

          //кривая до желобка
          shape.curves[2].v0.x = shape.curves[2].v0.x-x;
          shape.curves[2].v1.x = shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)+(x*offset1_x)//1.5;
          //желоб
          shape.curves[6].v1.x =  (shape.curves[6].v1.x+x)-(x*offset1_x);//*1.5;
          shape.curves[6].v2.x =  (shape.curves[6].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[6].v3.x =  (shape.curves[6].v3.x+x); //крайняя правая

      } else {

          //изменение значения по X
          //прямая
          shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
          shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

          //кривая до желобка
          shape.curves[2].v0.x = shape.curves[2].v0.x-x;
          shape.curves[2].v1.x = shape.curves[2].v1.x-x;
          shape.curves[2].v2.x =  (shape.curves[2].v2.x-x)-(x*offset1_x)//1.5;
          //shape.curves[2].v3.x = shape.curves[2].v3.x+x;

          //shape.curves[2].v0.x =  shape.curves[2].v0.x+x;//центр правой
          shape.curves[6].v1.x =  (shape.curves[6].v1.x+x)+(x*offset1_x);//*1.5;
          shape.curves[6].v2.x =  (shape.curves[6].v2.x+x);//-(x*offset2_x);//*1.5;
          shape.curves[6].v3.x =  (shape.curves[6].v3.x+x); //крайняя правая

      }

      var offset1_y=0.2;

      if (y>1.5) {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y);//-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;

          //желоб
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
          shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
          shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
          shape.curves[3].v3.y =  shape.curves[3].v3.y+y;

          shape.curves[4].v1.y =  shape.curves[4].v1.y+y;
          shape.curves[4].v2.y =  shape.curves[4].v2.y+y;

          shape.curves[5].v0.y =  shape.curves[5].v0.y+y;
          shape.curves[5].v1.y =  shape.curves[5].v1.y+y;
          shape.curves[5].v2.y =  shape.curves[5].v2.y+y;
          shape.curves[5].v3.y =  shape.curves[5].v3.y+y;

          shape.curves[6].v0.y =  shape.curves[6].v0.y+y;//центр правой
          shape.curves[6].v1.y =  shape.curves[6].v1.y+y;
          shape.curves[6].v2.y =  shape.curves[6].v2.y+y;
      } else {
          //изменение значения по Y
          shape.curves[2].v3.y =  shape.curves[2].v3.y+y;//центр левой
          shape.curves[2].v1.y =  (shape.curves[2].v1.y+y)-(y*offset1_y);
          shape.curves[2].v2.y =  shape.curves[2].v2.y+y;

          //желоб
          shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
          shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
          shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
          shape.curves[3].v3.y =  shape.curves[3].v3.y+y;

          shape.curves[4].v1.y =  shape.curves[4].v1.y+y;
          shape.curves[4].v2.y =  shape.curves[4].v2.y+y;

          shape.curves[5].v0.y =  shape.curves[5].v0.y+y;
          shape.curves[5].v1.y =  shape.curves[5].v1.y+y;
          shape.curves[5].v2.y =  shape.curves[5].v2.y+y;
          shape.curves[5].v3.y =  shape.curves[5].v3.y+y;

          shape.curves[6].v0.y =  shape.curves[6].v0.y+y;//центр правой
          shape.curves[6].v1.y =  (shape.curves[6].v1.y+y);
          shape.curves[6].v2.y =  (shape.curves[6].v2.y+y)-(y*offset1_y);
      }

      break;

  case "j":
      shape = original.j.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      //arc inner
      shape.curves[0].v0.x =  shape.curves[0].v0.x+x;
      shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
      shape.curves[0].v2.x =  shape.curves[0].v2.x-x;
      shape.curves[0].v3.x =  shape.curves[0].v3.x-x;

      //right line
      shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

      //right corner
      shape.curves[2].v0.x =  shape.curves[2].v0.x-x;
      shape.curves[2].v1.x =  shape.curves[2].v1.x-x;
      shape.curves[2].v2.x =  shape.curves[2].v2.x-x;
      shape.curves[2].v3.x =  shape.curves[2].v3.x-x;

      //out line 1 and 2
      shape.curves[3].v0.x =  shape.curves[3].v0.x-x;
      shape.curves[3].v1.x =  shape.curves[3].v1.x-x;
      //shape.curves[3].v2.x =  shape.curves[3].v2.x-x;
      //shape.curves[3].v3.x =  shape.curves[3].v3.x-x;
      //shape.curves[4].v0.x =  shape.curves[4].v0.x+x;
      //shape.curves[4].v1.x =  shape.curves[4].v1.x+x;
      shape.curves[4].v2.x =  shape.curves[4].v2.x+x;
      shape.curves[4].v3.x =  shape.curves[4].v3.x+x;

      //left corner
      shape.curves[5].v0.x =  shape.curves[5].v0.x+x;
      shape.curves[5].v1.x =  shape.curves[5].v1.x+x;
      shape.curves[5].v2.x =  shape.curves[5].v2.x+x;
      shape.curves[5].v3.x =  shape.curves[5].v3.x+x;

      //left line
      shape.curves[6].v1.x =  shape.curves[6].v1.x+x;
      shape.curves[6].v2.x =  shape.curves[6].v2.x+x;
//Y
      //right line
      //shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.y =  shape.curves[1].v2.y+y;

      //right corner
      shape.curves[2].v0.y =  shape.curves[2].v0.y+y;
      shape.curves[2].v1.y =  shape.curves[2].v1.y+y;
      shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
      shape.curves[2].v3.y =  shape.curves[2].v3.y+y;

      //out line 1 and 2
      shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
      shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
      shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
      shape.curves[3].v3.y =  shape.curves[3].v3.y+y;
      shape.curves[4].v0.y =  shape.curves[4].v0.y+y;
      shape.curves[4].v1.y =  shape.curves[4].v1.y+y;
      shape.curves[4].v2.y =  shape.curves[4].v2.y+y;
      shape.curves[4].v3.y =  shape.curves[4].v3.y+y;

      //left corner
      shape.curves[5].v0.y =  shape.curves[5].v0.y+y;
      shape.curves[5].v1.y =  shape.curves[5].v1.y+y;
      shape.curves[5].v2.y =  shape.curves[5].v2.y+y;
      shape.curves[5].v3.y =  shape.curves[5].v3.y+y;

      //left line
      shape.curves[6].v1.y =  shape.curves[6].v1.y+y;
  break;
  case "j_u":
      shape = original.j_u.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      //arc inner
      shape.curves[0].v0.x =  shape.curves[0].v0.x+x;
      shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
      shape.curves[0].v2.x =  shape.curves[0].v2.x-x;
      shape.curves[0].v3.x =  shape.curves[0].v3.x-x;

      //right line
      shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

      //right corner
      shape.curves[2].v0.x =  shape.curves[2].v0.x-x;
      shape.curves[2].v1.x =  shape.curves[2].v1.x-x;
      shape.curves[2].v2.x =  shape.curves[2].v2.x-x;
      shape.curves[2].v3.x =  shape.curves[2].v3.x-x;

      //out line 1 and 2
      shape.curves[3].v0.x =  shape.curves[3].v0.x-x;
      shape.curves[3].v1.x =  shape.curves[3].v1.x-x;
      //shape.curves[3].v2.x =  shape.curves[3].v2.x-x;
      //shape.curves[3].v3.x =  shape.curves[3].v3.x-x;
      //желоб
      //shape.curves[4].v0.x = shape.curves[4].v0.x-x;
      //shape.curves[4].v1.x = shape.curves[4].v1.x-x;
      //shape.curves[4].v2.x = shape.curves[4].v1.x-x;
      //shape.curves[4].v3.x = shape.curves[4].v3.x+x;
      //shape.curves[5].v0.x = shape.curves[5].v0.x-x;
      //shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      //shape.curves[5].v2.x = shape.curves[5].v1.x-x;
      //shape.curves[5].v3.x = shape.curves[5].v3.x+x;

      //shape.curves[6].v0.x =  shape.curves[6].v0.x+x;
      //shape.curves[6].v1.x =  shape.curves[6].v1.x+x;
      shape.curves[6].v2.x =  shape.curves[6].v2.x+x;
      shape.curves[6].v3.x =  shape.curves[6].v3.x+x;

      //left corner
      shape.curves[7].v0.x =  shape.curves[7].v0.x+x;
      shape.curves[7].v1.x =  shape.curves[7].v1.x+x;
      shape.curves[7].v2.x =  shape.curves[7].v2.x+x;
      shape.curves[7].v3.x =  shape.curves[7].v3.x+x;

      //left line
      shape.curves[8].v1.x =  shape.curves[8].v1.x+x;
      shape.curves[8].v2.x =  shape.curves[8].v2.x+x;

//Y
      //right line
      //shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.y =  shape.curves[1].v2.y+y;

      //right corner
      shape.curves[2].v0.y =  shape.curves[2].v0.y+y;
      shape.curves[2].v1.y =  shape.curves[2].v1.y+y;
      shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
      shape.curves[2].v3.y =  shape.curves[2].v3.y+y;

      //out line 1
      shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
      shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
      shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
      shape.curves[3].v3.y =  shape.curves[3].v3.y+y;

      //желоб
      shape.curves[4].v0.y = shape.curves[4].v0.y+y;
      shape.curves[4].v1.y = shape.curves[4].v1.y+y;
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      shape.curves[4].v3.y = shape.curves[4].v3.y+y;
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[5].v3.y = shape.curves[5].v3.y+y;

      //out line 2
      shape.curves[6].v0.y =  shape.curves[6].v0.y+y;
      shape.curves[6].v1.y =  shape.curves[6].v1.y+y;
      shape.curves[6].v2.y =  shape.curves[6].v2.y+y;
      shape.curves[6].v3.y =  shape.curves[6].v3.y+y;

      //left corner
      shape.curves[7].v0.y =  shape.curves[7].v0.y+y;
      shape.curves[7].v1.y =  shape.curves[7].v1.y+y;
      shape.curves[7].v2.y =  shape.curves[7].v2.y+y;
      shape.curves[7].v3.y =  shape.curves[7].v3.y+y;

      //left line
      shape.curves[8].v1.y =  shape.curves[8].v1.y+y;

  break;

  case "j_v":
      shape = original.j_v.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      //arc inner
      shape.curves[0].v0.x =  shape.curves[0].v0.x+x;
      shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
      shape.curves[0].v2.x =  shape.curves[0].v2.x-x;
      shape.curves[0].v3.x =  shape.curves[0].v3.x-x;

      //right line
      shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

      //right corner
      shape.curves[2].v0.x =  shape.curves[2].v0.x-x;
      shape.curves[2].v1.x =  shape.curves[2].v1.x-x;
      shape.curves[2].v2.x =  shape.curves[2].v2.x-x;
      shape.curves[2].v3.x =  shape.curves[2].v3.x-x;

      //out line 1 and 2
      shape.curves[3].v0.x =  shape.curves[3].v0.x-x;
      shape.curves[3].v1.x =  shape.curves[3].v1.x-x;
      //shape.curves[3].v2.x =  shape.curves[3].v2.x-x;
      //shape.curves[3].v3.x =  shape.curves[3].v3.x-x;
      //желоб
      //shape.curves[4].v0.x = shape.curves[4].v0.x-x;
      //shape.curves[4].v1.x = shape.curves[4].v1.x-x;
      //shape.curves[4].v2.x = shape.curves[4].v1.x-x;
      //shape.curves[4].v3.x = shape.curves[4].v3.x+x;
      //shape.curves[5].v0.x = shape.curves[5].v0.x-x;
      //shape.curves[5].v1.x = shape.curves[5].v1.x-x;
      //shape.curves[5].v2.x = shape.curves[5].v1.x-x;
      //shape.curves[5].v3.x = shape.curves[5].v3.x+x;

      //shape.curves[6].v0.x =  shape.curves[6].v0.x+x;
      //shape.curves[6].v1.x =  shape.curves[6].v1.x+x;
      shape.curves[6].v2.x =  shape.curves[6].v2.x+x;
      shape.curves[6].v3.x =  shape.curves[6].v3.x+x;

      //left corner
      shape.curves[7].v0.x =  shape.curves[7].v0.x+x;
      shape.curves[7].v1.x =  shape.curves[7].v1.x+x;
      shape.curves[7].v2.x =  shape.curves[7].v2.x+x;
      shape.curves[7].v3.x =  shape.curves[7].v3.x+x;

      //left line
      shape.curves[8].v1.x =  shape.curves[8].v1.x+x;
      shape.curves[8].v2.x =  shape.curves[8].v2.x+x;

//Y
      //right line
      //shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.y =  shape.curves[1].v2.y+y;

      //right corner
      shape.curves[2].v0.y =  shape.curves[2].v0.y+y;
      shape.curves[2].v1.y =  shape.curves[2].v1.y+y;
      shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
      shape.curves[2].v3.y =  shape.curves[2].v3.y+y;

      //out line 1
      shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
      shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
      shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
      shape.curves[3].v3.y =  shape.curves[3].v3.y+y;

      //желоб
      shape.curves[4].v0.y = shape.curves[4].v0.y+y;
      shape.curves[4].v1.y = shape.curves[4].v1.y+y;
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      shape.curves[4].v3.y = shape.curves[4].v3.y+y;
      shape.curves[5].v0.y = shape.curves[5].v0.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[5].v3.y = shape.curves[5].v3.y+y;

      //out line 2
      shape.curves[6].v0.y =  shape.curves[6].v0.y+y;
      shape.curves[6].v1.y =  shape.curves[6].v1.y+y;
      shape.curves[6].v2.y =  shape.curves[6].v2.y+y;
      shape.curves[6].v3.y =  shape.curves[6].v3.y+y;

      //left corner
      shape.curves[7].v0.y =  shape.curves[7].v0.y+y;
      shape.curves[7].v1.y =  shape.curves[7].v1.y+y;
      shape.curves[7].v2.y =  shape.curves[7].v2.y+y;
      shape.curves[7].v3.y =  shape.curves[7].v3.y+y;

      //left line
      shape.curves[8].v1.y =  shape.curves[8].v1.y+y;

  break;
  case "j_s":
      shape = original.j_s.clone();

      x=x/5*35-35;
      y=y/1.5*15-15;

      //arc inner
      shape.curves[0].v0.x =  shape.curves[0].v0.x+x;
      shape.curves[0].v1.x =  shape.curves[0].v1.x+x;
      shape.curves[0].v2.x =  shape.curves[0].v2.x-x;
      shape.curves[0].v3.x =  shape.curves[0].v3.x-x;

      //right line
      shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.x =  shape.curves[1].v2.x-x;

      //right corner
      shape.curves[2].v0.x =  shape.curves[2].v0.x-x;
      shape.curves[2].v1.x =  shape.curves[2].v1.x-x;
      shape.curves[2].v2.x =  shape.curves[2].v2.x-x;
      shape.curves[2].v3.x =  shape.curves[2].v3.x-x;

      //out line 1 and 2
      shape.curves[3].v0.x =  shape.curves[3].v0.x-x;
      shape.curves[3].v1.x =  shape.curves[3].v1.x-x;
      //shape.curves[3].v2.x =  shape.curves[3].v2.x-x;
      //shape.curves[3].v3.x =  shape.curves[3].v3.x-x;

      //желоб

      //shape.curves[6].v0.x =  shape.curves[6].v0.x+x;
      //shape.curves[6].v1.x =  shape.curves[6].v1.x+x;
      shape.curves[7].v2.x =  shape.curves[7].v2.x+x;
      shape.curves[7].v3.x =  shape.curves[7].v3.x+x;

      //left corner
      shape.curves[8].v0.x =  shape.curves[8].v0.x+x;
      shape.curves[8].v1.x =  shape.curves[8].v1.x+x;
      shape.curves[8].v2.x =  shape.curves[8].v2.x+x;
      shape.curves[8].v3.x =  shape.curves[8].v3.x+x;

      //left line
      shape.curves[9].v1.x =  shape.curves[9].v1.x+x;
      shape.curves[9].v2.x =  shape.curves[9].v2.x+x;

//Y
      //right line
      //shape.curves[1].v1.x =  shape.curves[1].v1.x-x;
      shape.curves[1].v2.y =  shape.curves[1].v2.y+y;

      //right corner
      shape.curves[2].v0.y =  shape.curves[2].v0.y+y;
      shape.curves[2].v1.y =  shape.curves[2].v1.y+y;
      shape.curves[2].v2.y =  shape.curves[2].v2.y+y;
      shape.curves[2].v3.y =  shape.curves[2].v3.y+y;

      //out line 1
      shape.curves[3].v0.y =  shape.curves[3].v0.y+y;
      shape.curves[3].v1.y =  shape.curves[3].v1.y+y;
      shape.curves[3].v2.y =  shape.curves[3].v2.y+y;
      shape.curves[3].v3.y =  shape.curves[3].v3.y+y;

      //желоб
      shape.curves[4].v0.y = shape.curves[4].v0.y+y;
      shape.curves[4].v1.y = shape.curves[4].v1.y+y;
      shape.curves[4].v2.y = shape.curves[4].v2.y+y;
      shape.curves[4].v3.y = shape.curves[4].v3.y+y;
      shape.curves[5].v1.y = shape.curves[5].v1.y+y;
      shape.curves[5].v2.y = shape.curves[5].v2.y+y;
      shape.curves[6].v0.y = shape.curves[6].v0.y+y;
      shape.curves[6].v1.y = shape.curves[6].v1.y+y;
      shape.curves[6].v2.y = shape.curves[6].v2.y+y;
      shape.curves[6].v3.y = shape.curves[6].v3.y+y;

      //out line 2
      shape.curves[7].v0.y =  shape.curves[7].v0.y+y;
      shape.curves[7].v1.y =  shape.curves[7].v1.y+y;
      shape.curves[7].v2.y =  shape.curves[7].v2.y+y;
      shape.curves[7].v3.y =  shape.curves[7].v3.y+y;

      //left corner
      shape.curves[8].v0.y =  shape.curves[8].v0.y+y;
      shape.curves[8].v1.y =  shape.curves[8].v1.y+y;
      shape.curves[8].v2.y =  shape.curves[8].v2.y+y;
      shape.curves[8].v3.y =  shape.curves[8].v3.y+y;

      //left line
      shape.curves[9].v1.y =  shape.curves[9].v1.y+y;

  break;
  }
  return shape;
}
