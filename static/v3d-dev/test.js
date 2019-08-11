'use strict';

import CSG from '../scripts/v3d-app/modules/csg.js';
import * as helpers from '../scripts/v3d-app/modules/helpers.js';

/* console.log (helpers);
console.log (helpers.getPoint('pointLeft')); */

//Данные колец
let GenerationMode; //тип генерации колец (BOTH, MAN, WOMAN)
window.GenerationMode = GenerationMode;

//объекты с данными по кольцам
var manRing = {
	size: 15,
	division: "m1m2", //m1m1, m1m2
	shape: {
		name: "c", 	//a,c,d,j
		sizeX: 3,	//2-10
		sizeY: 1	//1.0-2.0
	},
	material1: {
		name:"none",
		fineness: "585",
		color: "yellow", //yellow, white
		surface: "polished" //polished, matt, rhodium
	},
	material2: {
		name:"none",
		fineness: "585",
		color: "white",
		surface: "rhodium"
	},
	grooves: {
		name: "none", 	//none, u, v s
		number: 1,
		surface: "polished",
		width: 1
	},
	diamonds: {
    name: "none",   // не задействовано
		cut: "round",   // форма round, princess, emerald
		size: 0,        // не задействовано
    quality: "name",// не задействовано
    mode: 'user',   // режим авто-заполнения камней: user, max, half, third
		stones: 2,      // 1 до максимального для данного диаметра
    position: "none",// none, flush, section, channel
    rows: 2          // 1-2 кол-во столбцов для section
	}
}

var womanRing = {
	size: 15,
	division: "m1m1",
	shape: {
		name: "a",
		sizeX: 3,
		sizeY: 2
	},
	material1: {
		name:"none",
		fineness: "585",
		color: "white",
		surface: "polished"
	},
	material2: {
		name:"none",
		fineness: "585",
		color: "white",
		surface: "polished"
	},
	grooves: {
		name: "none", //none, u, v
		number: 1,
		surface: "polished",
		width: 1
	},
	diamonds: {
    name: "name",
		cut: "round",
		size: 0,
    quality: "name",
    mode: 'user',   // режим авто-заполнения камней: user, max, half, third
		stones: 2,
    position: "none",
    rows: 1
	}
}

window.manRing = manRing;
window.womanRing = womanRing;
var Ring3D = {};
window.Ring3D = Ring3D;

//Ring3D.start('canvas', manRing, womanRing)
//тестовый запуск инициализации движка, после загрузки всех скриптов

/* window.addEventListener('load', function() {


var result = Ring3D.start('canvas', manRing, womanRing);
  console.log (window);

}); */




