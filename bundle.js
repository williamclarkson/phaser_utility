/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dataObjs/PosVo.ts":
/*!*******************************!*\
  !*** ./src/dataObjs/PosVo.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosVo = void 0;
var PosVo = /** @class */ (function () {
    function PosVo(x, y) {
        this.x = x;
        this.y = y;
    }
    return PosVo;
}());
exports.PosVo = PosVo;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PosVo = exports.Align = exports.AlignGrid = exports.BaseScene = void 0;
var BaseScene_1 = __webpack_require__(/*! ./scenes/BaseScene */ "./src/scenes/BaseScene.ts");
Object.defineProperty(exports, "BaseScene", ({ enumerable: true, get: function () { return BaseScene_1.BaseScene; } }));
var alignGrid_1 = __webpack_require__(/*! ./util/alignGrid */ "./src/util/alignGrid.ts");
Object.defineProperty(exports, "AlignGrid", ({ enumerable: true, get: function () { return alignGrid_1.AlignGrid; } }));
var align_1 = __webpack_require__(/*! ./util/align */ "./src/util/align.ts");
Object.defineProperty(exports, "Align", ({ enumerable: true, get: function () { return align_1.Align; } }));
var PosVo_1 = __webpack_require__(/*! ./dataObjs/PosVo */ "./src/dataObjs/PosVo.ts");
Object.defineProperty(exports, "PosVo", ({ enumerable: true, get: function () { return PosVo_1.PosVo; } }));


/***/ }),

/***/ "./src/scenes/BaseScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/BaseScene.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseScene = void 0;
var __1 = __webpack_require__(/*! .. */ "./src/index.ts");
/**
 * The base scene includes extra information
 * as well as the standard scene
 * passed to other classes as the IBaseScene interface
 */
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene(sceneName) {
        var _this = _super.call(this, sceneName) || this;
        _this.gw = 0;
        _this.gh = 0;
        /**
         * coordinates from align grid
         */
        _this.ch = 0;
        _this.cw = 0;
        _this.cd = 0;
        return _this;
    }
    /**
     *
     * @returns alginGrid
     */
    BaseScene.prototype.getGrid = function () {
        return this.grid;
    };
    /**
     * overridden in scene class
     */
    BaseScene.prototype.create = function () {
        this.gw = this.game.config.width;
        this.gh = this.game.config.height;
    };
    BaseScene.prototype.resetSize = function (w, h) {
        this.gw = w;
        this.gh = h;
    };
    /**
     * make the align grid
     * @param r rows
     * @param c columns
     */
    BaseScene.prototype.makeGrid = function (r, c) {
        if (r === void 0) { r = 11; }
        if (c === void 0) { c = 11; }
        this.grid = new __1.AlignGrid(this, r, c);
        this.ch = this.grid.ch;
        this.cw = this.grid.cw;
        this.cd = this.grid.cd;
        // this.grid.showNumbers();
    };
    BaseScene.prototype.placePhysicImage = function (key, pos, scale) {
        var s2 = this.physics.add.sprite(0, 0, key);
        __1.Align.scaleToGameW(s2, scale, this);
        this.grid.placeAtIndex(pos, s2);
        return s2;
    };
    BaseScene.prototype.placeImage = function (key, pos, scale) {
        var s = this.add.sprite(0, 0, key);
        // console.log(scale);
        __1.Align.scaleToGameW(s, scale, this);
        this.grid.placeAtIndex(pos, s);
        return s;
    };
    BaseScene.prototype.placeImage2 = function (key, col, row, scale) {
        var s = this.add.sprite(0, 0, key);
        //console.log(scale);
        __1.Align.scaleToGameW(s, scale, this);
        this.grid.placeAt(col, row, s);
        return s;
    };
    /**
     *
     * @returns the real scene
     */
    BaseScene.prototype.getScene = function () {
        return this;
    };
    /**
     *
     * @returns the games width
     */
    BaseScene.prototype.getW = function () {
        return this.gw;
    };
    /**
     *
     * @returns the game height
     */
    BaseScene.prototype.getH = function () {
        return this.gh;
    };
    /**
     * Plays a sound effect
     * @param soundKey
     */
    BaseScene.prototype.playSound = function (soundKey) {
        var sound = this.sound.add(soundKey);
        sound.play();
    };
    return BaseScene;
}(Phaser.Scene));
exports.BaseScene = BaseScene;


/***/ }),

