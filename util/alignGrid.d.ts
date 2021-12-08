import { PosVo } from "../dataObjs/PosVo";
import IBaseScene from "../interfaces/IBaseScene";
import { IGameObj } from "../interfaces/IGameObj";
export declare class AlignGrid {
    private rows;
    private cols;
    cw: number;
    ch: number;
    cd: number;
    private scene;
    private graphics;
    private width;
    private height;
    private rscene;
    private numberArray;
    constructor(scene: IBaseScene, rows?: number, cols?: number, width?: number, height?: number);
    show(): void;
    place(pos: PosVo, obj: IGameObj): void;
    placeAt(xx: number, yy: number, obj: IGameObj): void;
    placeAt2(xx: number, yy: number, obj: IGameObj): void;
    placeAtIndex(index: number, obj: IGameObj, useCenter?: boolean): void;
    showNumbers(): void;
    showPos(): void;
    findNearestIndex(xx: number, yy: number): number;
    findNearestGridXY(xx: number, yy: number): {
        x: number;
        y: number;
    };
    findNearestGridXYDec(xx: number, yy: number): {
        x: number;
        y: number;
    };
    hide(): void;
    getPosByXY(xx: number, yy: number): PosVo;
    getRealXY(xx: number, yy: number): PosVo;
    getRealMiddleBotton(xx: number, yy: number): PosVo;
    getRealBottom(xx: number, yy: number): PosVo;
    getPosByIndex(index: number): PosVo;
}
