"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseScene = void 0;
var __1 = require("..");
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
//# sourceMappingURL=BaseScene.js.map