/***/ "./src/util/align.ts":
/*!***************************!*\
  !*** ./src/util/align.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Align = void 0;
/*jshint esversion: 6 */
var Align = /** @class */ (function () {
    function Align() {
    }
    Align.scaleToGameW = function (obj, per, scene) {
        var w = scene.getW();
        obj.displayWidth = w * per;
        obj.scaleY = obj.scaleX;
    };
    Align.scaleToGameH = function (obj, per, scene) {
        var h = scene.getH();
        obj.displayHeight = h * per;
        obj.scaleX = obj.scaleY;
    };
    Align.centerH = function (obj, scene) {
        obj.x = scene.getW() / 2 - obj.displayWidth / 2;
    };
    Align.centerV = function (obj, scene) {
        obj.y = scene.getH() / 2 - obj.displayHeight / 2;
    };
    Align.center2 = function (obj, scene) {
        obj.x = scene.getW() / 2 - obj.displayWidth / 2;
        obj.y = scene.getH() / 2 - obj.displayHeight / 2;
    };
    Align.center = function (obj, scene) {
        obj.x = scene.getW() / 2;
        obj.y = scene.getH() / 2;
    };
    Align.getYPer = function (per, scene) {
        return scene.getH() * per;
    };
    Align.getXPer = function (per, scene) {
        return scene.getW() * per;
    };
    Align.centerToObj = function (obj1, obj2) {
        obj1.x = obj2.displayWidth / 2 - obj1.displayWidth / 2;
        obj1.y = obj2.displayHeight / 2 - obj1.displayHeight / 2;
    };
    return Align;
}());
exports.Align = Align;
exports["default"] = Align;


/***/ }),

