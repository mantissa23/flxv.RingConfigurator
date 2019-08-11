/**
 * Generated by Verge3D Puzzles v.2.13.0
 * Thu Jul 25 2019 11:48:24 GMT+0400 (Azerbaijan Standard Time)
 * Do not edit this file - your changes may get overridden when Puzzles are saved.
 * Refer to https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for information on how to add your own JavaScript to Verge3D apps.
 */

"use strict";

(function() {

// global variables/constants used by puzzles' functions
var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.objClickCallbacks = [];
_pGlob.pickedObject = '';
_pGlob.objHoverCallbacks = [];
_pGlob.hoveredObject = '';
_pGlob.objMovementInfos = {};
_pGlob.objDragOverCallbacks = [];
_pGlob.objDragOverInfoByBlock = {}
_pGlob.dragMoveOrigins = {};
_pGlob.dragScaleOrigins = {};
_pGlob.mediaElements = {};
_pGlob.loadedFiles = {};
_pGlob.loadedFile = '';
_pGlob.animMixerCallbacks = [];
_pGlob.arHitPoint = new v3d.Vector3(0, 0, 0);
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.animateParamUpdate = null;
_pGlob.openedFile = '';
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();
_pGlob.timers = {};

var _pPhysics = {};

_pPhysics.syncList = [];

// internal info
_pPhysics.collisionData = [];

// goes to collision callback
_pPhysics.collisionInfo = {
    objectA: '',
    objectB: '',
    distance: 0,
    positionOnA: [0, 0, 0],
    positionOnB: [0, 0, 0],
    normalOnB: [0, 0, 0]
};

var PL = v3d.PL = v3d.PL || {};

PL.legacyMode = false;

PL.execInitPuzzles = function() {

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }
    
    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}
var chExample;


// ssaa puzzle
function ssaa(level) {
    appInstance.enableSSAA(Number(level), false);
}



// callJSFunction puzzle
function getJSFunction(funcName) {
    var jsFunc = appInstance.ExternalInterface[funcName];
    if (typeof jsFunc == "function")
        return jsFunc;
    else
        return function() {};
}



// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != "WINDOW" && ids[0] != "DOCUMENT" && ids[0] != "BODY") {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == "WINDOW") {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == "DOCUMENT") {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == "BODY") {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}



// eventHTMLElem puzzle
function eventHTMLElem(eventType, ids, isParent, callback) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem)
            continue;
        elem.addEventListener(eventType, callback, false);
    }
}



// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc;
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = typeof _pGlob != "undefined";
    objFound = runTime ? _pGlob.objCache[objName] : null;
    if (objFound && objFound.name == objName)
        return objFound;
    appInstance.scene.traverse(function(obj) {
        if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
            objFound = obj;
            if (runTime)
                _pGlob.objCache[objName] = objFound;
        }
    });
    return objFound;
}

// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}

// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return (obj.type != "Scene" && obj.type != "AmbientLight" &&
            obj.name != "" && !(obj.isMesh && obj.isMaterialGeneratedMesh));
}

// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}

function swizzleValueSign(newAxis, value) {
    newAxis = newAxis.toLowerCase();

    if (newAxis == 'z') {
        if (typeof value == 'number')
            return -value
        else if (typeof value == 'string' && value != '' && value != "''" && value != '""')
            return String(-Number(value));
        else
            return value;
    } else
        return value;
}

function swizzleVec3(vec, isScale) {

    var dest = []

    dest[0] = vec[0];
    dest[1] = vec[2];
    dest[2] = isScale ? vec[1] : swizzleValueSign('z', vec[1])

    return dest;
}

/**
 * mesh or multi-material object
 */
function isMeshObj(obj) {
    if (obj.isMesh)
        return true;

    for (var i = 0; i < obj.children.length; i++) {
        var child = obj.children[i];
        if (child.isMesh && child.isMaterialGeneratedMesh)
            return true;
    }

    return false;
}



// show and hide puzzles
function changeVis(objNames, bool) {
    objNames = retrieveObjectNames(objNames);
    if (!objNames)
        return;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i]
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (!obj)
            continue;
        obj.visible = bool;
    }
}


/**
 * Describe this function...
 */
function SwitchExample() {
  if (chExample == 1) {
    changeVis("Ring15", false);
    changeVis("Ring20", false);
    changeVis("Text", false);
    changeVis("Text.001", false);
    chExample = 0;
  } else {
    changeVis("Ring15", true);
    changeVis("Ring20", true);
    changeVis("Text", true);
    changeVis("Text.001", true);
    chExample = 1;
  }
}


ssaa("0");
chExample = 1;
SwitchExample();

eventHTMLElem('click', 'btChange', false, function(event) {
  getJSFunction('OnChangeSize')();
});

eventHTMLElem('change', 'cbMaterial1', false, function(event) {
  getJSFunction('OnChangeMaterial1')(null);
});

eventHTMLElem('change', 'cbMaterial2', false, function(event) {
  getJSFunction('OnChangeMaterial2')(null);
});

eventHTMLElem('change', 'chExample', false, function(event) {
  SwitchExample();
});

eventHTMLElem('change', 'cbSize', false, function(event) {
  getJSFunction('OnChangeSize')();
});

eventHTMLElem('change', 'cbSizeY', false, function(event) {
  getJSFunction('OnChangeSizeY')();
});

eventHTMLElem('change', 'cbSizeX', false, function(event) {
  getJSFunction('OnChangeSizeX')();
});

eventHTMLElem('change', 'cbProfile', false, function(event) {
  getJSFunction('OnChangeProfile')();
});

eventHTMLElem('change', 'cbMode', false, function(event) {
  getJSFunction('OnChangeMode')();
});

eventHTMLElem('change', 'cbDiv', false, function(event) {
  getJSFunction('OnChangeDiv')();
});

eventHTMLElem('change', 'cbGrooves', false, function(event) {
  getJSFunction('OnChangeGrooves')();
});

eventHTMLElem('change', 'cbJems', false, function(event) {
  getJSFunction('OnChangeJems')();
});

eventHTMLElem('change', 'cbJemsSize', false, function(event) {
  getJSFunction('OnChangeJems')();
});

eventHTMLElem('change', 'cbGemsRow', false, function(event) {
  getJSFunction('OnChangeJems')();
});

} // end of PL.init function

if (window.v3dApp) {
    // backwards compatibility for old player projects
    PL.legacyMode = true;
    PL.init(window.v3dApp);
}

})(); // end of closure

/* ================================ end of code ============================= */
