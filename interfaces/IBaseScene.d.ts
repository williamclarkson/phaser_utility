import { AlignGrid } from "../util/alignGrid";
export interface IBaseScene {
    getW(): number;
    getH(): number;
    getScene(): Phaser.Scene;
    getGrid(): AlignGrid;
    makeGrid(r: number, c: number): any;
    ch: number;
    cw: number;
    cd: number;
    resetSize(w: number, h: number): any;
}
export default IBaseScene;