/***/ "./src/util/alignGrid.ts":
/*!*******************************!*\
  !*** ./src/util/alignGrid.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AlignGrid = void 0;
var PosVo_1 = __webpack_require__(/*! ../dataObjs/PosVo */ "./src/dataObjs/PosVo.ts");
/*jshint esversion: 6 */
var AlignGrid = /** @class */ (function () {
    function AlignGrid(scene, rows, cols, width, height) {
        if (rows === void 0) { rows = 11; }
        if (cols === void 0) { cols = 11; }
        if (width === void 0) { width = -1; }
        if (height === void 0) { height = -1; }
        this.rows = 0;
        this.cols = 0;
        this.cw = 0;
        this.ch = 0;
        this.cd = 0;
        this.numberArray = [];
        if (height === -1) {
            height = scene.getH();
        }
        if (width === -1) {
            width = scene.getW();
        }
        this.rows = rows;
        this.cols = cols;
        this.scene = scene;
        //cell width
        this.cw = width / this.cols;
        //cell height
        this.ch = height / this.rows;
        //d = √(l² + w²)
        this.cd = Math.sqrt(this.cw * this.cw + this.ch * this.ch);
        this.height = height;
        this.width = width;
        this.rscene = this.scene.getScene();
    }
    AlignGrid.prototype.show = function () {
        this.graphics = this.scene.getScene().add.graphics();
        this.graphics.lineStyle(2, 0xff0000, 0.5);
        for (var i = 0; i < this.width; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.height);
        }
        for (var i = 0; i < this.height; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.width, i);
        }
        this.graphics.strokePath();
    };
    AlignGrid.prototype.place = function (pos, obj) {
        this.placeAt(pos.x, pos.y, obj);
    };
    AlignGrid.prototype.placeAt = function (xx, yy, obj) {
        //calc position based upon the cellwidth and cellheight
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    };
    AlignGrid.prototype.placeAt2 = function (xx, yy, obj) {
        var x2 = this.cw * (xx - 1) + this.cw;
        var y2 = this.ch * (yy - 1) + this.ch;
        obj.x = x2;
        obj.y = y2;
    };
    AlignGrid.prototype.placeAtIndex = function (index, obj, useCenter) {
        if (useCenter === void 0) { useCenter = true; }
        var yy = Math.floor(index / this.cols);
        var xx = index - yy * this.cols;
        if (useCenter === true) {
            this.placeAt(xx, yy, obj);
        }
        else {
            this.placeAt2(xx, yy, obj);
        }
    };
    AlignGrid.prototype.showNumbers = function () {
        this.show();
        var count = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var numText = this.scene
                    .getScene()
                    .add.text(0, 0, count.toString(), { color: "#ff0000" });
                numText.setOrigin(0.5, 0.5);
                this.numberArray.push(numText);
                this.placeAtIndex(count, numText);
                count++;
            }
        }
    };
    AlignGrid.prototype.showPos = function () {
        this.show();
        var count = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var numText = this.scene
                    .getScene()
                    .add.text(0, 0, j + "\n" + i, { color: "#ff0000" });
                numText.setOrigin(0.5, 0.5);
                this.numberArray.push(numText);
                this.placeAtIndex(count, numText);
                count++;
            }
        }
    };
    AlignGrid.prototype.findNearestIndex = function (xx, yy) {
        var row = Math.floor(yy / this.ch);
        var col = Math.floor(xx / this.cw);
        var index = row * this.cols + col;
        return index;
    };
    AlignGrid.prototype.findNearestGridXY = function (xx, yy) {
        var row = Math.floor(yy / this.ch);
        var col = Math.floor(xx / this.cw);
        return {
            x: col,
            y: row,
        };
    };
    AlignGrid.prototype.findNearestGridXYDec = function (xx, yy) {
        var row = yy / this.ch;
        var col = xx / this.cw;
        return {
            x: col,
            y: row,
        };
    };
    AlignGrid.prototype.hide = function () {
        if (this.graphics) {
            this.graphics.clear();
        }
        this.numberArray.forEach(function (t) { t.destroy(); });
    };
    AlignGrid.prototype.getPosByXY = function (xx, yy) {
        var index = this.findNearestIndex(xx, yy);
        return this.getPosByIndex(index);
    };
    AlignGrid.prototype.getRealXY = function (xx, yy) {
        var x1 = xx * this.cw;
        var y1 = yy * this.ch;
        return new PosVo_1.PosVo(x1, y1);
    };
    AlignGrid.prototype.getRealMiddleBotton = function (xx, yy) {
        var x1 = (xx * this.cw) + this.cw / 2;
        var y1 = (yy + 1) * this.ch;
        y1 += this.ch;
        return new PosVo_1.PosVo(x1, y1);
    };
    AlignGrid.prototype.getRealBottom = function (xx, yy) {
        var x1 = xx * this.cw;
        var y1 = (yy + 1) * this.ch;
        y1 += this.ch;
        return new PosVo_1.PosVo(x1, y1);
    };
    AlignGrid.prototype.getPosByIndex = function (index) {
        var yy = Math.floor(index / this.cols);
        var xx = index - yy * this.cols;
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        return new PosVo_1.PosVo(x2, y2);
    };
    return AlignGrid;
}());
exports.AlignGrid = AlignGrid;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEM7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELHlCQUFLLEdBQUwsVUFBTSxHQUFTLEVBQUMsR0FBWTtRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsMkJBQU8sR0FBUCxVQUFRLEVBQVUsRUFBRSxFQUFVLEVBQUUsR0FBYTtRQUMzQyx1REFBdUQ7UUFDdkQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFcEMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsQ0FBQyxH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QztRQUM5QixJQUFJLEVBQUUsR0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3BDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2QsT0FBTyxJQUFJLGFBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELGlDQUFhLEdBQWIsVUFBYyxLQUFhO1FBQ3pCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLEVBQUUsR0FBRyxLQUFLLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsT0FBTyxJQUFJLGFBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQztBQWpMWSw4QkFBUzs7Ozs7OztVQ050QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGhhc2VyLXV0aWxpdHkvLi9zcmMvZGF0YU9ianMvUG9zVm8udHMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXV0aWxpdHkvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGhhc2VyLXV0aWxpdHkvLi9zcmMvc2NlbmVzL0Jhc2VTY2VuZS50cyIsIndlYnBhY2s6Ly9waGFzZXItdXRpbGl0eS8uL3NyYy91dGlsL2FsaWduLnRzIiwid2VicGFjazovL3BoYXNlci11dGlsaXR5Ly4vc3JjL3V0aWwvYWxpZ25HcmlkLnRzIiwid2VicGFjazovL3BoYXNlci11dGlsaXR5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BoYXNlci11dGlsaXR5L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcGhhc2VyLXV0aWxpdHkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3BoYXNlci11dGlsaXR5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgUG9zVm9cclxue1xyXG4gICAgcHVibGljIHg6bnVtYmVyO1xyXG4gICAgcHVibGljIHk6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyLHk6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMueD14O1xyXG4gICAgICAgIHRoaXMueT15O1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IHsgSUdhbWVPYmogfSBmcm9tIFwiLi9pbnRlcmZhY2VzL0lHYW1lT2JqXCI7XHJcbmV4cG9ydCB7SUJhc2VTY2VuZX0gZnJvbSBcIi4vaW50ZXJmYWNlcy9JQmFzZVNjZW5lXCI7XHJcbmV4cG9ydCB7QmFzZVNjZW5lfSBmcm9tIFwiLi9zY2VuZXMvQmFzZVNjZW5lXCI7XHJcbmV4cG9ydCB7IEFsaWduR3JpZCB9IGZyb20gXCIuL3V0aWwvYWxpZ25HcmlkXCI7XHJcbmV4cG9ydCB7QWxpZ259IGZyb20gXCIuL3V0aWwvYWxpZ25cIjtcclxuZXhwb3J0IHtQb3NWb30gZnJvbSBcIi4vZGF0YU9ianMvUG9zVm9cIjsiLCJpbXBvcnQgeyBJQmFzZVNjZW5lLCBBbGlnbkdyaWQsIEFsaWduIH0gZnJvbSBcIi4uXCI7XHJcblxyXG4vKipcclxuICogVGhlIGJhc2Ugc2NlbmUgaW5jbHVkZXMgZXh0cmEgaW5mb3JtYXRpb25cclxuICogYXMgd2VsbCBhcyB0aGUgc3RhbmRhcmQgc2NlbmVcclxuICogcGFzc2VkIHRvIG90aGVyIGNsYXNzZXMgYXMgdGhlIElCYXNlU2NlbmUgaW50ZXJmYWNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFzZVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lIGltcGxlbWVudHMgSUJhc2VTY2VuZSB7XHJcbiAgcHVibGljIGd3OiBudW1iZXI9MDtcclxuICBwdWJsaWMgZ2g6IG51bWJlcj0wO1xyXG4gIC8vcHJpdmF0ZSBncmFwaGljcyE6IFBoYXNlci5HYW1lT2JqZWN0cy5HcmFwaGljcztcclxuICAvL2FsaWduIGdyaWRcclxuICBwdWJsaWMgZ3JpZCE6IEFsaWduR3JpZDtcclxuICAvKipcclxuICAgKiBjb29yZGluYXRlcyBmcm9tIGFsaWduIGdyaWRcclxuICAgKi9cclxuICBwdWJsaWMgY2g6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIGN3OiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBjZDogbnVtYmVyID0gMDtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHNjZW5lTmFtZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlcihzY2VuZU5hbWUpO1xyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHJldHVybnMgYWxnaW5HcmlkXHJcbiAgICovXHJcbiAgZ2V0R3JpZCgpOiBBbGlnbkdyaWQge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JpZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogb3ZlcnJpZGRlbiBpbiBzY2VuZSBjbGFzc1xyXG4gICAqL1xyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ3cgPSB0aGlzLmdhbWUuY29uZmlnLndpZHRoIGFzIG51bWJlcjtcclxuICAgIHRoaXMuZ2ggPSB0aGlzLmdhbWUuY29uZmlnLmhlaWdodCBhcyBudW1iZXI7XHJcbiAgfVxyXG4gIHJlc2V0U2l6ZSh3Om51bWJlcixoOm51bWJlcilcclxuICB7XHJcbiAgICB0aGlzLmd3PXc7XHJcbiAgICB0aGlzLmdoPWg7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIG1ha2UgdGhlIGFsaWduIGdyaWRcclxuICAgKiBAcGFyYW0gciByb3dzXHJcbiAgICogQHBhcmFtIGMgY29sdW1uc1xyXG4gICAqL1xyXG4gIG1ha2VHcmlkKHI6IG51bWJlciA9IDExLCBjOiBudW1iZXIgPSAxMSkge1xyXG4gICAgdGhpcy5ncmlkID0gbmV3IEFsaWduR3JpZCh0aGlzLCByLCBjKTtcclxuICAgIHRoaXMuY2ggPSB0aGlzLmdyaWQuY2g7XHJcbiAgICB0aGlzLmN3ID0gdGhpcy5ncmlkLmN3O1xyXG4gICAgdGhpcy5jZCA9IHRoaXMuZ3JpZC5jZDtcclxuICAgIC8vIHRoaXMuZ3JpZC5zaG93TnVtYmVycygpO1xyXG4gIH1cclxuICBwbGFjZVBoeXNpY0ltYWdlKGtleTogc3RyaW5nLCBwb3M6IG51bWJlciwgc2NhbGU6IG51bWJlcik6IFBoYXNlci5QaHlzaWNzLkFyY2FkZS5TcHJpdGUge1xyXG4gICAgbGV0IHMyOiBQaGFzZXIuUGh5c2ljcy5BcmNhZGUuU3ByaXRlID0gdGhpcy5waHlzaWNzLmFkZC5zcHJpdGUoMCwgMCwga2V5KTtcclxuICAgIEFsaWduLnNjYWxlVG9HYW1lVyhzMiwgc2NhbGUsIHRoaXMpO1xyXG4gICAgdGhpcy5ncmlkLnBsYWNlQXRJbmRleChwb3MsIHMyKTtcclxuICAgIHJldHVybiBzMjtcclxuICB9XHJcbiAgcGxhY2VJbWFnZShrZXk6IHN0cmluZywgcG9zOiBudW1iZXIsIHNjYWxlOiBudW1iZXIpIHtcclxuXHJcbiAgICBsZXQgczogUGhhc2VyLkdhbWVPYmplY3RzLlNwcml0ZSA9IHRoaXMuYWRkLnNwcml0ZSgwLCAwLCBrZXkpO1xyXG4gICAvLyBjb25zb2xlLmxvZyhzY2FsZSk7XHJcbiAgICBBbGlnbi5zY2FsZVRvR2FtZVcocywgc2NhbGUsIHRoaXMpO1xyXG4gICAgdGhpcy5ncmlkLnBsYWNlQXRJbmRleChwb3MsIHMpO1xyXG4gICAgcmV0dXJuIHM7XHJcbiAgfVxyXG4gIHBsYWNlSW1hZ2UyKGtleTogc3RyaW5nLCBjb2w6IG51bWJlcixyb3c6bnVtYmVyLCBzY2FsZTogbnVtYmVyKSB7XHJcblxyXG4gICAgbGV0IHM6IFBoYXNlci5HYW1lT2JqZWN0cy5TcHJpdGUgPSB0aGlzLmFkZC5zcHJpdGUoMCwgMCwga2V5KTtcclxuICAgIC8vY29uc29sZS5sb2coc2NhbGUpO1xyXG4gICAgQWxpZ24uc2NhbGVUb0dhbWVXKHMsIHNjYWxlLCB0aGlzKTtcclxuICAgIHRoaXMuZ3JpZC5wbGFjZUF0KGNvbCxyb3csIHMpO1xyXG4gICAgcmV0dXJuIHM7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHRoZSByZWFsIHNjZW5lXHJcbiAgICovXHJcbiAgcHVibGljIGdldFNjZW5lKCk6IFBoYXNlci5TY2VuZSB7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgLyoqXHJcbiAgICogXHJcbiAgICogQHJldHVybnMgdGhlIGdhbWVzIHdpZHRoXHJcbiAgICovXHJcbiAgcHVibGljIGdldFcoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmd3O1xyXG4gIH1cclxuICAvKipcclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB0aGUgZ2FtZSBoZWlnaHRcclxuICAgKi9cclxuICBwdWJsaWMgZ2V0SCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2g7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFBsYXlzIGEgc291bmQgZWZmZWN0XHJcbiAgICogQHBhcmFtIHNvdW5kS2V5IFxyXG4gICAqL1xyXG4gIHB1YmxpYyBwbGF5U291bmQoc291bmRLZXk6c3RyaW5nKVxyXG4gIHtcclxuICAgICBsZXQgc291bmQ6UGhhc2VyLlNvdW5kLkJhc2VTb3VuZD10aGlzLnNvdW5kLmFkZChzb3VuZEtleSk7XHJcbiAgICAgc291bmQucGxheSgpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJQmFzZVNjZW5lIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvSUJhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBJR2FtZU9iaiB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lHYW1lT2JqXCI7XHJcblxyXG4vKmpzaGludCBlc3ZlcnNpb246IDYgKi9cclxuZXhwb3J0IGNsYXNzIEFsaWduIHtcclxuXHRzdGF0aWMgc2NhbGVUb0dhbWVXKG9iajpJR2FtZU9iaiwgcGVyOm51bWJlciwgc2NlbmU6SUJhc2VTY2VuZSkge1xyXG5cdFx0XHJcblx0XHRsZXQgdzpudW1iZXI9c2NlbmUuZ2V0VygpO1xyXG5cdFx0b2JqLmRpc3BsYXlXaWR0aCA9ICB3KiBwZXI7XHJcblx0XHRvYmouc2NhbGVZID0gb2JqLnNjYWxlWDtcclxuXHR9XHJcblx0c3RhdGljIHNjYWxlVG9HYW1lSChvYmo6SUdhbWVPYmosIHBlcjpudW1iZXIsIHNjZW5lOklCYXNlU2NlbmUpIHtcclxuXHRcdFxyXG5cdFx0bGV0IGg6bnVtYmVyPXNjZW5lLmdldEgoKTtcclxuXHRcdG9iai5kaXNwbGF5SGVpZ2h0ID0gIGgqIHBlcjtcclxuXHRcdG9iai5zY2FsZVggPSBvYmouc2NhbGVZO1xyXG5cdH1cclxuXHRzdGF0aWMgY2VudGVySChvYmo6SUdhbWVPYmosIHNjZW5lOklCYXNlU2NlbmUpIHtcclxuXHRcdG9iai54ID0gc2NlbmUuZ2V0VygpIC8gMiAtIG9iai5kaXNwbGF5V2lkdGggLyAyO1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY2VudGVyVihvYmo6SUdhbWVPYmosIHNjZW5lOklCYXNlU2NlbmUpIHtcclxuXHRcdG9iai55ID0gc2NlbmUuZ2V0SCgpLyAyIC0gb2JqLmRpc3BsYXlIZWlnaHQgLyAyO1xyXG5cdH1cclxuXHRzdGF0aWMgY2VudGVyMihvYmo6SUdhbWVPYmosIHNjZW5lOklCYXNlU2NlbmUpIHtcclxuXHRcdG9iai54ID0gc2NlbmUuZ2V0VygpIC8gMiAtIG9iai5kaXNwbGF5V2lkdGggLyAyO1xyXG5cdFx0b2JqLnkgPSBzY2VuZS5nZXRIKCkvIDIgLSBvYmouZGlzcGxheUhlaWdodCAvIDI7XHJcblx0fVxyXG5cdHN0YXRpYyBjZW50ZXIob2JqOklHYW1lT2JqLCBzY2VuZTpJQmFzZVNjZW5lKSB7XHJcblx0XHRvYmoueCA9IHNjZW5lLmdldFcoKSAvIDI7XHJcblx0XHRvYmoueSA9IHNjZW5lLmdldEgoKS8gMjtcclxuXHR9XHJcblx0c3RhdGljIGdldFlQZXIocGVyOm51bWJlciwgc2NlbmU6SUJhc2VTY2VuZSkge1xyXG5cdFx0cmV0dXJuIHNjZW5lLmdldEgoKSogcGVyO1xyXG5cdH1cclxuXHRzdGF0aWMgZ2V0WFBlcihwZXI6bnVtYmVyLCBzY2VuZTpJQmFzZVNjZW5lKSB7XHJcblx0XHRyZXR1cm4gc2NlbmUuZ2V0VygpICogcGVyO1xyXG5cdH1cclxuXHRzdGF0aWMgY2VudGVyVG9PYmoob2JqMTpJR2FtZU9iaixvYmoyOklHYW1lT2JqKVxyXG5cdHtcdFx0XHJcblx0XHRvYmoxLng9b2JqMi5kaXNwbGF5V2lkdGgvMi1vYmoxLmRpc3BsYXlXaWR0aC8yO1xyXG5cdFx0b2JqMS55PW9iajIuZGlzcGxheUhlaWdodC8yLW9iajEuZGlzcGxheUhlaWdodC8yO1xyXG5cdH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBbGlnbjsiLCJpbXBvcnQgeyBHYW1lT2JqZWN0cyB9IGZyb20gXCJwaGFzZXJcIjtcclxuaW1wb3J0IHsgUG9zVm8gfSBmcm9tIFwiLi4vZGF0YU9ianMvUG9zVm9cIjtcclxuaW1wb3J0IElCYXNlU2NlbmUgZnJvbSBcIi4uL2ludGVyZmFjZXMvSUJhc2VTY2VuZVwiO1xyXG5pbXBvcnQgeyBJR2FtZU9iaiB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0lHYW1lT2JqXCI7XHJcblxyXG4vKmpzaGludCBlc3ZlcnNpb246IDYgKi9cclxuZXhwb3J0IGNsYXNzIEFsaWduR3JpZCB7XHJcbiAgcHJpdmF0ZSByb3dzOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgY29sczogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgY3c6IG51bWJlciA9IDA7XHJcbiAgcHVibGljIGNoOiBudW1iZXIgPSAwO1xyXG4gIHB1YmxpYyBjZDogbnVtYmVyID0gMDtcclxuICBwcml2YXRlIHNjZW5lOiBJQmFzZVNjZW5lO1xyXG4gIHByaXZhdGUgZ3JhcGhpY3MhOiBQaGFzZXIuR2FtZU9iamVjdHMuR3JhcGhpY3M7XHJcbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xyXG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSByc2NlbmU6IFBoYXNlci5TY2VuZTtcclxuICBwcml2YXRlIG51bWJlckFycmF5OiBHYW1lT2JqZWN0cy5UZXh0W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBzY2VuZTogSUJhc2VTY2VuZSxcclxuICAgIHJvd3M6IG51bWJlciA9IDExLFxyXG4gICAgY29sczogbnVtYmVyID0gMTEsXHJcbiAgICB3aWR0aDogbnVtYmVyID0gLTEsXHJcbiAgICBoZWlnaHQ6IG51bWJlciA9IC0xXHJcbiAgKSB7XHJcbiAgICBpZiAoaGVpZ2h0ID09PSAtMSkge1xyXG4gICAgICBoZWlnaHQgPSBzY2VuZS5nZXRIKCk7XHJcbiAgICB9XHJcbiAgICBpZiAod2lkdGggPT09IC0xKSB7XHJcbiAgICAgIHdpZHRoID0gc2NlbmUuZ2V0VygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yb3dzID0gcm93cztcclxuICAgIHRoaXMuY29scyA9IGNvbHM7XHJcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcblxyXG4gICAgLy9jZWxsIHdpZHRoXHJcbiAgICB0aGlzLmN3ID0gd2lkdGggLyB0aGlzLmNvbHM7XHJcbiAgICAvL2NlbGwgaGVpZ2h0XHJcbiAgICB0aGlzLmNoID0gaGVpZ2h0IC8gdGhpcy5yb3dzO1xyXG5cclxuICAgIC8vZCA9IOKImihswrIgKyB3wrIpXHJcbiAgICB0aGlzLmNkID0gTWF0aC5zcXJ0KHRoaXMuY3cgKiB0aGlzLmN3ICsgdGhpcy5jaCAqIHRoaXMuY2gpO1xyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5yc2NlbmUgPSB0aGlzLnNjZW5lLmdldFNjZW5lKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuXHJcbiAgICB0aGlzLmdyYXBoaWNzID0gdGhpcy5zY2VuZS5nZXRTY2VuZSgpLmFkZC5ncmFwaGljcygpO1xyXG4gICAgdGhpcy5ncmFwaGljcy5saW5lU3R5bGUoMiwgMHhmZjAwMDAsIDAuNSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndpZHRoOyBpICs9IHRoaXMuY3cpIHtcclxuICAgICAgdGhpcy5ncmFwaGljcy5tb3ZlVG8oaSwgMCk7XHJcbiAgICAgIHRoaXMuZ3JhcGhpY3MubGluZVRvKGksIHRoaXMuaGVpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGVpZ2h0OyBpICs9IHRoaXMuY2gpIHtcclxuICAgICAgdGhpcy5ncmFwaGljcy5tb3ZlVG8oMCwgaSk7XHJcbiAgICAgIHRoaXMuZ3JhcGhpY3MubGluZVRvKHRoaXMud2lkdGgsIGkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JhcGhpY3Muc3Ryb2tlUGF0aCgpO1xyXG4gIH1cclxuICBwbGFjZShwb3M6UG9zVm8sb2JqOklHYW1lT2JqKVxyXG4gIHtcclxuICAgIHRoaXMucGxhY2VBdChwb3MueCxwb3MueSxvYmopO1xyXG4gIH1cclxuICBwbGFjZUF0KHh4OiBudW1iZXIsIHl5OiBudW1iZXIsIG9iajogSUdhbWVPYmopIHtcclxuICAgIC8vY2FsYyBwb3NpdGlvbiBiYXNlZCB1cG9uIHRoZSBjZWxsd2lkdGggYW5kIGNlbGxoZWlnaHRcclxuICAgIGxldCB4MiA9IHRoaXMuY3cgKiB4eCArIHRoaXMuY3cgLyAyO1xyXG4gICAgbGV0IHkyID0gdGhpcy5jaCAqIHl5ICsgdGhpcy5jaCAvIDI7XHJcblxyXG4gICAgb2JqLnggPSB4MjtcclxuICAgIG9iai55ID0geTI7XHJcbiAgfVxyXG4gIHBsYWNlQXQyKHh4OiBudW1iZXIsIHl5OiBudW1iZXIsIG9iajogSUdhbWVPYmopIHtcclxuICAgIGxldCB4MiA9IHRoaXMuY3cgKiAoeHggLSAxKSArIHRoaXMuY3c7XHJcbiAgICBsZXQgeTIgPSB0aGlzLmNoICogKHl5IC0gMSkgKyB0aGlzLmNoO1xyXG5cclxuICAgIG9iai54ID0geDI7XHJcbiAgICBvYmoueSA9IHkyO1xyXG4gIH1cclxuICBwbGFjZUF0SW5kZXgoaW5kZXg6IG51bWJlciwgb2JqOiBJR2FtZU9iaiwgdXNlQ2VudGVyID0gdHJ1ZSkge1xyXG4gICAgbGV0IHl5ID0gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMuY29scyk7XHJcbiAgICBsZXQgeHggPSBpbmRleCAtIHl5ICogdGhpcy5jb2xzO1xyXG4gICAgaWYgKHVzZUNlbnRlciA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLnBsYWNlQXQoeHgsIHl5LCBvYmopO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wbGFjZUF0Mih4eCwgeXksIG9iaik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNob3dOdW1iZXJzKCkge1xyXG4gICAgdGhpcy5zaG93KCk7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sczsgaisrKSB7XHJcbiAgICAgICAgbGV0IG51bVRleHQgPSB0aGlzLnNjZW5lXHJcbiAgICAgICAgICAuZ2V0U2NlbmUoKVxyXG4gICAgICAgICAgLmFkZC50ZXh0KDAsIDAsIGNvdW50LnRvU3RyaW5nKCksIHsgY29sb3I6IFwiI2ZmMDAwMFwiIH0pO1xyXG4gICAgICAgIG51bVRleHQuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuICAgICAgICB0aGlzLm51bWJlckFycmF5LnB1c2gobnVtVGV4dCk7XHJcbiAgICAgICAgdGhpcy5wbGFjZUF0SW5kZXgoY291bnQsIG51bVRleHQpO1xyXG4gICAgICAgIGNvdW50Kys7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgc2hvd1BvcygpIHtcclxuICAgIHRoaXMuc2hvdygpO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHM7IGorKykge1xyXG4gICAgICAgIGxldCBudW1UZXh0ID0gdGhpcy5zY2VuZVxyXG4gICAgICAgICAgLmdldFNjZW5lKClcclxuICAgICAgICAgIC5hZGQudGV4dCgwLCAwLCBqICsgXCJcXG5cIiArIGksIHsgY29sb3I6IFwiI2ZmMDAwMFwiIH0pO1xyXG4gICAgICAgIG51bVRleHQuc2V0T3JpZ2luKDAuNSwgMC41KTtcclxuICAgICAgICB0aGlzLm51bWJlckFycmF5LnB1c2gobnVtVGV4dCk7XHJcbiAgICAgICAgdGhpcy5wbGFjZUF0SW5kZXgoY291bnQsIG51bVRleHQpO1xyXG5cclxuICAgICAgICBjb3VudCsrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZpbmROZWFyZXN0SW5kZXgoeHg6IG51bWJlciwgeXk6IG51bWJlcikge1xyXG4gICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoeXkgLyB0aGlzLmNoKTtcclxuICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKHh4IC8gdGhpcy5jdyk7XHJcbiAgICBsZXQgaW5kZXggPSByb3cgKiB0aGlzLmNvbHMgKyBjb2w7XHJcbiAgICByZXR1cm4gaW5kZXg7XHJcbiAgfVxyXG4gIGZpbmROZWFyZXN0R3JpZFhZKHh4OiBudW1iZXIsIHl5OiBudW1iZXIpIHtcclxuICAgIGxldCByb3cgPSBNYXRoLmZsb29yKHl5IC8gdGhpcy5jaCk7XHJcbiAgICBsZXQgY29sID0gTWF0aC5mbG9vcih4eCAvIHRoaXMuY3cpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogY29sLFxyXG4gICAgICB5OiByb3csXHJcbiAgICB9O1xyXG4gIH1cclxuICBmaW5kTmVhcmVzdEdyaWRYWURlYyh4eDogbnVtYmVyLCB5eTogbnVtYmVyKSB7XHJcbiAgICBsZXQgcm93ID0geXkgLyB0aGlzLmNoO1xyXG4gICAgbGV0IGNvbCA9IHh4IC8gdGhpcy5jdztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IGNvbCxcclxuICAgICAgeTogcm93LFxyXG4gICAgfTtcclxuICB9XHJcbiAgaGlkZSgpIHtcclxuICAgIGlmICh0aGlzLmdyYXBoaWNzKSB7XHJcbiAgICAgIHRoaXMuZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm51bWJlckFycmF5LmZvckVhY2goKHQ6IFBoYXNlci5HYW1lT2JqZWN0cy5UZXh0KSA9PiB7IHQuZGVzdHJveSgpIH0pO1xyXG4gIH1cclxuICBnZXRQb3NCeVhZKHh4OiBudW1iZXIsIHl5OiBudW1iZXIpIHtcclxuICAgIGxldCBpbmRleCA9IHRoaXMuZmluZE5lYXJlc3RJbmRleCh4eCwgeXkpO1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0UG9zQnlJbmRleChpbmRleCk7XHJcbiAgfVxyXG4gIGdldFJlYWxYWSh4eDogbnVtYmVyLCB5eTogbnVtYmVyKSB7XHJcbiAgICBsZXQgeDE6IG51bWJlciA9IHh4ICogdGhpcy5jdztcclxuICAgIGxldCB5MTogbnVtYmVyID0geXkgKiB0aGlzLmNoO1xyXG4gICAgcmV0dXJuIG5ldyBQb3NWbyh4MSwgeTEpO1xyXG4gIH1cclxuICBnZXRSZWFsTWlkZGxlQm90dG9uKHh4OiBudW1iZXIsIHl5OiBudW1iZXIpIHtcclxuICAgIGxldCB4MTogbnVtYmVyID0gKHh4ICogdGhpcy5jdykgKyB0aGlzLmN3IC8gMjtcclxuICAgIGxldCB5MTogbnVtYmVyID0gKHl5ICsgMSkgKiB0aGlzLmNoO1xyXG4gICAgeTEgKz0gdGhpcy5jaDtcclxuICAgIHJldHVybiBuZXcgUG9zVm8oeDEsIHkxKTtcclxuICB9XHJcbiAgZ2V0UmVhbEJvdHRvbSh4eDogbnVtYmVyLCB5eTogbnVtYmVyKSB7XHJcbiAgICBsZXQgeDE6IG51bWJlciA9IHh4ICogdGhpcy5jdztcclxuICAgIGxldCB5MTogbnVtYmVyID0gKHl5ICsgMSkgKiB0aGlzLmNoO1xyXG4gICAgeTEgKz0gdGhpcy5jaDtcclxuICAgIHJldHVybiBuZXcgUG9zVm8oeDEsIHkxKTtcclxuICB9XHJcbiAgZ2V0UG9zQnlJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgeXkgPSBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy5jb2xzKTtcclxuICAgIGxldCB4eCA9IGluZGV4IC0geXkgKiB0aGlzLmNvbHM7XHJcbiAgICBsZXQgeDIgPSB0aGlzLmN3ICogeHggKyB0aGlzLmN3IC8gMjtcclxuICAgIGxldCB5MiA9IHRoaXMuY2ggKiB5eSArIHRoaXMuY2ggLyAyO1xyXG4gICAgcmV0dXJuIG5ldyBQb3NWbyh4MiwgeTIpO1xyXG4gIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=