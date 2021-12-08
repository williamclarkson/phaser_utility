import { IBaseScene } from "../interfaces/IBaseScene";
import { IGameObj } from "../interfaces/IGameObj";
export declare class Align {
    static scaleToGameW(obj: IGameObj, per: number, scene: IBaseScene): void;
    static scaleToGameH(obj: IGameObj, per: number, scene: IBaseScene): void;
    static centerH(obj: IGameObj, scene: IBaseScene): void;
    static centerV(obj: IGameObj, scene: IBaseScene): void;
    static center2(obj: IGameObj, scene: IBaseScene): void;
    static center(obj: IGameObj, scene: IBaseScene): void;
    static getYPer(per: number, scene: IBaseScene): number;
    static getXPer(per: number, scene: IBaseScene): number;
    static centerToObj(obj1: IGameObj, obj2: IGameObj): void;
}
export default Align;
