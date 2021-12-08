"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Align;
//# sourceMappingURL=align.js.map