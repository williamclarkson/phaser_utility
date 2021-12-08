"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlignGrid = void 0;
var PosVo_1 = require("../dataObjs/PosVo");
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
//# sourceMappingURL=alignGrid.js.map